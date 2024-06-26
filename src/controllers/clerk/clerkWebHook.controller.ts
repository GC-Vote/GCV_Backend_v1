import { errorHandlerWrapper } from "@/utils";
import httpStatus from "http-status";
import { MESSAGES } from "@/consts";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import "dotenv/config";
import { signUpHandler, updateHandler, deleteUserHandler } from "../auth";
import { respond } from "@/utils/clerk";

const clerkWebHookHandler = async function (req, res) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("You need a WEBHOOK_SECRET in your .env");
  }
  // Get the headers and body
  const headers = req.headers;
  const payload: string | Buffer = JSON.stringify(req.body);

  // Get the Svix headers for verification
  const svix_id = headers["svix-id"] as string;
  const svix_timestamp = headers["svix-timestamp"] as string;
  const svix_signature = headers["svix-signature"] as string;

  // If there are no Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Attempt to verify the incoming webhook
  // If successful, the payload will be available from 'evt'
  // If the verification fails, error out and  return error code
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err: any) {
    console.log("Error verifying webhook:", err.message);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", evt.data);

  let success: Boolean = false;
  switch (eventType) {
    case "user.created": {
      signUpHandler(evt, res)
        .then((result) => {
          success = result;
          respond(res, success, MESSAGES.ERROR.SIGN_UP_NOT_ACCEPTABLE)
        })
        .catch((error) => {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: (error as Error).message,
          });
        });
      return;
    }
    case "user.updated": {
      updateHandler(evt, res)
        .then((result) => {
          success = result;
          respond(res, success, MESSAGES.ERROR.UPDATE_NOT_ACCEPTABLE)
        })
        .catch((error) => {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: (error as Error).message,
          });
        });
      return;
    }

    case "user.deleted": {
      deleteUserHandler(evt, res)
        .then((result) => {
          success = result;
          respond(res, success, MESSAGES.ERROR.DELETE_NOT_ACCEPTABLE)
        })
        .catch((error) => {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: (error as Error).message,
          });
        });
      return;
    }
    default:
      return respond(res, true, MESSAGES.ERROR.UNKNOWN_ERROR)
  }
};

export const clerkWebHookController = errorHandlerWrapper(clerkWebHookHandler);

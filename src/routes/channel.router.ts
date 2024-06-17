import { channelController } from "@/controllers";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";

const channelRouter = express.Router();

channelRouter.post(
  "/",
  ClerkExpressRequireAuth(),
  channelController.channelCreateValidator(),
  channelController.channelCreate
);

channelRouter.put(
  "/",
  ClerkExpressRequireAuth(),
  channelController.channelUpdateValidator(),
  channelController.channelUpdate
);

channelRouter.delete(
  "/:channelName",
  ClerkExpressRequireAuth(),
  channelController.channelDeleteValidator(),
  channelController.channelDelete
);

channelRouter.get(
  "/",
  ClerkExpressRequireAuth(),
  channelController.getMyChannelValidator(),
  channelController.getMyChannelHandler
);

channelRouter.get(
  "/user_id/:userId",
  // ClerkExpressRequireAuth(),
  channelController.getChannelByUserValidator(),
  channelController.getChannelByUser
);

channelRouter.get(
  "/channelName/:channelName",
  // ClerkExpressRequireAuth(),
  channelController.getChannelByNameValidator(),
  channelController.getChannelByName
);

channelRouter.get(
  "/all",
  // ClerkExpressRequireAuth(),
  channelController.getAllChannelValidator(),
  channelController.getChannel
);

export default channelRouter;

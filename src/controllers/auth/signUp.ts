import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { UserEntity } from "@/entities";
import { DuplicateError, CustomError } from "@/errors";
import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { userService } from "services";
import { encryptPassword, errorHandlerWrapper } from "@/utils";
import { getUserFromEmail } from "@/services/user.service";
import path from "path";
import { MESSAGES, PATHS } from "consts";
import { sendVerifyEmail } from "@/utils/email";
import { randomInt } from "@/utils/generateRandomNumber";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";

export const signUpHandler = async (
  evt: WebhookEvent,
  res: Response
) : Promise<Boolean> => {
  try {
    interface ExpectedEventData {
      username?: string;
      email_addresses?: any;
      image_url?: string;
    }

    // Then, when destructuring:
    const { id } = evt.data;
    const { username, email_addresses, image_url } =
      evt.data as ExpectedEventData;

    const newUser: UserEntity = await userService.createUser({
      uuid: id,
      username: username,
      email: email_addresses[0].email_address,
      avatar: image_url,
    });
    return true;
  } catch (error) {
    return false;
  }
};

// export const signUp = errorHandlerWrapper(signUpHandler);

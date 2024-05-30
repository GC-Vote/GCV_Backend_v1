import { NotFoundError } from "@/errors";
import { Response } from "express";
import { UserEntity } from "@/entities";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import { MESSAGES } from "@/consts";
import { generateEmailStringArray } from "@/utils";
import { userService } from "@/services";

export const updateHandler = async (
  evt: WebhookEvent,
  res: Response
): Promise<Boolean> => {
  try {
    interface ExpectedEventData {
      username?: string;
      email_addresses?: any;
      image_url?: string;
    }

    const { id } = evt.data;
    const { username, email_addresses, image_url } =
      evt.data as ExpectedEventData;

    const emailString = await generateEmailStringArray(email_addresses);

    const user: UserEntity = await userService.getUserFromUUID(id);
    if (!user) {
      throw new NotFoundError(MESSAGES.ERROR.USER_DOES_NOT_EXIST);
    }

    const updateUser: UserEntity = await userService.updateUser(
      {
        username: username,
        avatar: image_url,
        email: JSON.stringify(emailString),
      },
      user
    );

    return true;
  } catch (error) {
    return false;
  }
};

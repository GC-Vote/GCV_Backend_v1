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
      emailAddresses?: any;
      imageUrl?: string;
    }

    const { id } = evt.data;
    const { username, emailAddresses, imageUrl } =
      evt.data as ExpectedEventData;

    const emailString = await generateEmailStringArray(emailAddresses);

    const user: UserEntity = await userService.getUserFromUUID(id);
    if (!user) {
      throw new NotFoundError(MESSAGES.ERROR.USER_DOES_NOT_EXIST);
    }

    const updateUser: UserEntity = await userService.updateUser(
      {
        username: username,
        avatar: imageUrl,
        email: JSON.stringify(emailString),
      },
      user
    );

    return true;
  } catch (error) {
    return false;
  }
};

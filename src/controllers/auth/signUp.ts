import { Response } from "express";
import { UserEntity } from "@/entities";
import { generateEmailStringArray } from "@/utils";
import { userService } from "services";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";

export const signUpHandler = async (
  evt: WebhookEvent,
  res: Response
): Promise<Boolean> => {
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

    const emailString = await generateEmailStringArray(email_addresses);

    const newUser: UserEntity = await userService.createUser({
      uuid: id,
      username: username,
      email: JSON.stringify(emailString),
      avatar: image_url,
    });
    return !!newUser;
  } catch (error) {
    return false;
  }
};

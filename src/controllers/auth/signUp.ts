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
      emailAddresses?: any;
      imageUrl?: string;
    }

    // Then, when destructuring:
    const { id } = evt.data;
    const { username, emailAddresses, imageUrl } =
      evt.data as ExpectedEventData;

    const emailString = await generateEmailStringArray(emailAddresses);

    const newUser: UserEntity = await userService.createUser({
      uuid: id,
      username: username,
      email: JSON.stringify(emailString),
      avatar: imageUrl,
    });
    return !!newUser;
  } catch (error) {
    return false;
  }
};

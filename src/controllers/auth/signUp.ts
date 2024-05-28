import { UserEntity } from "@/entities";
import { userService } from "services";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import { generateEmailStringArray } from "@/utils";

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

    const email_string = await generateEmailStringArray(email_addresses);

    const newUser: UserEntity = await userService.createUser({
      uuid: id,
      username: username,
      email: JSON.stringify(email_string),
      avatar: image_url,
    });
    if (newUser) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
};

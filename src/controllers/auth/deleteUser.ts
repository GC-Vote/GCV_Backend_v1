import { UserEntity } from "@/entities";
import { userService } from "services";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";

export const deleteUserHandler = async (
  evt: WebhookEvent,
  res: Response
): Promise<Boolean> => {
  try {
    // Then, when destructuring:
    const { id } = evt.data;

    const deleteResult: any = await userService.deleteUserFromId(id);
    if (deleteResult) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// Import statements should be grouped by type and sorted alphabetically within each group.
import { Response } from "express"; // Assuming Response is imported from express, adjust accordingly.
import { userService } from "services";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import { UserEntity } from "@/entities";
import { NotFoundError } from "@/errors";
import { MESSAGES } from "@/consts";

/**
 * Handles deletion of a user based on the event data.
 *
 * @param {WebhookEvent} evt - The webhook event containing user ID.
 * @param {Response} res - The response object.
 * @returns {Promise<boolean>} A promise resolving to a boolean indicating success.
 */
export const deleteUserHandler = async (
  evt: WebhookEvent,
  res: Response
): Promise<boolean> => {
  try {
    // Destructure the event data to extract the user ID.
    const { id } = evt.data;

    const user: UserEntity = await userService.getUserFromUUID(id);
    if (!user) {
      throw new NotFoundError(MESSAGES.ERROR.USER_DOES_NOT_EXIST);
    }

    // Use the extracted ID to delete the user.
    const deleteResult = await userService.deleteUserFromId(user);

    // Return true if the user was successfully deleted.
    return !!deleteResult;
  } catch (error) {
    // In case of an error, return false.
    return false;
  }
};

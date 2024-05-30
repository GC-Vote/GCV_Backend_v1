// Import statements should be grouped by type and sorted alphabetically within each group.
import { Response } from "express"; // Assuming Response is imported from express, adjust accordingly.
import { userService } from "services";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";

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

    // Use the extracted ID to delete the user.
    const deleteResult = await userService.deleteUserFromId(id);

    // Return true if the user was successfully deleted.
    return !!deleteResult;
  } catch (error) {
    // In case of an error, return false.
    return false;
  }
};

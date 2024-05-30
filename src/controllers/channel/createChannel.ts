import { MESSAGES } from "@/consts";
import { UserEntity } from "@/entities";
import { body } from "express-validator";

export const channelCreateValidator = () => {
  return [
    body("user")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.CHANNELER_IS_REQUIRED),
    body("channelName")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.CHANNEL_NAME_IS_REQUIRED),
    body("title")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.CHANNEL_TITLE_IS_REQUIRED),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
    user: UserEntity,
    channelName: string,
    title: string,
    description: string,
    
}
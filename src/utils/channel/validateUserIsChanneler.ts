import { MESSAGES } from "@/consts";
import { CustomError } from "@/errors";
import httpStatus from "http-status";

export const validateUserIsChanneler = (uuid: string, userId: string): void => {
  if (uuid !== userId) {
    throw new CustomError(
      MESSAGES.ERROR.USER_IS_NOT_CHANNELER,
      httpStatus.NOT_ACCEPTABLE
    );
  }
};

import { MESSAGES } from "@/consts";
import { ChannelEntity } from "@/entities";
import { CustomError } from "@/errors";
import { ChannelType } from "@/types";
import httpStatus from "http-status";

export const validateVisibilityAndPassword = (
  channelUpdate: ChannelEntity,
  data: { channelName: string } & Partial<
    Omit<ChannelType, "user" | "channelName">
  >
) => {
  if (
    (channelUpdate.visibility && data.password && data.visibility !== false) ||
    (!channelUpdate.visibility && data.visibility && data.password)
  ) {
    throw new CustomError(
      MESSAGES.VALIDATION.PASSWORD_UPDATE_IS_NOT_ALLOWED,
      httpStatus.NOT_ACCEPTABLE
    );
  }
};

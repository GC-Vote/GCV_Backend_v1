import { ChannelType } from "@/types";
import { Request, Response } from "express";
import { channelService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper, getChannelRepository } from "@/utils";
import { MESSAGES } from "@/consts";
import { param } from "express-validator";
import { ChannelEntity } from "@/entities";
import { CustomError, NotFoundError } from "@/errors";
import { validateUserIsChanneler } from "@/utils/channel/validateUserIsChanneler";

export const channelDeleteValidator = () => {
  return [
    param("channelName")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.CHANNEL_NAME_IS_REQUIRED),
  ];
};

type Params = {
  channelName: string;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const channelDeleteHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { channelName } = req.params;
  const { auth } = req as any;
  const channelRepository = await getChannelRepository();
  const channelUpdate: ChannelEntity | null = await channelRepository.findOne({
    where: { channelName: channelName },
    relations: ["user"],
  });
  if (!channelUpdate) {
    throw new NotFoundError(MESSAGES.ERROR.CHANNEL_DOES_NOT_EXIST);
  }
  validateUserIsChanneler(channelUpdate.user.uuid, auth.userId);
  const result = await channelService.deleteChannel(channelName);
  res.status(httpStatus.OK).json(result);
};

export const channelDelete = errorHandlerWrapper(channelDeleteHandler);

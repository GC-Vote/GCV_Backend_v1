import { ChannelType } from "@/types";
import { Request, Response } from "express";
import { channelService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper, getChannelRepository } from "@/utils";
import { ChannelEntity } from "@/entities";
import { MESSAGES } from "@/consts";
import { CustomError, NotFoundError } from "@/errors";
import { validateUserIsChanneler } from "@/utils/channel/validateUserIsChanneler";
import { body } from "express-validator";

export const channelUpdateValidator = () => {
  return [
    body("channelName")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.CHANNEL_NAME_IS_REQUIRED),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = { channelName: string } & Partial<
  Omit<ChannelType, "user" | "channelName">
>;
type ReqQuery = unknown;

export const channelUpdateHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { auth } = req as any;
  const channelRepository = await getChannelRepository();
  const channelUpdate: ChannelEntity | null = await channelRepository.findOne({
    where: { channelName: req.body.channelName },
    relations: ["user"],
  });
  if (!channelUpdate) {
    throw new NotFoundError(MESSAGES.ERROR.CHANNEL_DOES_NOT_EXIST);
  }
  validateUserIsChanneler(channelUpdate.user.uuid, auth.userId);
  const result = await channelService.updateChannel(req.body, channelUpdate);
  res.status(httpStatus.OK).json(result);
};

export const channelUpdate = errorHandlerWrapper(channelUpdateHandler);

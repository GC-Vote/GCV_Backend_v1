import { Request, Response } from "express";
import { MESSAGES } from "@/consts";
import { param } from "express-validator";
import { channelService, titleService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";
import { NotFoundError } from "@/errors";

export const getChannelByNameValidator = () => {
  return [
    param("channelName")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.CHANNEL_NAME_IS_REQUIRED),
  ];
};

type Params = { channelName: string };
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getChannelByNameHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { channelName } = req.params;
  const channel = await channelService.getChannelByName(channelName);
  if (!channel) {
    throw new NotFoundError(MESSAGES.ERROR.CHANNEL_DOES_NOT_EXIST);
  }
  res.status(httpStatus.OK).json({ channel });
};

export const getChannelByName = errorHandlerWrapper(getChannelByNameHandler);

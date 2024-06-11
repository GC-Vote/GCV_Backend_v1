import { Request, Response } from "express";
import { MESSAGES } from "@/consts";
import { param } from "express-validator";
import { channelService, titleService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";

export const getTitleByChannelValidator = () => {
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

export const getTitleByChannelHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { channelName } = req.params;
  const result = await titleService.getTitleByChannelName(channelName);
  res.status(httpStatus.OK).json({ result });
};

export const getTitleByChannel = errorHandlerWrapper(getTitleByChannelHandler);

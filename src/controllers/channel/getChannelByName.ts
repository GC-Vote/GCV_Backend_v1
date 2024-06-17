import { Request, Response } from "express";
import { MESSAGES } from "@/consts";
import { param } from "express-validator";
import { channelService, titleService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";

export const getChannelByNameValidator = () => {
  return [];
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
  res.status(httpStatus.OK).json({ channel });
};

export const getChannelByName = errorHandlerWrapper(getChannelByNameHandler);

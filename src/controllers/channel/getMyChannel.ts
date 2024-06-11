import { Request, Response } from "express";
import { MESSAGES } from "@/consts";
import { param } from "express-validator";
import { channelService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";

export const getMyChannelValidator = () => {
  return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getMyChannelHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { auth } = req as any;
  const userId = auth.userId;
  const result = await channelService.getChannelByUserId(userId);
  res.status(httpStatus.OK).json({ result });
};

export const getMyChannel = errorHandlerWrapper(getMyChannelHandler);

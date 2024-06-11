import { Request, Response } from "express";
import { MESSAGES } from "@/consts";
import { param } from "express-validator";
import { channelService, titleService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";

export const getMyTitleValidator = () => {
  return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getMyTitleHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { auth } = req as any;
  const userId = auth.userId;
  const result = await titleService.getTitleByUserId(userId);
  res.status(httpStatus.OK).json({ result });
};

export const getMyTitle = errorHandlerWrapper(getMyTitleHandler);

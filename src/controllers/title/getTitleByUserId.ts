import { Request, Response } from "express";
import { MESSAGES } from "@/consts";
import { param } from "express-validator";
import { channelService, titleService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";

export const getTitleByUserValidator = () => {
  return [];
};

type Params = {
  userId: string;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getTitleByUserHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { userId } = req.params;
  const result = await titleService.getTitleByUserId(userId);
  res.status(httpStatus.OK).json({ result });
};

export const getTitleByUser = errorHandlerWrapper(getTitleByUserHandler);

import { Request, Response } from "express";
import { MESSAGES } from "@/consts";
import { param } from "express-validator";
import { channelService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";

export const getChannelByUserValidator = () => {
  return [
    param("userId")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.USERID_IS_REQUIRED),
  ];
};

type Params = {
  userId: string;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getChannelByUserHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { userId } = req.params;
  const result = await channelService.getChannelByUserId(userId);
  res.status(httpStatus.OK).json({ result });
};

export const getChannelByUser = errorHandlerWrapper(getChannelByUserHandler);

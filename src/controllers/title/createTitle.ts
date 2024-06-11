import { MESSAGES } from "@/consts";
import { TitleType } from "@/types";
import { body } from "express-validator";
import { Request, Response } from "express";
import { channelService, titleService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";

export const titleCreateValidator = () => {
  return [
    body("user")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.TITLER_IS_REQUIRED),
    body("channel")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.CHANNEL_IS_REQUIRED),
    body("titleName")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.TITLE_NAME_IS_REQUIRED),
    body("title")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.TITLE_IS_REQUIRED),
    body("period")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.TITLE_PERIOD_IS_REQUIRED),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = TitleType;
type ReqQuery = unknown;

export const titleCreateHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const result = await titleService.createTitle(req.body);
  res.status(httpStatus.OK).json(result);
};

export const titleCreate = errorHandlerWrapper(titleCreateHandler);

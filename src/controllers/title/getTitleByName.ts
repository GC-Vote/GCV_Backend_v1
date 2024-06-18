import { Request, Response } from "express";
import { MESSAGES } from "@/consts";
import { param } from "express-validator";
import { channelService, titleService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";
import { NotFoundError } from "@/errors";

export const getTitleByNameValidator = () => {
  return [
    param("titleName")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.TITLE_NAME_IS_REQUIRED),
  ];
};

type Params = { titleName: string };
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getTitleByNameHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { titleName } = req.params;
  const title = await titleService.getTitleByName(titleName);
  if (!title) {
    throw new NotFoundError(MESSAGES.ERROR.TITLE_DOES_NOT_EXIST);
  }
  res.status(httpStatus.OK).json({ title });
};

export const getTitleByName = errorHandlerWrapper(getTitleByNameHandler);

import { Request, Response } from "express";
import { MESSAGES } from "@/consts";
import { param } from "express-validator";
import { channelService, suggestionService, titleService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";

export const getSuggestionByTitleValidator = () => {
  return [];
};

type Params = {
  titleName: string;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getSuggestionByTitleHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { titleName } = req.params;
  const result = await suggestionService.getSuggestionByTitleName(titleName);
  res.status(httpStatus.OK).json({ result });
};

export const getSuggestionByTitle = errorHandlerWrapper(
  getSuggestionByTitleHandler
);

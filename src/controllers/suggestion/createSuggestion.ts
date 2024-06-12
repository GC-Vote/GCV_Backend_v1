import { MESSAGES } from "@/consts";
import { SuggestionType, TitleType } from "@/types";
import { body } from "express-validator";
import { Request, Response } from "express";
import { suggestionService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";

export const suggestionCreateValidator = () => {
  return [
    body("user")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.SUGGESTER_IS_REQUIRED),
    body("channel")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.CHANNEL_IS_REQUIRED),
    body("title")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.TITLE_IS_REQUIRED),
    body("description")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.DESCRIPTION_IS_REQUIRED),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = SuggestionType;
type ReqQuery = unknown;

export const suggestionCreateHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const result = await suggestionService.createSuggestion(req.body);
  res.status(httpStatus.OK).json(result);
};

export const suggestionCreate = errorHandlerWrapper(suggestionCreateHandler);

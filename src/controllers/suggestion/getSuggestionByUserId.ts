import { Request, Response } from "express";
import { suggestionService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";

export const getSuggestionByUserValidator = () => {
  return [];
};

type Params = {
  userId: string;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getSuggestionByUserHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { userId } = req.params;
  const result = await suggestionService.getSuggestionByUserId(userId);
  res.status(httpStatus.OK).json({ result });
};

export const getSuggestionByUser = errorHandlerWrapper(getSuggestionByUserHandler);

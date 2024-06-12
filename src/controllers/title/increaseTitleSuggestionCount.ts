import { MESSAGES } from "@/consts";
import { TitleEntity } from "@/entities";
import { titleService } from "@/services";
import { errorHandlerWrapper, getTitleRepository } from "@/utils";
import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";

export const titleIncreaseSuggestionCountValidator = () => {
  return [
    body("titleName")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.TITLE_NAME_IS_REQUIRED),
    body("suggestionCount")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.SUGGESTION_COUNT_IS_REQUIRED),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = { titleName: string; suggestionCount: number };
type ReqQuery = unknown;

export const titleIncreaseSuggestionCountHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { titleName, suggestionCount } = req.body;
  const titleRepository = await getTitleRepository();
  const titleUpdate: TitleEntity | null = await titleRepository.findOneBy({
    titleName,
  });
  const result = await titleService.increaseTitleSuggestionCount(
    titleUpdate,
    suggestionCount
  );
  res.status(httpStatus.OK).json(result);
};

export const titleIncreaseSuggestionCount = errorHandlerWrapper(
  titleIncreaseSuggestionCountHandler
);

import { MESSAGES } from "@/consts";
import { SuggestionEntity, TitleEntity } from "@/entities";
import { suggestionService, titleService } from "@/services";
import { errorHandlerWrapper } from "@/utils";
import { getSuggestionRepository } from "@/utils/database/suggestion.repository";
import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";

export const suggestionIncreaseVoteCountValidator = () => {
  return [
    body("id")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.SUGGESTION_ID_IS_REQUIRED),
    body("voteCount")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.VOTE_COUNT_IS_REQUIRED),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = { id: number; voteCount: number };
type ReqQuery = unknown;

export const suggestionIncreaseVoteCountHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { id, voteCount } = req.body;
  const suggestionRepository = await getSuggestionRepository();
  const suggestionUpdate: SuggestionEntity | null =
    await suggestionRepository.findOneBy({
      id,
    });
  const result = await suggestionService.increaseSuggestionVoteCount(
    suggestionUpdate,
    voteCount
  );
  res.status(httpStatus.OK).json(result);
};

export const suggestionIncreaseVoteCount = errorHandlerWrapper(
  suggestionIncreaseVoteCountHandler
);

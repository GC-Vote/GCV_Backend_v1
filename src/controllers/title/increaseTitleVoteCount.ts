import { MESSAGES } from "@/consts";
import { TitleEntity } from "@/entities";
import { titleService } from "@/services";
import { errorHandlerWrapper, getTitleRepository } from "@/utils";
import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";

export const titleIncreaseVoteCountValidator = () => {
  return [
    body("titleName")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.TITLE_NAME_IS_REQUIRED),
    body("voteCount")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.VOTE_COUNT_IS_REQUIRED),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = { titleName: string; voteCount: number };
type ReqQuery = unknown;

export const titleIncreaseVoteCountHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { titleName, voteCount } = req.body;
  const titleRepository = await getTitleRepository();
  const titleUpdate: TitleEntity | null = await titleRepository.findOneBy({
    titleName,
  });
  const result = await titleService.increaseTitleVoteCount(titleUpdate, voteCount);
  res.status(httpStatus.OK).json(result);
};

export const titleIncreaseVoteCount = errorHandlerWrapper(titleIncreaseVoteCountHandler);

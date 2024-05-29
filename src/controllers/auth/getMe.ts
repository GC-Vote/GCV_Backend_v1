import { CustomError, NotFoundError } from "errors";
import { UserEntity } from "entities";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "utils";
import { AuthRequest } from "types";
import { userService } from "@/services";
import { MESSAGES } from "@/consts";

export const getMeValidator = () => {
  return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getMeHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { auth } = req as any;
  const user: UserEntity = await userService.getUser({uuid : auth.userId});

  if (!user) {
    throw new NotFoundError(MESSAGES.ERROR.USER_DOES_NOT_EXIST);
  }

  res.status(httpStatus.OK).json({ user: user });
};

export const getMe = errorHandlerWrapper(getMeHandler);

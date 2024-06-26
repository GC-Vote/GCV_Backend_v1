import { CustomError, NotFoundError } from "errors";
import { Response } from "express";
import { errorHandlerWrapper } from "utils";
import { AuthRequest } from "types";
import { MESSAGES } from "@/consts";
import { UserEntity } from "entities";
import { userService } from "services";
import httpStatus from "http-status";

export const getUserValidator = () => {
  return [];
};

type Params = {
  index: string;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getUserHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { index } = req.params;
  const { auth } = req as any;
  const currentUser: UserEntity = await userService.getUser({
    uuid: auth.userId,
  });
  const userById: UserEntity = await userService.getUser({ uuid: index });
  const userByUsername: UserEntity = await userService.getUser({
    username: index,
  });
  const getUser = userById ? userById : userByUsername;
  if (!getUser) {
    throw new NotFoundError(MESSAGES.ERROR.USER_DOES_NOT_EXIST);
  }

  res.status(httpStatus.OK).json({ getUser, currentUser });
};

export const getUser = errorHandlerWrapper(getUserHandler);

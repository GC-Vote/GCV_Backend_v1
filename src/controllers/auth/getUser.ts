import { CustomError, NotFoundError } from "errors";
import { UserEntity } from "entities";
import { Response } from "express";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "utils";
import { AuthRequest } from "types";
import { userService } from "services";

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
  const { auth } = req as any;
  const user_now: UserEntity = await userService.getUser({ uuid: auth.userId });
  const { index } = req.params;
  const user_get_uuid: UserEntity = await userService.getUser({ uuid: index });
  const user_get_username: UserEntity = await userService.getUser({
    username: index,
  });
  const user_get = user_get_uuid ? user_get_uuid : user_get_username;
  if (!user_get) {
    throw new NotFoundError("This Email's User is not exist.");
  }

  res.status(httpStatus.OK).json({ user_get: user_get, user_now: user_now });
};

export const getUser = errorHandlerWrapper(getUserHandler);

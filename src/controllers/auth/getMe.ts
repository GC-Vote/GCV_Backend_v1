import { CustomError, NotFoundError } from "errors";
import { Request, Response } from "express";
import { errorHandlerWrapper } from "utils";
import { MESSAGES } from "@/consts";
import { UserEntity } from "entities";
import { userService } from "@/services";
import httpStatus from "http-status";

/**
 * Validates the request for the getMe endpoint.
 * Currently returns an empty array, but can be expanded to include validation checks.
 * @return {Array} An array of validation errors, if any.
 */

export const getMeValidator = () => {
  return [];
};

/**
 * Handler for the getMe endpoint, returning the authenticated user's details.
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 */

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getMeHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
): Promise<void> => {
  const { auth } = req as any;
  const user: UserEntity = await userService.getUser({ uuid: auth.userId });

  if (!user) {
    throw new NotFoundError(MESSAGES.ERROR.USER_DOES_NOT_EXIST);
  }

  res.status(httpStatus.OK).json({ user });
};

/**
 * Wraps the getMeHandler with error handling middleware.
 * @param handler - The handler function to wrap.
 * @return {Function} The wrapped handler function.
 */

export const getMe = errorHandlerWrapper(getMeHandler);

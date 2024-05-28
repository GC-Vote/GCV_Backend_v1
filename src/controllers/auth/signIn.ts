import { UserEntity } from "@/entities";
import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { userService } from "@/services";
import { comparePassword, encryptPassword, errorHandlerWrapper } from "@/utils";
import { CustomError, DuplicateError } from "@/errors";
import jwt from "jsonwebtoken";
import { JWT_TOKEN, JWT_EXPIRATION_TIME } from "@/config";
import { MESSAGES } from "@/consts";

export const signInValidator = () => {
  return [
    body("email").notEmpty().withMessage(MESSAGES.VALIDATION.EMAIL_IS_REQUIRED),
    body("email")
      .optional()
      .isEmail()
      .withMessage(MESSAGES.VALIDATION.INVALID_EMAIL),
    body("password")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.PASSWORD_IS_REQUIRED),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email: string;
  password: string;
};

type ReqQuery = unknown;

export const signInHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  const user: UserEntity = await userService.getUserFromEmail(email);

  if (!user) {
    throw new DuplicateError(MESSAGES.ERROR.EMAIL_DOES_NOT_EXIST);
  }

  const validatePassword: Boolean = await comparePassword(
    password,
    user.password
  );

  if (!validatePassword) {
    throw new CustomError(
      MESSAGES.ERROR.CURRENT_PASSWORD_IS_INCORRECT,
      httpStatus.BAD_REQUEST
    );
  }

  const token: string = jwt.sign({ email }, JWT_TOKEN, {
    expiresIn: JWT_EXPIRATION_TIME,
  });

  res.status(httpStatus.OK).json({ token: token });
};

export const signIn = errorHandlerWrapper(signInHandler);

import { UserEntity } from "@/entities";
import { DuplicateError, CustomError } from "@/errors";
import { Request, Response } from "express";
import { body } from "express-validator";
import { userService } from "services";
import { getUserFromEmail } from "@/services/user.service";
import jwt from "jsonwebtoken";
import "dotenv/config";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";
import { MESSAGES } from "@/consts";

export const signUpVerifyValidator = () => {
  return [
    body("verifyCode")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.VERIFYCODE_IS_REQUIRED),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  username?: string;
  email: string;
  avatar?: string;
  password?: string;
  verifyCode: Number;
};
type ReqQuery = unknown;

const signUpVerifyHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
): Promise<void> => {
  const { username, email, avatar, password, verifyCode } = req.body;
  const user: UserEntity = await getUserFromEmail(email);
  if (user.verifyCode != verifyCode) {
    throw new DuplicateError(MESSAGES.ERROR.VERIFYCODE_INCORRECT);
  } else {
    const updateUser: UserEntity = await userService.updateUser(
      {
        username: username,
        avatar: avatar,
        password: password,
        verifyStatus: true,
      },
      user
    );

    const token: string = jwt.sign({ email }, process.env.JWT_TOKEN, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });

    res.status(httpStatus.OK).json({ updateUser: updateUser, token: token });
  }
};

export const signUpVerify = errorHandlerWrapper(signUpVerifyHandler);

import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { UserEntity } from "@/entities";
import { DuplicateError, CustomError } from "@/errors";
import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { userService } from "services";
import { encryptPassword, errorHandlerWrapper } from "@/utils";
import { getUserFromEmail } from "@/services/user.service";
import path from "path";
import { MESSAGES, PATHS } from "consts";
import { sendVerifyEmail } from "@/utils/email";
import { randomInt } from "@/utils/generateRandomNumber";

export const signUpValidator = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.NAME_IS_REQUIRED),
    body("email").notEmpty().withMessage(MESSAGES.VALIDATION.EMAIL_IS_REQUIRED),
    body("email")
      .optional()
      .isEmail()
      .withMessage(MESSAGES.VALIDATION.INVALID_EMAIL),
    body("password")
      .isLength({ min: 6, max: 30 })
      .withMessage(MESSAGES.VALIDATION.PASSWORD_LENGTH),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  username: string;
  email: string;
  avatar?: string;
  password: string;
};
type ReqQuery = unknown;

const signUpHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
): Promise<void> => {
  const { username, email, avatar, password } = req.body;

  const user: UserEntity = await getUserFromEmail(email);

  if (user) {
    throw new DuplicateError(MESSAGES.ERROR.EMAIL_ALREADY_EXISTS);
  }

  // Prevent xss using DOMPurify and santinization
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);

  // Hash password
  const hashPassword: string = await encryptPassword(password);

  // Generate Random Number
  const randomVerifyNumber = randomInt(100000, 999999);

  const newUser: UserEntity = await userService.createUser({
    username: purify.sanitize(username),
    email: email,
    avatar: avatar
      ? avatar
      : `${path.join(
          __dirname,
          "../../../",
          PATHS.FILE_UPLOAD_DEFAULT_FOLDER,
          "default.png"
        )}`,
    password: hashPassword,
    verifyCode: randomVerifyNumber,
  });

  // Verify Email
  sendVerifyEmail(email, randomVerifyNumber);

  res.status(httpStatus.OK).json(newUser);
};

export const signUp = errorHandlerWrapper(signUpHandler);

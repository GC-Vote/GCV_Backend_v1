import { Request, Response } from "express";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";
import { randomInt } from "@/utils/generateRandomNumber";
import { sendVerifyEmail } from "@/utils/email";
import { MESSAGES } from "@/consts";
import { body } from "express-validator";

export const resetRequestValidator = () => {
  return [
    body("email").notEmpty().withMessage(MESSAGES.VALIDATION.EMAIL_IS_REQUIRED),
    body("email")
      .optional()
      .isEmail()
      .withMessage(MESSAGES.VALIDATION.INVALID_EMAIL),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email: string;
};
type ReqQuery = unknown;

const resetRequestHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email } = req.body;
  // Generate random number
  const randomVerifyNumber = randomInt(100000, 999999);

  // Update the verify code in database

  // Verify Email
  sendVerifyEmail(email, randomVerifyNumber);

  res
    .json({ message: MESSAGES.RESPONSE.RESET_REQUEST_SUBMITTED })
    .status(httpStatus.OK);
};

export const resetRequestController = errorHandlerWrapper(resetRequestHandler);

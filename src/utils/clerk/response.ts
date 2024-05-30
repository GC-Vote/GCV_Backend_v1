import { Response } from "express";
import httpStatus from "http-status";

export const respond = (
  res: Response,
  success: Boolean,
  failMessage: string,
  statusCode?: number
): void => {
  const status =
    statusCode || (success ? httpStatus.OK : httpStatus.NOT_ACCEPTABLE);
  const message = success ? "Webhook received" : failMessage;
  res.status(status).json({
    success,
    message,
  });
};

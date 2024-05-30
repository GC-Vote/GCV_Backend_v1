import { MESSAGES } from "@/consts";
import { UserEntity } from "@/entities";
import { UserListType } from "@/types";
import { body } from "express-validator";
import { Request, Response } from "express";
import { channelService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";

export const channelCreateValidator = () => {
  return [
    body("user")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.CHANNELER_IS_REQUIRED),
    body("channelName")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.CHANNEL_NAME_IS_REQUIRED),
    body("title")
      .notEmpty()
      .withMessage(MESSAGES.VALIDATION.CHANNEL_TITLE_IS_REQUIRED),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  user: string;
  channelName: string;
  title: string;
  description?: string;
  image?: string;
  visibility?: Boolean;
  rate?: number;
  password?: string;
  userList?: UserListType[];
};
type ReqQuery = unknown;

export const channelCreateHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const {
    user,
    channelName,
    title,
    description,
    image,
    visibility,
    rate,
    password,
    userList,
  } = req.body;

  const result = await channelService.createChannel({
    user,
    channelName,
    title,
    description,
    image,
    visibility,
    rate,
    password,
    userList,
  });
  res.status(httpStatus.OK).json(result);
};

export const channelCreate = errorHandlerWrapper(channelCreateHandler);

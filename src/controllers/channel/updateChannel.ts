import { MESSAGES } from "@/consts";
import { UserEntity } from "@/entities";
import { ChannelType, UserListType } from "@/types";
import { body } from "express-validator";
import { Request, Response } from "express";
import { channelService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";

export const channelUpdateValidator = () => {
  return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = { channelName: string } & Partial<
  Omit<ChannelType, "user" | "channelName">
>;
type ReqQuery = unknown;

export const channelUpdateHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const result = await channelService.updateChannel(req.body);
  res.status(httpStatus.OK).json(result);
};

export const channelUpdate = errorHandlerWrapper(channelUpdateHandler);

import { MESSAGES } from "@/consts";
import { ChannelEntity, UserEntity } from "@/entities";
import {
  ArgumentValidationError,
  CustomError,
  DuplicateError,
  NotFoundError,
} from "@/errors";
import { ChannelType } from "@/types";
import { getChannelRepository, getUserRepository } from "@/utils";
import httpStatus from "http-status";

export const createChannel = async (
  data: ChannelType
): Promise<ChannelEntity | null> => {
  const channelRepository = await getChannelRepository();
  const userRepository = await getUserRepository();
  const userEntity: UserEntity | null = await userRepository.findOneBy({
    uuid: data.user,
  });
  const channelEntity: ChannelEntity | null = await channelRepository.findOneBy(
    {
      channelName: data.channelName,
    }
  );
  if (channelEntity) {
    throw new DuplicateError(MESSAGES.ERROR.CHANNEL_ALREADY_EXISTS);
  }
  if (!userEntity) {
    throw new NotFoundError(MESSAGES.ERROR.USER_DOES_NOT_EXIST);
  }
  if (data.visibility && data.password) {
    throw new CustomError(
      MESSAGES.VALIDATION.PASSWORD_UPDATE_IS_NOT_ALLOWED,
      httpStatus.NOT_ACCEPTABLE
    );
  }
  const channel = new ChannelEntity();
  Object.assign(channel, {
    ...data,
    user: userEntity,
  });
  return await channelRepository.save(channel);
};

export const updateChannel = async (
  data: { channelName: string } & Partial<
    Omit<ChannelType, "user" | "channelName">
  >
): Promise<ChannelEntity | null> => {
  const channelRepository = await getChannelRepository();
  const channelUpdate = await channelRepository.findOneBy({
    channelName: data.channelName,
  });
  if (!channelUpdate) {
    throw new NotFoundError(MESSAGES.ERROR.CHANNEL_DOES_NOT_EXIST);
  }
  if (
    (channelUpdate.visibility && data.password && data.visibility !== false) ||
    (!channelUpdate.visibility && data.visibility && data.password)
  ) {
    throw new CustomError(
      MESSAGES.VALIDATION.PASSWORD_UPDATE_IS_NOT_ALLOWED,
      httpStatus.NOT_ACCEPTABLE
    );
  }
  for (const key in data) {
    if (!(key === "channelName" || key === "user" || key === "visibility")) {
      channelUpdate[key] = data[key] || channelUpdate[key];
    }
    if (
      key === "visibility" &&
      (data.visibility === true || data.visibility === false)
    ) {
      channelUpdate[key] = data.visibility;
    }
  }
  if (channelUpdate.password && data.visibility) channelUpdate.password = null;
  return await channelRepository.save(channelUpdate);
};

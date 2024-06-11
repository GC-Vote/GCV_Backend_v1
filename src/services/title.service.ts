import { MESSAGES } from "@/consts";
import { ChannelEntity, TitleEntity, UserEntity } from "@/entities";
import {
  ArgumentValidationError,
  CustomError,
  DuplicateError,
  NotFoundError,
} from "@/errors";
import { TitleType } from "@/types";
import {
  getChannelRepository,
  getTitleRepository,
  getUserRepository,
  validateVisibilityAndPassword,
} from "@/utils";
import httpStatus from "http-status";

export const createTitle = async (
  data: TitleType
): Promise<TitleEntity | null> => {
  const userRepository = await getUserRepository();
  const channelRepository = await getChannelRepository();
  const titleRepository = await getTitleRepository();
  const userEntity: UserEntity | null = await userRepository.findOneBy({
    uuid: data.user,
  });
  const channelEntity: ChannelEntity | null = await channelRepository.findOneBy(
    {
      channelName: data.channel,
    }
  );
  const titleEntity: TitleEntity | null = await titleRepository.findOneBy(
    {
      titleName: data.titleName,
    }
  );
  if (titleEntity) {
    throw new DuplicateError(MESSAGES.ERROR.TITLE_ALREADY_EXISTS);
  }
  if (!userEntity) {
    throw new NotFoundError(MESSAGES.ERROR.USER_DOES_NOT_EXIST);
  }
  if (!channelEntity) {
    throw new NotFoundError(MESSAGES.ERROR.CHANNEL_DOES_NOT_EXIST);
  }
  if(channelEntity.deleteAt) {
    throw new CustomError(
      MESSAGES.VALIDATION.CHANNEL_IS_BLOCKED,
      httpStatus.NOT_ACCEPTABLE
    )
  }
  const title = new TitleEntity();
  Object.assign(title, {
    ...data,
    user: userEntity,
    channel: channelEntity
  });
  return await titleRepository.save(title);
};

export const getChannelByUserId = async (
  userId: string
): Promise<ChannelEntity[] | null> => {
  const channelRepository = await getChannelRepository();
  const channels = await channelRepository
    .createQueryBuilder("channels")
    .innerJoinAndSelect("channels.user", "user", "user.uuid = :userId", {
      userId,
    })
    .getMany();
  return channels;
};

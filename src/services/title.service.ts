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
  const titleEntity: TitleEntity | null = await titleRepository.findOneBy({
    titleName: data.titleName,
  });
  if (titleEntity) {
    throw new DuplicateError(MESSAGES.ERROR.TITLE_ALREADY_EXISTS);
  }
  if (!userEntity) {
    throw new NotFoundError(MESSAGES.ERROR.USER_DOES_NOT_EXIST);
  }
  if (!channelEntity) {
    throw new NotFoundError(MESSAGES.ERROR.CHANNEL_DOES_NOT_EXIST);
  }
  if (channelEntity.deleteAt) {
    throw new CustomError(
      MESSAGES.VALIDATION.CHANNEL_IS_BLOCKED,
      httpStatus.NOT_ACCEPTABLE
    );
  }
  const title = new TitleEntity();
  Object.assign(title, {
    ...data,
    user: userEntity,
    channel: channelEntity,
  });
  return await titleRepository.save(title);
};

export const getTitleByUserId = async (
  userId: string
): Promise<TitleEntity[] | null> => {
  const titleRepository = await getTitleRepository();
  const titles = await titleRepository
    .createQueryBuilder("titles")
    .innerJoinAndSelect("titles.user", "user", "user.uuid = :userId", {
      userId,
    })
    .getMany();
  return titles;
};

export const getTitleByChannelName = async (
  channelName: string
): Promise<TitleEntity[] | null> => {
  const titleRepository = await getTitleRepository();
  const titles = await titleRepository
    .createQueryBuilder("titles")
    .innerJoin(
      "titles.channel",
      "channel",
      "channel.channelName = :channelName",
      {
        channelName,
      }
    )
    .leftJoinAndSelect("titles.user", "user")
    // .select([
    //   "titles.id",
    //   "titles.createdAt",
    //   "titles.updateAt",
    //   "titles.deleteAt",
    //   "titles.titleName",
    //   "titles.title",
    //   "titles.description",
    //   "titles.image",
    //   "titles.period",
    //   "titles.method",
    //   "titles.suggestionLimit",
    //   "titles.permissioned",
    //   "titles.suggestionCount",
    //   "titles.voteCount",
    //   "titles.status",
    // "channel.channelName"
    // ])
    .getMany();
  return titles;
};

export const setTitleStatus = async (
  title: TitleEntity,
  status: number
): Promise<TitleEntity | null> => {
  const titleRepository = await getTitleRepository();
  title.status = status;
  return await titleRepository.save(title);
};

export const increaseTitleVoteCount = async (
  title: TitleEntity,
  voteCount: number
): Promise<TitleEntity | null> => {
  const titleRepository = await getTitleRepository();
  title.voteCount += voteCount;
  return await titleRepository.save(title);
};

export const increaseTitleSuggestionCount = async (
  title: TitleEntity,
  suggestionCount: number
): Promise<TitleEntity | null> => {
  const titleRepository = await getTitleRepository();
  title.suggestionCount += suggestionCount;
  return await titleRepository.save(title);
};

export const changeTitlePermissioned = async (
  title: TitleEntity
): Promise<TitleEntity | null> => {
  const titleRepository = await getTitleRepository();
  title.permissioned = !title.permissioned;
  return await titleRepository.save(title);
};

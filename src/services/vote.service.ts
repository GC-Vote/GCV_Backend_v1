import { MESSAGES } from "@/consts";
import {
  ChannelEntity,
  SuggestionEntity,
  TitleEntity,
  UserEntity,
} from "@/entities";
import { VoteEntity } from "@/entities/vote.entity";
import { CustomError, NotFoundError } from "@/errors";
import { VoteType } from "@/types";
import {
  getChannelRepository,
  getTitleRepository,
  getUserRepository,
  getSuggestionRepository,
  getVoteRepository
} from "@/utils";
import httpStatus from "http-status";

export const createVote = async (
  data: VoteType
): Promise<VoteEntity | null> => {
  const userRepository = await getUserRepository();
  const channelRepository = await getChannelRepository();
  const titleRepository = await getTitleRepository();
  const suggestionRepository = await getSuggestionRepository();
  const voteRepository = await getVoteRepository();
  const userEntity: UserEntity | null = await userRepository.findOneBy({
    uuid: data.user,
  });
  const channelEntity: ChannelEntity | null = await channelRepository.findOneBy(
    {
      channelName: data.channel,
    }
  );
  const titleEntity: TitleEntity | null = await titleRepository.findOne({
    where: { titleName: data.title },
    relations: ["channels"],
  });
  if (!userEntity) {
    throw new NotFoundError(MESSAGES.ERROR.USER_DOES_NOT_EXIST);
  }
  if (!channelEntity) {
    throw new NotFoundError(MESSAGES.ERROR.CHANNEL_DOES_NOT_EXIST);
  }
  if (!titleEntity) {
    throw new NotFoundError(MESSAGES.ERROR.TITLE_DOES_NOT_EXIST);
  }
  if (channelEntity.deleteAt) {
    throw new CustomError(
      MESSAGES.VALIDATION.CHANNEL_IS_BLOCKED,
      httpStatus.NOT_ACCEPTABLE
    );
  }
  if (titleEntity.deleteAt) {
    throw new CustomError(
      MESSAGES.VALIDATION.CHANNEL_IS_BLOCKED,
      httpStatus.NOT_ACCEPTABLE
    );
  }
  if (titleEntity.channel.channelName != data.channel) {
    throw new CustomError(
      MESSAGES.VALIDATION.TITLE_IS_NOT_IN_THE_CHANNEL,
      httpStatus.NOT_ACCEPTABLE
    );
  }
  const vote = new VoteEntity();
  Object.assign(vote, {
    ...data,
    user: userEntity,
    channel: channelEntity,
    title: titleEntity,
  });
  return await voteRepository.save(vote);
};

export const getSuggestionByUserId = async (
  userId: string
): Promise<SuggestionEntity[] | null> => {
  const suggestionRepository = await getSuggestionRepository();
  const suggestions = await suggestionRepository
    .createQueryBuilder("suggestions")
    .innerJoinAndSelect("suggestions.user", "user", "user.uuid = :userId", {
      userId,
    })
    .getMany();
  return suggestions;
};

export const getSuggestionByTitleName = async (
  titleName: string
): Promise<SuggestionEntity[] | null> => {
  const suggestionRepository = await getSuggestionRepository();
  const suggestions = await suggestionRepository
    .createQueryBuilder("suggestions")
    .innerJoinAndSelect(
      "suggestions.title",
      "title",
      "title.titleName = :titleName",
      {
        titleName,
      }
    )
    .getMany();
  return suggestions;
};

export const increaseSuggestionVoteCount = async (
  suggestion: SuggestionEntity,
  voteCount: number
): Promise<SuggestionEntity | null> => {
  const suggestionRepository = await getSuggestionRepository();
  suggestion.voteCount += voteCount;
  return await suggestionRepository.save(suggestion);
};

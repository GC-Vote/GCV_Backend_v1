import { ChannelEntity } from "@/entities";
import { ChannelType } from "@/types";
import { getChannelRepository, getUserRepository } from "@/utils";

export const createChannel = async (
  data: ChannelType
): Promise<ChannelEntity | null> => {
  const channelRepository = await getChannelRepository();
  const userRepository = await getUserRepository();
  const channel = new ChannelEntity();
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
  } = data;
  Object.assign(channel, {
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
  return await channelRepository.save(channel);
};

import { ChannelEntity, UserEntity } from "@/entities";
import { getChannelRepository, getUserRepository } from "utils";
import "dotenv/config";

export const createUser = async (
  data: Pick<UserEntity, "uuid" | "username" | "email" | "avatar">
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();

  const newUser: UserEntity = new UserEntity();
  // const { uuid, username, email, avatar } = data;
  newUser.uuid = data.uuid;
  newUser.username = data.username;
  newUser.email = data.email;
  newUser.avatar = data.avatar;
  // Object.assign(newUser, { uuid, username, email, avatar });

  await userRepository.save(newUser);
  return newUser;
};

// export const getUserFromEmail = async (
//   email: string
// ): Promise<UserEntity | null> => {
//   const userRepository = await getUserRepository();
//   const userInfo: UserEntity | null = await userRepository.findOneBy({
//     email: email,
//   });

//   return userInfo;
// };

export const getUserFromUUID = async (
  uuid: string
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const userInfo: UserEntity | null = await userRepository.findOneBy({
    uuid: uuid,
  });
  return userInfo;
};

// export const getUserFromUsername = async (
//   username: string
// ): Promise<UserEntity | null> => {
//   const userRepository = await getUserRepository();
//   const userInfo: UserEntity | null = await userRepository.findOneBy({
//     username: username,
//   });
//   return userInfo;
// };

export const getUser = async (
  data: Partial<Pick<UserEntity, "username" | "uuid">>
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  // const userInfo: UserEntity | null = await userRepository.findOneBy({
  //   username: username,
  // });
  const userInfo: UserEntity | null = await userRepository
    .createQueryBuilder("user")
    .select([
      "user.uuid",
      "user.email",
      "user.username",
      "user.avatar",
      "user.reason",
    ])
    // .select()
    .where(data)
    .getOne();
  return userInfo;
};

export const updateUser = async (
  data: Pick<UserEntity, "username" | "avatar" | "email">,
  updateUser: UserEntity
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  updateUser.username = data.username ? data.username : updateUser.username;
  updateUser.avatar = data.avatar ? data.avatar : updateUser.avatar;
  updateUser.email = data.email ? data.email : updateUser.email;
  await userRepository.save(updateUser);

  return updateUser;
};

export const deleteUserFromId = async (
  user: UserEntity
): Promise<UserEntity> => {
  const userId = user.uuid;
  // Set the deletedAt of the private channel of this deleted user & change the owner of public channel
  const channelRepository = await getChannelRepository();
  const channels = await channelRepository
    .createQueryBuilder("channels")
    .innerJoinAndSelect("channels.user", "user", "user.uuid = :userId", {
      userId,
    })
    .getMany();
  const updatePromises = channels.map(async (channel) => {
    if (channel.visibility == false) {
      channel.deleteAt = new Date(Date.now());
    } else {
      channel.user = await getUserFromUUID(process.env.ADMIN_USER_ID);
    }
    await channelRepository.save(channel);
  });
  await Promise.all(updatePromises);

  const userRepository = await getUserRepository();
  user.deleteAt = new Date(Date.now());
  await userRepository.save(user);

  return user;
};

import { UserEntity } from "@/entities";
import { getUserRepository } from "utils";

export const createUser = async (
  data: Pick<UserEntity, "uuid" | "username" | "email" | "avatar">
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();

  const newUser: UserEntity = new UserEntity();

  newUser.uuid = data.uuid;
  newUser.username = data.username;
  newUser.email = data.email;
  newUser.avatar = data.avatar;

  await userRepository.save(newUser);

  return newUser;
};

export const getUserFromEmail = async (
  email: string
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const userInfo: UserEntity | null = await userRepository.findOneBy({
    email: email,
  });

  return userInfo;
};

export const updateUser = async (
  data: Pick<
    UserEntity,
    "uuid" | "username" | "avatar"
  >,
  updateUser: UserEntity
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  updateUser.uuid = data.uuid ? data.uuid : updateUser.uuid;
  updateUser.username = data.username ? data.username : updateUser.username;
  updateUser.avatar = data.avatar ? data.avatar : updateUser.avatar;
  await userRepository.save(updateUser);

  return updateUser;
};

import { UserEntity } from "@/entities";
import { getUserRepository } from "utils";

export const createUser = async (
  data: Pick<UserEntity, "username" | "email" | "avatar" | "password" | "verifyCode">
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();

  const newUser: UserEntity = new UserEntity();

  newUser.username = data.username;
  newUser.email = data.email;
  newUser.avatar = data.avatar;
  newUser.password = data.password;
  newUser.verifyCode = data.verifyCode;

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
    "username" | "avatar" | "password" | "verifyStatus"
  >,
  updateUser: UserEntity
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  updateUser.username = data.username ? data.username : updateUser.username;
  updateUser.avatar = data.avatar ? data.avatar : updateUser.avatar;
  updateUser.password = data.password ? data.password : updateUser.password;
  updateUser.verifyStatus = data.verifyStatus
    ? data.verifyStatus
    : updateUser.verifyStatus;
  await userRepository.save(updateUser);

  return updateUser;
};

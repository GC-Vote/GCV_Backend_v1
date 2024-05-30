import { UserEntity } from "@/entities";
import { AppDataSource } from "@/setup";

export const getUserRepository = async() => {
  return AppDataSource.getRepository(UserEntity)
}
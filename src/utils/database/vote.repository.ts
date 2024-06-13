import { VoteEntity } from "@/entities/vote.entity";
import { DBConnect } from "utils/dbConnector";

export const getVoteRepository = async () => {
  const connection = await DBConnect.getConnection();
  return connection.getRepository(VoteEntity);
};

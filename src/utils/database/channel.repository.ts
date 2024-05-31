import { ChannelEntity } from "entities";
import { DBConnect } from "utils/dbConnector";

export const getChannelRepository = async () => {
  const connection = await DBConnect.getConnection();
  return connection.getRepository(ChannelEntity);
};

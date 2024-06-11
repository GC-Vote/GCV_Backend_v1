import { TitleEntity } from "entities";
import { DBConnect } from "utils/dbConnector";

export const getTitleRepository = async () => {
  const connection = await DBConnect.getConnection();
  return connection.getRepository(TitleEntity);
};

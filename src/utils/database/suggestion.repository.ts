import { SuggestionEntity } from "entities";
import { DBConnect } from "utils/dbConnector";

export const getSuggestionRepository = async () => {
  const connection = await DBConnect.getConnection();
  return connection.getRepository(SuggestionEntity);
};

import { MESSAGES } from "consts";

import { DBConnect, Logger } from "utils";

const databaseSetup = async (next: () => void) => {
  try {
    await DBConnect.dbCreate();
    Logger.info(MESSAGES.DATABASE.DATABASE_MIGARATION);
    await DBConnect.getConnection();
    Logger.log(MESSAGES.DATABASE.DATABASE_CONNECTION_SUCCESS);
    next();
  } catch (error) {
    Logger.log(error);
    Logger.error(MESSAGES.DATABASE.DATABASE_CONNECTION_FAILURE);
  }
};

export default databaseSetup;

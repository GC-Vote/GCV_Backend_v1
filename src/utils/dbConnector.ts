import { DataSource, DataSourceOptions, createConnection } from "typeorm";
import { createDatabase } from "typeorm-extension";

import { dbOptions } from "config";
import { Logger } from "./logger";
import { MESSAGES } from "@/consts";

class DBController {
  connection: DataSource | null = null;

  dbCreate = async () => {
    const options: DataSourceOptions = dbOptions;
    await createDatabase({
      ifNotExist: true,
      options,
    });
    await this.syncDatabase();
    this.connection = await this.dbConnection();
  };

  dbConnection = async (): Promise<DataSource> => {
    if (!this.connection) {
      this.connection = await createConnection(dbOptions);
    }
    return this.connection;
  };

  getConnection = async (): Promise<DataSource> => {
    if (this.connection === null) {
      this.connection = await this.dbConnection();
      return this.connection;
    } else {
      return this.connection;
    }
  };

  // Method to synchronize the database schema
  syncDatabase = async () => {
    try {
      await this.getConnection().then((connection) => {
        return connection.synchronize();
      });
      Logger.log(MESSAGES.DATABASE.DATABASE_SYNCHRONIZED_SUCCESS)
    } catch (error) {
      Logger.log(MESSAGES.DATABASE.DATABASE_SYNCHRONIZED_FAILURE, error)
    }
  };
}

export const DBConnect = new DBController();

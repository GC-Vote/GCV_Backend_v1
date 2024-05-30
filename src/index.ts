import express from "express";
import { Logger } from "./utils";
import { MESSAGES } from "./consts";
import { backendSetup, AppDataSource } from "setup";
import 'dotenv/config'

const app = express();

const setupServer = async () => {
  try {
    await AppDataSource.initialize();
    Logger.info(MESSAGES.DATABASE.DATABASE_CONNECTION_SUCCESS);
  } catch (error: unknown) {
    Logger.info(MESSAGES.DATABASE.DATABASE_CONNECTION_FAILURE);
    Logger.error(error);

    process.exit(0);
  }

  try {
    await backendSetup(app);
  } catch (error: unknown) {
    Logger.info(MESSAGES.SERVER.SERVER_RUN_FAILURE);
    Logger.error(error);
  }
};

setupServer();

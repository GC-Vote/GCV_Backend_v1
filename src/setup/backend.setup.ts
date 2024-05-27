import { json as bodyParserJSON } from "body-parser";
import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";
import requestIp from "request-ip";

import { ROUTE_VERSION } from "@/config";

import { MESSAGES } from "@/consts";

import { errorHandlerMiddleware, requestLoggerMiddleware } from "@/middleware";

import appRoutes from "routes";

import path from "path";

const port = process.env.PORT || 3001;

const backendSetup = (app: Express) => {
  app.use(express.json());
  app.use(cors());
  app.use(bodyParserJSON());

  app.use(requestLoggerMiddleware);

  app.use(requestIp.mw());
  // For Swagger

  // Health check
  app.use("/health", function (req, res) {
    res.send("OK");
  });

  app.use(`/api/${ROUTE_VERSION}`, appRoutes);
  app.use(errorHandlerMiddleware);

  app.listen(port, () => {
    console.info(`${MESSAGES.SERVER_RUN_SUCCESS} on PORT:${port}`);
  });
};

export default backendSetup;
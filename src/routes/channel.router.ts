import { channelController } from "@/controllers";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";

const channelRouter = express.Router();

channelRouter.post(
  "/",
  ClerkExpressRequireAuth(),
  channelController.channelCreateValidator(),
  channelController.channelCreate
);

export default channelRouter;

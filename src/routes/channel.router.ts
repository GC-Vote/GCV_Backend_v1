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

channelRouter.put(
  "/",
  ClerkExpressRequireAuth(),
  channelController.channelUpdateValidator(),
  channelController.channelUpdate
);

channelRouter.delete(
  "/:channelName",
  ClerkExpressRequireAuth(),
  channelController.channelDeleteValidator(),
  channelController.channelDelete
);

channelRouter.get(
  "/:userId",
  ClerkExpressRequireAuth(),
  channelController.getChannelByUserValidator(),
  channelController.getChannelByUser
);

export default channelRouter;

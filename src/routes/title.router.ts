import { titleController } from "@/controllers";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";

const titleRouter = express.Router();

titleRouter.post(
  "/",
  ClerkExpressRequireAuth(),
  titleController.titleCreateValidator(),
  titleController.titleCreate
);

titleRouter.get(
  "/",
  ClerkExpressRequireAuth(),
  titleController.getMyTitleValidator(),
  titleController.getMyTitle
);

titleRouter.get(
  "/:userId",
  // ClerkExpressRequireAuth(),
  titleController.getTitleByUserValidator(),
  titleController.getTitleByUser
);

titleRouter.get(
  "/channelName/:channelName",
  // ClerkExpressRequireAuth(),
  titleController.getTitleByChannelValidator(),
  titleController.getTitleByChannel
);

titleRouter.get(
  "/titleName/:titleName",
  // ClerkExpressRequireAuth(),
  titleController.getTitleByNameValidator(),
  titleController.getTitleByName
);

titleRouter.post(
  "/setStatus",
  ClerkExpressRequireAuth(),
  titleController.titleSetStatusValidator,
  titleController.titleSetStatus
);

titleRouter.post(
  "/voteCount",
  ClerkExpressRequireAuth(),
  titleController.titleIncreaseVoteCountValidator,
  titleController.titleIncreaseVoteCount
);

titleRouter.post(
  "/suggestionCount",
  ClerkExpressRequireAuth(),
  titleController.titleIncreaseSuggestionCountValidator,
  titleController.titleIncreaseSuggestionCount
);

titleRouter.post(
  "/permissioned",
  ClerkExpressRequireAuth(),
  titleController.titleChangePermissionedValidator,
  titleController.titleChangePermissioned
);

export default titleRouter;

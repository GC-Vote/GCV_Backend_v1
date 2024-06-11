import { titleController } from '@/controllers';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import express from 'express'

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
    ClerkExpressRequireAuth(),
    titleController.getTitleByUserValidator(),
    titleController.getTitleByUser
);

titleRouter.get(
    "/:channelName",
    ClerkExpressRequireAuth(),
    titleController.getTitleByChannelValidator(),
    titleController.getTitleByChannel
);

export default titleRouter;
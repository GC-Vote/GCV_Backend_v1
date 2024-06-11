import { titleController } from '@/controllers';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import express from 'express'

const titleRouter = express.Router();

titleRouter.post(
    "/",
    ClerkExpressRequireAuth(),
    titleController.titleCreateValidator(),
    titleController.titleCreate
)

export default titleRouter;
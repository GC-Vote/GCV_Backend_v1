import { ClerkExpressRequireAuth} from "@clerk/clerk-sdk-node";
import express from "express";

const channelRouter = express.Router();

channelRouter.post(
  '/',
  ClerkExpressRequireAuth(),
  authController.getMe
)


export default channelRouter;

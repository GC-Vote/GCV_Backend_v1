import { authController } from "@/controllers";
import { ClerkExpressRequireAuth, ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import express from "express";

const authRouter = express.Router();

authRouter.get(
  '/',
  ClerkExpressRequireAuth(),
  authController.getMe
)

export default authRouter;

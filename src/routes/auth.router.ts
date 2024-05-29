import { authController } from "@/controllers";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import express from "express";

const authRouter = express.Router();

authRouter.get(
  '/',
  ClerkExpressWithAuth(),
  authController.getMe
)

export default authRouter;

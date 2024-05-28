import { authController } from "@/controllers";
import express from "express";

const authRouter = express.Router();

authRouter.post(
  "/signUp",
  authController.signUpValidator(),
  authController.signUp
);

authRouter.post(
  "/signIn",
  authController.signInValidator(),
  authController.signIn
);

authRouter.post(
    '/signUpVerify',
    authController.signUpVerifyValidator(),
    authController.signUpVerify
)

export default authRouter;

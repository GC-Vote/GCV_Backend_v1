import express from "express";
import authRouter from "./auth.router";
import clerkRouter from "./clerk.route";

const appRoutes = express.Router();

appRoutes.use("/auth", authRouter);
appRoutes.use("/clerk", clerkRouter);

export default appRoutes;

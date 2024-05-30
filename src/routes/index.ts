import express from "express";
import authRouter from "./auth.router";
import clerkRouter from "./clerk.route";
import channelRouter from "./channel.router";

const appRoutes = express.Router();

appRoutes.use("/auth", authRouter);
appRoutes.use("/clerk", clerkRouter);
appRoutes.use("/channel", channelRouter);

export default appRoutes;

import express from "express";
import authRouter from "./auth.router";
import clerkRouter from "./clerk.route";
import channelRouter from "./channel.router";
import fileUploadRouter from "./fileUpload.router";
import titleRouter from "./title.router";

const appRoutes = express.Router();

appRoutes.use("/auth", authRouter);
appRoutes.use("/clerk", clerkRouter);
appRoutes.use("/channel", channelRouter);
appRoutes.use("/title", titleRouter);
appRoutes.use("/upload", fileUploadRouter);

export default appRoutes;

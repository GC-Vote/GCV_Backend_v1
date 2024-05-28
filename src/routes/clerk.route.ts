import express from "express";
import bodyParser from "body-parser";
import { clerkController } from "@/controllers";

const clerkRouter = express.Router();

clerkRouter.post(
    '/webhooks',
    bodyParser.raw({type: 'application/json'}),
    clerkController.clerkWebHookController
)

export default clerkRouter;
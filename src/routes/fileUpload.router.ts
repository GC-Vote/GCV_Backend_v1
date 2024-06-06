import express from 'express';

import { fileUploadController } from 'controllers';

const fileUploadRouter = express.Router();

fileUploadRouter.post(
    '/',
    fileUploadController.fileLoadValidator(),
    fileUploadController.fileLoad
);

export default fileUploadRouter;
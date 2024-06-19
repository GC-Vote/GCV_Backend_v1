import { REASON_CODES } from "consts";
import { UserEntity } from "entities";
import { DuplicateError, CustomError } from "errors";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { body } from "express-validator";
import httpStatus from "http-status";
import path from "path";
import { userService } from "services";
import { encryptPassword, errorHandlerWrapper } from "utils";

export const fileLoadValidator = () => {
  return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const fileLoadHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  let uploadFile: any = req.files.file;
  console.log(req.files);
  const name = uploadFile.name;
  const md5 = uploadFile.md5;
  // const saveAs = `${md5}_${name}`;
  console.log(name);
  // const date = new Date(Date.now());
  // const saveAs = `${date.getFullYear()}${
  //   date.getMonth() + 1
  // }${date.getDate()}${date.getHours()}${date.getMinutes()}${uploadFile.name}`;
  // console.log(name);
  await uploadFile.mv(
    `${path.join(__dirname, "../../../", "public/upload/img/")}${name}`,
    function (err) {
      if (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
      return res.status(httpStatus.OK).json({ status: "uploaded", name });
    }
  );
};

export const fileLoad = errorHandlerWrapper(fileLoadHandler);

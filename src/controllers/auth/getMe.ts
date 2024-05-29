import { CustomError, NotFoundError } from "errors";
import { UserEntity } from "entities";
import { Request, Response } from 'express';
import httpStatus from "http-status";
import {errorHandlerWrapper } from "utils";
import { AuthRequest } from 'types';


export const getMeValidator = () => {
    return [];
}

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getMeHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {

    console.log(req)
//   const user: UserEntity = req.user;

//   if(!user) {
//     throw new NotFoundError('This User does not exist.')
//   } 

//   res.status(httpStatus.OK).json({user: user});
}

export const getMe = errorHandlerWrapper(getMeHandler);
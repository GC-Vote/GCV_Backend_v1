import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";

import { ArgumentValidationError } from "@/errors";

import { AuthRequest } from "@/types";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import type { NextApiRequest, NextApiResponse } from "next";

export const errorHandlerWrapper = (
  func: (
    req:
      | Request<unknown, unknown, unknown, unknown>
      | AuthRequest<unknown, unknown, unknown, unknown>
      | NextApiRequest,
    res: Response | NextApiResponse,
    next: NextFunction
  ) => void
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ArgumentValidationError(
          "Invalid Arguments",
          errors.array().map((value: ValidationError) => value.msg)
        );
      }

      await func(req, res, next);
    } catch (err: unknown) {
      next(err);
    }
  };
};

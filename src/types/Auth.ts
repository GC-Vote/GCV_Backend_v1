import { Request } from "express";

import { UserEntity } from "entities";

export interface AuthRequest<Params, ResBody, ReqBody, ReqQuery>
  extends Request<Params, ReqBody, ResBody, ReqQuery> {
  user: UserEntity;
}

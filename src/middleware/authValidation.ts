import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../utils/error";
import { GetUserData } from "../extranal_libraries/grpcClient";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

let grpcIP: string = 'localhost:50051';

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string = req.headers.authorization || "";
    if (token.length === 0) {
      return res.status(STATUS_CODES?.UN_AUTHORIZED).send({ error: "Please provide token" })
    }
    let { status, message } = await GetUserData(grpcIP, token);
    if (!status) {
      return res.status(STATUS_CODES?.UN_AUTHORIZED).send({ error: message })
    }
    req.user = message
    next();
  } catch (error: any) {
    return res.status(STATUS_CODES?.UN_AUTHORIZED).send({ error: error?.message })
  }
}

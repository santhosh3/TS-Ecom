import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IcartInteractor } from "../interface/IcartInteractor";
import { INTERFACE_TYPE } from "../utils/appConst";
import { RequestValidator } from "../utils/requestValidator";
import { CreateCartRequest, UpdateCartRequest } from "../dto/cart.dto";
import { STATUS_CODES } from "../utils/error";

@injectable()
export class CartController {
  private interactor: IcartInteractor;

  constructor(
    @inject(INTERFACE_TYPE.CartInteractor) interactor: IcartInteractor
  ) {
    this.interactor = interactor;
  }

  async onCreateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { errors, input } = await RequestValidator(CreateCartRequest, body);
      if (errors) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ errors });
      }
      body.user = req.user;
      const data = await this.interactor.createCart(body);
      return res.status(STATUS_CODES.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getUserCart(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { errors, input } = await RequestValidator(CreateCartRequest, body);
      if (errors) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ errors });
      }
      body.user = req.user;
      const data = await this.interactor.getCart(body);
      return res.status(STATUS_CODES.OK).json({ status: "SUCCESS", data });
    } catch (error) {
      next(error);
    }
  }

  async onUpdateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { errors, input } = await RequestValidator(UpdateCartRequest, body);
      if (errors) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ errors });
      }
      body.user = req.user;
      const data = await this.interactor.updateCartItem(body);
      return res.status(STATUS_CODES.OK).json(data);
    } catch (error) {
      next(error);
    }
  }


  async deleteUserCart(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
      next(error);
    }
  }
}

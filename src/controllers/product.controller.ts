import { NextFunction, Request, Response } from "express";
import { IproductInteractor } from "../interface/IproductInteractor";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest } from "../dto/product.dto";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appConst";

@injectable()
export class ProductController {
  private interactor: IproductInteractor;

  constructor(
    @inject(INTERFACE_TYPE.ProductInteractor) interactor: IproductInteractor
  ) {
    this.interactor = interactor;
  }
  async onCreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { errors, input } = await RequestValidator(
        CreateProductRequest,
        body
      );
      if (errors) {
        return res.status(400).json({ errors });
      }
      const data = await this.interactor.createProduct(body);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

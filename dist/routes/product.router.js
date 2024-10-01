"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const productRepository_1 = require("../repository/productRepository");
const productInteractor_1 = require("../interactors/productInteractor");
const inversify_1 = require("inversify");
const appConst_1 = require("../utils/appConst");
const container = new inversify_1.Container();
container.bind(appConst_1.INTERFACE_TYPE.ProductRepository).to(productRepository_1.ProductRepository);
container.bind(appConst_1.INTERFACE_TYPE.ProductInteractor).to(productInteractor_1.ProductInteractor);
container.bind(appConst_1.INTERFACE_TYPE.ProductController).to(product_controller_1.ProductController);
const controller = container.get(appConst_1.INTERFACE_TYPE.ProductController);
const productRouter = express_1.default.Router();
productRouter.post("/products", controller.onCreateProduct.bind(controller));
exports.default = productRouter;
/*
without inversify

     import express from "express";
     import { ProductController } from "../controllers/product.controller";
     import { ProductRepository } from "../repository/productRepository";
     import { ProductInteractor } from "../interactors/productInteractor";
     import { Mailer } from "../external-libraries/mailer";
     import { MessageBroker } from "../external-libraries/messageBroker";

     const repository = new ProductRepository();
     const mailer = new Mailer();
     const broker = new MessageBroker();

     const interactor = new ProductInteractor(repository,mailer,broker);
     const controller = new ProductController(interactor);

     const productRouter = express.Router();

     productRouter.post("/products", controller.onCreateProduct.bind(controller));

     export default productRouter;
*/
/*
 with inversify
  import express from "express";
  import { ProductController } from "../controllers/product.controller";
  import { ProductRepository } from "../repository/productRepository";
  import { ProductInteractor } from "../interactors/productInteractor";
  import { IProductRepository } from "../interfaces/IProductRepository"
  import {Container} from "iversify";
  import { IMailer }
  import { Mailer }
  import { IMessageBroker }
  import { MessageBroker }
  import { IProductInteractor }
  import {INTERFACE_TYPE} from "../utils";

  const container = new Container();

  container.bind<IProductRepository>(INTERFACE_TYPE.ProductRepository).to(ProductRepository);
  container.bind<IProductInteractor>(<INTERFACE_TYPE.ProductInteractor>).to(ProductInteractor);
  container.bind<IMailer>(<INTERFACE_TYPE.Mailer>).to(Mailer);
  container.bind<IMessageBroker>(<INTERFACE_TYPE.MessageBroker>).to(MessageBroker);
  const controller = container.get<ProductController>(INTERFACE_TYPE.ProductController)

  const productRouter = express.Router();
  productRouter.post("/products", controller.onCreateProduct.bind(controller));
  export default productRouter;

*/ 

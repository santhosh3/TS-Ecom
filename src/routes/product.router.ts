import express from "express";
import { ProductController } from "../controllers/product.controller";
import { ProductRepository } from "../repository/productRepository";
import { IproductRepository } from "../interface/IproductRepository";
import { ProductInteractor } from "../interactors/productInteractor";
import { IproductInteractor } from "../interface/IproductInteractor";
import { Container } from "inversify";
import {INTERFACE_TYPE} from "../utils/appConst";

const container = new Container();

container.bind<IproductRepository>(INTERFACE_TYPE.ProductRepository).to(ProductRepository);
container.bind<IproductInteractor>(INTERFACE_TYPE.ProductInteractor).to(ProductInteractor);


container.bind(INTERFACE_TYPE.ProductController).to(ProductController);

const controller = container.get<ProductController>(INTERFACE_TYPE.ProductController)

const productRouter = express.Router();

productRouter.post("/products", controller.onCreateProduct.bind(controller));

export default productRouter;



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
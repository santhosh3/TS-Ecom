import express from "express";
import { CartController } from "../controllers/cart.controller";
import { CartRepository } from "../repository/cartRepository";
import { IcartRepository } from "../interface/IcartRepository";
import { CartInteractor } from "../interactors/cartInteractor";
import { IcartInteractor } from "../interface/IcartInteractor";
import { Container } from "inversify";
import { INTERFACE_TYPE } from "../utils/appConst";

const container = new Container();

container.bind<IcartRepository>(INTERFACE_TYPE.CartRepository).to(CartRepository);
container.bind<IcartInteractor>(INTERFACE_TYPE.CartInteractor).to(CartInteractor);

container.bind(INTERFACE_TYPE.CartController).to(CartController);

const controller = container.get<CartController>(INTERFACE_TYPE.CartController)

const cartRouter = express.Router();

cartRouter.post("/cart", controller.onCreateCart.bind(controller));
cartRouter.get("/cart", controller.getUserCart.bind(controller));
cartRouter.put("/cart", controller.onUpdateCart.bind(controller));

export default cartRouter;
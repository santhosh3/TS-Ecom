import { injectable } from "inversify";
import { IcartRepository } from "../interface/IcartRepository";
import { Cart, CartResponse } from "../entities/cart";
import { Cart as CartModal, CartModel } from "../models/cart.model";
import { Product } from "../entities/product";
import { GetProductQuantity } from "../extranal_libraries/grpcClient";

let grpcIP: string = 'localhost:50051'

@injectable()
export class CartRepository implements IcartRepository {
  async create(data: CartResponse): Promise<CartResponse> {
    const createCart: CartResponse = await CartModel.create(data);
    return Promise.resolve(createCart);
  }
  async get(data: any): Promise<CartResponse | null> {
    const getUserCart = await CartModel.findOne({ userId: data?.user?.id }).exec();
    return getUserCart ? getUserCart.toObject() : null;
  }
  async delete(data: any): Promise<any> {
    const deleteCart = await CartModel.deleteOne({ userId: data?.user?.id });
    return deleteCart ? true : false;
  }
  async getProductQuantity(data: any): Promise<any> {
    let quantity = await GetProductQuantity(grpcIP, data.productId);
    return quantity.status ? Promise.resolve(quantity.message) : Promise.reject(quantity.message)
  }
  async checkProductAvailability(data: any): Promise<any> {
    const filter = {
      userId: data?.user?.id
    }
    const product = await CartModel.findOne(filter).exec();
    return Promise.resolve(product);
  }
  async update(property: string, data: any): Promise<any> {
    if (property === "INCREMENT_PRODUCT_COUNT") {
      const cart = await CartModel.findOneAndUpdate(
        { userId: data?.user?.id, 'items.productId': data?.productId },
        {
          $inc: { 'items.$.quantity': data?.quantity, totalPrice: data?.totalPrice },
        },
        { new: true }
      );
      return Promise.resolve(cart)
    } else if (property === "INSERT_PRODUCT") {
      const cart = await CartModel.findOneAndUpdate(
        { userId: data?.user?.id },
        {
          $push: { items: { productId: data?.productId, quantity: data?.quantity } },
          $inc: {
            totalItems: 1,
            totalPrice: data?.totalPrice
          }
        },
        { new: true }
      );
      return Promise.resolve(cart)
    } else if (property === "DELETE_PRODUCT") {
      const cart = await CartModel.findOneAndUpdate(
        { userId: data?.user?.id },
        {
          $pull: { items: { productId: data?.productId } },
          $inc: {
            totalItems: -1,
            totalPrice: -data?.totalPrice
          }
        },
        { new: true }
      );
      return Promise.resolve(cart)
    } else if (property === "DELETE_PRODUCT_COUNT") {
      const cart = await CartModel.findOneAndUpdate(
        { userId: data?.user?.id, 'items.productId': data?.productId },
        {
          $inc: {
            'items.$.quantity': -data?.quantity,
            totalPrice: -data?.totalPrice
          }
        },
        { new: true }
      );
      return Promise.resolve(cart)
    }
  }
}

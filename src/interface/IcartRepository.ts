import { Cart, CartResponse } from "../entities/cart";
import { Product } from "../entities/product";

export interface IcartRepository {
  create(data: CartResponse): Promise<CartResponse>;
  get(data: any): Promise<CartResponse | null>
  delete(data: any): Promise<any>;
  getProductQuantity(data: any): Promise<any>;
  checkProductAvailability(data: any): Promise<any>;
  update(property: string, data: any): Promise<any>;
}

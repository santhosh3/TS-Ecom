import { inject, injectable } from "inversify";
import { IcartInteractor } from "../interface/IcartInteractor";
import { IcartRepository } from "../interface/IcartRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { CartResponse } from "../entities/cart";

@injectable()
export class CartInteractor implements IcartInteractor {
    private repository: IcartRepository;

    constructor(
        @inject(INTERFACE_TYPE.CartRepository) repository: IcartRepository
    ) {
        this.repository = repository;
    }

    async createCart(data: any): Promise<any> {
        const checkCart = await this.repository.get(data);
        const checkQuantityOfProduct = await this.repository.getProductQuantity(data);
        if (checkCart) {
            const checkItemExists = checkCart.items.find(x => x?.productId === data?.productId);
            if (checkItemExists) {
                const totalQuantity = checkItemExists?.quantity + data?.quantity;
                if (checkQuantityOfProduct.quantity > totalQuantity) {
                    data['totalPrice'] = data?.quantity * checkQuantityOfProduct?.price
                    const increQuantity = await this.repository.update("INCREMENT_PRODUCT_COUNT", data);
                    return Promise.resolve({ status: true, data: increQuantity });
                }
                return Promise.resolve({ status: false, data: `please select quantity less then ${checkQuantityOfProduct?.quantity}` });
            } else if (checkQuantityOfProduct?.quantity > data?.quantity) {
                data['totalPrice'] = data?.quantity * checkQuantityOfProduct?.price
                const addProduct = await this.repository.update("INSERT_PRODUCT", data)
                return Promise.resolve({ status: true, data: addProduct })
            }
        } else if (checkQuantityOfProduct.quantity > data?.quantity) {
            let item: CartResponse = {
                userId: data?.user?.id?.toString(),
                items: [{ productId: data?.productId, quantity: data?.quantity }],
                totalItems: 1,
                totalPrice: data?.quantity * checkQuantityOfProduct?.price
            }
            const createCart = await this.repository.create(item);
            return Promise.resolve({ status: true, data: createCart });
        }
        return Promise.resolve({ status: false, data: `please select quantity less then ${checkQuantityOfProduct?.quantity}` });
    }
    async getCart(data: any): Promise<any> {
        const getUserCart = await this.repository.get(data);
        return Promise.resolve(getUserCart)
    }
    async deleteCartItem(data: any): Promise<any> {
        const getUserCart = await this.repository.delete(data);
        return Promise.resolve(getUserCart)
    }
    async updateCartItem(data: any): Promise<any> {
        const checkCart = await this.repository.get(data);
        if (!checkCart) {
            return Promise.resolve({ status: false, data: 'please create a cart' });
        }
        const checkQuantityOfProduct = await this.repository.getProductQuantity(data);
        console.log(checkQuantityOfProduct)
        if (!checkQuantityOfProduct) {
            return Promise.resolve({ status: false, data: 'out of stock' });
        }
        const checkItemExists = checkCart.items.find(x => x?.productId === data?.productId);
        if (data.removeProduct === 0 && checkItemExists) {
            data['totalPrice'] = checkItemExists?.quantity * checkQuantityOfProduct?.price
            const updateCart = await this.repository.update("DELETE_PRODUCT", data);
            return Promise.resolve({ status: true, data: updateCart });
        } else if (data.removeProduct === 1 && checkItemExists) {
            if (checkItemExists.quantity === 1) {
                data['totalPrice'] = checkQuantityOfProduct?.price
                const updateCart = await this.repository.update("DELETE_PRODUCT", data);
                return Promise.resolve({ status: true, data: updateCart });
            } 
            const getQuantity = data?.quantity ?? Infinity;
            const quantity = checkItemExists?.quantity < getQuantity ? 1 : getQuantity;
            data['totalPrice'] = quantity * checkQuantityOfProduct?.price
            const updateCart = await this.repository.update("DELETE_PRODUCT_COUNT",data);
            return Promise.resolve({ status: true, data: updateCart });
        }
        return Promise.resolve({ status: false, data: 'invalid sign' });
    }
}

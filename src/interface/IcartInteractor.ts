export interface IcartInteractor {
    createCart(data:any) : Promise<any>;
    getCart(data:any) : Promise<any>;
    deleteCartItem(data:any) : Promise<any>;
    updateCartItem(data:any) : Promise<any>
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartResponse = exports.Cart = void 0;
class Cart {
    constructor(productId, quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }
}
exports.Cart = Cart;
class CartResponse {
    constructor(userId, items, totalPrice, totalItems) {
        this.userId = userId;
        this.items = items;
        this.totalPrice = totalPrice;
        this.totalItems = totalItems;
    }
}
exports.CartResponse = CartResponse;

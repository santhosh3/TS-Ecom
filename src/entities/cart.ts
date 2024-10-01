export class Cart {
    constructor(
        public readonly productId: string, 
        public readonly quantity: number,
    ) {}
}

export class CartResponse {
    constructor(
        public readonly userId: string,
        public readonly items: Cart[],
        public readonly totalPrice: number,
        public readonly totalItems: number, 
    ) {}
}
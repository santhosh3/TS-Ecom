import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the cart item
interface CartItem {
    productId: string; // productId as a string
    quantity: number;
}

// Define an interface for the cart document
interface Cart extends Document {
    userId: string; // userId as a string
    items: CartItem[];
    totalPrice: number;
    totalItems: number;
}

// Create the cart schema
const cartSchema = new Schema<Cart>(
    {
        userId: { type: String, ref: 'user', index: true, required: true, unique: true }, 
        items: [
            {
                productId: { type: String, ref: 'product', required: true }, 
                quantity: { type: Number, required: true },
            },
        ],
        totalPrice: { type: Number, required: true, default: 0 },
        totalItems: { type: Number, required: true },
    },
    { timestamps: true, versionKey: false }
);


const CartModel = mongoose.model<Cart>('Cart', cartSchema);

export { CartModel, CartItem, Cart };
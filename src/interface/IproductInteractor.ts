import { Product } from "../entities/product";

export interface IproductInteractor {
    createProduct(data: any): Promise<Product>;
    updateProduct(data: any): Promise<Product>;
    findProduct(data: any): Promise<Product>;
    findManyProducts(): Promise<Product[]>;
    deleteProduct(data: any): Promise<Product>;
}
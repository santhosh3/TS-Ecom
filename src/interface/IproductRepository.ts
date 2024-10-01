import { Product } from "../entities/product";

export interface IproductRepository {
    create(data: Product): Promise<Product>;
}

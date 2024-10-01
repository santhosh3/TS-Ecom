import { injectable } from "inversify";
import { IproductRepository } from "../interface/IproductRepository";
import { Product } from "../entities/product";

// db queries comes here
@injectable()
export class ProductRepository implements IproductRepository {
  create(data: Product): Promise<Product> {
    return Promise.resolve({name: data.name});
  }
}

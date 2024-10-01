import { inject, injectable } from "inversify";
import { Product } from "../entities/product";
import { IproductInteractor } from "../interface/IproductInteractor";
import { IproductRepository } from "../interface/IproductRepository";
import { INTERFACE_TYPE } from "../utils/appConst";

@injectable()
export class ProductInteractor implements IproductInteractor {
  private repository: IproductRepository;

  constructor(
    @inject(INTERFACE_TYPE.ProductRepository) repository: IproductRepository
  ) {
    this.repository = repository;
  }
  async createProduct(data: any): Promise<Product> {
    return this.repository.create(data);
  }
  async updateProduct(data: any): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  async findProduct(data: any): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  async findManyProducts(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  async deleteProduct(data: any): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}

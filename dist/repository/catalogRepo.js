"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogRepository = void 0;
//Here all DB queries come
class CatalogRepository {
    create(data) {
        const product = {
            name: data.name
        };
        return Promise.resolve(product);
    }
    update(data) {
        throw new Error("Method not implemented.");
    }
    find(data) {
        const product = {
            name: data.name
        };
        return Promise.resolve(product);
    }
    findMany() {
        throw new Error("Method not implemented.");
    }
    delete(data) {
        throw new Error("Method not implemented.");
    }
}
exports.CatalogRepository = CatalogRepository;

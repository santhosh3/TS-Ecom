"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const inversify_1 = require("inversify");
const cart_model_1 = require("../models/cart.model");
const grpcClient_1 = require("../extranal_libraries/grpcClient");
let grpcIP = 'localhost:50051';
// db queries comes here
let CartRepository = class CartRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const createCart = yield cart_model_1.CartModel.create(data);
            return Promise.resolve(createCart);
        });
    }
    get(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const getUserCart = yield cart_model_1.CartModel.findOne({ userId: (_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.id });
            return Promise.resolve(getUserCart);
        });
    }
    delete(data) {
        throw new Error("Method not implemented.");
    }
    getProductQuantity(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let quantity = yield (0, grpcClient_1.GetProductQuantity)(grpcIP, data.productId);
            return quantity.status ? Promise.resolve(quantity.message) : Promise.reject(quantity.message);
        });
    }
    checkProductAvailability(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const filter = {
                $and: [{ userId: (_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.id }, { 'item.productId': data.productId }]
            };
            const product = yield cart_model_1.CartModel.findOne(filter).exec();
            return Promise.resolve(product);
        });
    }
};
exports.CartRepository = CartRepository;
exports.CartRepository = CartRepository = __decorate([
    (0, inversify_1.injectable)()
], CartRepository);

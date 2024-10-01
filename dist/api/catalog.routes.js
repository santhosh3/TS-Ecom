"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catalog_service_1 = require("../services/catalog.service");
const catalogRepo_1 = require("../repository/catalogRepo");
const requestValidator_1 = require("../utils/requestValidator");
const product_dto_1 = require("../dto/product.dto");
const catalogService = new catalog_service_1.CatalogService(new catalogRepo_1.CatalogRepository());
const router = express_1.default.Router();
//endpoints
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { errors, input } = yield (0, requestValidator_1.RequestValidator)(product_dto_1.CreateProductRequest, req.body);
    if (errors) {
        return res.status(400).json({ errors });
    }
    const data = yield catalogService.createProduct(req.body);
    return res.status(200).send(data);
}));
exports.default = router;

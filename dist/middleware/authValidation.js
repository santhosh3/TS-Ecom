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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const error_1 = require("../utils/error");
const grpcClient_1 = require("../extranal_libraries/grpcClient");
let grpcIP = 'localhost:50051';
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.headers.authorization || "";
        if (token.length === 0) {
            return res.status(error_1.STATUS_CODES === null || error_1.STATUS_CODES === void 0 ? void 0 : error_1.STATUS_CODES.UN_AUTHORIZED).send({ error: "Please provide token" });
        }
        let { status, message } = yield (0, grpcClient_1.GetUserData)(grpcIP, token);
        if (!status) {
            return res.status(error_1.STATUS_CODES === null || error_1.STATUS_CODES === void 0 ? void 0 : error_1.STATUS_CODES.UN_AUTHORIZED).send({ error: message });
        }
        req.user = message;
        next();
    }
    catch (error) {
        return res.status(error_1.STATUS_CODES === null || error_1.STATUS_CODES === void 0 ? void 0 : error_1.STATUS_CODES.UN_AUTHORIZED).send({ error: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.AuthMiddleware = AuthMiddleware;

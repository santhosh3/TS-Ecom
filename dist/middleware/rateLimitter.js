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
exports.rateLimiter = void 0;
const redis_db_1 = __importDefault(require("../db/redis.db"));
const error_1 = require("../utils/error");
const RATE_LIMIT = 10;
const TIME_WINDOW = 60;
const rateLimiter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIP = req.ip;
        const currentRequests = yield redis_db_1.default.get(userIP);
        if (currentRequests && parseInt(currentRequests) >= RATE_LIMIT) {
            return res
                .status(error_1.STATUS_CODES === null || error_1.STATUS_CODES === void 0 ? void 0 : error_1.STATUS_CODES.TOO_MANY_REQUEST)
                .send({
                Status: "Request Failed",
                Body: "The API is at capacity, try again later.",
            });
        }
        yield redis_db_1.default.multi().incr(userIP).expire(userIP, TIME_WINDOW).exec();
        next();
    }
    catch (error) {
        console.error("Rate limiting error", error);
        return res.status(error_1.STATUS_CODES === null || error_1.STATUS_CODES === void 0 ? void 0 : error_1.STATUS_CODES.INTERNAL_ERROR).send("Internal Server Error");
    }
});
exports.rateLimiter = rateLimiter;

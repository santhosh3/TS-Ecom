import "reflect-metadata";
import express from "express";
import productRouter from "./routes/product.router";
import { HandleErrorWithLogger } from "./utils/error";
import { httpLogger } from "./utils/logger";
import { connectMongo } from "./db/mongo.db";
import cartRouter from "./routes/cart.router";
import { AuthMiddleware } from "./middleware/authValidation";

const app = express();
app.use(express.json());
connectMongo()
app.use(AuthMiddleware);

app.use(httpLogger);

app.use("/", productRouter);
app.use("/", cartRouter);

app.use(HandleErrorWithLogger);

export default app;

import mongoose from "mongoose";

const uri = "mongodb://admin:password@localhost:27017/";

export const connectMongo = async (): Promise<void> => {
    try {
        await mongoose.connect(uri, {});
        console.log("connected to mongo");
    } catch (error) {
        console.error("Mongo connection failed:", error);
        process.exit(1);
    }
}
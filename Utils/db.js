import mongoose from "mongoose";
import { logger } from "./logger.js";

export const dbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    logger.success("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
  }
};
 
import { redis } from "../Utils/redis.js";
import { logger } from "../Utils/logger.js";
import { TodoModel } from "./../dbmodel.js";

export const getAlltodo = async (req, res) => {
  try {
    const id = req.header("x-user-id");
    console.log(id);

    const cacheKey = "all_todo";
    const cacheData = await redis.get(cacheKey);

    if (cacheData) {
      logger.info("Serving data from Redis cache");
      return res
        .status(200)
        .json({ data: JSON.parse(cacheData), cached: true });
    }

    logger.info("Cache miss Fetching from MongoDB...");
    const data = await TodoModel.find();

    await redis.set(cacheKey, JSON.stringify(data), "EX", 60);
    logger.success("Data cached in Redis");

    res.status(200).json({ data });
  } catch (error) {
    logger.error("Error in getAlltodo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

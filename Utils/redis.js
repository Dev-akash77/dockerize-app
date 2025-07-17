import Redis from "ioredis";
import { logger } from "./logger.js";

export let redis;

export const redisConnection = async () => {
  try {
    const redisOptions = {
      maxRetriesPerRequest: 20,
      ...(process.env.NODE_ENV === "production" ? { tls: {} } : {}),
    };

    redis = new Redis(process.env.REDIS_URL, redisOptions);

    //! Log successful events
    redis.on("connect", () => {
      logger.success("Connected to Redis");
    });

    redis.on("ready", () => {
      logger.success("Redis client is ready to use");
    });

    //! Log connection-related events
    redis.on("close", () => {
      logger.warn("Redis connection closed");
    });

    redis.on("reconnecting", (delay) => {
      logger.info(`Reconnecting to Redis in ${delay} ms`);
    });

    //! Log errors
    redis.on("error", (err) => {
      logger.error("Redis error:", err);
    });
  } catch (error) {
    logger.error("Redis connection error:", error);
  }
};

import express from "express";
import { dbConnect } from "./Utils/db.js";
import { redis, redisConnection } from "./Utils/redis.js";
import "dotenv/config";
import { todoRouter } from "./Routes/todo.js";
import cors from "cors";
import { logger } from "./Utils/logger.js";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";

// ! connection cloud and local
dbConnect();
redisConnection();

// ! rate limitar using redis

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
  }),
  message: {
    status: 429,
    error: "Too many requests, please try again later.",
  },
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todo", limiter);
app.use("/todo", todoRouter);
 
//! Start server
app.listen(process.env.PORT || 3001, () => {
  logger.info("Server is running on port " + process.env.PORT);
});

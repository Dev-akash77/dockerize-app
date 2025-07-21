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
  windowMs: 5 * 60 * 1000,  //* 5 miniute for production use 15 miniute
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

// app.use("/api/todo", limiter);
app.use("/api/task", todoRouter);
 
//! Start server
app.listen(process.env.PORT || 3001, () => {
  logger.info("Server is running on port " + process.env.PORT);
});

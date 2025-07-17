import express from "express";
import { dbConnect } from "./Utils/db.js";
import { redisConnection } from "./Utils/redis.js";
import "dotenv/config";
import { todoRouter } from "./Routes/todo.js";
import cors from 'cors';
import { logger } from "./Utils/logger.js";
dbConnect();
redisConnection();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todo", todoRouter);

// Start server
app.listen(process.env.PORT || 5000, () => {
  logger.info("Server is running on port " + process.env.PORT);
});

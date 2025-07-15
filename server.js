const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./dbmodel.js");

dotenv.config();

const app = express();
app.use(express.json());

// ! redis connect
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL, {
  tls: {},             
  maxRetriesPerRequest: 20,
});
 

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("ready", () => {
  console.log("Redis client is ready to use");
});

redis.on("close", () => {
  console.log("Redis connection closed");
});

redis.on("reconnecting", (delay) => {
  console.log(`Reconnecting to Redis in ${delay} ms`);
});

// ! data base congigaraion
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));

app.get("/", async (req, res) => {
  try {
    const cachekey= "all_user";
    const cache_data = await redis.get(cachekey);

    if (cache_data) {
       return res.status(200).json({cache_data:JSON.parse(cache_data)});
    }
    const users = await User.find();
    await redis.set(cachekey, JSON.stringify(users), "EX", 60);
    res.status(200).json(users); 
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ports ${PORT}`);
});

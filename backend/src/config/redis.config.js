import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();

/*
  Redis is an OPTIONAL cache. The API must still boot and serve requests
  (straight from MongoDB) when Redis is missing, slow or down — so we never
  `await` the connection at import time (that blocks server start-up forever
  when the host is unreachable).
*/

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 5000,
    // Back off, then give up after ~10 attempts instead of retrying forever.
    reconnectStrategy: (retries) => (retries > 10 ? false : retries * 300),
  },
});

redisClient.on("connect", () => {
  console.log("🟢 Redis Connecting...");
});

redisClient.on("ready", () => {
  console.log("✅ Redis Connected");
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err.message);
});

if (process.env.REDIS_URL) {
  redisClient.connect().catch(() => {
    console.log("Redis unavailable. Continuing without cache.");
  });
} else {
  console.log("REDIS_URL not set. Continuing without cache.");
}

export default redisClient;

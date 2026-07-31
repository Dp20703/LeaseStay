import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
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

try {
  await redisClient.connect();
} catch (err) {
  console.log("Redis unavailable. Continuing without cache.");
}

export default redisClient;

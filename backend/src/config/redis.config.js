import { createClient } from "redis";

const REDIS_URL =
  process.env.REDIS_URL ||
  (process.env.NODE_ENV === "development" ? "redis://localhost:6379" : null);

let redisClient = null;

if (REDIS_URL) {
  redisClient = createClient({
    url: REDIS_URL,
  });

  redisClient.on("error", (err) => {
    console.error("Redis Error❌:", err.message);
  });

  try {
    await redisClient.connect();
    console.log("✅ Redis Connected");
  } catch (error) {
    console.log("⚠️ Redis unavailable. Continuing without Redis.");
  }
}

export default redisClient;

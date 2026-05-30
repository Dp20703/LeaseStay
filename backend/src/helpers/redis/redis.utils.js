import redisClient from "../../config/redis.config.js";

/* ─────────────────────────────────────────────
   GET CACHE
───────────────────────────────────────────── */

export const getCache = async (key) => {
  const cachedData = await redisClient.get(key);

  if (!cachedData) {
    return null;
  }

  return JSON.parse(cachedData);
};

/* ─────────────────────────────────────────────
   SET CACHE
───────────────────────────────────────────── */

export const setCache = async (key, data, expirationInSeconds = 300) => {
  await redisClient.set(key, JSON.stringify(data), {
    EX: expirationInSeconds,
  });
};

/* ─────────────────────────────────────────────
   DELETE CACHE
───────────────────────────────────────────── */

export const deleteCache = async (key) => {
  await redisClient.del(key);
};

/* ─────────────────────────────────────────────
   DELETE MULTIPLE CACHE KEYS
───────────────────────────────────────────── */

export const deleteCacheByPattern = async (pattern) => {
  const keys = await redisClient.keys(pattern);

  if (keys.length) {
    await redisClient.del(keys);
  }
};

import redisClient from "../../config/redis.config.js";

/*
  All cache helpers are FAIL-SAFE: if Redis is down or slow the app keeps
  working straight from MongoDB instead of returning 500s.
*/

const isReady = () => redisClient.isReady;

/* ─────────────────────────────────────────────
   GET CACHE
───────────────────────────────────────────── */

export const getCache = async (key) => {
  if (!isReady()) return null;

  try {
    const cachedData = await redisClient.get(key);

    if (!cachedData) {
      return null;
    }

    return JSON.parse(cachedData);
  } catch (error) {
    console.error(`Cache read failed (${key}):`, error.message);
    return null;
  }
};

/* ─────────────────────────────────────────────
   SET CACHE
───────────────────────────────────────────── */

export const setCache = async (key, data, expirationInSeconds = 300) => {
  if (!isReady()) return;

  try {
    await redisClient.set(key, JSON.stringify(data), {
      EX: expirationInSeconds,
    });
  } catch (error) {
    console.error(`Cache write failed (${key}):`, error.message);
  }
};

/* ─────────────────────────────────────────────
   DELETE CACHE
───────────────────────────────────────────── */

export const deleteCache = async (key) => {
  if (!isReady()) return;

  try {
    await redisClient.del(key);
  } catch (error) {
    console.error(`Cache delete failed (${key}):`, error.message);
  }
};

/* ─────────────────────────────────────────────
   DELETE MULTIPLE CACHE KEYS
   Uses SCAN (non-blocking) instead of KEYS.
───────────────────────────────────────────── */

export const deleteCacheByPattern = async (pattern) => {
  if (!isReady()) return;

  try {
    const keys = [];

    for await (const key of redisClient.scanIterator({
      MATCH: pattern,
      COUNT: 100,
    })) {
      // node-redis v5+/v6 may yield arrays of keys per iteration
      if (Array.isArray(key)) keys.push(...key);
      else keys.push(key);
    }

    if (keys.length) {
      await redisClient.del(keys);
    }
  } catch (error) {
    console.error(`Cache pattern delete failed (${pattern}):`, error.message);
  }
};

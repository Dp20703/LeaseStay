import dotenv from "dotenv";
dotenv.config();

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";

import redisClient from "./config/redis.config.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";

const app = express();

/* SECURITY */

app.use(helmet());
app.use(compression());

/* LOGGGING */
app.use(morgan("dev"));

/* RATE LIMIT */

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: "Too many requests from this IP, please try again later.",
  // ADD THIS LINE to skip CORS preflight requests:
  skip: (req) => req.method === "OPTIONS",
});

// Apply to all /api/v1 routes
app.use("/api/v1", apiLimiter);

/* CORS */

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

/* BODY */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ROUTES */
app.use("/api/v1", routes);

/* ERROR */
app.use(errorMiddleware);

/* NOT FOUND */
app.use(notFoundMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LeaseStay API is running successfully",
  });
});

app.get("/redis-test", async (req, res) => {
  await redisClient.set("name", "LeaseStay");

  const value = await redisClient.get("name");

  res.json({
    value,
  });
});

export default app;

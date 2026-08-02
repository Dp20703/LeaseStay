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

const parseOrigins = (value = "") =>
  value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://leasestay.vercel.app",
];

const allowedOrigins = Array.from(
  new Set([
    ...DEFAULT_ALLOWED_ORIGINS,
    ...parseOrigins(process.env.CLIENT_URL),
    ...parseOrigins(process.env.CLIENT_URLS),
  ]),
);

app.use(
  cors({
    origin: (origin, callback) => {
      // No Origin header = same-origin, server-to-server, curl, Postman, etc. Allow it.
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`CORS blocked request from origin: ${origin}`);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

/* BODY */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* HEALTH / DEBUG ROUTES */
/* Moved above the route mounting + 404/error handlers below — see note. */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LeaseStay API is running successfully",
  });
});

if (process.env.NODE_ENV !== "production") {
  app.get("/redis-test", async (req, res) => {
    await redisClient.set("name", "LeaseStay");

    const value = await redisClient.get("name");

    res.json({
      value,
    });
  });
}

/* ROUTES */
app.use("/api/v1", routes);

/* NOT FOUND */
app.use(notFoundMiddleware);

/* ERROR */
app.use(errorMiddleware);

export default app;

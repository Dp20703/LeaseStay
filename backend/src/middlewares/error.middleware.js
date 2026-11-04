import multer from "multer";

export const errorMiddleware = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;

  let message = error.message || "Internal Server Error";

  let errors = Array.isArray(error.errors) ? error.errors : [];

  // MONGOOSE VALIDATION ERROR

  if (error.name === "ValidationError") {
    statusCode = 400;

    errors = Object.values(error.errors).map((err) => ({
      field: err.path,
      message: err.message,
    }));

    message = "Validation failed";
  }

  // DUPLICATE KEY ERROR

  if (error.code === 11000) {
    statusCode = 400;

    const field = Object.keys(error.keyValue)[0];

    errors = [
      {
        field,
        message: `${field} already exists`,
      },
    ];

    message = "Duplicate field";
  }

  // INVALID OBJECT ID / CAST ERROR (e.g. /bookings/not-an-id)

  if (error.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${error.path || "value"}`;
  }

  // MALFORMED JSON BODY

  if (error.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Malformed JSON in request body";
  }

  // MULTER ERRORS

  if (error instanceof multer.MulterError) {
    statusCode = 400;

    if (error.code === "LIMIT_FILE_SIZE") {
      message = "File size is too large";
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      message = "Too many files uploaded";
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      message = "Invalid file field";
    }
  }

  if (statusCode >= 500) {
    console.error("GLOBAL ERROR:", error);

    // Never leak internals (stack hints, DB messages) to clients in production.
    if (process.env.NODE_ENV === "production") {
      message = "Internal Server Error";
    }
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

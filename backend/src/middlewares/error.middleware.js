import multer from "multer";

export const errorMiddleware = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;

  let message = error.message || "Internal Server Error";

  let errors = [];

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

  console.log("GLOBAL ERROR:", error);
  console.log("GLOBAL ERROR:", [error]);

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

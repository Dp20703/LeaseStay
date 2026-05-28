export const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  let validationErrors = [];

  /* VALIDATION ERRORS */

  try {
    validationErrors = JSON.parse(error.message);
  } catch {
    validationErrors = [];
  }

  return res.status(statusCode).json({
    success: false,
    message: validationErrors.length
      ? "Validation failed"
      : error.message || "Internal Server Error",
    errors: validationErrors,
  });
};

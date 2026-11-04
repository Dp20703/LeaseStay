class ApiError extends Error {
  /**
   * @param {number} statusCode HTTP status
   * @param {string} message    Human readable message
   * @param {Array<{field: string, message: string}>} [errors] Field-level errors
   */
  constructor(statusCode, message, errors = []) {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export default ApiError;

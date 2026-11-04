import { validationResult } from "express-validator";
import ApiError from "../helpers/ApiError.js";

/**
 * Runs express-validator chains and forwards a 400 with a field-level
 * `errors` array: [{ field, message }].
 *
 * NOTE: request bodies are intentionally NOT logged here — they contain
 * passwords and tokens.
 */
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const result = validationResult(req);

    if (result.isEmpty()) {
      return next();
    }

    // One entry per field (first message wins) so the UI can show it inline.
    const seen = new Set();
    const errors = [];

    for (const error of result.array()) {
      const field = error.path || "body";

      if (seen.has(field)) continue;
      seen.add(field);

      errors.push({ field, message: error.msg });
    }

    return next(new ApiError(400, errors[0].message, errors));
  };
};

export default validate;

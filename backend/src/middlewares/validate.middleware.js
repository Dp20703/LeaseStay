import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

const validate = (validations) => {
  return async (req, res, next) => {
    console.log("BEFORE VALIDATION REQ BODY:", req.body);
    console.log("BEFORE VALIDATION REQ FILES:", req.files);
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(
        new ApiError(
          400,
          JSON.stringify(
            errors.array().map((error) => ({
              field: error.path,
              message: error.msg,
            })),
          ),
        ),
      );
    }

    next();
  };
};

export default validate;

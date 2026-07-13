export const formatValidationErrors = (errors: any[]) => {
  return Object.fromEntries(errors.map((err) => [err.field, err.message]));
};

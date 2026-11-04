/**
 * Converts the backend `errors: [{ field, message }]` array into a
 * `{ [field]: message }` map. Safe for undefined / non-array input.
 */
export const formatValidationErrors = (
  errors?: { field: string; message: string }[] | null,
): Record<string, string> => {
  if (!Array.isArray(errors)) return {};

  return Object.fromEntries(errors.map((err) => [err.field, err.message]));
};

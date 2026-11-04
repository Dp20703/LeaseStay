export const getErrorMessage = (
  error: any,
  fallback = "Something went wrong",
): string => {
  const data = error?.response?.data;

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    const first = data.errors[0];

    if (first?.message) return String(first.message);
  }

  if (typeof data?.message === "string" && data.message) {
    return data.message;
  }

  if (error?.code === "ERR_NETWORK") {
    return "Cannot reach the server. Please check your connection.";
  }

  return fallback;
};

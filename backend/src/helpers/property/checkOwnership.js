const checkPropertyOwnership = (property, user) => {
  if (!property.owner?.equals(user._id) && user.role !== ROLES.ADMIN) {
    throw new ApiError(403, "Unauthorized access");
  }
};

export default checkPropertyOwnership;

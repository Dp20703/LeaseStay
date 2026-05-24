import User from "../models/user.model.js";
import Property from "../models/property.model.js";
import { ROLES } from "../constants/role.constants.js";

// FETCH ALL USERS
export const fetchAllUsersService = async () => {
  return await User.find({ role: ROLES.USER })
    .select("-password")
    .sort({ createdAt: -1 });
};

// FETCH ALL OWNERS
export const fetchAllOwnersService = async () => {
  return await User.find({ role: ROLES.OWNER })
    .select("-password")
    .sort({ createdAt: -1 });
};

// FETCH ALL PROPERTIES
export const fetchAllPropertiesService = async () => {
  return await Property.find()
    .populate("owner", "userName email fullName profileImage")
    .sort({ createdAt: -1 });
};

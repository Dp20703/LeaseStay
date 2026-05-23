import User from "../models/user.model.js";
import Property from "../models/property.model.js";
import ApiError from "../utils/errors/ApiError.js";

// FETCH ALL USERS
export const fetchAllUsersService=async()=>{
return await User.find({role:"user"}).select("-password").sort({createdAt:-1});
};

// FETCH ALL SELLERS
export const fetchAllSellersService=async()=>{
return await User.find({role:"seller"}).select("-password").sort({createdAt:-1});
};

// FETCH ALL PROPERTIES
export const fetchAllPropertiesService=async()=>{
return await Property.find().populate("seller","userName email fullName profileImage").sort({createdAt:-1});
};
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import sendToken from "../utils/sendToken.js";
import {fetchAllUsersService,fetchAllSellersService,fetchAllPropertiesService}from "../services/admin.service.js";


// FETCH ALL USERS
export const fetchAllUsers=asyncHandler(async(req,res)=>{
const users=await fetchAllUsersService();

return res.status(200).json(
new ApiResponse(200,"Users fetched successfully",users)
);
});

// FETCH ALL SELLERS
export const fetchAllSellers=asyncHandler(async(req,res)=>{
const sellers=await fetchAllSellersService();

return res.status(200).json(
new ApiResponse(200,"Sellers fetched successfully",sellers)
);
});

// FETCH ALL PROPERTIES
export const fetchAllProperties=asyncHandler(async(req,res)=>{
const properties=await fetchAllPropertiesService();

return res.status(200).json(
new ApiResponse(200,"Properties fetched successfully",properties)
);
});
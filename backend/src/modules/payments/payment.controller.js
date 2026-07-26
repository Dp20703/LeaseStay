import * as paymentService from "./payment.service.js";
import { asyncHandler, ApiResponse } from "../../helpers/index.js";

export const createOrder = asyncHandler(async (req, res) => {
  const result = await paymentService.createOrder(
    req.user._id,
    req.body.bookingId,
  );

  return res
    .status(201)
    .json(new ApiResponse(201, "Order created successfully", result));
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const result = await paymentService.verifyPayment(req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, "Payment verified successfully", result));
});

export const getMyPayments = asyncHandler(async (req, res) => {
  const payments = await paymentService.getMyPayments(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Payments fetched successfully", payments));
});

export const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await paymentService.getPaymentById(
    req.params.paymentId,
    req.user,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Payment fetched successfully", payment));
});

export const getPropertyPayments = asyncHandler(async (req, res) => {
  const payments = await paymentService.getPropertyPayments(
    req.params.propertyId,
    req.user._id,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Property payments fetched successfully", payments),
    );
});

export const refundPayment = asyncHandler(async (req, res) => {
  const payment = await paymentService.refundPayment(req.params.paymentId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Refund initiated successfully", payment));
});

export const getPaymentStats = asyncHandler(async (req, res) => {
  const stats = await paymentService.getPaymentStats();

  return res
    .status(200)
    .json(new ApiResponse(200, "Payment stats fetched", stats));
});

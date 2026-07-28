import { ApiResponse, asyncHandler } from "../../helpers/index.js";

import * as OwnerService from "./services/index.js";

/* ─────────────────────────────────────────────
   OWNER DASHBOARD
───────────────────────────────────────────── */

export const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await OwnerService.getDashboardService(req.user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Owner dashboard fetched successfully", dashboard),
    );
});

// PAYMENTS

export const getOwnerPayments = asyncHandler(async (req, res) => {
  const payments = await OwnerService.getOwnerPaymentsService(req.user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Owner payments fetched successfully", payments),
    );
});

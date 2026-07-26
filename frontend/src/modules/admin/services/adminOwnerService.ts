import api from "@/core/api/axios";

import type { IOwner } from "../types/owners.types";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

export interface OwnersResponse {
  data: IOwner[];
}

export interface OwnerResponse {
  data: IOwner;
}

/* ─────────────────────────────────────────────
   OWNER API
───────────────────────────────────────────── */

const adminOwnerService = {
  /* ALL OWNERS */

  getOwners: async (): Promise<IOwner[]> => {
    const { data } = await api.get<OwnersResponse>("/admin/owners");

    return data.data;
  },

  /* PENDING OWNER VERIFICATIONS */

  getPendingOwnerVerifications: async (): Promise<IOwner[]> => {
    const { data } = await api.get<OwnersResponse>(
      "/admin/owner-verifications/pending",
    );

    return data.data;
  },

  /* APPROVE OWNER */

  approveOwnerVerification: async (userId: string): Promise<IOwner> => {
    const { data } = await api.patch<OwnerResponse>(
      `/admin/owner-verifications/${userId}/approve`,
    );

    return data.data;
  },

  /* REJECT OWNER */

  rejectOwnerVerification: async (
    userId: string,
    reason: string,
  ): Promise<IOwner> => {
    const { data } = await api.patch<OwnerResponse>(
      `/admin/owner-verifications/${userId}/reject`,
      {
        reason,
      },
    );

    return data.data;
  },
};

export default adminOwnerService;

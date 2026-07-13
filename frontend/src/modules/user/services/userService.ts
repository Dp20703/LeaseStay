import api from "@/core/api/axios";
import type { User } from "@/types/entities/user.types";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

// export interface userResponse {
//   user: User;
//   token: string;
// }

/* ─────────────────────────────────────────────
   USER API
───────────────────────────────────────────── */

const userAPI = {
  /* APPLY OWNER */

  applyForOwner: async (formData) => {
    const response = await api.post("/users/apply-owner", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data;
  },
};

export default userAPI;

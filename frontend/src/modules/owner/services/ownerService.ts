import api from "@/core/api/axios";

const ownerAPI = {
  /* APPLY OWNER */
  applyForOwner: async (formData: FormData) => {
    const response = await api.post("/users/become-owner", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default ownerAPI;

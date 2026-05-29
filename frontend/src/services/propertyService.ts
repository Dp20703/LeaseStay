import api from "./axios";
import type { Property } from "@/types/entities/property.types";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

export interface PropertyResponse {
  properties: Property[];

  pagination: {
    totalProperties: number;
    currentPage: number;
    resultPerPage: number;
    totalPages: number;
  };
}

/* ─────────────────────────────────────────────
   PROPERTY API
───────────────────────────────────────────── */

const propertyAPI = {
  /* GET + SEARCH + FILTER */

  getProperties: async (params?: Record<string, string | number>) => {
    const response = await api.get("/properties", {
      params,
    });

    return response.data;
  },

  /* GET SINGLE */

  getSingleProperty: async (slug: string) => {
    const response = await api.get(`/properties/${slug}`);

    return response.data;
  },

  /* CREATE */

  createProperty: async (formData: FormData) => {
    const response = await api.post("/properties", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  /* UPDATE */

  updateProperty: async (id: string, formData: FormData) => {
    const response = await api.patch(`/properties/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  /* DELETE */

  deleteProperty: async (id: string) => {
    const response = await api.delete(`/properties/${id}`);

    return response.data;
  },

  /* SAVE PROPERTY */

  saveProperty: async (id: string) => {
    const response = await api.post(`/properties/${id}/save`);

    return response.data;
  },

  /* UNSAVE PROPERTY */

  unsaveProperty: async (id: string) => {
    const response = await api.delete(`/properties/${id}/save`);

    return response.data;
  },

  /* FEATURED PROPERTIES */

  getFeaturedProperties: async () => {
    const {data} = await api.get("/properties/featured");

    return data;
  },

  /* SAVED PROPERTIES */
 
  getSavedProperties: async () => {
    const {data} = await api.get("users/saved-properties");

    return data;
  },

  /* OWNER PROPERTIES */

  getOwnerProperties: async () => {
    const { data } = await api.get("/properties/owner/properties");

    return data;
  },

  /* CONTACT PROPERTY OWNER */

  contactOwner: async (id: string, message: string) => {
    const response = await api.post(`/properties/${id}/contact-owner`, {
      message,
    });

    return response.data;
  },
};

export default propertyAPI;

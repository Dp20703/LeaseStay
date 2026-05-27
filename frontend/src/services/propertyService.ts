import api from "./axios";
import type { Property } from "@/types/entities/property.types";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

export interface PropertyResponse {
  properties: Property[];
  total: number;
  page: number;
  totalPages: number;
}

/* ─────────────────────────────────────────────
   PROPERTY API
───────────────────────────────────────────── */

const propertyAPI = {
  // GET ALL
  getAllProperties: async () => {
    const response = await api.get("/properties/");
    console.log("getAllProperties Property API res:",response)
    return response.data;
  },

  // GET SINGLE
  getSingleProperty: async (id: string) => {
    const response = await api.get(
      `/properties/${id}`,
    );

    return response.data;
  },

  // SEARCH
  searchProperties: async (
    params: URLSearchParams,
  ) => {
    const response = await api.get(
      `/properties?${params.toString()}`,
    );

    return response.data;
  },

  // CREATE
  createProperty: async (
    formData: FormData,
  ) => {
    const response = await api.post(
      "/properties/create",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );

    return response.data;
  },

  // UPDATE
  updateProperty: async (
    id: string,
    formData: FormData,
  ) => {
    const response = await api.put(
      `/properties/${id}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );

    return response.data;
  },

  // DELETE
  deleteProperty: async (id: string) => {
    const response = await api.delete(
      `/properties/${id}`,
    );

    return response.data;
  },

  // OWNER PROPERTIES
  getOwnerProperties: async () => {
    const response = await api.get(
      "/properties/owner/my-properties",
    );

    return response.data;
  },
};

export default propertyAPI;
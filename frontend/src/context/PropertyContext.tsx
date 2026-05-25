import { createContext, useEffect, useState, ReactNode } from "react";
import propertyAPI from "@/services/propertyService";
import type { Property } from "@/types/entities/property.types";

interface PropertyContextType {
  properties: Property[];

  property: Property | null;

  loading: boolean;

  fetchProperties: (params?: Record<string, string | number>) => Promise<void>;

  fetchSingleProperty: (id: string) => Promise<void>;

  createProperty: (formData: FormData) => Promise<void>;

  updateProperty: (id: string, formData: FormData) => Promise<void>;

  deleteProperty: (id: string) => Promise<void>;

  searchProperties: (params: URLSearchParams) => Promise<void>;
}

export const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined,
);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([]);

  const [property, setProperty] = useState<Property | null>(null);

  const [loading, setLoading] = useState(false);

  /* ─────────────────────────────────────────────
     FETCH ALL
  ───────────────────────────────────────────── */

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const response = await propertyAPI.getAllProperties();

      setProperties(response.data.properties);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────
     FETCH SINGLE
  ───────────────────────────────────────────── */

  const fetchSingleProperty = async (id: string) => {
    try {
      setLoading(true);

      const response = await propertyAPI.getSingleProperty(id);

      setProperty(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────
     CREATE
  ───────────────────────────────────────────── */

  const createProperty = async (formData: FormData) => {
    try {
      setLoading(true);

      await propertyAPI.createProperty(formData);

      await fetchProperties();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────
     UPDATE
  ───────────────────────────────────────────── */

  const updateProperty = async (id: string, formData: FormData) => {
    try {
      setLoading(true);

      await propertyAPI.updateProperty(id, formData);

      await fetchSingleProperty(id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────
     DELETE
  ───────────────────────────────────────────── */

  const deleteProperty = async (id: string) => {
    try {
      setLoading(true);

      await propertyAPI.deleteProperty(id);

      setProperties((prev) => prev.filter((property) => property._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────
     SEARCH
  ───────────────────────────────────────────── */

  const searchProperties = async (params: URLSearchParams) => {
    try {
      setLoading(true);

      const response = await propertyAPI.searchProperties(params);

      setProperties(response.data.properties);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        property,
        loading,

        fetchProperties,
        fetchSingleProperty,
        createProperty,
        updateProperty,
        deleteProperty,
        searchProperties,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

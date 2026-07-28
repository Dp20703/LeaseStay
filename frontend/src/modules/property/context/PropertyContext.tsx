import propertyAPI from "@/modules/property/services/propertyService";
import type { Property } from "@/modules/property/types";
import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";

interface PropertyContextType {
  properties: Property[];
  featuredProperties: Property[];
  ownerProperties: Property[];
  savedProperties: Property[];
  property: Property | null;
  loading: boolean;
  fetchProperties: (params?: Record<string, string | number>) => Promise<void>;
  fetchSingleProperty: (slug: string) => Promise<void>;
  createProperty: (formData: FormData) => Promise<any>;
  updateProperty: (id: string, formData: FormData) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  getFeaturedProperties: () => Promise<Property[]>;
  saveProperty: (property: Property) => Promise<void>;
  unsaveProperty: (id: string) => Promise<void>;
  trackPropertyShareCount: (id: string) => Promise<void>;
  contactOwner: (id: string, message: string) => Promise<any>;
  getOwnerProperties: () => Promise<Property[]>;
  getSavedProperties: () => Promise<void>;
}

export const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined,
);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [ownerProperties, setOwnerProperties] = useState<Property[]>([]);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [property, setProperty] = useState<Property | null>(null);

  const [loading, setLoading] = useState(false);

  /* GET + SEARCH + FILTER */

  const fetchProperties = async (params = {}) => {
    try {
      setLoading(true);

      const response = await propertyAPI.getProperties(params);

      setProperties(response.data.properties);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* SINGLE */

  const fetchSingleProperty = async (slug: string) => {
    try {
      setLoading(true);

      const response = await propertyAPI.getSingleProperty(slug);

      setProperty(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* CREATE */

  const createProperty = async (formData: FormData) => {
    try {
      setLoading(true);

      const response = await propertyAPI.createProperty(formData);

      setProperty(response.data);

      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* UPDATE */

  const updateProperty = async (id: string, formData: FormData) => {
    try {
      setLoading(true);

      const response = await propertyAPI.updateProperty(id, formData);

      setProperty(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* DELETE */

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

  /* SAVE PROPERTY */

  const saveProperty = async (propertyData: Property) => {
    try {
      const response = await propertyAPI.saveProperty(propertyData._id);

      setSavedProperties((prev) => {
        const exists = prev.some((item) => item._id === propertyData._id);

        if (exists) return prev;

        return [...prev, propertyData];
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /* UNSAVE PROPERTY */

  /* UNSAVE PROPERTY */

  const unsaveProperty = async (id: string) => {
    try {
      const response = await propertyAPI.unsaveProperty(id);

      setSavedProperties((prev) => prev.filter((item) => item._id !== id));

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /* RELATED PROPERTIES */

  const getRelatedProperties = async (propertyId: string) => {
    try {
      setLoading(true);

      const response = await propertyAPI.getRelatedProperties(propertyId);

      return response.data;
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* FEATURE PROPERTIES */

  const getFeaturedProperties = async () => {
    try {
      setLoading(true);

      const response = await propertyAPI.getFeaturedProperties();

      setFeaturedProperties(response.data);

      return response.data;
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* SAVED PROPERTIES */

  const getSavedProperties = async () => {
    const response = await propertyAPI.getSavedProperties();

    setSavedProperties(response.data);
  };

  /* OWNER PROPERTIES */

  const getOwnerProperties = async () => {
    try {
      setLoading(true);

      const response = await propertyAPI.getOwnerProperties();

      setOwnerProperties(response.data);

      return response.data;
    } catch (error) {
      console.log("OWNER PROPERTY ERROR:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* CONTACT OWNER */

  const contactOwner = async (id: string, message: string) => {
    const response = await propertyAPI.contactOwner(id, message);

    return response;
  };

  /* TRACK PROPERTY SHARE COUNT */
  const trackPropertyShareCount = async (propertyId: string) => {
    try {
      await propertyAPI.trackPropertyShareCount(propertyId);
    } catch (error) {
      console.log("Share Count Error:", error);
    }
  };

  useEffect(() => {
    getSavedProperties().catch(console.error);
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        featuredProperties,
        savedProperties,
        ownerProperties,
        property,
        loading,

        fetchProperties,
        fetchSingleProperty,

        createProperty,
        updateProperty,
        deleteProperty,
        getFeaturedProperties,
        getRelatedProperties,
        getSavedProperties,

        saveProperty,
        unsaveProperty,

        trackPropertyShareCount,

        contactOwner,
        getOwnerProperties,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

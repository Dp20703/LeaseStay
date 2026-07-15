import { useContext } from "react";
import { PropertyContext } from "@/modules/property/context/PropertyContext";

export const useProperty = () => {
  const context = useContext(PropertyContext);

  if (!context) {
    throw new Error("useProperty must be used inside PropertyProvider");
  }

  return context;
};

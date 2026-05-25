import { PropertyContext } from "@/context/PropertyContext";
import { useContext } from "react";

export const useProperty = () => {
  const context = useContext(PropertyContext);

  if (!context) {
    throw new Error("useProperty must be used inside PropertyProvider",
    );
  }

  return context;
};
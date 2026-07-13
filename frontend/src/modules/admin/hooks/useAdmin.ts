import { AdminContext } from "@/modules/admin/context/AdminContext";
import { useContext } from "react";

export const useAdmin = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }

  return context;
};

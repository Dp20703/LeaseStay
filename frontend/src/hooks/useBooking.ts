import { AuthContext } from "@/context/AuthContext";
import { BookingContext } from "@/context/BookingContext";
import { useContext } from "react";

export const useBooking = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return context;
};

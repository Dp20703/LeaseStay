import { AuthContext } from "@/modules/auth/context/AuthContext";
import { BookingContext } from "@/modules/booking/context/BookingContext";
import { useContext } from "react";

export const useBooking = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return context;
};

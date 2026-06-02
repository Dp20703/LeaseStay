import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import bookingAPI from "@/services/bookingService";
import type { Booking } from "@/types/entities/booking.types";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

interface BookingContextType {
  booking: Booking | null;
  loading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  getMyBookings: (data: RegisterFormData) => Promise<void>;
  googleBooking: (credential: string) => Promise<void>;
  getMyBookings: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  setBookings: React.Dispatch<React.SetStateAction<Booking | null>>;
}

interface BookingProviderProps {
  children: ReactNode;
}

/* ─────────────────────────────────────────────
   CONTEXT
───────────────────────────────────────────── */

export const BookingContext = createContext<BookingContextType | undefined>(
  undefined,
);

/* ─────────────────────────────────────────────
   PROVIDER
───────────────────────────────────────────── */

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  /* Create Booking */

  const createBooking = async (bookingData) => {
    try {
      setLoading(true);
      console.log(bookingData);
      const response = await bookingAPI.createBooking(bookingData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Create Booking Context Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* Fetch My Bookings */

  const getMyBookings = async () => {
    try {
      setLoading(true);

      const response = await bookingAPI.getMyBookings();
      console.log(response);
      setBookings(response.data);

      return response.data;
    } catch (error) {
      console.log("My Bookings Context Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const values: BookingContextType = {
    bookings,
    createBooking,
    getMyBookings,

    loading,
  };

  return (
    <BookingContext.Provider value={values}>{children}</BookingContext.Provider>
  );
};

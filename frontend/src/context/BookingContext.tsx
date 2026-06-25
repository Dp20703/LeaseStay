import { createContext, useState } from "react";
import type { ReactNode } from "react";
import bookingAPI from "@/services/bookingService";
import type { Booking } from "@/types/entities/booking.types";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

interface BookingContextType {
  bookings: Booking[];
  booking: Booking | null;
  loading: boolean;
  createBooking: (bookingData: any) => Promise<any>;
  getMyBookings: () => Promise<any>;
  getSingleBooking: (bookingId: string) => Promise<any>;
  cancelBooking: (bookingId: string) => Promise<any>;
  getOwnerBookingRequests: () => Promise<any>;
  acceptBooking: (bookingId: string) => Promise<any>;
  rejectBooking: (bookingId: string, reason?: string) => Promise<any>;
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
  const [booking, setBooking] = useState<Booking | null>(null);
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

  /* Get Single Booking*/

  const getSingleBooking = async (bookingId: string) => {
    try {
      setLoading(true);

      const response = await bookingAPI.getSingleBooking(bookingId);

      setBooking(response.data);

      return response.data;
    } catch (error) {
      console.log("Get Booking Error:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* Cancel Booking*/

  const cancelBooking = async (bookingId: string) => {
    try {
      setLoading(true);

      const response = await bookingAPI.cancelBooking(bookingId);

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? response.data : booking,
        ),
      );

      return response.data;
    } catch (error) {
      console.log("Cancel Booking Error:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* Owner Requests */

  const getOwnerBookingRequests = async () => {
    try {
      setLoading(true);

      const response = await bookingAPI.getOwnerBookingRequests();

      setBookings(response.data);

      return response.data;
    } catch (error) {
      console.log("Owner Requests Error:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* Accept Booking*/

  const acceptBooking = async (bookingId: string) => {
    try {
      setLoading(true);

      const response = await bookingAPI.acceptBooking(bookingId);

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? response.data : booking,
        ),
      );

      return response.data;
    } catch (error) {
      console.log("Accept Booking Error:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* Reject Booking*/

  const rejectBooking = async (bookingId: string, reason = "") => {
    try {
      setLoading(true);

      const response = await bookingAPI.rejectBooking(bookingId, reason);

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? response.data : booking,
        ),
      );

      return response.data;
    } catch (error) {
      console.log("Reject Booking Error:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  };
  const values: BookingContextType = {
    bookings,
    booking,

    loading,

    createBooking,
    getMyBookings,
    getSingleBooking,
    cancelBooking,

    getOwnerBookingRequests,
    acceptBooking,
    rejectBooking,
  };

  return (
    <BookingContext.Provider value={values}>{children}</BookingContext.Provider>
  );
};

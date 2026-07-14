import React, { useEffect } from "react";
import LoaderScreen from "@/shared/components/common/LoaderScreen";
import BookingCard from "@/modules/booking/components/BookingCard";
import { useBooking } from "@/modules/booking/hooks/useBooking";

const OwnerBookingRequestsPage = () => {
  const { loading, bookings, getOwnerBookingRequests } = useBooking();
  console.log(bookings);

  useEffect(() => {
    getOwnerBookingRequests();
  }, []);

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <section className="ls-container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Bookings Requests</h1>

        <p className="text-muted-foreground mt-2">
          Track all your booking requests and their status.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="ls-card p-10 text-center">
          <h2 className="text-xl font-semibold">No Bookings Found</h2>

          <p className="text-muted-foreground mt-2">
            You haven't made any booking requests yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} isOwnerView />
          ))}
        </div>
      )}
    </section>
  );
};

export default OwnerBookingRequestsPage;

import api from "./axios";

const bookingAPI = {
  // Create Booking
  createBooking: async (bookingData) => {
    const response = await api.post("/bookings", bookingData);

    console.log(response);
    return response.data;
  },

  // Get My Bookings

  getMyBookings: async () => {
    const response = await api.get("/bookings/my-bookings");

    return response.data;
  },

  // Cancel Booking

  cancelBooking: async (bookingId) => {
    const response = await api.patch(`/bookings/${bookingId}/cancel`);

    return response.data;
  },
};

export default bookingAPI;

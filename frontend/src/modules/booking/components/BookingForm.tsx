import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useBooking } from "@/modules/booking/hooks/useBooking";
import type { Property } from "@/modules/property/types";

interface BookingFormProps {
  property: Property;
  onSuccess: () => void;
}

interface BookingFormData {
  moveInDate: string;
  moveOutDate?: string;
  phoneNumber: string;
  message?: string;
}

const BookingForm = ({ property, onSuccess }: BookingFormProps) => {
  const { createBooking } = useBooking();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>();

  const onSubmit = async (data: BookingFormData) => {
    try {
      console.log(data);
      const res = await createBooking({
        propertyId: property._id,
        ...data,
      });
      console.log(res);

      toast.success("Booking request sent successfully");

      onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create booking");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Property Summary */}

      <div className="flex gap-4 rounded-2xl border p-4">
        <img
          src={property.thumbnail?.url}
          alt={property.title}
          className="h-24 w-24 rounded-xl object-cover"
        />

        <div>
          <h3 className="font-semibold">{property.title}</h3>

          <p className="text-sm text-muted-foreground">{property.location}</p>

          <p className="mt-2 text-lg font-bold text-primary">
            ₹{property.price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Move In Date */}

      <div>
        <label className="mb-2 block text-sm font-medium">Move In Date *</label>

        <input
          type="date"
          {...register("moveInDate", {
            required: "Move in date is required",
          })}
          className="ls-input"
        />

        {errors.moveInDate && (
          <p className="mt-1 text-sm text-red-500">
            {errors.moveInDate.message}
          </p>
        )}
      </div>

      {/* Move Out Date */}

      <div>
        <label className="mb-2 block text-sm font-medium">Move Out Date</label>

        <input type="date" {...register("moveOutDate")} className="ls-input" />
      </div>

      {/* Phone */}

      <div>
        <label className="mb-2 block text-sm font-medium">Phone Number *</label>

        <input
          type="tel"
          placeholder="9876543210"
          {...register("phoneNumber", {
            required: "Phone number is required",
          })}
          className="ls-input"
        />

        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-500">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      {/* Message */}

      <div>
        <label className="mb-2 block text-sm font-medium">Message</label>

        <textarea
          rows={4}
          placeholder="Tell the owner about your requirements..."
          {...register("message")}
          className="ls-input resize-none"
        />
      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="ls-btn-primary w-full"
      >
        {isSubmitting ? "Sending Request..." : "Send Booking Request"}
      </button>
    </form>
  );
};

export default BookingForm;

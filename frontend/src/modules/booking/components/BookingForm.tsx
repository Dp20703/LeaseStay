import { useBooking } from "@/modules/booking/hooks/useBooking";
import type { Property } from "@/modules/property/types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split("T")[0];
};

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
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>();

  const onSubmit = async (data: BookingFormData) => {
    try {
      await createBooking({
        propertyId: property._id,
        ...data,
      });

      toast.success("Booking request sent successfully");

      onSuccess();
    } catch (error: any) {
      toast.error(getErrorMessage(error, "Failed to create booking"));
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
          min={todayISO()}
          {...register("moveInDate", {
            required: "Move in date is required",
            validate: (value) =>
              value >= todayISO() || "Move in date cannot be in the past",
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

        <input
          type="date"
          min={todayISO()}
          {...register("moveOutDate", {
            validate: (value) => {
              const moveIn = getValues("moveInDate");

              if (!value || !moveIn) return true;

              return value > moveIn || "Move out must be after move in date";
            },
          })}
          className="ls-input"
        />

        {errors.moveOutDate && (
          <p className="mt-1 text-sm text-red-500">
            {errors.moveOutDate.message}
          </p>
        )}
      </div>

      {/* Phone */}

      <div>
        <label className="mb-2 block text-sm font-medium">Phone Number *</label>

        <input
          type="tel"
          placeholder="9876543210"
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^\+?[0-9]{10,15}$/,
              message: "Enter a valid phone number (10 to 15 digits)",
            },
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
          {...register("message", {
            maxLength: {
              value: 1000,
              message: "Message cannot exceed 1000 characters",
            },
          })}
          className="ls-input resize-none p-2"
        />

        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
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

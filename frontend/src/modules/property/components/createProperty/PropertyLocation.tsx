import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { type CreatePropertyFormData } from "../../validations/property.schema";

interface Props {
  register: UseFormRegister<CreatePropertyFormData>;
  errors: FieldErrors<CreatePropertyFormData>;
}

const PropertyLocation = ({ register, errors }: Props) => {
  return (
    <div className="ls-card p-6 space-y-5">
      <h2 className="text-xl font-semibold">Location</h2>

      <div>
        <input
          {...register("location")}
          placeholder="Location"
          className="ls-input"
        />

        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("address")}
          placeholder="Address"
          className="ls-input"
        />

        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("zipCode")}
          placeholder="Zip Code"
          className="ls-input"
        />

        {errors.zipCode && (
          <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
        )}
      </div>
    </div>
  );
};

export default PropertyLocation;

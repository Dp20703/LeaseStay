import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CreatePropertyFormData } from "../../validations/property.schema";

interface Props {
  register: UseFormRegister<CreatePropertyFormData>;
  errors: FieldErrors<CreatePropertyFormData>;
}

export const PropertyDetails = ({ register, errors }: Props) => {
  return (
    <div className="ls-card p-6">
      <h2 className="text-xl font-semibold mb-5">Property Details</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <select {...register("category")} className="ls-input">
          <option value="Rent">Rent</option>
          <option value="Sale">Sale</option>
        </select>

        <select {...register("propertyType")} className="ls-input">
          <option>Apartment</option>
          <option>Villa</option>
          <option>House</option>
          <option>Studio</option>
          <option>PG</option>
          <option>Office</option>
        </select>

        <input
          type="number"
          min={0}
          placeholder="Property Size (sq ft)"
          className="ls-input"
          {...register("size", {
            valueAsNumber: true,
          })}
        />

        <input
          type="number"
          min={0}
          placeholder="Price ₹ (monthly)"
          className="ls-input"
          {...register("price", {
            valueAsNumber: true,
          })}
        />

        <input
          type="number"
          min={0}
          max={5}
          placeholder="Bedrooms"
          className="ls-input"
          {...register("bedrooms", {
            valueAsNumber: true,
          })}
        />

        <input
          type="number"
          min={0}
          max={5}
          placeholder="Bathrooms"
          className="ls-input"
          {...register("bathrooms", {
            valueAsNumber: true,
          })}
        />
      </div>

      {Object.values(errors).map((err, index) => (
        <p key={index} className="text-red-500 text-sm">
          {err?.message}
        </p>
      ))}
    </div>
  );
};

import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CreatePropertyFormData } from "@/validations/property.schema";

interface Props {
  register: UseFormRegister<CreatePropertyFormData>;
  errors: FieldErrors<CreatePropertyFormData>;
}

const PropertyBasicInfo = ({ register, errors }: Props) => {
  return (
    <div className="ls-card p-6 space-y-5">
      <h2 className="text-xl font-semibold">Basic Information</h2>

      {/* TITLE */}

      <div>
        <input
          {...register("title")}
          placeholder="Property Title"
          className={`
            ls-input 
            ${errors.title && "border-red-500"}
          `}
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* DESCRIPTION */}

      <div>
        <textarea
          {...register("description")}
          placeholder="Description"
          className={`ls-input min-h-[150px] ${errors.description && "border-red-500"}
          `}
        />

        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PropertyBasicInfo;

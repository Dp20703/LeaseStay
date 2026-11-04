import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";

import {
  createPropertySchema,
  type CreatePropertyFormData,
} from "@/modules/property/validations/property.schema";

import { PropertyAmenitiesDetails } from "./PropertyAmenitiesDetails";
import PropertyBasicInfo from "./PropertyBasicInfo";
import { PropertyDetails } from "./PropertyDetails";
import PropertyDocumentsUpload from "./PropertyDocumentsUpload";
import PropertyImageUpload from "./PropertyImageUpload";
import PropertyLocation from "./PropertyLocation";

interface PropertyFormProps {
  loading: boolean;
  onSubmit: (formData: FormData) => Promise<void>;
  /** "edit" pre-fills the form and makes new image / document uploads optional. */
  mode?: "create" | "edit";
  initialValues?: Partial<CreatePropertyFormData>;
  existingImageCount?: number;
}

const PropertyForm = ({
  loading,
  onSubmit,
  mode = "create",
  initialValues,
  existingImageCount = 0,
}: PropertyFormProps) => {
  const isEdit = mode === "edit";

  const [images, setImages] = useState<FileList | null>(null);
  const [documents, setDocuments] = useState<FileList | null>(null);

  const [fileErrors, setFileErrors] = useState({
    images: "",
    documents: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,

    formState: { errors },
  } = useForm<CreatePropertyFormData, any, CreatePropertyFormData>({
    resolver: zodResolver(
      createPropertySchema,
    ) as unknown as Resolver<CreatePropertyFormData>,

    defaultValues: {
      category: "Rent",
      propertyType: "Apartment",
      documentType: "sale_deed",
      amenities: [],
      ...initialValues,
    },
  });

  const submitHandler = async (data: CreatePropertyFormData) => {
    /*
      FILE VALIDATION
    */

    let hasError = false;

    const newErrors = {
      images: "",
      documents: "",
    };

    // Creating requires images + a document. Editing only needs them if the
    // owner is adding new ones (existing media is managed separately).
    if (!isEdit && !images?.length) {
      newErrors.images = "Upload at least one property image";

      hasError = true;
    }

    if (!isEdit && !documents?.length) {
      newErrors.documents = "Upload property document";

      hasError = true;
    }

    setFileErrors(newErrors);

    if (hasError) return;

    /*
       CREATE FORM DATA
    */

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "amenities") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    Array.from(images ?? []).forEach((file) => {
      formData.append("images", file);
    });

    Array.from(documents ?? []).forEach((file) => {
      formData.append("propertyDocuments", file);
    });

    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      noValidate
      className="space-y-8"
    >
      {/* BASIC INFO */}

      <PropertyBasicInfo register={register} errors={errors} />

      {/* LOCATION */}

      <PropertyLocation register={register} errors={errors} />

      {/* DETAILS */}

      <PropertyDetails register={register} errors={errors} />

      {/* AMENITIES */}

      <PropertyAmenitiesDetails
        selectedAmenities={watch("amenities") || []}
        setSelectedAmenities={(items) => {
          setValue("amenities", items, {
            shouldValidate: true,
          });
        }}
      />

      {/* IMAGES */}

      <PropertyImageUpload
        setImages={setImages}
        error={fileErrors.images}
        existingCount={existingImageCount}
      />

      {/* DOCUMENTS */}

      <PropertyDocumentsUpload
        register={register}
        errors={errors}
        setDocuments={setDocuments}
        error={fileErrors.documents}
        optional={isEdit}
      />

      <button
        type="submit"
        disabled={loading}
        className="ls-btn-primary w-full"
      >
        {isEdit
          ? loading
            ? "Saving Changes..."
            : "Save Changes"
          : loading
            ? "Creating Property..."
            : "Create Property"}
      </button>
    </form>
  );
};

export default PropertyForm;

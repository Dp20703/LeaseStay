import { useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { validateDocumentFiles } from "@/shared/utils/fileValidation";

import type { CreatePropertyFormData } from "../../validations/property.schema";

interface Props {
  register: UseFormRegister<CreatePropertyFormData>;
  errors: FieldErrors<CreatePropertyFormData>;
  setDocuments: (files: FileList | null) => void;
  error?: string;
  optional?: boolean;
}

const PropertyDocumentsUpload = ({
  register,
  setDocuments,
  error,
  optional = false,
}: Props) => {
  const [localError, setLocalError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const message = validateDocumentFiles(files);

    if (message) {
      setLocalError(message);
      setDocuments(null);
      e.target.value = "";
      return;
    }

    setLocalError("");
    setDocuments(files && files.length ? files : null);
  };

  const shown = localError || error;

  return (
    <div className="ls-card p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        {optional ? "Add Documents (optional)" : "Property Documents"}
      </h2>

      <select className="ls-input" {...register("documentType")}>
        <option value="sale_deed">Sale Deed</option>
        <option value="tax_receipt">Tax Receipt</option>
        <option value="electricity_bill">Electricity Bill</option>
        <option value="rental_agreement">Rental Agreement</option>
      </select>

      <input
        type="file"
        multiple
        accept="application/pdf,image/jpeg,image/png,image/webp"
        onChange={handleChange}
      />

      <p className="text-xs text-muted-foreground">
        PDF, JPG, PNG or WebP · max 10 MB each · up to 5 files
      </p>

      {shown && <p className="text-red-500 text-sm">{shown}</p>}
    </div>
  );
};

export default PropertyDocumentsUpload;

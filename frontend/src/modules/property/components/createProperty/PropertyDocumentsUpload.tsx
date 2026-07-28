import type { CreatePropertyFormData } from "@/validations/property.schema";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<CreatePropertyFormData>;
  errors: FieldErrors<CreatePropertyFormData>;
  setDocuments: (files: FileList | null) => void;
  error?: string;
}

const PropertyDocumentsUpload = ({ register, setDocuments, error }: Props) => {
  return (
    <div className="ls-card p-6 space-y-4">
      <h2 className="text-xl font-semibold">Property Documents</h2>

      <select className="ls-input" {...register("documentType")}>
        <option value="sale_deed">Sale Deed</option>
        <option value="tax_receipt">Tax Receipt</option>
        <option value="electricity_bill">Electricity Bill</option>
        <option value="rental_agreement">Rental Agreement</option>
      </select>

      <input
        type="file"
        multiple
        onChange={(e) => setDocuments(e.target.files)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default PropertyDocumentsUpload;

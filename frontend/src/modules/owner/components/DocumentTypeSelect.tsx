import type { DocumentTypeSelectProps } from "../types";

const DocumentTypeSelect = ({ value, onChange }: DocumentTypeSelectProps) => {
  return (
    <div>
      <label className="block mb-2 font-medium text-text-light dark:text-text-dark">
        Document Type
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-3 text-text-light dark:text-text-dark focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-normal"
      >
        <option value="aadhaar">Aadhaar Card</option>
        <option value="pan">PAN Card</option>
        <option value="passport">Passport</option>
        <option value="driving_license">Driving License</option>
      </select>
    </div>
  );
};

export default DocumentTypeSelect;

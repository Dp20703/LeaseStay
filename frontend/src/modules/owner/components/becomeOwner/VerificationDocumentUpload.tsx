import type { VerificationDocumentUploadProps } from "../../types";

const VerificationDocumentUpload = ({
  file,
  onChange,
}: VerificationDocumentUploadProps) => {
  return (
    <div>
      <label className="block mb-2 font-medium text-text-light dark:text-text-dark">
        Verification Document
      </label>

      <input
        type="file"
        accept=".pdf,image/*"
        onChange={(e) => onChange(e.target.files[0])}
        className="block w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark p-3 text-text-light dark:text-text-dark file:bg-primary file:text-white file:px-4 file:py-2 file:border-0 file:rounded-lg file:cursor-pointer"
      />

      {file && (
        <p className="mt-2 text-sm text-green-600">Selected: {file.name}</p>
      )}
    </div>
  );
};

export default VerificationDocumentUpload;

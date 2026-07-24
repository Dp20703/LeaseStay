export type DocumentType = "aadhaar" | "pan" | "passport" | "driving_license";

export interface DocumentTypeSelectProps {
  value: DocumentType;
  onChange: (value: DocumentType) => void;
}

export interface VerificationDocumentUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

export interface BecomeOwnerSubmitButtonProps {
  loading: boolean;
}

export interface UseBecomeOwnerReturn {
  loading: boolean;
  documentType: DocumentType;
  file: File | null;
  setDocumentType: React.Dispatch<React.SetStateAction<DocumentType>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

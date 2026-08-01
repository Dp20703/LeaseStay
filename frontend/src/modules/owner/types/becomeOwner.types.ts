import type { VerificationDocumentType } from "@/types";
import type { Dispatch, FormEvent, SetStateAction } from "react";

export type DocumentType = VerificationDocumentType;

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
  setDocumentType: Dispatch<SetStateAction<DocumentType>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ownerAPI from "../services/ownerService";
import type { DocumentType, UseBecomeOwnerReturn } from "../types";

const useBecomeOwner = (): UseBecomeOwnerReturn => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [documentType, setDocumentType] = useState<DocumentType>("aadhaar");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.warning("Please select a verification document.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("documentType", documentType);
      formData.append("verificationDocument", file);

      await ownerAPI.applyForOwner(formData);

      toast.success("Owner verification request submitted successfully.");

      navigate("/");
    } catch (error) {
      const message =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;

      toast.error(message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    documentType,
    file,
    setDocumentType,
    setFile,
    handleSubmit,
  };
};

export default useBecomeOwner;

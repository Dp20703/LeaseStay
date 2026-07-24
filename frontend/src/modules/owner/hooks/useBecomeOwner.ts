import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ownerAPI from "../services/ownerService";
import type { UseBecomeOwnerReturn } from "../types";

const useBecomeOwner = (): UseBecomeOwnerReturn => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [documentType, setDocumentType] = useState("aadhaar");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return toast.warning("Please select a verification document.");
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
      toast.error(error.response?.data?.message || "Something went wrong.");
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

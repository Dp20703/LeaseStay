import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import userAPI from "@/modules/user/services/userService";

const BecomeOwnerPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [documentType, setDocumentType] = useState("aadhaar");
  const [file, setFile] = useState(null);

  // handleSubmit
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

      await userAPI.applyForOwner(formData);

      toast.success("Owner verification request submitted successfully.");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className=" bg-surface-light dark:bg-surface-dark flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl bg-card-light dark:bg-card-dark shadow-card border border-border-light dark:border-border-dark p-8 animate-scale-in">
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">
          Become an Owner
        </h1>

        <p className="mt-2 text-text-muted dark:text-text-darkMuted">
          Upload a government-issued document for verification. Once approved,
          you'll be able to list your properties.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Document Type */}

          <div>
            <label className="block mb-2 font-medium text-text-light dark:text-text-dark">
              Document Type
            </label>

            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-3 text-text-light dark:text-text-dark focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-normal"
            >
              <option value="aadhaar">Aadhaar Card</option>
              <option value="pan">PAN Card</option>
              <option value="passport">Passport</option>
              <option value="driving_license">Driving License</option>
            </select>
          </div>

          {/* Upload */}

          <div>
            <label className="block mb-2 font-medium text-text-light dark:text-text-dark">
              Verification Document
            </label>

            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark p-3 text-text-light dark:text-text-dark file:bg-primary file:text-white file:px-4 file:py-2 file:border-0 file:rounded-lg file:cursor-pointer"
            />

            {file && (
              <p className="mt-2 text-sm text-green-600">
                Selected: {file.name}
              </p>
            )}
          </div>

          {/* Submit */}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-primary hover:bg-primary-dark text-white py-3 font-semibold transition-normal disabled:opacity-60 disabled:cursor-not-allowed shadow-soft"
          >
            {loading ? "Submitting..." : "Apply for Owner"}
          </button>
        </form>
      </div>
    </form>
  );
};

export default BecomeOwnerPage;

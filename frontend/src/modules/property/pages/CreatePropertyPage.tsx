import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useProperty } from "@/modules/property/hooks/useProperty";
import { formatValidationErrors } from "@/shared/utils/formatValidationErrors";

import { PropertyForm } from "../components/createProperty";

const CreatePropertyPage = () => {
  const navigate = useNavigate();

  const { createProperty, loading } = useProperty();

  // handleSubmit
  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await createProperty(formData);
      console.log("res of create proeprty:", res);
      toast.success("Property created successfully");

      navigate("/owner/properties");
    } catch (error: any) {
      console.log("create propery error:", error);
      const message =
        formatValidationErrors(error.response?.data?.errors) ||
        error.response?.data?.message ||
        "Failed to create property";

      toast.error(message || "Failed to create property");
    }
  };

  return (
    <section className="ls-container">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Create Property</h1>

        <p className="text-muted-foreground mt-2">
          List your property and reach more tenants.
        </p>
      </div>

      <PropertyForm onSubmit={handleSubmit} loading={loading} />
    </section>
  );
};

export default CreatePropertyPage;

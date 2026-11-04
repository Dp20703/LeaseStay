import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useProperty } from "@/modules/property/hooks/useProperty";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

import { PropertyForm } from "../components/createProperty";

const CreatePropertyPage = () => {
  const navigate = useNavigate();

  const { createProperty, loading } = useProperty();

  const handleSubmit = async (formData: FormData) => {
    try {
      await createProperty(formData);

      toast.success("Property created successfully");

      navigate("/owner/properties");
    } catch (error: any) {
      toast.error(getErrorMessage(error, "Failed to create property"));
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

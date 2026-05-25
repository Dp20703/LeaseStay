import { useNavigate } from "react-router-dom";
import PropertyForm from "../../components/property/PropertyForm";
import { useProperty } from "@/hooks/useProperty";

const CreatePropertyPage = () => {
  const navigate = useNavigate();

  const { createProperty, loading } = useProperty();

  const handleSubmit = async (formData: FormData) => {
    await createProperty(formData);

    navigate("/dashboard/properties");
  };

  return (
    <section className="ls-container py-10 space-y-8">
      <h1 className="text-5xl font-bold">Create Property</h1>

      <PropertyForm onSubmit={handleSubmit} loading={loading} />
    </section>
  );
};

export default CreatePropertyPage;

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useProperty } from "@/modules/property/hooks/useProperty";
import LoaderScreen from "@/shared/components/common/LoaderScreen";
import { ArrowLeft } from "@/shared/constants/icons";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

import { PropertyForm } from "../components/createProperty";
import PropertyMediaManager from "../components/editProperty/PropertyMediaManager";

const EditPropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { ownerProperties, getOwnerProperties, updateProperty, loading } =
    useProperty();

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getOwnerProperties()
      .catch(() => undefined)
      .finally(() => {
        if (active) setInitialLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const property = useMemo(
    () => ownerProperties.find((item) => item._id === id),
    [ownerProperties, id],
  );

  const handleSubmit = async (formData: FormData) => {
    if (!id) return;

    try {
      await updateProperty(id, formData);

      toast.success("Property updated successfully");

      navigate("/owner/properties");
    } catch (error: any) {
      toast.error(getErrorMessage(error, "Failed to update property"));
    }
  };

  if (initialLoading && !property) {
    return <LoaderScreen />;
  }

  if (!property) {
    return (
      <section className="ls-container">
        <div className="ls-card p-10 text-center">
          <h2 className="text-xl font-semibold">Property not found</h2>

          <p className="mt-2 text-muted-foreground">
            It may have been removed, or it does not belong to your account.
          </p>

          <Link
            to="/owner/properties"
            className="ls-btn-primary mt-6 inline-flex"
          >
            Back to My Properties
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="ls-container space-y-8">
      <div>
        <Link
          to="/owner/properties"
          className="mb-4 inline-flex items-center gap-2 text-sm text-primary"
        >
          <ArrowLeft size={16} /> Back to My Properties
        </Link>

        <h1 className="text-4xl font-bold">Edit Property</h1>

        <p className="mt-2 text-muted-foreground">
          Update the details of <strong>{property.title}</strong>.
        </p>
      </div>

      <PropertyMediaManager
        property={property}
        onChanged={getOwnerProperties}
      />

      <PropertyForm
        key={property._id}
        mode="edit"
        loading={loading}
        onSubmit={handleSubmit}
        existingImageCount={property.images.length}
        initialValues={{
          title: property.title,
          description: property.description,
          location: property.location,
          address: property.address,
          zipCode: property.zipCode,
          category: property.category,
          propertyType: property.propertyType,
          size: property.size,
          price: property.price,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          amenities: property.amenities ?? [],
        }}
      />
    </section>
  );
};

export default EditPropertyPage;

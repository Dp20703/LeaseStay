import ContactOwner from "./ContactOwner";
import { FaRupeeSign, FaUser } from "@/constants/icons";
import { MdEmail } from "@/constants/icons";

const PropertySidebar = ({ property, showContact, setShowContact }: any) => {
  return (
    <div>
      <div className="ls-card sticky top-24 p-7 space-y-6">
        <div>
          <p className="text-muted-foreground">Property Price</p>

          <h2 className="text-4xl font-black text-primary flex items-center">
            <FaRupeeSign />
            {property.price.toLocaleString()}
          </h2>

          {property.category === "Rent" && (
            <p className="text-muted-foreground">per month</p>
          )}
        </div>

        <div className="border-t pt-5">
          <div className="flex items-center gap-3">
            <FaUser className="text-primary" />

            <div>
              <p className="font-semibold">Verified Owner</p>

              <p className="text-sm text-muted-foreground">
                Property Listed By Owner
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowContact(!showContact)}
          className="ls-btn-primary w-full flex items-center justify-center gap-2"
        >
          <MdEmail />
          Contact Owner
        </button>

        {showContact && <ContactOwner propertyId={property._id} />}
      </div>
    </div>
  );
};

export default PropertySidebar;

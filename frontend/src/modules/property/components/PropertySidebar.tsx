import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Mail, IndianRupee, User } from "@/shared/constants/icons";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import BookingModal from "@/modules/booking/components/BookingModal";
import ContactOwner from "./ContactOwner";

const PropertySidebar = ({ property, showContact, setShowContact }: any) => {
  const [showBooking, setShowBooking] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  // handleBooking
  const handleBooking = () => {
    if (!user) {
      toast.info("Please login to book properties", {
        onClose: () => navigate("/login"),
      });

      return;
    }

    setShowBooking(true);
  };
  return (
    <div>
      <div className="ls-card sticky top-24 p-7 space-y-6">
        <div>
          <p className="text-muted-foreground">Property Price</p>

          <h2 className="text-4xl font-black text-primary flex items-center">
            <IndianRupee />
            {property.price.toLocaleString()}
          </h2>

          {property.category === "Rent" && (
            <p className="text-muted-foreground">per month</p>
          )}

          <button
            onClick={handleBooking}
            className="ls-btn-primary w-full mt-5"
          >
            {user ? "Book Property" : "Login to Book"}
          </button>
        </div>

        <div className="border-t pt-5">
          <div className="flex items-center gap-3">
            <User className="text-primary" />

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
          <Mail />
          Contact Owner
        </button>

        {showContact && <ContactOwner propertyId={property._id} />}
        {showBooking && (
          <BookingModal
            open={showBooking}
            onClose={() => setShowBooking(false)}
            property={property}
          />
        )}
      </div>
    </div>
  );
};

export default PropertySidebar;

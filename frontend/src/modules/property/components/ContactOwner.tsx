import { useState } from "react";
import { toast } from "react-toastify";
import { useProperty } from "../hooks/useProperty";

interface Props {
  propertyId: string;
}

const ContactOwner = ({ propertyId }: Props) => {
  // states
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // useProperty
  const { contactOwner } = useProperty();

  // handleSubmit
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await contactOwner(propertyId, message);

      toast.success(response.message);

      setMessage("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to contact owner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ls-card p-6 space-y-4">
      <h2 className="text-xl font-semibold">Contact Owner</h2>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message..."
        className="ls-textarea min-h-32"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="ls-btn-primary w-full"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </div>
  );
};

export default ContactOwner;

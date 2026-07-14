import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import api from "@/core/api/axios";
import SettingsSection from "./SettingsSection";

const DeleteProfileImageCard = () => {
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const response = await api.delete("/users/delete-profile-image");

      setUser(response.data.data);

      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to remove image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsSection
      title="Profile Image"
      description="Remove your profile image."
    >
      <button
        onClick={handleDelete}
        disabled={loading}
        className={`
          ls-btn-danger
          ${loading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {loading ? "Removing..." : "Remove Profile Image"}
      </button>
    </SettingsSection>
  );
};

export default DeleteProfileImageCard;

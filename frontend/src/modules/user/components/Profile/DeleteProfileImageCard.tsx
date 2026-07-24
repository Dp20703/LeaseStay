import { useAuth } from "@/modules/auth/hooks/useAuth";
import SettingsSection from "@/modules/user/components/Profile/SettingsSection";
import { useState } from "react";
import { toast } from "react-toastify";
import userAPI from "../../services/userService";

const DeleteProfileImageCard = () => {
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const response = await userAPI.deleteProfileImage();

      setUser(response?.data);

      toast.success(response?.message);
    } catch (error: any) {
      toast.error(error?.response?.message || "Failed to remove image");
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

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import api from "@/core/api/axios";
import userAPI from "../../services/userService";

const DangerZoneCard = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await userAPI.deleteAccount();

      toast.success(response?.message);

      logout();

      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.message || "Failed to delete account");
    }
  };

  return (
    <div className="border border-red-500/30 rounded-2xl p-8 bg-red-500/5">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-red-500">Danger Zone</h2>

        <p className="text-text-muted dark:text-text-darkMuted mt-2">
          Permanently delete your account and associated data.
        </p>
      </div>

      <button onClick={handleDeleteAccount} className="ls-btn-danger">
        Delete Account
      </button>
    </div>
  );
};

export default DangerZoneCard;

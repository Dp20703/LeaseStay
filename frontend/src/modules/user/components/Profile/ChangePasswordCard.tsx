import SettingsSection from "@/modules/user/components/Profile/SettingsSection";
import { useState } from "react";
import { toast } from "react-toastify";
import userAPI from "../../services/userService";

const ChangePasswordCard = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await userAPI.changePassword(formData);

      toast.success(response?.message);
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      toast.error(error?.response?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsSection
      title="Change Password"
      description="Update your account password."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="ls-label">Current Password</label>

          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            placeholder="Enter current password"
            onChange={handleChange}
            className="ls-input mt-2"
            required
          />
        </div>

        <div>
          <label className="ls-label">New Password</label>

          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="ls-input mt-2"
            placeholder="Enter new password"
            required
          />
        </div>

        <div>
          <label className="ls-label">Confirm New Password</label>

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="ls-input mt-2"
            placeholder="Re-enter new password"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="ls-btn-primary">
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </SettingsSection>
  );
};

export default ChangePasswordCard;

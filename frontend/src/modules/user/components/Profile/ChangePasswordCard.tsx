import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/core/api/axios";
import SettingsSection from "./SettingsSection";

const ChangePasswordCard = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
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

      const response = await api.patch("/users/change-password", formData);

      toast.success(response.data.message);

      setFormData({ currentPassword: "", newPassword: "" });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Password update failed");
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

        <button type="submit" disabled={loading} className="ls-btn-primary">
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </SettingsSection>
  );
};

export default ChangePasswordCard;

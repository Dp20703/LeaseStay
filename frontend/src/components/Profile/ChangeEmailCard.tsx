import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/services/axios";
import SettingsSection from "./SettingsSection";

const ChangeEmailCard = () => {
  const [formData, setFormData] = useState({
    newEmail: "",
    password: "",
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

      const response = await api.patch("/users/change-email", formData);

      toast.success(response.data.message);

      setFormData({ newEmail: "", password: "" });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Email update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsSection
      title="Change Email"
      description="Update your email address."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="ls-label">New Email</label>

          <input
            type="email"
            name="newEmail"
            value={formData.newEmail}
            onChange={handleChange}
            className="ls-input mt-2"
            placeholder="Enter new email"
            required
          />
        </div>

        <div>
          <label className="ls-label">Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="ls-input mt-2"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="ls-btn-primary">
          {loading ? "Updating..." : "Update Email"}
        </button>
      </form>
    </SettingsSection>
  );
};

export default ChangeEmailCard;

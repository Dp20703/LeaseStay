import { toast } from "react-toastify";
import api from "@/services/axios";
import { FaEdit } from "react-icons/fa";

type ProfileEditCardProps = {
  user: any;
  setUser: any;
  logout: () => void;

  isEditing: boolean;
  setIsEditing: any;

  loading: boolean;
  setLoading: any;

  formData: any;
  setFormData: any;
};

const ProfileEditCard = ({
  setUser,
  logout,

  isEditing,
  setIsEditing,

  loading,
  setLoading,

  formData,
  setFormData,
}: ProfileEditCardProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const updatedFormData = new FormData();

      updatedFormData.append("firstName", formData.firstName);

      updatedFormData.append("lastName", formData.lastName);

      updatedFormData.append("userName", formData.userName);

      updatedFormData.append("phone", formData.phone);

      if (formData.profileImage) {
        updatedFormData.append("profileImage", formData.profileImage);
      }

      const response = await api.patch(
        "/users/update-profile",
        updatedFormData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      setUser(response?.data?.data);

      toast.success("Profile updated successfully");

      setIsEditing(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="ls-card p-8">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Profile Settings</h2>

            <p className="text-text-muted dark:text-text-darkMuted mt-2">
              Manage your account information.
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="ls-btn-primary flex items-center gap-2"
            >
              <FaEdit className="text-sm" />
              Edit
            </button>
          )}
        </div>

        {/* Form */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div>
            <label className="ls-label">First Name</label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              className="ls-input mt-2"
            />
          </div>

          <div>
            <label className="ls-label">Last Name</label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              className="ls-input mt-2"
            />
          </div>

          <div>
            <label className="ls-label">Username</label>

            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              disabled={!isEditing}
              className="ls-input mt-2"
            />
          </div>

          <div>
            <label className="ls-label">Email</label>

            <input
              type="email"
              value={formData.email}
              disabled
              className="ls-input mt-2 opacity-70 cursor-not-allowed"
            />
          </div>

          <div className="md:col-span-2">
            <label className="ls-label">Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="ls-input mt-2"
            />
          </div>
        </div>

        {/* Actions */}

        {isEditing && (
          <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={handleSave}
              disabled={loading}
              className="ls-btn-primary"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="ls-btn-outline"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Logout */}

        <div className="pt-10 mt-10 border-t border-border-light dark:border-border-dark">
          <button onClick={logout} className="ls-btn-danger">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditCard;

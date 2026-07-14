import { toast } from "react-toastify";
import { Pencil } from "@/shared/constants/icons";
import api from "@/core/api/axios";
import type { User } from "@/types/entities/user.types";
import type { ProfileFormData } from "@/types/forms/profile-form.types";

type ProfileEditCardProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  formData: ProfileFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
};

const ProfileEditCard = ({
  user,
  setUser,

  logout,
  isEditing,
  setIsEditing,

  loading,
  setLoading,

  formData,
  setFormData,
}: ProfileEditCardProps) => {
  // RESET FORM

  const resetFormData = () => ({
    firstName: user?.fullName?.firstName || "",
    lastName: user?.fullName?.lastName || "",
    userName: user?.userName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    profileImage: null as File | null,
  });

  // HANDLE CHANGE

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  // HANDLE SAVE

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
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // UPDATE USER

      setUser(response.data.data);

      // RESET FORM WITH NEW DATA

      setFormData({
        firstName: response.data.data.fullName?.firstName || "",
        lastName: response.data.data.fullName?.lastName || "",
        userName: response.data.data?.userName || "",
        email: response.data.data?.email || "",
        phone: response.data.data?.phone || "",
        profileImage: null,
      });

      toast.success(response.data.message || "Profile updated successfully");

      setIsEditing(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  // HANDLE CANCEL

  const handleCancel = () => {
    setFormData(resetFormData());

    setIsEditing(false);
  };

  return (
    <div className="lg:col-span-2">
      <div className="ls-card p-8">
        {/* HEADER */}

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
              <Pencil className="text-sm" />
              Edit
            </button>
          )}
        </div>

        {/* FORM */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {/* FIRST NAME */}

          <div>
            <label className="ls-label">First Name</label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              className="ls-input mt-2"
              placeholder={isEditing ? "Enter your firstname" : "NA"}
            />
          </div>

          {/* LAST NAME */}

          <div>
            <label className="ls-label">Last Name</label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              className="ls-input mt-2"
              placeholder={isEditing ? "Enter your lastname" : "NA"}
            />
          </div>

          {/* USERNAME */}

          <div>
            <label className="ls-label">Username</label>

            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              disabled={!isEditing}
              className="ls-input mt-2"
              placeholder={isEditing ? "Enter your username" : "NA"}
            />
          </div>

          {/* EMAIL */}

          <div>
            <label className="ls-label">Email</label>

            <input
              type="email"
              value={formData.email}
              disabled
              className="ls-input mt-2 opacity-70 cursor-not-allowed"
            />
          </div>

          {/* PHONE */}

          <div className="md:col-span-2">
            <label className="ls-label">Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="ls-input mt-2"
              placeholder={isEditing ? "Enter your phone number" : "NA"}
            />
          </div>
        </div>

        {/* ACTIONS */}

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
              onClick={handleCancel}
              disabled={loading}
              className="ls-btn-outline"
            >
              Cancel
            </button>
          </div>
        )}

        {/* LOGOUT */}

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

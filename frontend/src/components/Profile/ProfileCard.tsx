import { FaCamera, FaEnvelope, FaPhone, FaShieldAlt } from "react-icons/fa";

type ProfileCardProps = {
  user: any;
  isEditing: boolean;
  previewImage: string | null;
  setPreviewImage: (value: string) => void;
  setFormData: any;
};

const ProfileCard = ({
  user,
  isEditing,
  previewImage,
  setPreviewImage,
  setFormData,
}: ProfileCardProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev: any) => ({
      ...prev,
      profileImage: file,
    }));

    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="lg:col-span-1">
      <div className="ls-card p-8 text-center lg:sticky lg:top-24">
        {/* Image */}

        <div className="relative w-fit mx-auto">
          <img
            src={
              previewImage ||
              user?.profileImage ||
              "https://randomuser.me/api/portraits/men/32.jpg"
            }
            alt="profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-primary"
          />

          {isEditing && (
            <label className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />

              <FaCamera className="text-sm" />
            </label>
          )}
        </div>

        {/* Name */}

        <h2 className="text-2xl font-bold mt-6">
          {user?.fullName?.firstName} {user?.fullName?.lastName}
        </h2>

        {/* Username */}

        <p className="text-primary mt-2">@{user?.userName}</p>

        {/* Role */}

        <div className="mt-5">
          <span className="ls-badge ls-badge-success">{user?.role}</span>
        </div>

        {/* Info */}

        <div className="mt-8 space-y-4 text-left">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-sm" />
            <span className="text-sm">{user?.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaPhone className="text-sm" />

            <span className="text-sm">{user?.phone || "N/A"}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-sm" />

            <span className="text-sm">
              {user?.isVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

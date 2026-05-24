import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileEditCard from "@/components/profile/ProfileEditCard";

const ProfilePage = () => {
  const { user, setUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: user?.fullName?.firstName || "",
    lastName: user?.fullName?.lastName || "",
    userName: user?.userName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    profileImage: null as File | null,
  });

  return (
    <section>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left */}

        <ProfileCard
          user={user}
          isEditing={isEditing}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          setFormData={setFormData}
        />

        {/* Right */}

        <ProfileEditCard
          user={user}
          setUser={setUser}
          logout={logout}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          loading={loading}
          setLoading={setLoading}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </section>
  );
};

export default ProfilePage;

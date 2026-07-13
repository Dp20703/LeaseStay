import ChangeEmailCard from "@/components/profile/ChangeEmailCard";
import ChangePasswordCard from "@/components/profile/ChangePasswordCard";
import DeleteProfileImageCard from "@/components/profile/DeleteProfileImageCard";
import DangerZoneCard from "@/components/profile/DangerZoneCard";

const SettingsPage = () => {
  return (
    <section className="space-y-8">
      <ChangePasswordCard />
      <ChangeEmailCard />
      <DeleteProfileImageCard />
      <DangerZoneCard />
    </section>
  );
};

export default SettingsPage;

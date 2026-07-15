import ChangeEmailCard from "@/modules/user/components/Profile/ChangeEmailCard";
import ChangePasswordCard from "@/modules/user/components/Profile/ChangePasswordCard";
import DangerZoneCard from "@/modules/user/components/Profile/DangerZoneCard";
import DeleteProfileImageCard from "@/modules/user/components/Profile/DeleteProfileImageCard";

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

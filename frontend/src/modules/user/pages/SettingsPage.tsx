import ChangeEmailCard from "../components/Profile/ChangeEmailCard";
import ChangePasswordCard from "../components/Profile/ChangePasswordCard";
import DangerZoneCard from "../components/Profile/DangerZoneCard";
import DeleteProfileImageCard from "../components/Profile/DeleteProfileImageCard";

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

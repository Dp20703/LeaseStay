import { Bell } from "@/shared/constants/icons";

const NotificationButton = () => {
  return (
    <button
      className="relative rounded-xl p-2 transition hover:bg-surface-light dark:hover:bg-surface-dark"
      aria-label="Notifications"
    >
      <Bell size={20} />

      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
    </button>
  );
};

export default NotificationButton;

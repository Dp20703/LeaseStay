import { Menu } from "@/shared/constants/icons";

interface Props {
  onClick?: () => void;
}

const MobileMenuButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open sidebar"
      className="rounded-xl p-2 transition hover:bg-surface-light dark:hover:bg-surface-dark lg:hidden"
    >
      <Menu size={22} />
    </button>
  );
};

export default MobileMenuButton;

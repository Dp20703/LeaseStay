import { Menu } from "@/shared/constants/icons";

interface Props {
  onClick: () => void;
}

const MobileMenuButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="rounded-xl p-2 transition hover:bg-surface-light dark:hover:bg-surface-dark lg:hidden"
    >
      <Menu size={22} />
    </button>
  );
};

export default MobileMenuButton;

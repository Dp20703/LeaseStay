import { NavLink } from "react-router-dom";
import type { SidebarItem } from "@/shared/constants/navigation.types";

interface SidebarProps {
  title: string;
  items: SidebarItem[];
}

const Sidebar = ({ title, items }: SidebarProps) => {
  return (
    <aside className="ls-sidebar">
      <h2 className="ls-sidebar-title">{title}</h2>

      <nav className="flex flex-col gap-3">
        {items.map(({ path, label, icon: Icon, end }) => (
          <NavLink key={path} to={path} end={end} className="ls-sidebar-link">
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

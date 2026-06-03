import type { IconType } from "react-icons";

export interface SidebarItem {
  path: string;
  label: string;
  icon: IconType;
  end?: boolean;
}

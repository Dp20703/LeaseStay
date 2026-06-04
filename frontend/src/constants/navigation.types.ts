import type { IconType } from "@/constants/icons";

export interface SidebarItem {
  path: string;
  label: string;
  icon: IconType;
  end?: boolean;
}

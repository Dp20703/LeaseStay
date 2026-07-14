import type { IconType } from "@/shared/constants/icons";

export interface SidebarItem {
  path: string;
  label: string;
  icon: IconType;
  end?: boolean;
}

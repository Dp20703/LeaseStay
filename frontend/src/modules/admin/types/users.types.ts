import type { UserSummary } from "@/types";

export type IUser = UserSummary;

export interface IUsersFilterState {
  search: string;
  status: "ALL" | "ACTIVE" | "BLOCKED";
  page: number;
  limit: number;
}

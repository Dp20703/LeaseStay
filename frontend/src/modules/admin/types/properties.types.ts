import type { PropertyDetails, PropertyOwner } from "@/types";

export type IProperty = PropertyDetails;
export type IPropertyOwner = PropertyOwner;

export interface IPropertiesFilterState {
  search: string;
  status: "ALL" | "PENDING" | "APPROVED" | "REJECTED" | "HIDDEN";
  page: number;
  limit: number;
}

import {
  Bath,
  BedDouble,
  Building2,
  Calendar,
  CheckCircle,
  Home,
  IndianRupee,
  MapPin,
  Ruler,
  User,
  X,
} from "@/shared/constants/icons";
import React from "react";
import type { IProperty } from "../../types/properties.types";

interface PropertyDetailsDrawerProps {
  property: IProperty | null;
  isOpen: boolean;
  onClose: () => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Approved":
      return "ls-badge-success";
    case "Rejected":
      return "ls-badge-danger";
    case "Hidden":
      return "ls-badge-neutral";
    default:
      return "ls-badge-warning";
  }
};

const formatOwnerName = (owner: any) => {
  if (!owner?.fullName) return "Unknown Owner";

  if (typeof owner.fullName === "string") {
    return owner.fullName;
  }

  return `${owner.fullName.firstName ?? ""} ${owner.fullName.lastName ?? ""}`.trim();
};

export const PropertyDetailsDrawer: React.FC<PropertyDetailsDrawerProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !property) return null;

  return (
    <div
      className="ls-overlay flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="ls-modal flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="ls-modal-header">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Home className="text-primary" size={22} />
            Property Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="ls-modal-body flex-1 space-y-8 overflow-y-auto p-6">
          {/* Cover Image */}

          <img
            src={property.thumbnail?.url}
            alt={property.title}
            className="h-64 w-full rounded-2xl object-cover"
          />

          {/* Header */}

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-bold">{property.title}</h3>

              <span className={`ls-badge ${getStatusBadge(property.status)}`}>
                {property.status}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-text-muted">
              <MapPin size={16} />

              {property.location}
            </div>

            <div className="mt-4 flex items-center gap-2 text-2xl font-bold text-primary">
              <IndianRupee size={22} />

              {property.price.toLocaleString()}

              <span className="text-sm font-normal text-text-muted">
                / month
              </span>
            </div>
          </div>

          {/* Overview */}

          <section className="space-y-4">
            <h4 className="font-semibold">Overview</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="ls-card p-4 flex items-center gap-3">
                <BedDouble />

                <div>
                  <p className="text-xs text-text-muted">Bedrooms</p>

                  <p className="font-semibold">{property.bedrooms}</p>
                </div>
              </div>

              <div className="ls-card p-4 flex items-center gap-3">
                <Bath />

                <div>
                  <p className="text-xs text-text-muted">Bathrooms</p>

                  <p className="font-semibold">{property.bathrooms}</p>
                </div>
              </div>

              <div className="ls-card p-4 flex items-center gap-3">
                <Ruler />

                <div>
                  <p className="text-xs text-text-muted">Area</p>

                  <p className="font-semibold">{property.size} sq.ft</p>
                </div>
              </div>

              <div className="ls-card p-4 flex items-center gap-3">
                <Building2 />

                <div>
                  <p className="text-xs text-text-muted">Property Type</p>

                  <p className="font-semibold">{property.propertyType}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Description */}

          <section>
            <h4 className="mb-2 font-semibold">Description</h4>

            <p className="leading-7 text-text-muted">{property.description}</p>
          </section>

          {/* Amenities */}

          {property.amenities?.length > 0 && (
            <section>
              <h4 className="mb-3 font-semibold">Amenities</h4>

              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity: string) => (
                  <span key={amenity} className="ls-badge ls-badge-info">
                    {amenity}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Owner */}

          <section>
            <h4 className="mb-3 font-semibold">Owner Information</h4>

            <div className="ls-card flex items-center gap-4 p-4">
              {property.owner?.profileImage?.url ? (
                <img
                  src={property.owner.profileImage.url}
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                  <User />
                </div>
              )}

              <div>
                <p className="font-semibold">
                  {formatOwnerName(property.owner)}
                </p>

                <p className="text-sm text-text-muted">
                  {property.owner?.email}
                </p>
              </div>
            </div>
          </section>

          {/* Timeline */}

          <section className="space-y-4">
            <h4 className="font-semibold">Timeline</h4>

            <div className="flex items-start gap-4">
              <Calendar size={20} />

              <div>
                <p className="text-xs uppercase text-text-muted">Created At</p>

                <p>{new Date(property.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {property.verifiedAt && (
              <div className="flex items-start gap-4">
                <CheckCircle size={20} className="text-green-500" />

                <div>
                  <p className="text-xs uppercase text-text-muted">
                    Approved At
                  </p>

                  <p>{new Date(property.verifiedAt).toLocaleDateString()}</p>
                </div>
              </div>
            )}

            {property.verificationRejectedReason && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-900/20">
                <p className="font-medium text-red-600">Rejection Reason</p>

                <p className="mt-2 text-sm">{property.verificationRejectedReason}</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

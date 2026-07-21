import { AlertCircle, Home } from "lucide-react";
import React, { useState } from "react";
import { PropertiesFilterBar } from "../components/properties/PropertiesFilterBar";
import { PropertiesTable } from "../components/properties/PropertiesTable";
import { PropertyVerificationModal } from "../components/properties/PropertyVerificationModal";
import { useProperties } from "../hooks/useProperties";
import type { IProperty } from "../types/properties.types";

export const Properties: React.FC = () => {
  const {
    properties,
    isLoading,
    error,
    filter,
    handleFilterChange,
    approveProperty,
    rejectProperty,
    hideProperty,
    restoreProperty,
  } = useProperties();

  console.log("ADMIN properites:", properties);

  // Local UI State for Modal and View Drawer
  const [selectedPropertyForReject, setSelectedPropertyForReject] =
    useState<IProperty | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);

  // Note: Ready for a PropertyDetailsDrawer if you decide to implement one
  const [selectedPropertyForView, setSelectedPropertyForView] =
    useState<IProperty | null>(null);

  // --- View Handlers ---
  const handleViewProperty = (property: IProperty) => {
    setSelectedPropertyForView(property);
    // In the future: setIsViewDrawerOpen(true);
    console.log("View property details:", property);
  };

  // --- Verification & Moderation Handlers ---
  const handleApprove = (propertyId: string) => {
    approveProperty(propertyId);
  };

  const handleHide = (propertyId: string) => {
    hideProperty(propertyId);
  };

  const handleRestore = (propertyId: string) => {
    restoreProperty(propertyId);
  };

  const handleOpenRejectModal = (property: IProperty) => {
    setSelectedPropertyForReject(property);
    setIsRejectModalOpen(true);
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
    setTimeout(() => setSelectedPropertyForReject(null), 300); // Wait for transition
  };

  const handleConfirmReject = (reason: string) => {
    if (selectedPropertyForReject) {
      rejectProperty(selectedPropertyForReject._id, reason);
      handleCloseRejectModal();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in p-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            Property Management
          </h1>
          <p className="text-sm text-text-muted dark:text-text-darkMuted mt-1">
            Review pending listings, and manage active properties on the
            platform.
          </p>
        </div>
      </div>

      {/* Error Boundary / Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Composed Components */}
      <PropertiesFilterBar
        filter={filter}
        onFilterChange={handleFilterChange}
      />

      <PropertiesTable
        properties={properties}
        isLoading={isLoading}
        onView={handleViewProperty}
        onApprove={handleApprove}
        onReject={handleOpenRejectModal}
        onHide={handleHide}
        onRestore={handleRestore}
      />

      <PropertyVerificationModal
        property={selectedPropertyForReject}
        isOpen={isRejectModalOpen}
        onClose={handleCloseRejectModal}
        onConfirm={handleConfirmReject}
      />
    </div>
  );
};

export default Properties;

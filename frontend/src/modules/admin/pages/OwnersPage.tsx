import { AlertCircle, Building2 } from "@/shared/constants/icons";
import React, { useState } from "react";
import { OwnerDetailsDrawer } from "../components/owners/OwnerDetailsDrawer";
import { OwnersFilterBar } from "../components/owners/OwnersFilterBar";
import { OwnersTable } from "../components/owners/OwnersTable";
import { OwnerVerificationModal } from "../components/owners/OwnerVerificationModal";
import { useOwners } from "../hooks";
import type { IOwner } from "../types/owners.types";

export const OwnersPage: React.FC = () => {
  const {
    owners,
    isLoading,
    error,
    filter,
    handleFilterChange,
    approveOwner,
    rejectOwner,
  } = useOwners();

  console.log("All owners:", owners);

  // Local UI State for Modal and Drawer
  const [selectedOwnerForReject, setSelectedOwnerForReject] =
    useState<IOwner | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);

  const [selectedOwnerForView, setSelectedOwnerForView] =
    useState<IOwner | null>(null);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState<boolean>(false);

  // --- View Handlers ---
  const handleViewOwner = (owner: IOwner) => {
    setSelectedOwnerForView(owner);
    setIsViewDrawerOpen(true);
  };

  const handleCloseViewDrawer = () => {
    setIsViewDrawerOpen(false);
    setTimeout(() => setSelectedOwnerForView(null), 300); // Wait for transition
  };

  // --- Verification Handlers ---
  const handleApprove = (ownerId: string) => {
    console.log("handle approved:", ownerId);
    approveOwner(ownerId);
  };

  const handleOpenRejectModal = (owner: IOwner) => {
    setSelectedOwnerForReject(owner);
    setIsRejectModalOpen(true);
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
    setTimeout(() => setSelectedOwnerForReject(null), 300); // Wait for transition
  };

  const handleConfirmReject = (reason: string) => {
    if (selectedOwnerForReject) {
      rejectOwner(selectedOwnerForReject._id, reason);
      handleCloseRejectModal();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in p-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            Owner Management
          </h1>
          <p className="text-sm text-text-muted dark:text-text-darkMuted mt-1">
            View, filter, and verify property owners on the platform.
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
      <OwnersFilterBar filter={filter} onFilterChange={handleFilterChange} />

      <OwnersTable
        owners={owners}
        isLoading={isLoading}
        onView={handleViewOwner}
        onApprove={handleApprove}
        onReject={handleOpenRejectModal}
      />

      <OwnerVerificationModal
        owner={selectedOwnerForReject}
        isOpen={isRejectModalOpen}
        onClose={handleCloseRejectModal}
        onConfirm={handleConfirmReject}
      />

      {/* Inserted OwnerDetailsDrawer */}
      <OwnerDetailsDrawer
        owner={selectedOwnerForView}
        isOpen={isViewDrawerOpen}
        onClose={handleCloseViewDrawer}
      />
    </div>
  );
};

export default OwnersPage;

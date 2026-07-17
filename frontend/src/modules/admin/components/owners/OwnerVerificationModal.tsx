import React, { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";
import type { IOwner } from "../../types/owners.types";

// Helper to safely extract the name from the backend payload
const formatFullName = (name: any): string => {
  if (!name) return "Unknown Owner";
  if (typeof name === "string") return name;
  if (typeof name === "object")
    return (
      `${name.firstName || ""} ${name.lastName || ""}`.trim() || "Unknown Owner"
    );
  return "Unknown Owner";
};

interface OwnerVerificationModalProps {
  owner: IOwner | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const OwnerVerificationModal: React.FC<OwnerVerificationModalProps> = ({
  owner,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setReason("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen || !owner) return null;

  const handleConfirm = () => {
    const trimmedReason = reason.trim();
    if (trimmedReason.length < 5 || trimmedReason.length > 500) {
      setError("Reason must be between 5 and 500 characters.");
      return;
    }
    onConfirm(trimmedReason);
  };

  const displayName = formatFullName(owner.fullName);

  return (
    <div className="ls-overlay" onClick={onClose}>
      <div
        className="ls-modal animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="ls-modal-header">
          <h2 className="text-xl font-semibold text-text-light dark:text-text-dark flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Reject Owner Verification
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-text-muted dark:text-text-darkMuted" />
          </button>
        </div>

        {/* Body */}
        <div className="ls-modal-body space-y-4">
          <p className="text-sm text-text-muted dark:text-text-darkMuted">
            You are about to reject the verification request for{" "}
            <strong className="text-text-light dark:text-text-dark">
              {displayName}
            </strong>
            . This action requires a reason, which will be logged in the system.
          </p>

          <div>
            <label htmlFor="rejectionReason" className="ls-label">
              Reason for Rejection <span className="text-red-500">*</span>
            </label>
            <textarea
              id="rejectionReason"
              className={`ls-textarea ${error ? "border-red-500 focus:ring-red-500" : ""}`}
              placeholder="Explain why this verification is being rejected..."
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError("");
              }}
            />
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
            <p className="text-xs text-text-muted dark:text-text-darkMuted mt-2 text-right">
              {reason.trim().length}/500
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="ls-modal-footer">
          <button onClick={onClose} className="ls-btn-secondary">
            Cancel
          </button>
          <button onClick={handleConfirm} className="ls-btn-danger">
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
};

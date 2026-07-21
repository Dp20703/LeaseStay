import React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Ban,
  RotateCcw,
  Inbox,
  CreditCard,
  Building2,
  User,
} from "lucide-react";
import type { IPayment } from "../../types/payments.types";

const formatFullName = (name: any): string => {
  if (!name) return "Unknown User";
  if (typeof name === "string") return name;
  if (typeof name === "object") {
    return (
      `${name.firstName || ""} ${name.lastName || ""}`.trim() || "Unknown User"
    );
  }
  return "Unknown User";
};

interface PaymentsTableProps {
  payments: IPayment[];
  isLoading: boolean;
}

export const PaymentsTable: React.FC<PaymentsTableProps> = ({
  payments,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="ls-table-wrapper">
        <table className="ls-table">
          <thead>
            <tr>
              <th>Transaction / Order</th>
              <th>Property & Tenant</th>
              <th>Amount & Gateway</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="py-4 px-5">
                  <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </td>
                <td>
                  <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </td>
                <td>
                  <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </td>
                <td>
                  <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </td>
                <td>
                  <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!payments.length) {
    return (
      <div className="ls-card ls-empty flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Inbox className="w-8 h-8 text-text-muted dark:text-text-darkMuted" />
        </div>
        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
          No payments found
        </h3>
        <p className="text-sm text-text-muted dark:text-text-darkMuted">
          Try modifying your filter settings.
        </p>
      </div>
    );
  }

  return (
    <div className="ls-table-wrapper animate-fade-in">
      <table className="ls-table">
        <thead>
          <tr>
            <th>Transaction / Order</th>
            <th>Property & Tenant</th>
            <th>Amount & Gateway</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => {
            const tenantName = formatFullName(payment.tenant?.fullName);

            return (
              <tr key={payment._id}>
                {/* Transaction details */}
                <td>
                  <div>
                    <div className="font-mono text-xs font-semibold text-text-light dark:text-text-dark">
                      {payment.orderId}
                    </div>
                    <div className="text-[11px] text-text-muted dark:text-text-darkMuted truncate max-w-[180px]">
                      Txn: {payment.paymentId || "N/A"}
                    </div>
                  </div>
                </td>

                {/* Property & Tenant */}
                <td>
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-text-light dark:text-text-dark flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-primary" />
                      <span className="truncate max-w-[180px]">
                        {payment.property?.title || "Property"}
                      </span>
                    </div>
                    <div className="text-xs text-text-muted dark:text-text-darkMuted flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-secondary" />
                      <span>{tenantName}</span>
                    </div>
                  </div>
                </td>

                {/* Amount & Gateway */}
                <td>
                  <div>
                    <div className="text-sm font-bold text-text-light dark:text-text-dark">
                      {payment.currency} {payment.amount?.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-text-muted uppercase tracking-wider flex items-center gap-1 mt-0.5">
                      <CreditCard className="w-3 h-3" />
                      <span>
                        {payment.gateway} ({payment.paymentMethod})
                      </span>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`ls-badge ${
                      payment.status === "paid"
                        ? "ls-badge-success"
                        : payment.status === "failed"
                          ? "ls-badge-danger"
                          : payment.status === "refunded"
                            ? "ls-badge-info"
                            : payment.status === "cancelled"
                              ? "ls-badge-neutral"
                              : "ls-badge-warning"
                    }`}
                  >
                    {payment.status === "paid" && (
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                    )}
                    {payment.status === "failed" && (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {payment.status === "refunded" && (
                      <RotateCcw className="w-3 h-3 mr-1" />
                    )}
                    {payment.status === "cancelled" && (
                      <Ban className="w-3 h-3 mr-1" />
                    )}
                    {(payment.status === "pending" ||
                      payment.status === "created") && (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    <span className="capitalize">{payment.status}</span>
                  </span>
                </td>

                {/* Date */}
                <td className="text-xs text-text-muted dark:text-text-darkMuted">
                  {new Date(payment.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

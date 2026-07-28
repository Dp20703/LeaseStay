import { CalendarDays, IndianRupee } from "@/shared/constants/icons";

import type { OwnerPayment } from "../../types/payment.types";
import PaymentStatusBadge from "./PaymentStatusBadge";

interface Props {
  payments: OwnerPayment[];
}

const PaymentTable = ({ payments }: Props) => {
  if (payments.length === 0) {
    return (
      <div className="ls-card flex h-72 items-center justify-center">
        <p className="text-text-muted dark:text-text-darkMuted">
          No payments found.
        </p>
      </div>
    );
  }

  return (
    <div className="ls-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
                Tenant
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
                Property
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
                Method
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment._id}
                className="border-b border-border-light transition hover:bg-surface-light dark:border-border-dark dark:hover:bg-surface-dark"
              >
                {/* Tenant */}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-semibold text-white">
                      {payment.tenant.profileImage?.url ? (
                        <img
                          src={payment.tenant.profileImage.url}
                          alt={payment.tenant.fullName.firstName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        payment.tenant.fullName.firstName.charAt(0)
                      )}
                    </div>

                    <div>
                      <p className="font-medium">
                        {payment.tenant.fullName.firstName}{" "}
                        {payment.tenant.fullName.lastName}
                      </p>

                      <p className="text-xs text-text-muted">
                        {payment.tenant.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Property */}

                <td className="px-6 py-5">
                  <div>
                    <p className="font-medium">{payment.property.title}</p>

                    <p className="text-xs text-text-muted">
                      {payment.property.location}
                    </p>
                  </div>
                </td>

                {/* Amount */}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-1 font-semibold text-green-600">
                    <IndianRupee size={16} />

                    {payment.amount.toLocaleString()}
                  </div>
                </td>

                {/* Method */}

                <td className="px-6 py-5">
                  <span className="rounded-lg bg-surface-light px-3 py-1 text-xs font-medium capitalize dark:bg-surface-dark">
                    {payment.paymentMethod.replace("_", " ")}
                  </span>
                </td>

                {/* Status */}

                <td className="px-6 py-5">
                  <PaymentStatusBadge status={payment.status} />
                </td>

                {/* Date */}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <CalendarDays size={15} />

                    {new Date(payment.createdAt).toLocaleDateString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;

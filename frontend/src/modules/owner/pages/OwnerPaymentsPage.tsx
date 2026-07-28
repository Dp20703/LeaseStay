import { useMemo, useState } from "react";

import PaymentFilter from "../components/payments/PaymentFilters";
import PaymentSummary from "../components/payments/PaymentSummary";
import PaymentTable from "../components/payments/PaymentTable";
import { useOwnerPayments } from "../hooks/useOwnerPayments";

const OwnerPaymentsPage = () => {
  const { payments, summary, loading } = useOwnerPayments();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filteredPayments = useMemo(() => {
    const keyword = search.toLowerCase();

    return payments.filter((payment) => {
      const tenant =
        `${payment.tenant.fullName.firstName} ${payment.tenant.fullName.lastName}`.toLowerCase();

      const property = payment.property.title.toLowerCase();

      const matchesSearch =
        tenant.includes(keyword) || property.includes(keyword);

      const matchesStatus =
        status === "ALL" ||
        payment.status.toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, status]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="ls-spinner" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Payments</h1>

        <p className="mt-2 text-text-muted dark:text-text-darkMuted">
          View and manage all payments received from tenants.
        </p>
      </div>

      {/* Summary */}

      <PaymentSummary summary={summary} />

      {/* Filters */}

      <PaymentFilter
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      {/* Table */}

      <PaymentTable payments={filteredPayments} />
    </div>
  );
};

export default OwnerPaymentsPage;

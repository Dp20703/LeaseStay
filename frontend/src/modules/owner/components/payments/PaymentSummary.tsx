import {
  CheckCircle2,
  Clock3,
  IndianRupee,
  XCircle,
} from "@/shared/constants/icons";

import type { OwnerPaymentSummary } from "../../types/payment.types";

interface Props {
  summary: OwnerPaymentSummary;
}

const PaymentSummary = ({ summary }: Props) => {
  const cards = [
    {
      title: "Total Revenue",
      value: `₹${summary.totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/20",
    },

    {
      title: "Paid",
      value: summary.totalPaid,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/20",
    },

    {
      title: "Pending",
      value: summary.totalPending,
      icon: Clock3,
      color: "text-yellow-600",
      bg: "bg-yellow-100 dark:bg-yellow-900/20",
    },

    {
      title: "Failed",
      value: summary.totalFailed,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100 dark:bg-red-900/20",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="ls-card flex items-center justify-between p-6"
          >
            <div>
              <p className="text-sm text-text-muted dark:text-text-darkMuted">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold">{card.value}</h2>
            </div>

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg}`}
            >
              <Icon size={28} className={card.color} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentSummary;

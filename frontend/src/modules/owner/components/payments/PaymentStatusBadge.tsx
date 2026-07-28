interface Props {
  status: string;
}

const STATUS_STYLES = {
  created: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  paid: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  refunded: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  cancelled: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
} as const;

const PaymentStatusBadge = ({ status }: Props) => {
  const badgeClass =
    STATUS_STYLES[status as keyof typeof STATUS_STYLES] ??
    STATUS_STYLES.pending;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${badgeClass}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
};

export default PaymentStatusBadge;

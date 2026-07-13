interface Props {
  loading: boolean;
  onClick: () => void;
}

const PaymentButton = ({ loading, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="ls-btn-primary w-full"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
};

export default PaymentButton;

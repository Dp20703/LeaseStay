interface Props {
  amount: number;
}

const PaymentSummary = ({ amount }: Props) => {
  return (
    <div className="ls-card">
      <h3>Payment Summary</h3>

      <div className="flex justify-between">
        <span>Total Amount</span>

        <span>₹{amount.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PaymentSummary;

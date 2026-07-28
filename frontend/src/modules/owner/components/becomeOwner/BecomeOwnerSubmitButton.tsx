import type { BecomeOwnerSubmitButtonProps } from "../../types";

const BecomeOwnerSubmitButton = ({ loading }: BecomeOwnerSubmitButtonProps) => {
  return (
    <button
      disabled={loading}
      className="w-full rounded-xl bg-primary hover:bg-primary-dark text-white py-3 font-semibold transition-normal disabled:opacity-60 disabled:cursor-not-allowed shadow-soft"
    >
      {loading ? "Submitting..." : "Apply for Owner"}
    </button>
  );
};

export default BecomeOwnerSubmitButton;

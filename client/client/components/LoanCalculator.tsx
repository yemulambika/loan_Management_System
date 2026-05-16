interface Props {
  amount: number;
  tenure: number;
}

export default function LoanCalculator({ amount, tenure }: Props) {
  const rate = 12;

  const interest = (amount * rate * tenure) / (365 * 100);

  const total = amount + interest;

  return (
    <div className="card mt-6">
      <h2 className="text-xl font-bold mb-4">
        Loan Summary
      </h2>

      <p>Principal: ₹{amount}</p>
      <p>Interest: ₹{interest.toFixed(2)}</p>
      <p>Total Repayment: ₹{total.toFixed(2)}</p>
    </div>
  );
}
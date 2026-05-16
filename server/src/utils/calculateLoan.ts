export const calculateLoan = (
  amount: number,
  tenure: number
) => {
  const rate = 12;

  const interest =
    (amount * rate * tenure) / (365 * 100);

  const totalRepayment = amount + interest;

  return {
    interest,
    totalRepayment,
  };
};
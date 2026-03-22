export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export const seatRows = ['A', 'B', 'C', 'D', 'E', 'F'];

export const seatLabels = seatRows.flatMap((row) =>
  Array.from({ length: 10 }, (_, index) => `${row}${index + 1}`),
);

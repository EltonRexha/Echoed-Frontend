const getDaysInMonth = (
  month: number,
  year: number = new Date().getFullYear()
): number | null => {
  if (month < 1 || month > 12) return null;
  return new Date(year, month, 0).getDate();
};

export default getDaysInMonth;
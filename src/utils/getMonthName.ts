const getMonthName = (month: number): string | null => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return month >= 1 && month <= 12 ? months[month - 1] : null;
};

export default getMonthName;
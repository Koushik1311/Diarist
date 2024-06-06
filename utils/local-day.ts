export const getToday = () => {
  const today = new Date();

  const todate = today.getDate();

  return todate;
};

export const getLocalYear = () => {
  const today = new Date();
  const year = today.getFullYear();

  return year;
};

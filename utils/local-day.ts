const today = new Date();

export const getToday = () => {
  const todate = today.getDate();
  return todate;
};

export const getLocalYear = () => {
  const year = today.getFullYear();
  return year;
};

export const getLocalMonth = () => {
  const month = today.getMonth() + 1;
  return month;
};

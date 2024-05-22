export const getToday = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  return { currentDay, currentMonth };
};

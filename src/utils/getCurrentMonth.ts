import { Months } from "@/constants/months";

export const getCurrentMonth = () => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  return Months[currentMonth];
};

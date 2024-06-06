import { convertTimestampToComponents } from "./convert-timestamp-to-local";

const getMonth = (utcTimestamp: string) => {
  const { month } = convertTimestampToComponents(utcTimestamp);
  return month;
};

const getDay = (utcTimestamp: string) => {
  const { day } = convertTimestampToComponents(utcTimestamp);
  return day;
};

const getYear = (utcTimestamp: string) => {
  const { year } = convertTimestampToComponents(utcTimestamp);
  return year;
};

const getTime = (utcTimestamp: string) => {
  const { time } = convertTimestampToComponents(utcTimestamp);
  return time;
};

const getWeekday = (utcTimeStamp: string) => {
  const { weekday } = convertTimestampToComponents(utcTimeStamp);
  return weekday;
};

export { getMonth, getDay, getYear, getTime, getWeekday };

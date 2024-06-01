export function convertTimestampToComponents(timestamp: string) {
  // Create a new Date object from the timestamp
  const date = new Date(timestamp);

  // Define options for formatting each component
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const weekdayOptions: Intl.DateTimeFormatOptions = { weekday: "long" };
  const yearOptions: Intl.DateTimeFormatOptions = { year: "numeric" };
  const monthOptions: Intl.DateTimeFormatOptions = { month: "short" };
  const dayOptions: Intl.DateTimeFormatOptions = { day: "numeric" };

  // Extract each component using toLocaleDateString or toLocaleTimeString
  const time = date.toLocaleTimeString("en-US", timeOptions);
  const weekday = date.toLocaleDateString("en-US", weekdayOptions);
  const year = date.toLocaleDateString("en-US", yearOptions);
  const month = date.toLocaleDateString("en-US", monthOptions);
  const day = date.toLocaleDateString("en-US", dayOptions);

  return {
    time,
    weekday,
    year,
    month,
    day,
  };
}

export function convertUTCToLocal(utcTimestamp: string): string {
  // Create a Date object from the UTC timestamp
  const utcDate = new Date(utcTimestamp);

  // Get the local time as a string
  const localDateString = utcDate.toLocaleString();

  return localDateString;
}

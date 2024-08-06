import { getToday } from "@/utils/local-day";
import { browserClient } from "@/utils/supabase/client";
import { endOfDay, startOfDay } from "date-fns";

export const fetchAllTimeCapsuleEntries = async () => {
  const supabase = browserClient();

  const { data, error } = await supabase.from("time_capsules").select();

  if (error) {
    console.error("Error getting TimeCapsuleEntry: ", error.message);
    return { error };
  }

  return { data };
};

export const fetchTimeCapsuleEntry = async () => {
  const supabase = browserClient();

  const now = new Date();

  const timestamp = now.toISOString();

  const { data, error } = await supabase
    .from("diary_entries")
    .select()
    .lt("unlock_date", timestamp);

  if (error) {
    console.error("Error getting TimeCapsuleEntry: ", error.message);
    return { error };
  }

  return { data };
};

export const insertTimeCapsuleEntry = async (userId: string) => {
  const supabase = browserClient();

  const { data: timeCapsuleEntry, error: timeCapsuleEntryError } =
    await supabase
      .from("time_capsules")
      .insert({
        title: `Time capsule ${getToday()}`,
        user_id: userId,
      })
      .select();

  if (timeCapsuleEntryError) {
    console.error(
      "Error inserting TimeCapsuleEntry: ",
      timeCapsuleEntryError.message
    );
    return { timeCapsuleEntryError };
  }

  return { timeCapsuleEntry };
};

export const fetchTodaysTimeCapsuleEntry = async () => {
  const supabase = browserClient();

  const today = new Date();
  const start = startOfDay(today);
  const end = endOfDay(today);

  const startDate = start.toISOString();
  const endDate = end.toISOString();

  const { data: todaysTimeCapsuleEntry, error: todaysTimeCapsuleEntryError } =
    await supabase
      .from("time_capsules")
      .select("id")
      .gte("created_at", startDate)
      .lte("created_at", endDate);

  if (todaysTimeCapsuleEntryError) {
    console.error("Error: ", todaysTimeCapsuleEntryError.message);
    return { todaysTimeCapsuleEntryError };
  }

  return { todaysTimeCapsuleEntry };
};

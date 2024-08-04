import { getToday } from "@/utils/local-day";
import { browserClient } from "@/utils/supabase/client";

export const fetchAllTimeCapsuleEntries = async () => {
  const supabase = browserClient();

  const { data, error } = await supabase
    .from("diary_entries")
    .select()
    .eq("is_time_capsule", true);

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

  const { data, error } = await supabase
    .from("diary_entries")
    .insert({
      title: `Time capsule ${getToday()}`,
      user_id: userId,
    })
    .select();

  if (error) {
    console.error("Error inserting TimeCapsuleEntry: ", error.message);
    return { error };
  }

  return { data };
};

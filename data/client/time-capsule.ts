import { browserClient } from "@/utils/supabase/client";

export const insertUnlockDate = async (id: string, unlockDate: string) => {
  const supabase = browserClient();

  const { error } = await supabase
    .from("time_capsules")
    .update({
      unlock_date: unlockDate,
    })
    .eq("id", id)
    .single();

  if (error) {
    return error;
  }
};

export const fetchLockedTimeCapsule = async () => {
  const supabase = browserClient();

  const now = new Date();

  const isoDate = now.toISOString();

  const { data, error } = await supabase
    .from("time_capsules")
    .select()
    .or(`unlock_date.gt.${isoDate},unlock_date.is.null`);

  if (error) {
    console.error("Error getting TimeCapsuleEntry: ", error.message);
    return { error };
  }

  return { data };
};

export const fetchUnlockedTimeCapsule = async () => {
  const supabase = browserClient();

  const now = new Date();

  const isoDate = now.toISOString();

  const { data, error } = await supabase
    .from("time_capsules")
    .select()
    .lte("unlock_date", isoDate)
    .not("unlock_date", "is", null);

  if (error) {
    console.error("Error getting TimeCapsuleEntry: ", error.message);
    return { error };
  }

  return { data };
};

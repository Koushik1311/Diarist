import { browserClient } from "@/utils/supabase/client";

export const insertTimeCapsuleMood = async (
  timeCapsuleId: string,
  moodId: number
) => {
  const supabase = browserClient();

  const { error } = await supabase.from("time_capsules_moods").insert({
    time_capsule_id: timeCapsuleId,
    mood_id: moodId,
  });

  if (error) {
    return { error: error.message };
  }
};

export const fetchMoodId = async (timeCapsuleId: string) => {
  const supabase = browserClient();

  const { data, error } = await supabase
    .from("time_capsules_moods")
    .select("mood_id")
    .eq("time_capsule_id", timeCapsuleId);

  if (error) {
    console.error("Error getting mood_id: ", error.message);
    return { error };
  }

  return { data };
};

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

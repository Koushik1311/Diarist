import { DiaryTypes } from "@/types/diary.types";
import { browserClient } from "@/utils/supabase/client";

const getAllMoods = async () => {
  const supabase = browserClient();

  const { data, error } = await supabase.from("moods").select("id, name");

  if (error) {
    console.error("Error getting moods: ", error.message);
    return { error };
  }

  return { data };
};

const getSingleMood = async (moodId: number) => {
  const supabase = browserClient();

  const { data, error } = await supabase
    .from("moods")
    .select("id, name")
    .eq("id", moodId);

  if (error) {
    console.error("Error getting moods: ", error.message);
    return { error };
  }

  return { data };
};

const getDiaryEntriesByMoodId = async (moodId: number) => {
  const supabase = browserClient();

  const { data: moodIds, error: moodIdError } = await supabase
    .from("diary_entries_moods")
    .select("diary_entry_id")
    .eq("mood_id", moodId);

  if (moodIdError) {
    console.error(moodIdError);
    return [];
  }

  const ids = moodIds.map((id) => id.diary_entry_id);

  const { data: diaryEntry, error: diaryEntryError } = await supabase
    .from("diary_entries")
    .select("*")
    .in("id", ids);

  if (diaryEntryError) {
    console.error("Error fetching data:", diaryEntryError.message);
    return [];
  }

  return diaryEntry as DiaryTypes[];
};

export { getAllMoods, getSingleMood, getDiaryEntriesByMoodId };

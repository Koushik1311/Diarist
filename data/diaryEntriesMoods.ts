import { browserClient } from "@/utils/supabase/client";

const insertRecord = async (diaryEntryId: number, moodId: number) => {
  const supabase = browserClient();

  const user = await supabase.auth.getUser();

  if (!user) {
    console.error("User is not authenticated");
    return { error: "User is not authenticated" };
  }

  const { error } = await supabase.from("diary_entries_moods").insert({
    diary_entry_id: diaryEntryId,
    mood_id: moodId,
  });

  if (error) {
    console.error("Error inserting diary record: ", error.message);
    return { error: error.message };
  }
};

const getMoodId = async (diaryEntryId: number) => {
  const supabase = browserClient();

  const { data, error } = await supabase
    .from("diary_entries_moods")
    .select("mood_id")
    .eq("diary_entry_id", diaryEntryId);

  if (error) {
    console.error("Error getting mood_id: ", error.message);
    return { error };
  }

  return { data };
};

const removeMood = async (diaryEntryId: number, moodId: number) => {
  const supabase = browserClient();

  const response = await supabase
    .from("diary_entries_moods")
    .delete()
    .eq("diary_entry_id", diaryEntryId)
    .eq("mood_id", moodId);

  return response;
};

export { insertRecord, getMoodId, removeMood };

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

export { getAllMoods, getSingleMood };

import { createClient } from "@/utils/supabase/server";

export const fetchSingleEntry = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("diary_entries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Error fetching diary record: ", error.message);
  }

  return data;
};

export const fetchDiaryEntries = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("diary_entries").select();

  if (error) {
    return { error };
  }

  return { data };
};

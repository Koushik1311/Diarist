import { createClient } from "@/utils/supabase/server";

export const fetchInitialTimeCapsuleEntry = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("time_capsules")
    .select()
    .eq("id", id)
    .is("unlock_date", null)
    .single();

  if (error) {
    return { error };
  }

  return { data };
};

export const fetchTimeCapsuleEntry = async (id: string) => {
  const supabase = createClient();

  const now = new Date();

  const timestamp = now.toISOString();

  const { data, error } = await supabase
    .from("time_capsules")
    .select()
    .lte("unlock_date", timestamp)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error getting TimeCapsuleEntry: ", error.message);
    return { error };
  }

  return { data };
};

export const fetchTimeCapsules = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("time_capsules").select();

  if (error) {
    return { error };
  }

  return { data };
};

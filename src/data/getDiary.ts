import { DiaryTypes } from "@/types/diary-types";
import { createClient } from "@/utils/supabase/server";

const getRecords = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("diary_entry")
    .select("*")
    .returns<DiaryTypes[]>();

  if (error) {
    console.log("Error fetching data:", error.message);
  } else if (!data) {
    return null;
  }

  return data;
};

const GetSingleRecord = async (id: number) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("diary_entry")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Error fetching single record:", error.message);
  }

  return data as DiaryTypes;
};

export { getRecords, GetSingleRecord };

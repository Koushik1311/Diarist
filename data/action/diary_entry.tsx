import { DiaryTypes } from "@/types/diary.types";
import { getToday } from "@/utils/local-day";
import { browserClient } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";

const getAllRecords = async (year?: number, month?: number) => {
  const supabase = createClient();

  let startDate: Date, endDate: Date;

  if (year && month) {
    startDate = new Date(year, month - 1, 1);
    endDate = new Date(year, month, 0);
  } else {
    const currentDate = new Date();
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth());
    endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
  }

  const formattedStartOfMonth = startDate.toISOString();
  const formattedEndOfMonth = endDate.toISOString();

  const { data, error } = await supabase
    .from("diary_entries")
    .select("*")
    .gte("created_at", formattedStartOfMonth)
    .lte("created_at", formattedEndOfMonth);

  if (error) {
    console.log("Error fetching diary records: ", error.message);
    return [];
  }

  return data;
};

const getSingleRecord = async (id: string) => {
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

const insertRecord = async (userId: string) => {
  const supabase = createClient();
  const day = getToday();
  const { data, error } = await supabase
    .from("diary_entries")
    .insert({
      title: `Diary Entry ${day}`,
      // created_at: "2024-04-01T03:00:46+00:00",
      user_id: userId,
    })
    .select();

  if (error) {
    console.log("Error inserting diary record: ", error.message);
  }

  return data;
};

const updateContentField = async (id: string, content: string) => {
  const supabase = browserClient();

  const { data, error } = await supabase
    .from("diary_entries")
    .update({ content: content })
    .eq("id", id)
    .select();

  if (error) {
    console.log("Error updating content field: ", error.message);
  }

  return data;
};

export { getAllRecords, getSingleRecord, insertRecord, updateContentField };

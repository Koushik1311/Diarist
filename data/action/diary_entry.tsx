import { DiaryTypes } from "@/types/diary.types";
import { getToday } from "@/utils/local-day";
import { browserClient } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";

const getAllRecords = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("diary_entry").select("*");

  if (error) {
    console.log("Error fetching diary records: ", error.message);
    return [];
  }

  return data as DiaryTypes[];
};

const getSingleRecord = async (id: number) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("diary_entry")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Error fetching diary record: ", error.message);
  }

  return data as DiaryTypes;
};

const insertRecord = async (userId: string) => {
  const supabase = createClient();
  const day = getToday();
  const { data, error } = await supabase
    .from("diary_entry")
    .insert({
      title: `Diary Entry ${day}`,
      user_id: userId,
    })
    .select();

  if (error) {
    console.log("Error inserting diary record: ", error.message);
  }
  return data;
};

const updateContentField = async (id: number, content: string) => {
  const supabase = browserClient();

  const { data, error } = await supabase
    .from("diary_entry")
    .update({ content: content })
    .eq("id", id)
    .select();

  if (error) {
    console.log("Error updating content field: ", error.message);
  }

  return data;
};

const updateIsLockedField = async (id: number, isLocked: boolean) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("diary_entry")
    .update({ is_locked: isLocked })
    .eq("id", id)
    .select();

  if (error) {
    console.log("Error updating is_locked field: ", error.message);
  }

  console.log("is_locked field updated successfully");
};

export {
  getAllRecords,
  getSingleRecord,
  insertRecord,
  updateContentField,
  updateIsLockedField,
};

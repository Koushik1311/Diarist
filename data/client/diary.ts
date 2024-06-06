import { DiaryTypes } from "@/types/diary.types";
import { browserClient } from "@/utils/supabase/client";

export const getAllRecords = async (year?: number, month?: number) => {
  const supabase = browserClient();

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
    .from("diary_entry")
    .select("*")
    .gte("created_at", formattedStartOfMonth)
    .lte("created_at", formattedEndOfMonth);

  if (error) {
    console.log("Error fetching diary records: ", error.message);
    return [];
  }

  return data as DiaryTypes[];
};

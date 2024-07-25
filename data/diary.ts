import { DiaryTypes } from "@/types/diary.types";
import { getToday } from "@/utils/local-day";
import { browserClient } from "@/utils/supabase/client";
import { endOfDay, startOfDay } from "date-fns";

// Insert Diary Entry
const insertRecord = async (userId: string) => {
  const supabase = browserClient();
  const day = getToday();

  const today = new Date();
  const start = startOfDay(today);
  const end = endOfDay(today);

  const startDate = start.toISOString();
  const endDate = end.toISOString();

  // Get the subscription information for the user
  const { data: subscription, error: subError } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (subError) {
    console.error(subError.message);
    return { error: subError.message };
  }

  // Check if the user has created an entry today
  const { data: entriesToday, error: entriesError } = await supabase
    .from("diary_entries")
    .select("*")
    .eq("user_id", userId)
    .gte("created_at", startDate)
    .lte("created_at", endDate);

  if (entriesError) {
    console.error(entriesError.message);
    return { error: entriesError.message };
  }

  const entriesCount = entriesToday ? entriesToday.length : 0;

  if (subscription.lifetime) {
    if (entriesCount > 0 && subscription.entries <= 0) {
      console.log(
        "Lifetime subscribers can only create one free entry per day. Please purchase additional entries if needed."
      );

      return {
        error:
          "Lifetime subscribers can only create one free entry per day. Please purchase additional entries if needed.",
      };
    }

    if (entriesCount > 0 && subscription.entries > 0) {
      // Decrement additional entries
      const { data: updatedSubscription, error: updateError } = await supabase
        .from("subscriptions")
        .update({ entries: subscription.entries - 1 })
        .eq("id", subscription.id);

      if (updateError) {
        console.error(updateError.message);
        return { error: updateError.message };
      }
    }
  } else {
    if (subscription.entries <= 0) {
      console.log("You have no entries left. Please purchase more.");
      return { error: "You have no entries left. Please purchase more." };
    }

    // Decrement the entry count for non-lifetime subscriptions
    const { data: updatedSubscription, error: updateError } = await supabase
      .from("subscriptions")
      .update({ entries: subscription.entries - 1 })
      .eq("id", subscription.id);

    if (updateError) {
      console.error(updateError.message);
      return { error: updateError.message };
    }
  }

  // Create the diary entry
  const { data, error } = await supabase
    .from("diary_entries")
    .insert({
      title: `Diary Entry ${day}`,
      user_id: userId,
    })
    .select();

  if (error) {
    console.error("Error inserting diary record: ", error.message);
    return { error: error.message };
  }

  return { data };
};

// Get single record on client
const getRecordTitle = async (id: number) => {
  const supabase = browserClient();
  const { data, error } = await supabase
    .from("diary_entries")
    .select("title")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Error fetching diary record: ", error.message);
  }

  return data;
};

const deleteRecord = async (id: number) => {
  const supabase = browserClient();
  const { data, error } = await supabase
    .from("diary_entries")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("Error deleting diary record: ", error.message);
    return { error: error.message };
  }

  return { data };
};

// Exports
export { insertRecord, getRecordTitle, deleteRecord };

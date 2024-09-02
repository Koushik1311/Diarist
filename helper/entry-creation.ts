import { fetchTodaysEntry, insertEntry } from "@/data/diary";
import {
  fetchSubscription,
  updateSubscriptionData,
} from "@/data/client/subscription";
import { fetchTodaysTimeCapsuleEntry } from "@/data/timeCapsule";

export const createEntry = async (userId: string) => {
  const { subData, subError } = await fetchSubscription(userId);

  if (subError) {
    return { error: "Error inserting entry." };
  }

  if (subData?.lifetime !== "none") {
    const entryLimit = subData?.daily_entry_limit;

    // get how many entries have been created today
    const { entriesToday, entriesError } = await fetchTodaysEntry();
    const { todaysTimeCapsuleEntry, todaysTimeCapsuleEntryError } =
      await fetchTodaysTimeCapsuleEntry();

    if (entriesError || todaysTimeCapsuleEntryError) {
      return { error: "Error inserting entry." };
    }

    const entriesCount = entriesToday ? entriesToday.length : 0;
    const timeCapsuleEntryCount = todaysTimeCapsuleEntry
      ? todaysTimeCapsuleEntry.length
      : 0;

    // total entries by adding normal entry + time capsule entry + vault entry
    const totalEntry = entriesCount + timeCapsuleEntryCount;

    if (entryLimit! >= totalEntry) {
      const { entryData, entryError } = await insertEntry(userId);

      if (entryError) {
        return {
          error: "Error inserting entry.",
        };
      }

      return { entryData };
    }
    return {
      error:
        "You have reached daily entry limit. Please purchase additional entries if needed.",
    };
  }

  if (subData?.entries! > 0) {
    // let the user insert

    const { updateError } = await updateSubscriptionData({
      userId: userId,
      entries: subData.entries - 1,
    });

    if (updateError) {
      return { error: "Error inserting entry." };
    }

    const { entryData, entryError } = await insertEntry(userId);

    if (entryError) {
      return { error: "Error inserting entry." };
    }

    return { entryData };
  }
  return { error: "You have no entries left. Please purchase more." };
};

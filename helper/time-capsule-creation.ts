import {
  fetchSubscription,
  updateSubscriptionData,
} from "@/data/client/subscription";
import { fetchTodaysEntry } from "@/data/diary";
import {
  fetchTodaysTimeCapsuleEntry,
  insertTimeCapsuleEntry,
} from "@/data/timeCapsule";

export const createTimeCapsule = async (userId: string) => {
  const { subData, subError } = await fetchSubscription(userId);

  if (subError) {
    return { error: "Error inserting Time Capsule." };
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

    // total entries by adding normal entry + time capsule entry
    const totalEntry = entriesCount + timeCapsuleEntryCount;

    if (entryLimit! >= totalEntry) {
      const { timeCapsuleEntry, timeCapsuleEntryError } =
        await insertTimeCapsuleEntry(userId);

      if (timeCapsuleEntryError) {
        return {
          error: "Error inserting Time Capsule.",
        };
      }

      return { timeCapsuleEntry };
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
      return { error: "Error inserting Time Capsule." };
    }

    const { timeCapsuleEntry, timeCapsuleEntryError } =
      await insertTimeCapsuleEntry(userId);

    if (timeCapsuleEntryError) {
      return { error: "Error inserting Time Capsule." };
    }

    return { timeCapsuleEntry };
  }
  return { error: "You have no entries left. Please purchase more." };
};

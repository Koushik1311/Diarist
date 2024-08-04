import { fetchTodaysEntry, insertEntry } from "@/data/diary";
import {
  fetchSubscription,
  updateSubscriptionData,
} from "@/data/client/subscription";

export const createEntry = async (userId: string) => {
  const { subData, subError } = await fetchSubscription(userId);

  if (subError) {
    return { error: "Error inserting record." };
  }

  if (subData?.lifetime === "none") {
    const entryLimit = subData?.daily_entry_limit;

    // get how many entries have been created today
    const { entriesToday, entriesError } = await fetchTodaysEntry();

    if (entriesError) {
      return { error: "Error inserting record." };
    }

    const entriesCount = entriesToday ? entriesToday.length : 0;

    if (entryLimit! >= entriesCount) {
      const { entryData, entryError } = await insertEntry(userId);

      if (entryError) {
        return {
          error:
            "You have reached daily entry limit. Please purchase additional entries if needed.",
        };
      }

      return { entryData };
    }
  }

  if (subData?.entries! > 0) {
    // let the user insert

    const { updateError } = await updateSubscriptionData({
      userId: userId,
      entries: subData.entries - 1,
    });

    if (updateError) {
      return { error: "Error inserting record." };
    }

    const { entryData, entryError } = await insertEntry(userId);

    if (entryError) {
      return { error: "Error inserting record." };
    }

    return { entryData };
  }
  return { error: "You have no entries left. Please purchase more." };
};

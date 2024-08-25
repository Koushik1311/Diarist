import {
  fetchAllPrivateMemoryVaultEntries,
  fetchTodaysPrivateMemoryVaultEntry,
  insertVaultEntry,
} from "@/data/client/private-memory-vault";
import {
  fetchSubscription,
  updateSubscriptionData,
} from "@/data/client/subscription";
import { fetchTodaysEntry } from "@/data/diary";
import { fetchTodaysTimeCapsuleEntry } from "@/data/timeCapsule";

export const createVaultEntry = async (userId: string, key: string) => {
  const { subData, subError } = await fetchSubscription(userId);

  if (subError) {
    return { error: "Error creating entry." };
  }

  if (subData?.lifetime !== "none") {
    const entryLimit = subData?.daily_entry_limit;

    // get how many entries have been created today
    const { entriesToday, entriesError } = await fetchTodaysEntry();
    const { todaysTimeCapsuleEntry, todaysTimeCapsuleEntryError } =
      await fetchTodaysTimeCapsuleEntry();
    const { todaysVaultEntry, todaysVaultEntryError } =
      await fetchTodaysPrivateMemoryVaultEntry();

    if (entriesError || todaysTimeCapsuleEntryError || todaysVaultEntryError) {
      return { error: "Error creating entry." };
    }

    const entriesCount = entriesToday ? entriesToday.length : 0;
    const timeCapsuleEntryCount = todaysTimeCapsuleEntry
      ? todaysTimeCapsuleEntry.length
      : 0;
    const vaultEntryCount = todaysVaultEntry ? todaysVaultEntry.length : 0;

    // total entries by adding normal entry + time capsule entry + vault entry
    const totalEntry = entriesCount + timeCapsuleEntryCount + vaultEntryCount;

    // get total vault entry count
    const { vaultTotalCount, vaultError } =
      await fetchAllPrivateMemoryVaultEntries(userId);

    if (vaultError || vaultTotalCount === null) {
      return {
        error: "Error creating entry.",
      };
    }

    //   if vault entry limit is reeached
    if (vaultTotalCount <= subData.vault_entry_limit) {
      return {
        error: "You have reached your private memory vault entry limit",
      };
    }

    // check todays entry limit

    if (entryLimit <= totalEntry) {
      // true - check if entries is lesthan or equal to 0
      if (subData?.entries <= 0) {
        return {
          error:
            "You have reached daily entry limit. And also have no entries left. Please purchase more.",
        };
      }

      const { updateError } = await updateSubscriptionData({
        userId: userId,
        entries: subData.entries - 1,
      });

      if (updateError) {
        return {
          error: "Error creating entry.",
        };
      }

      const { entryData, entryError } = await insertVaultEntry(userId, key);

      if (entryError) {
        return {
          error: "Error creating entry.",
        };
      }

      return { entryData };
    }

    const { entryData, entryError } = await insertVaultEntry(userId, key);

    if (entryError) {
      return {
        error: "Error creating entry.",
      };
    }

    return { entryData };
  }
};

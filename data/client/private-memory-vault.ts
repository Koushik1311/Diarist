import { getToday } from "@/utils/local-day";
import { browserClient } from "@/utils/supabase/client";
import { endOfDay, startOfDay } from "date-fns";

const fetchTodaysPrivateMemoryVaultEntry = async () => {
  const supabase = browserClient();

  const today = new Date();
  const start = startOfDay(today);
  const end = endOfDay(today);

  const startDate = start.toISOString();
  const endDate = end.toISOString();

  const { data: todaysVaultEntry, error: todaysVaultEntryError } =
    await supabase
      .from("private_memory_vault")
      .select("id")
      .gte("created_at", startDate)
      .lte("created_at", endDate);

  if (todaysVaultEntryError) {
    console.error("Error: ", todaysVaultEntryError.message);
    return { todaysVaultEntryError };
  }

  return { todaysVaultEntry };
};

const fetchAllPrivateMemoryVaultEntries = async (userId: string) => {
  const supabase = browserClient();
  const {
    data: vaultRecords,
    count: vaultTotalCount,
    error: vaultError,
  } = await supabase
    .from("private_memory_vault")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (vaultError) {
    return { vaultError };
  }

  return { vaultRecords, vaultTotalCount };
};

const insertVaultEntry = async (userId: string, key: string) => {
  const supabase = browserClient();

  const day = getToday();
  //   TODO: Encrypt the key

  const { data: entryData, error: entryError } = await supabase
    .from("private_memory_vault")
    .insert({
      title: `Vault Entry ${day}`,
      user_id: userId,
      encrypted_key: key,
    })
    .select();

  if (entryError) {
    console.error("Error inserting entry: ", entryError.message);

    return { entryError };
  }

  return { entryData };
};

export {
  fetchTodaysPrivateMemoryVaultEntry,
  fetchAllPrivateMemoryVaultEntries,
  insertVaultEntry,
};

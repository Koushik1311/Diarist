import { createClient } from "@/utils/supabase/server";

export const createSubscription = async (userId: string) => {
  const supabase = createClient();

  const { error: subscriptionError } = await supabase
    .from("subscriptions")
    .insert({
      user_id: userId,
      entries: 0,
    })
    .select();

  if (subscriptionError) {
    return { error: subscriptionError.message };
  }
};

export const fetchSubscription = async (userId: string) => {
  const supabase = createClient();
  const { data: subscriptionData, error: subscriptionError } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (subscriptionError) {
    console.error(subscriptionError.message);
    return null;
  }

  return subscriptionData;
};

export const fetchLifetimeStatus = async (userId: string) => {
  const supabase = createClient();

  const { data: lifetimeStatus, error: lifetimeError } = await supabase
    .from("subscriptions")
    .select("lifetime")
    .eq("user_id", userId)
    .single();

  if (lifetimeError) {
    console.error(
      `Error getting lifetime status for user ${userId}: `,
      lifetimeError.message
    );
    return { lifetimeError };
  }

  return { lifetimeStatus };
};

export const fetchSubscriptionCount = async () => {
  const supabase = createClient();

  const { error, count } = await supabase
    .from("subscriptions")
    .select("*", { count: "exact", head: true });

  if (error) {
    return {
      error: "Something went wrong!",
    };
  }

  return { count };
};

export const addEntries = async (entries: number, userId: string) => {
  const supabase = createClient();

  const { data: updateEntries, error: entriesError } = await supabase
    .from("subscriptions")
    .update({
      entries: entries,
    })
    .eq("user_id", userId)
    .select();

  if (entriesError) {
    return {
      entriesError: entriesError.message,
    };
  }

  return { updateEntries };
};

export const fetchEntries = async (userId: string) => {
  const supabase = createClient();

  const { data: entriesData, error: entriesError } = await supabase
    .from("subscriptions")
    .select("entries")
    .eq("user_id", userId)
    .single();

  if (entriesError) {
    return { entriesError };
  }

  return { entriesData };
};

export const updateSubscriptionData = async ({
  bonusEntriesPerYear,
  dailyEntryLimit,
  entries,
  lifetime,
  vaultEntryLimit,
}: {
  bonusEntriesPerYear?: number;
  dailyEntryLimit?: number;
  entries?: number;
  lifetime?: "none" | "basic" | "premium" | "elite";
  vaultEntryLimit?: number;
}) => {
  const supabase = createClient();

  const { data: updateData, error: updateError } = await supabase
    .from("subscriptions")
    .update({
      bonus_entries_per_year: bonusEntriesPerYear,
      daily_entry_limit: dailyEntryLimit,
      entries: entries,
      lifetime: lifetime,
      vault_entry_limit: vaultEntryLimit,
    })
    .eq("id", "189fe927-0d57-48dd-bb43-923d0e3eb18c")
    .select();

  if (updateError) {
    console.error(`Error updating subscription: `, updateError.message);
    return { updateError };
  }

  return { updateData };
};

import { browserClient } from "@/utils/supabase/client";

export const fetchSubscription = async (userId: string) => {
  const supabase = browserClient();

  const { data: subData, error: subError } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (subError) {
    console.error(
      `Error fetching subscription with ${userId}: `,
      subError.message
    );
    return { subError };
  }

  return { subData };
};

export const updateSubscriptionData = async ({
  userId,
  bonusEntriesPerYear,
  dailyEntryLimit,
  entries,
  lifetime,
  vaultEntryLimit,
}: {
  userId: string;
  bonusEntriesPerYear?: number;
  dailyEntryLimit?: number;
  entries?: number;
  lifetime?: "none" | "basic" | "premium" | "elite";
  vaultEntryLimit?: number;
}) => {
  const supabase = browserClient();

  const { data: updateData, error: updateError } = await supabase
    .from("subscriptions")
    .update({
      bonus_entries_per_year: bonusEntriesPerYear,
      daily_entry_limit: dailyEntryLimit,
      entries: entries,
      lifetime: lifetime,
      vault_entry_limit: vaultEntryLimit,
    })
    .eq("user_id", userId)
    .select();

  if (updateError) {
    console.error(
      `Error updating subscription on user ${userId}: `,
      updateError.message
    );
    return { updateError };
  }

  return { updateData };
};

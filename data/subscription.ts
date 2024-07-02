import { SubscriptionTypes } from "@/types/subscription.types";
import { browserClient } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";

const createSubscription = async (userId: string) => {
  const supabase = createClient();
  console.log("User id: ", userId);
  const { error: subscriptionError } = await supabase
    .from("subscriptions")
    .insert({
      user_id: userId,
    })
    .select();

  if (subscriptionError) {
    return { error: subscriptionError.message };
  }
};

const getSubscription = async (userId: string) => {
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

  return subscriptionData as SubscriptionTypes;
};

type UpdateSubscriptionOptions = {
  lifetime?: boolean;
  entries?: number;
};

const updateSubscription = async (
  userId: string,
  options: UpdateSubscriptionOptions = {}
) => {
  const supabase = browserClient();

  // Fetch current subscription data
  const currentSubscription = await getSubscription(userId);

  console.log(`Current subscription for user ${userId}:`, currentSubscription);

  // Determine new values
  const newLifetime =
    options.lifetime !== undefined
      ? options.lifetime
      : currentSubscription?.lifetime;
  const newEntries =
    options.entries !== undefined
      ? currentSubscription?.entries! + options.entries
      : currentSubscription?.entries;

  console.log("New Lifetime: ", newLifetime);
  console.log("New Entries: ", newEntries);

  // Update subscription
  const { data: updateData, error: updateError } = await supabase
    .from("subscriptions")
    .update({
      lifetime: newLifetime,
      entries: newEntries,
    })
    .eq("id", currentSubscription?.id)
    .select();

  if (updateError) {
    console.error("Error updating subscription:", updateError);
  }
  console.log(updateData);
};

// Export
export { createSubscription, getSubscription, updateSubscription };

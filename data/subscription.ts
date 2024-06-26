import { SubscriptionTypes } from "@/types/subscription.types";
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

// Export
export { createSubscription, getSubscription };

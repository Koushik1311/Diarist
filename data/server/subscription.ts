import { createClient } from "@/utils/supabase/server";

export const createSubscription = async (userId: string) => {
  const supabase = createClient();

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

import { browserClient } from "@/utils/supabase/client";

const fetchAllGoalsForTomorrow = async () => {
  const supabase = browserClient();

  const { data, error } = await supabase.from("goals_for_tomorrow").select();

  if (error) {
    return {
      error: "Something went wrong.",
    };
  }

  return { data };
};

const insertGoalsForTomorrow = async (goalData: string, userId: string) => {
  const supabase = browserClient();

  const { data, error } = await supabase
    .from("goals_for_tomorrow")
    .insert({
      goal: goalData,
      user_id: userId,
    })
    .select();

  if (error) {
    return {
      error: "Can not create a new Goals for tomorrow.",
    };
  }

  return { data };
};

const deleteGoalsForTomorrow = async (id: string) => {
  const supabase = browserClient();

  const { error } = await supabase
    .from("goals_for_tomorrow")
    .delete()
    .eq("id", id);

  if (error) {
    return error;
  }
};

export {
  fetchAllGoalsForTomorrow,
  insertGoalsForTomorrow,
  deleteGoalsForTomorrow,
};

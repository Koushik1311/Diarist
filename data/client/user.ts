import { browserClient } from "@/utils/supabase/client";

export const getUserOnClient = async () => {
  const supabase = browserClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

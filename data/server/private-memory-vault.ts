import { createClient } from "@/utils/supabase/server";

const fetchSingleVaultEntry = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("private_memory_vault")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Error fetching diary record: ", error.message);
  }

  return data;
};

export { fetchSingleVaultEntry };

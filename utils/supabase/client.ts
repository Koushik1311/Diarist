import { Database } from "@/types_db";
import { createBrowserClient } from "@supabase/ssr";

export const browserClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

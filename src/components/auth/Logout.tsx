import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default function Logout() {
  const logout = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();

    redirect("/");
  };
  return (
    <form action={logout}>
      <button>Log out</button>
    </form>
  );
}

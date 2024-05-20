import { createClient } from "@/utils/supabase/server";
import React from "react";

export default function GetUser() {
  const getUserBtn = async () => {
    "use server";

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("user: ", user);
  };

  return (
    <form action={getUserBtn}>
      <button>Get User</button>
    </form>
  );
}

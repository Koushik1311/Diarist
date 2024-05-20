import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default function GoogleSignIn() {
  const signIn = async () => {
    "use server";

    // Create a Supabase client
    const supabase = createClient();
    const origin = headers().get("origin");

    // Sign in with Google
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
    } else {
      return redirect(data.url);
    }
  };

  return (
    <form action={signIn}>
      <button>Continue with Google</button>
    </form>
  );
}

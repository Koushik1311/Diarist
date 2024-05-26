import SubmitButton from "@/components/global/SubmitButton";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function SignUp({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const display_name = formData.get("display_name") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name,
        },
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/signup?message=Could not authenticate user");
    }

    return redirect("/signup?message=Check email to continue sign in process");
  };

  return (
    <div>
      <form>
        <label htmlFor="display_name">Full Name</label>
        <input
          type="text"
          name="display_name"
          placeholder="Your full name"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton formAction={signUp} pendingText="Signing Up...">
          Sign Up
        </SubmitButton>
      </form>
    </div>
  );
}

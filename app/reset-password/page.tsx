import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";
import Logo from "@/components/global/Logo";
import AuthButton from "@/components/user/AuthButton";
import SocialAuthentication from "@/components/user/SocialAuthentication";
import { headers } from "next/headers";

export default function ResetPassword({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const passwordReset = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/update-password`,
    });

    if (error) {
      return redirect(`/reset-password?message=${error.message}`);
    }

    return redirect(
      "/reset-password?message=Check email to update your password"
    );
  };

  return (
    <main className="container flex items-center justify-center">
      <Link
        href="/"
        className="fixed top-0 pt-3 left-0 pl-3 lg:pl-6 w-screen bg-white"
      >
        <Logo />
        <div className="border-b mt-3 -ml-6 border-slate-200" />
      </Link>
      <div className="w-[320px] mt-24">
        <p className="text-xl font-semibold mb-6 flex flex-col">
          <span className="text-slate-700">Reset Your Password</span>
          <span className="text-violet-500 text-sm font-medium">
            Type in your email and we'll send you a link to reset your password
          </span>
        </p>

        <form className="flex flex-col gap-1 w-full">
          <label
            htmlFor="email"
            className="text-xs text-slate-500 font-medium mt-10"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email id"
            required
            className="h-9 px-3 text-sm rounded-[6px] border border-slate-200 focus:outline-violet-400"
          />
          <AuthButton
            className="w-full flex items-center justify-center h-9 rounded-[6px] bg-violet-600 hover:bg-violet-500 transition-all duration-150 text-sm font-semibold text-white mt-6"
            formAction={passwordReset}
            pendingText=""
          >
            Send Reset Email
          </AuthButton>
        </form>

        {searchParams.message === "Check email to update your password" ? (
          <p className="text-xs text-center font-medium mt-5 text-violet-600">
            {searchParams.message}
          </p>
        ) : (
          <p className="text-xs text-center font-medium mt-5 text-red-500">
            {searchParams.message}
          </p>
        )}
      </div>
    </main>
  );
}

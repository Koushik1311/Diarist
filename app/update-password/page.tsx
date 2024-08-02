import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";
import Logo from "@/components/global/Logo";
import AuthButton from "@/components/user/AuthButton";
import SocialAuthentication from "@/components/user/SocialAuthentication";

export default async function SignUp({
  searchParams,
}: {
  searchParams: { message: string; code: string };
}) {
  if (!searchParams.code) {
    return redirect("/");
  }
  const passwordUpdate = async (formData: FormData) => {
    "use server";

    const password = formData.get("new_password") as string;
    const confirmPassword = formData.get("new_password2") as string;
    const supabase = createClient();

    if (password !== confirmPassword) {
      return redirect("/update-password?message=Password mismatch");
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return redirect("/update-password?message=Could not change password");
    }

    return redirect(
      "/update-password?message=Email Password has been reset successfully. Log In"
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
          <span className="text-slate-700">Change your Password</span>
          {/* <span className="text-violet-500">Create your Diarist account</span> */}
        </p>

        <form className="flex flex-col gap-1 w-full">
          <label
            htmlFor="new_password"
            className="text-xs text-slate-500 font-medium mt-3"
          >
            New Password
          </label>
          <input
            type="password"
            name="new_password"
            placeholder="Enter your password"
            required
            className="h-9 px-3 text-sm rounded-[6px] border border-slate-200 focus:outline-violet-400"
          />
          <label
            htmlFor="new_password2"
            className="text-xs text-slate-500 font-medium mt-3"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="new_password2"
            placeholder="Re-enter your password"
            required
            className="h-9 px-3 text-sm rounded-[6px] border border-slate-200 focus:outline-violet-400"
          />
          <AuthButton
            className="w-full flex items-center justify-center h-9 rounded-[6px] bg-violet-600 hover:bg-violet-500 transition-all duration-150 text-sm font-semibold text-white mt-6"
            formAction={passwordUpdate}
            pendingText="Signing Up..."
          >
            Sign Up
          </AuthButton>
        </form>

        {searchParams.message === "Password mismatch" ? (
          <p className="text-xs text-center font-medium mt-5 text-red-500">
            {searchParams.message}
          </p>
        ) : searchParams.message === "Could not change password" ? (
          <p className="text-xs text-center font-medium mt-5 text-red-500">
            {searchParams.message}
          </p>
        ) : (
          <p className="text-xs text-center font-medium mt-5 text-violet-600">
            {searchParams.message}
          </p>
        )}

        <p className="text-xs text-center mt-6">
          {/* Already have an Account?{" "} */}
          <Link href="/login" className="text-violet-400 font-medium">
            Log In Now
          </Link>
        </p>
      </div>
    </main>
  );
}

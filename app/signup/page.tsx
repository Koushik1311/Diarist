import SocialAuthButton from "@/components/user/SocialAuthButton";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import React from "react";
import Link from "next/link";
import Logo from "@/components/global/Logo";
import AuthButton from "@/components/user/AuthButton";

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
          <span className="text-slate-700">Make it. Write it.</span>
          <span className="text-purple-400">Create your Diarist account</span>
        </p>
        <form className="flex flex-col gap-1 w-full">
          <div className="flex flex-col gap-2">
            <SocialAuthButton>
              <FcGoogle className="text-lg" />
              <span>Continue with Google</span>
            </SocialAuthButton>
            <SocialAuthButton>
              <FaApple className="text-lg" />
              <span>Continue with Apple</span>
            </SocialAuthButton>
            <SocialAuthButton>
              <IoKey className="text-lg" />
              <span>Continue with SSO</span>
            </SocialAuthButton>
          </div>
          <label
            htmlFor="display_name"
            className="text-xs text-slate-500 font-medium mt-10"
          >
            Full Name
          </label>
          <input
            type="text"
            name="display_name"
            placeholder="Enter your full name"
            required
            className="h-9 px-3 text-sm rounded-[6px] border border-slate-200 focus:outline-purple-400"
          />
          <label
            htmlFor="email"
            className="text-xs text-slate-500 font-medium mt-3"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email id"
            required
            className="h-9 px-3 text-sm rounded-[6px] border border-slate-200 focus:outline-purple-400"
          />
          <label
            htmlFor="password"
            className="text-xs text-slate-500 font-medium mt-3"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="h-9 px-3 text-sm rounded-[6px] border border-slate-200 focus:outline-purple-400"
          />
          <AuthButton
            className="w-full h-9 rounded-[6px] bg-purple-500 hover:bg-fuchsia-500 transition-all duration-150 text-sm font-semibold text-white mt-6"
            formAction={signUp}
            pendingText="Signing Up..."
          >
            Sign Up
          </AuthButton>
        </form>

        <p className="text-xs text-center mt-6">
          Already have an Account?{" "}
          <Link href="/login" className="text-purple-400 font-medium">
            Log In Now
          </Link>
        </p>

        <p className="text-xs text-center mt-12 mb-16">
          By continuing, you acknowledge that you understand and agree to the{" "}
          <Link
            href="/terms&conditions"
            className="text-purple-400 font-medium"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/terms&conditions"
            className="text-purple-400 font-medium"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </main>
  );
}

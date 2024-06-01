import SocialAuthButton from "@/components/user/SocialAuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import React from "react";
import Link from "next/link";
import Logo from "@/components/global/Logo";
import AuthButton from "@/components/user/AuthButton";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/diary");
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
          <span className="text-purple-400">
            Log in to your Diarist account
          </span>
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
            formAction={signIn}
            pendingText="Signing Up..."
          >
            Log In
          </AuthButton>
        </form>

        <p className="text-xs text-center mt-6">
          Don&apos;t have an Account?{" "}
          <Link href="/signup" className="text-purple-400 font-medium">
            Sign Up Now
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

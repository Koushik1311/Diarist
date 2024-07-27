import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { googleAuth, twitterAuth } from "@/utils/auth/social-authentication";

export default function SocialAuthentication() {
  return (
    <form className="flex flex-col gap-1 w-full">
      <div className="flex flex-col gap-2">
        <button
          formAction={googleAuth}
          className="flex gap-1 items-center justify-center h-9 text-slate-700 font-medium text-sm rounded-[6px] border border-slate-200"
        >
          <FcGoogle className="text-lg" />
          <span>Continue with Google</span>
        </button>
        <button
          formAction={twitterAuth}
          className="flex gap-1 items-center justify-center h-9 text-slate-700 font-medium text-sm rounded-[6px] border border-slate-200"
        >
          <FaXTwitter className="text-lg" />
          <span>Continue with X</span>
        </button>
      </div>
    </form>
  );
}

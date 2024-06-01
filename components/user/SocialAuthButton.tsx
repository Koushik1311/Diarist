import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function SocialAuthButton({ children }: Props) {
  return (
    <button className="flex gap-1 items-center justify-center h-9 text-slate-700 font-medium text-sm rounded-[6px] border border-slate-200">
      {children}
    </button>
  );
}

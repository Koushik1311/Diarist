import React from "react";

type RoundedBtnProps = {
  children: React.ReactNode;
  className: string;
};

export default function RoundedBtn({ children, className }: RoundedBtnProps) {
  return (
    <button
      className={`mt-5 inline-block text-base font-medium bg-slate-900 rounded-xl text-slate-50 h-10 px-5 ${className}`}
    >
      {children}
    </button>
  );
}

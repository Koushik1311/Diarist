import React from "react";

type RoundedBtnProps = {
  children: React.ReactNode;
};

export default function RoundedBtn({ children }: RoundedBtnProps) {
  return (
    <button className="mt-5 inline-block text-sm font-bold bg-black rounded-full text-white py-3 px-8">
      {children}
    </button>
  );
}

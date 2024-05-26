import Leftbar from "@/components/layout/Leftbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Diary",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function DiaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <div className="">
        <Leftbar />
      </div>
      <div className="border-r-[1.6px] border-violet-100 h-screen" />

      <div className="flex-1">{children}</div>
    </main>
  );
}

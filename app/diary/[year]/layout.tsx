import Leftbar from "@/components/layout/Leftbar";
import SmallDeviceLeftBar from "@/components/layout/SmallDeviceLeftBar";
import { getUser } from "@/data/User";
import { AlignLeft } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Diary",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function DiaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="flex">
      <div className="absolute top-0 left-0 lg:hidden">
        <SmallDeviceLeftBar user={user} />
      </div>
      <div className="hidden lg:block">
        <Leftbar />
      </div>
      <div className="border-r-[1.6px] border-violet-100 h-screen" />

      <div className="flex-1">{children}</div>
    </main>
  );
}

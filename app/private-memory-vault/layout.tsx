import Leftbar from "@/components/layout/private-memory-vault/Leftbar";
import { fetchSubscription } from "@/data/server/subscription";
import { getUser } from "@/data/User";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Diarist - Private Memory Vault",
};

export default async function DiaryRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    return redirect("/login");
  }
  const subscriptionData = await fetchSubscription(user?.id!);

  if (!subscriptionData) {
    return redirect("/onboarding");
  }

  return (
    <main className="flex">
      <Toaster position="top-right" duration={2000} />

      <Leftbar />
      <div className="border-r-[1.6px] border-zinc-200 h-screen" />

      <div className="flex-1">{children}</div>
      {children}
    </main>
  );
}

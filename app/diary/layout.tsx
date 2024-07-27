import { getUser } from "@/data/User";
import { getSubscription } from "@/data/subscription";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Diarist - My Diary",
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
  const subscriptionData = await getSubscription(user?.id!);

  if (!subscriptionData) {
    return redirect("/onboarding");
  }

  return (
    <>
      <Toaster position="top-right" duration={2000} />
      {children}
    </>
  );
}

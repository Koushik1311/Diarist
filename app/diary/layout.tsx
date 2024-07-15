import { getUser } from "@/data/User";
import { getSubscription } from "@/data/subscription";
import { redirect } from "next/navigation";
import React from "react";

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

  return <>{children}</>;
}

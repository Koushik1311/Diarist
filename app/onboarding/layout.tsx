import SubLinks from "@/components/subscription/SubLinks";
import { getUser } from "@/data/User";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const user = await getUser();
  const { data } = await supabase
    .from("subscriptions")
    .select("id")
    .eq("user_id", user?.id)
    .single();

  if (data) {
    return redirect("/diary");
  }

  return <main className="container">{children}</main>;
}

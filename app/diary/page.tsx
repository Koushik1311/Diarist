import { getUser } from "@/data/User";
import { redirect } from "next/navigation";
import React from "react";

export default async function DiaryPage() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div>
      <h1>Hello {user?.email}, How was your day</h1>
    </div>
  );
}

import LifetimeAccess from "@/components/subscription/LifetimeAccess";
import { getUser } from "@/data/User";
import React from "react";

export default async function LifetimePricingPage() {
  const user = await getUser();
  const isUser = !!user;

  return (
    <div className="flex items-center justify-center lg:h-[90vh]">
      <LifetimeAccess isUser={isUser} userId={user?.id!} />
    </div>
  );
}

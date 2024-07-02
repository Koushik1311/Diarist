import BundlePricing from "@/components/subscription/BundlePricing";
import { getUser } from "@/data/User";
import React from "react";

export default async function BundlePricingPage() {
  const user = await getUser();
  const isUser = !!user;

  return (
    <div className="flex items-center justify-center lg:h-[90vh]">
      <BundlePricing isUser={isUser} />
    </div>
  );
}

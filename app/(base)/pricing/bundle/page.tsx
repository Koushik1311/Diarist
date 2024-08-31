import BundlePricing from "@/components/subscription/BundlePricing";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getUser } from "@/data/User";
import React from "react";

export default async function BundlePricingPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const user = await getUser();
  const isUser = !!user;

  return (
    <div className="flex flex-col items-center justify-center lg:h-[90vh]">
      {searchParams.message && (
        <div className="mt-20">
          <Alert className="border-violet-500">
            <AlertTitle></AlertTitle>
            <AlertDescription>{searchParams.message}</AlertDescription>
          </Alert>
        </div>
      )}
      <BundlePricing isUser={isUser} />
    </div>
  );
}

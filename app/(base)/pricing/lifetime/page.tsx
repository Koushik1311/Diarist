import LifetimeAccess from "@/components/subscription/LifetimeAccess";
import LifetimeUpgrade from "@/components/subscription/LifetimeUpgrade";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getUser } from "@/data/User";
import React from "react";

export default async function LifetimePricingPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const user = await getUser();

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
      {user ? <LifetimeUpgrade userId={user.id} /> : <LifetimeAccess />}
    </div>
  );
}

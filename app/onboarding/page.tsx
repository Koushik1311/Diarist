import { Button } from "@/components/ui/button";
import { getUser } from "@/data/User";
import { createSubscription } from "@/data/subscription";
import { redirect } from "next/navigation";
import React from "react";

export default async function OnboardingPage() {
  const user = await getUser();

  const createBundlePlan = async () => {
    "use server";

    const error = await createSubscription(user?.id!);

    if (error) {
      console.log(error.error);
      return redirect("/onboarding?message=Error choosing a pricing plan");
    }

    return redirect("/pricing/bundle");
  };

  const createLifetimePlan = async () => {
    "use server";

    const error = await createSubscription(user?.id!);

    if (error) {
      console.log(error.error);
      return redirect("/onboarding?message=Error choosing a pricing plan");
    }

    return redirect("/pricing/lifetime");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-6">
        <div className="text-xl font-semibold">
          <h1 className="text-slate-700">Welcome to Diarist!</h1>
          <h2 className="text-violet-500">
            Choose a pricing plan to continue.
          </h2>
        </div>
        <form className="flex gap-3">
          <Button formAction={createBundlePlan}>Bundle</Button>
          <Button formAction={createLifetimePlan} variant="outline">
            Lifetime
          </Button>
        </form>
      </div>
    </div>
  );
}

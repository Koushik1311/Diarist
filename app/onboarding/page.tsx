import { Button } from "@/components/ui/button";
import { getUser } from "@/data/User";
import {
  addEntries,
  createSubscription,
  fetchEntries,
  fetchSubscription,
  fetchSubscriptionCount,
} from "@/data/server/subscription";
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

    const { count, error: countError } = await fetchSubscriptionCount();

    if (countError || count === null || !count) {
      return redirect("/onboarding?message=Error choosing a pricing plan");
    }

    if (count <= 1000) {
      const { entriesData } = await fetchEntries(user?.id!);

      const entries = entriesData?.entries! + 20;

      const { updateEntries, entriesError } = await addEntries(
        entries,
        user?.id!
      );

      if (entriesError) {
        console.log(entriesError);
        return redirect("/onboarding?message=Error choosing a pricing plan");
      }

      return redirect(
        "/pricing/bundle?message=Congrats! You've received 20 free entries as one of Diarist's first 1000 users. Start journaling today!"
      );
    }

    return redirect("/pricing/bundle");
  };

  const createLifetimePlan = async () => {
    "use server";

    const error = await createSubscription(user?.id!);

    if (error) {
      return redirect("/onboarding?message=Error choosing a pricing plan");
    }

    const { count, error: countError } = await fetchSubscriptionCount();

    if (countError || count === null || !count) {
      return redirect("/onboarding?message=Error choosing a pricing plan");
    }

    if (count <= 1000) {
      const { entriesData } = await fetchEntries(user?.id!);

      const entries = entriesData?.entries! + 20;

      const { updateEntries, entriesError } = await addEntries(
        entries,
        user?.id!
      );

      if (entriesError) {
        console.log(entriesError);
        return redirect("/onboarding?message=Error choosing a pricing plan");
      }

      return redirect(
        "/pricing/lifetime?message=Congrats! You've received 20 free entries as one of Diarist's first 1000 users. Start journaling today!"
      );
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

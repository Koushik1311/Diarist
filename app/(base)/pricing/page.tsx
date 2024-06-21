import Bundle from "@/components/subscription/Bundle";
import BundlePricing from "@/components/subscription/BundlePricing";
import LifetimeAccess from "@/components/subscription/LifetimeAccess";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default function Price({
  searchParams,
}: {
  searchParams: { pricing: string };
}) {
  const bundleClick = async () => {
    "use server";

    return redirect("/pricing?pricing=bundle");
  };

  const lifetimeClick = async () => {
    "use server";

    return redirect("/pricing?pricing=lifetime");
  };

  return (
    <main className="container">
      <form className="flex items-center justify-center gap-5 mt-5">
        <Button
          formAction={bundleClick}
          variant={
            searchParams.pricing === "bundle" || !searchParams.pricing
              ? "default"
              : "outline"
          }
        >
          Bundle
        </Button>
        <Button
          formAction={lifetimeClick}
          variant={searchParams.pricing === "lifetime" ? "default" : "outline"}
        >
          Lifetime
        </Button>
      </form>
      <div className="flex items-center justify-center lg:h-[90vh]">
        {searchParams.pricing === "bundle" || !searchParams.pricing ? (
          <BundlePricing />
        ) : searchParams.pricing === "lifetime" ? (
          <LifetimeAccess />
        ) : (
          notFound()
        )}
      </div>
    </main>
  );
}

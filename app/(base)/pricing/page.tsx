import Bundle from "@/components/subscription/Bundle";
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
    <div>
      <form className="flex items-center justify-center gap-5">
        <Button
          formAction={bundleClick}
          className={cn(
            "hover:bg-purple-500 text-white transition-colors",
            searchParams.pricing === "bundle" || !searchParams.pricing
              ? "bg-purple-500"
              : "bg-white text-black"
          )}
        >
          Bundle
        </Button>
        <Button
          formAction={lifetimeClick}
          className={cn(
            "hover:bg-purple-500 text-white transition-colors",
            searchParams.pricing === "lifetime"
              ? "bg-purple-500"
              : "bg-white text-black"
          )}
        >
          Lifetime
        </Button>
      </form>
      <div className="flex items-center justify-center h-[90vh]">
        {searchParams.pricing === "bundle" || !searchParams.pricing ? (
          <Bundle />
        ) : searchParams.pricing === "lifetime" ? (
          <LifetimeAccess />
        ) : (
          notFound()
        )}
      </div>
    </div>
  );
}

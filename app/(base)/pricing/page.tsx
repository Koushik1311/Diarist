import Bundle from "@/components/subscription/Bundle";
import LifetimeAccess from "@/components/subscription/LifetimeAccess";
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
        <button formAction={bundleClick}>Bundle</button>
        <button formAction={lifetimeClick}>Lifetime</button>
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

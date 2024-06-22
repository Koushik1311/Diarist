import SubLinks from "@/components/subscription/SubLinks";
import React from "react";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container">
      <SubLinks />
      {children}
    </main>
  );
}

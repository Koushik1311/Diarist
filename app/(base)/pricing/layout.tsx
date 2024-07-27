import SubLinks from "@/components/subscription/SubLinks";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Diarist - Affordable Plans for Your Personal Digital Diary",
  description:
    "Explore Diarist's pricing plans. Choose the best plan that suits your needs and start your journey with our digital diary today.",
};

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

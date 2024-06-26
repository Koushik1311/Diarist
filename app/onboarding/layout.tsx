import SubLinks from "@/components/subscription/SubLinks";
import React from "react";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container">{children}</main>;
}

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Diarist - Terms and Conditions",
  description:
    "Review the terms and conditions of Diarist to understand the rules and guidelines for using our digital diary platform. Your access and use of Diarist are governed by these terms.",
};

export default function TermsAndConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

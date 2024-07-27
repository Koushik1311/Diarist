import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Diarist - Privacy Policy",
  description:
    "Read the privacy policy of Diarist to understand how we handle your data and protect your privacy. Your personal diary entries are secure with us.",
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

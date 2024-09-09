import { Metadata } from "next";
import React from "react";

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(`${defaultUrl}/signup`),
  title: "Diarist - Sign Up",
  description:
    "Sign up for Diarist to start your journey with your personal digital diary. Create an account to begin journaling and track your milestones.",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { Metadata } from "next";
import React from "react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/signup`
  : "http://localhost:3000/signup";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
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

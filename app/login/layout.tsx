import { Metadata } from "next";
import React from "react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/login`
  : "http://localhost:3000/login";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Diarist - Log In",
  description:
    "Log in to Diarist to access your personal digital diary. Securely sign in to start journaling and track your milestones.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

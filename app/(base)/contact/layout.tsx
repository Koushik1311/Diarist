import { Metadata } from "next";
import React from "react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/contact`
  : "http://localhost:3000/contact";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Diarist - Contact Us",
  description:
    "Get in touch with the Diarist team. Send us your queries, feedback, or support requests. We're here to help you with your digital diary experience.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

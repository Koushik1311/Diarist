import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diarist - Discover the Features of Your Personal Digital Diary",
  description:
    "Learn about the features of Diarist that make it the perfect digital diary. From seamless entries to milestone tracking, explore what Diarist has to offer.",
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

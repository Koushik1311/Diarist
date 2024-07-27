import { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Diarist - Embark on a Journey with Your Personal Digital Diary",
  description:
    "Welcome to the ultimate diary app! Capture your thoughts, track your progress, and achieve new milestones with ease.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

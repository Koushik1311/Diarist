import { Metadata } from "next";

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Diarist - Embark on a Journey with Your Personal Digital Diary",
  description:
    "Welcome to the ultimate diary app! Capture your thoughts, track your progress, and achieve new milestones with ease.",
  openGraph: {
    title: "Diarist - Embark on a Journey with Your Personal Digital Diary",
    description:
      "Welcome to the ultimate diary app! Capture your thoughts, track your progress, and achieve new milestones with ease.",
    locale: "en_US",
    type: "website",
    url: defaultUrl,
    siteName: "Diarist",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

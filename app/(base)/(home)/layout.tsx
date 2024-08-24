import { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Diarist - Embark on a Journey with Your Personal Digital Diary",
  description:
    "Welcome to the ultimate diary app! Capture your thoughts, track your progress, and achieve new milestones with ease.",
  openGraph: {
    title: "Diarist - Embark on a Journey with Your Personal Digital Diary",
    description:
      "Welcome to the ultimate diary app! Capture your thoughts, track your progress, and achieve new milestones with ease.",
    url: defaultUrl,
    siteName: "Diarist",
    images: [
      {
        url: `${defaultUrl}/images/diarist-preview.png`,
        width: 800,
        height: 600,
        alt: "Diarist - Your Personal Digital Diary",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diarist - Embark on a Journey with Your Personal Digital Diary",
    description:
      "Welcome to the ultimate diary app! Capture your thoughts, track your progress, and achieve new milestones with ease.",
    site: "@diaristapp",
    creator: "@diaristapp",
    images: [`${defaultUrl}/font.png`],
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

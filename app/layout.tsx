import { GeistSans } from "geist/font/sans";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { CookiesProvider } from "next-client-cookies/server";
import ReduxProvider from "@/redux/provider";
import { Metadata } from "next";

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL!;

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <CookiesProvider>
          <ReduxProvider>
            <NextTopLoader color="#6366f1" showSpinner={false} />
            {children}
          </ReduxProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}

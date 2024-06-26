import { GeistSans } from "geist/font/sans";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { CookiesProvider } from "next-client-cookies/server";
import ReduxProvider from "@/redux/provider";

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

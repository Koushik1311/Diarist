import { GeistSans } from "geist/font/sans";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { CookiesProvider } from "next-client-cookies/server";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <CookiesProvider>
          <NextTopLoader color="#6366f1" showSpinner={false} />
          {children}
        </CookiesProvider>
      </body>
    </html>
  );
}

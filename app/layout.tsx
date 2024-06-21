import { GeistSans } from "geist/font/sans";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <NextTopLoader color="#6366f1" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}

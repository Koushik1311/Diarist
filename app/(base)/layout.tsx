import Navbar from "@/components/layout/Navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      {children}
    </main>
  );
}

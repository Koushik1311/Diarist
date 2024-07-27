import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      {children}
      <Footer />
    </>
  );
}

import Header from "@/components/layout/Header";
import React from "react";

export default function Baselayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

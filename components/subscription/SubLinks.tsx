"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Sublinks } from "@/constants/sub-links";

export default function SubLinks() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center gap-5 mt-5">
      {Sublinks.map((link, index) => {
        const isActive =
          link.link === "/pricing/bundle"
            ? pathname === link.link
            : pathname.startsWith(link.link);
        return (
          <Link href={link.link} key={index}>
            <Button variant={isActive ? "default" : "outline"}>
              {link.name}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}

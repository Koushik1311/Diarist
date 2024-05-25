import { Navlinks } from "@/constants/nav-links";
import Link from "next/link";
import React from "react";
import GetStartedBtn from "../global/GetStartedBtn";

export default function Navbar() {
  return (
    <div className="container flex items-center justify-between mt-3">
      <h1 className="font-bold text-2xl">LOGO</h1>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-8">
          {Navlinks.map((link, index) => (
            <Link
              href={link.link}
              key={index}
              className="hover:text-violet-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <GetStartedBtn />
      </div>
    </div>
  );
}

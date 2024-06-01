import { Navlinks } from "@/constants/nav-links";
import Link from "next/link";
import React from "react";
import GetStartedBtn from "../global/GetStartedBtn";
import Logo from "../global/Logo";

export default function Navbar() {
  return (
    <div className="container flex items-center justify-between mt-3">
      {/* <h1 className="font-bold text-2xl">LOGO</h1> */}
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex items-center gap-10">
        <div className="lg:flex items-center gap-8 hidden">
          {Navlinks.map((link, index) => (
            <Link
              href={link.link}
              key={index}
              className="hover:text-purple-500 transition-colors duration-150"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <GetStartedBtn className="" />
      </div>
    </div>
  );
}

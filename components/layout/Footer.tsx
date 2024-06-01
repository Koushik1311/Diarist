import React from "react";
import { Navlinks } from "@/constants/nav-links";
import Link from "next/link";
import { PrivacyLinks } from "@/constants/privacy-links";
import FooterLogo from "../global/FooterLogo";

export default function Footer() {
  return (
    <footer className="container mt-16">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-0">
        <div>
          <FooterLogo />
          <p className="mt-5 font-medium text-slate-500">
            Your only personal digital diary space
          </p>
        </div>
        <div className="flex gap-20">
          {/* Links */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold mb-2">Company</p>
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
          <div className="flex flex-col gap-2">
            <p className="font-semibold mb-2">Privacy</p>
            {PrivacyLinks.map((link, index) => (
              <Link
                href={link.link}
                key={index}
                className="hover:text-purple-500 transition-colors duration-150"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-b border-slate-200 mt-10" />
      <p className="text-sm text-slate-500 my-5 text-center">
        Copyright 2024 &copy; Diarist
      </p>
    </footer>
  );
}

import { Navlinks } from "@/constants/nav-links";
import Link from "next/link";
import React from "react";
import GetStartedBtn from "../global/GetStartedBtn";
import Logo from "../global/Logo";
import { getUser } from "@/data/User";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import SmallDeviceNavBar from "./SmallDeviceNavBar";

export default async function Navbar() {
  const user = await getUser();

  return (
    <div className="container flex items-center justify-between mt-3">
      {/* <h1 className="font-bold text-2xl">LOGO</h1> */}
      <div className="flex items-center justify-center gap-2 lg:gap-0">
        <div className="lg:hidden">
          <SmallDeviceNavBar />
        </div>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center gap-10">
        <div className="lg:flex items-center gap-8 hidden">
          {Navlinks.map((link, index) => (
            <Link
              href={link.link}
              key={index}
              className="hover:text-violet-500 transition-colors duration-150"
            >
              {link.name}
            </Link>
          ))}
        </div>
        {user ? (
          <Link href="/diary">
            <Button>My diary</Button>
          </Link>
        ) : (
          <GetStartedBtn className="" />
        )}
      </div>
    </div>
  );
}

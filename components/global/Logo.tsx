import Image from "next/image";
import React from "react";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

type Props = {
  className: string;
};

export default function Logo({ className }: Props) {
  return (
    <div className={`${className} ${pacifico.className} flex items-end`}>
      <Image
        width={40}
        height={90}
        src="/logo.svg"
        alt="logo"
        quality={100}
        className="w-auto h-9"
      />
      <span className="text-lg text-[#4c3e4d]">Diarist</span>
    </div>
  );
}

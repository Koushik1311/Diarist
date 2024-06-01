import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  className: string;
};

export default function GetStartedBtn({ className }: Props) {
  return (
    <Link href="/signup">
      {/* <Button className="bg-gradient-to-r from-violet-400 to-rose-300 hover:bg-gradient-to-r hover:from-violet-500 hover:to-rose-400 transition-all duration-700 ease-in-out"> */}
      <Button
        className={`${className} bg-purple-500 hover:bg-fuchsia-500 transition-all duration-150`}
      >
        Get started
      </Button>
    </Link>
  );
}

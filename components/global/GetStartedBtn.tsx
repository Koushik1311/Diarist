import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function GetStartedBtn() {
  return (
    <Link href="/signup">
      <Button className="bg-violet-400">Get started</Button>
    </Link>
  );
}

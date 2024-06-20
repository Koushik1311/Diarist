import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  className: string;
  variantName?: "default" | "outline";
};

export default function GetStartedBtn({ className, variantName }: Props) {
  return (
    <Link href="/signup">
      <Button className={`${className}`} variant={variantName || "default"}>
        Get started
      </Button>
    </Link>
  );
}

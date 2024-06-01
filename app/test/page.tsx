import { getToday } from "@/utils/local-day";
import React from "react";

export default function page() {
  getToday();

  return <div>page</div>;
}

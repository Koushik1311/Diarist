"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function useMonths() {
  const month = useSelector((state: RootState) => state.monthResucer.value);

  return month;
}

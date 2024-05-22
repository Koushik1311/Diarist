"use client";

import { useParams } from "next/navigation";
import React from "react";

export default function useNavigation() {
  const diaryParam = useParams();
  return diaryParam;
}

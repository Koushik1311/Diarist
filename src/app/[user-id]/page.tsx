"use client";

import BigAddButton from "@/components/global/BigAddButton";
import useMonths from "@/hooks/useMonths";
import React from "react";

export default function MyDiary() {
  const month = useMonths();

  const clickMe = () => {
    console.log(month);
  };

  return (
    <div className="h-screen">
      <h1 className="text-4xl font-semibold">
        Hello Koushik, How was your day?
      </h1>

      {/* Add Button */}
      <div className="absolute bottom-12 right-10">
        <BigAddButton />
      </div>
    </div>
  );
}

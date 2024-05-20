"use client";

import { onAddButtonClick } from "@/utils/onAddButtonClick";
import React from "react";
import { IoCreateOutline } from "react-icons/io5";

export default function AddButton() {
  return (
    <button
      onClick={onAddButtonClick}
      className="w-7 h-7 hover:bg-slate-200 flex items-center justify-center rounded-sm transition-colors"
    >
      <IoCreateOutline className="text-xl" />
    </button>
  );
}

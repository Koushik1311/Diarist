import { onAddButtonClick } from "@/utils/onAddButtonClick";
import React from "react";
import { IoPencilOutline } from "react-icons/io5";

export default function BigAddButton() {
  return (
    <button
      onClick={onAddButtonClick}
      className="w-14 h-14 bg-gray-700 flex items-center justify-center rounded-full hover:bg-gray-900 transition-colors"
    >
      <IoPencilOutline className="text-2xl text-white" />
    </button>
  );
}

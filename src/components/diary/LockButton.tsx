"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LockButton() {
  const [buttonPosition, setButtonPosition] = useState<string>("left-[2px]");
  const [bgColor, setBgColor] = useState<string>("bg-slate-400");

  const lockButtonClick = () => {
    if (buttonPosition === "left-[2px]") {
      setButtonPosition("right-[2px]");
      setBgColor("bg-orange-600");
    } else if (buttonPosition === "right-[2px]") {
      setButtonPosition("left-[2px]");
      setBgColor("bg-slate-400");
    }
  };

  return (
    <motion.button
      className={`relative w-[34px] h-[20px] ${bgColor} rounded-full`}
      onClick={lockButtonClick}
    >
      <div
        className={`absolute top-[2px] ${buttonPosition} w-4 h-4 bg-white rounded-full`}
      />
    </motion.button>
  );
}

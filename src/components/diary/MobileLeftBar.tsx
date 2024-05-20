"use client";

import React, { useState } from "react";
import LeftBar from "./LeftBar";

export default function MobileLeftBar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const showMenuToggoleBtnClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <button
        onClick={showMenuToggoleBtnClick}
        className="fixed lg:hidden left-4 top-6"
      >
        <div className="border-2 border-gray-700 w-7" />
        <div className="border-2 border-gray-700 w-7 my-1" />
        <div className="border-2 border-gray-700 w-7" />
      </button>
      {showMenu && <div className="bg-white h-screen w-screen absolute"></div>}
    </>
  );
}

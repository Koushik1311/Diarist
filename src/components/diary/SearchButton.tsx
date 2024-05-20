"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchButton() {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const onSearchBtnClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowSearchBar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onSearchBtnClick}
        className="w-7 h-7 hover:bg-slate-200 flex items-center justify-center rounded-sm transition-colors"
      >
        <IoSearchOutline className="text-xl" />
      </button>

      <div className="relative z-50">
        {showSearchBar && (
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search by day"
            className="absolute top-0 -left-32 bg-white text-gray-700 rounded-md px-2 py-1 text-sm font-normal border ring-0 focus:outline-none"
          />
        )}
      </div>
    </div>
  );
}

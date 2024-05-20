"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import DateDropDown from "../global/DateDropDown";
import MonthDropDown from "../global/MonthDropDown";

type Props = {
  className: string;
};

export default function FilterButton({ className }: Props) {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const onFilterBtnClick = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowFilter(false);
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
        onClick={onFilterBtnClick}
        className={`${className} w-7 h-7 hover:bg-slate-200 flex items-center justify-center rounded-sm transition-colors`}
      >
        <IoFilterOutline className="text-xl" />
      </button>

      <div className="relative z-50">
        {showFilter && (
          <div className="absolute top-0 right-0 bg-white text-gray-700 rounded-md px-[2px] py-2 border border-slate-300 text-sm font-normal shadow-[0px_10px_20px_5px_#00000024]">
            <div className="flex">
              <DateDropDown />
              <MonthDropDown />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

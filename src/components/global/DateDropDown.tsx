"use client";

import { getYears } from "@/constants/years";
import useYears from "@/hooks/useYears";
import { updateYear } from "@/redux/features/year-slice";
import { AppDispatch } from "@/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";

export default function DateDropDown() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const year = useYears();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const visibleToggole = () => {
    setIsVisible(!isVisible);
  };

  const onButtonClick = (value: number) => {
    dispatch(updateYear(value));
    setIsVisible(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={visibleToggole}
        className="flex items-center space-x-1 text-gray-700 text-sm hover:bg-slate-200 transition-colors h-6 px-1 rounded-sm"
      >
        <span>{year.year}</span>
        <IoIosArrowDown className="text-base" />
      </button>

      {isVisible && (
        <ul className="absolute top-8 bg-white text-gray-700 rounded-md px-[2px] py-2 border border-slate-300 text-sm font-normal shadow-[0px_10px_20px_5px_#00000024]">
          {getYears.map((year, index) => (
            <li key={index}>
              <button
                onClick={() => onButtonClick(year)}
                className="h-7 px-[10px] hover:bg-slate-200 w-full text-start"
              >
                {year}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

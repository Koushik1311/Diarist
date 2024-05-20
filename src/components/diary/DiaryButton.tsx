"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function DiaryButton() {
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const onButtonClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShow(false);
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
        onClick={onButtonClick}
        className="flex items-center justify-start space-x-2"
      >
        {/* TODO: Make me dunamic */}
        <p className="w-6 h-6 bg-slate-200 flex items-center justify-center text-sm font-medium text-gray-500 rounded-md">
          K
        </p>
        <p className="text-sm font-medium">My Diary</p>
        <IoIosArrowDown className="text-base text-gray-500" />
      </button>

      {show && (
        <div className="absolute w-[300px] top-7 left-0 bg-white text-gray-700 rounded-md px-[2px] py-2 border border-slate-300 text-sm font-normal shadow-[0px_10px_20px_5px_#00000024]">
          <p className="text-xs text-gray-500 py-1 px-2">
            koushik.roy@gmail.com
          </p>
          <div className="flex items-center space-x-3 ml-4 mt-1 py-1">
            <p className="w-8 h-8 bg-slate-200 flex items-center justify-center text-xl font-medium text-gray-500 rounded-md">
              K
            </p>
            <div className="flex flex-col">
              <p className="text-sm font-normal">Koushik Roy&apos;s Diary</p>
              <span className="text-xs font-light">Trial Plan</span>
            </div>
          </div>

          <div className="border-b border-gray-200 -mx-[2px] my-1" />

          <Link href="/my-diary" onClick={() => setShow(false)}>
            <p className="h-7 px-3 flex items-center hover:bg-slate-200 rounded-md text-xs font-normal">
              Log out
            </p>
          </Link>

          <div className="border-b border-gray-200 -mx-[2px] my-1" />
          <Link href="/123123sds" onClick={() => setShow(false)}>
            <p className="h-7 px-3 flex items-center hover:bg-slate-200 rounded-md text-xs font-normal">
              Go to diary cover
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}

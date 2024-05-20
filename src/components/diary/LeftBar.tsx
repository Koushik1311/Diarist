import Link from "next/link";
import React from "react";
import AddButton from "../global/AddButton";
import FilterButton from "./FilterButton";
import DiaryButton from "./DiaryButton";
import { IoIosBookmark } from "react-icons/io";
import SearchButton from "./SearchButton";

export default function LeftBar() {
  return (
    <div className="w-64">
      <div className="flex items-center justify-between mt-2 cursor-pointer h-8  rounded-md px-2">
        <DiaryButton />
        <div className="flex items-center space-x-1">
          {/* <SearchButton /> */}
          <FilterButton className="transition-all" />
          <AddButton />
        </div>
      </div>
      <div className="w-64 mt-6">
        <Link href="/my-diary/ddd">
          <div className="flex flex-col bg-slate-100 hover:bg-slate-200 px-2 rounded-md h-14 justify-center">
            <div className="flex items-center space-x-1">
              <IoIosBookmark className="text-sm text-orange-400" />
              <span className="text-base font-medium">Day 1</span>
            </div>
            <div className="text-xs font-light text-gray-800 pl-[2px]">
              17 May, 2024
            </div>
          </div>
        </Link>
        <Link href="/my-diary/ddd">
          <div className="flex flex-col hover:bg-slate-200 px-2 rounded-md mb-2 h-14 justify-center">
            <div className="flex items-center space-x-1">
              <IoIosBookmark className="text-sm text-orange-400" />
              <span className="text-base font-medium">Day 1</span>
            </div>
            <div className="text-xs font-light text-gray-800 pl-[2px]">
              17 May, 2024
            </div>
          </div>
        </Link>
        <Link href="/my-diary/ddd">
          <div className="flex flex-col hover:bg-slate-200 px-2 rounded-md mb-2 h-14 justify-center">
            <div className="flex items-center space-x-1">
              <IoIosBookmark className="text-sm text-orange-400" />
              <span className="text-base font-medium">Day 1</span>
            </div>
            <div className="text-xs font-light text-gray-800 pl-[2px]">
              17 May, 2024
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

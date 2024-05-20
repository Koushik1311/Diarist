"use client";

import { updateColor } from "@/redux/features/bookmark-slice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { IoIosBookmark } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function BookmarkBtn() {
  const ref = useRef<HTMLDivElement>(null);
  const [showBookmarkColor, setShowBookmarkColor] = useState<boolean>(false);

  const bookmarkColor = useSelector(
    (state: RootState) => state.bookmarkColorReducer.value
  );

  const dispatch = useDispatch<AppDispatch>();

  const bookmarkButtonClick = () => {
    setShowBookmarkColor(!showBookmarkColor);
  };

  const colorChangeButtonClick = (color: string) => {
    dispatch(updateColor(color));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowBookmarkColor(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="relative">
      <button
        onClick={bookmarkButtonClick}
        className="w-7 h-8 hover:bg-slate-300 flex items-center justify-center rounded-md"
      >
        <IoIosBookmark className={`text-2xl ${bookmarkColor.bookmarkColor}`} />
      </button>

      {showBookmarkColor && (
        <div
          ref={ref}
          className="absolute top-9 left-0 bg-white text-gray-700 rounded-md px-2 py-2 border border-slate-300 shadow-[0px_10px_20px_5px_#00000024] flex flex-col space-y-4"
        >
          <div className="flex space-x-1">
            <IoIosBookmark
              onClick={() => colorChangeButtonClick("text-gray-600")}
              className="text-2xl cursor-pointer text-gray-600"
            />
            <IoIosBookmark
              onClick={() => colorChangeButtonClick("text-gray-400")}
              className="text-2xl cursor-pointer text-gray-400"
            />
            <IoIosBookmark
              onClick={() => colorChangeButtonClick("text-amber-800")}
              className="text-2xl cursor-pointer text-amber-800"
            />
            <IoIosBookmark
              onClick={() => colorChangeButtonClick("text-yellow-600")}
              className="text-2xl cursor-pointer text-yellow-600"
            />
            <IoIosBookmark
              onClick={() => colorChangeButtonClick("text-orange-500")}
              className="text-2xl cursor-pointer text-orange-500"
            />
          </div>
          <div className="flex space-x-1">
            <IoIosBookmark
              onClick={() => colorChangeButtonClick("text-emerald-700")}
              className="text-2xl cursor-pointer text-emerald-700"
            />
            <IoIosBookmark
              onClick={() => colorChangeButtonClick("text-cyan-600")}
              className="text-2xl cursor-pointer text-cyan-600"
            />
            <IoIosBookmark
              onClick={() => colorChangeButtonClick("text-violet-500")}
              className="text-2xl cursor-pointer text-violet-500"
            />
            <IoIosBookmark
              onClick={() => colorChangeButtonClick("text-fuchsia-600")}
              className="text-2xl cursor-pointer text-fuchsia-600"
            />
            <IoIosBookmark
              onClick={() => colorChangeButtonClick("text-rose-500")}
              className="text-2xl cursor-pointer text-rose-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}

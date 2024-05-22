"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Dancing_Script,
  Kalam,
  Roboto_Mono,
  Noto_Serif,
} from "next/font/google";
import { FiMinus, FiPlus } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import FontFamilyBtn from "../global/FontFamilyBtn";
import { RiDeleteBinLine } from "react-icons/ri";
import useItems from "@/hooks/useItems";
import { updateItems } from "@/redux/features/items-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import LockButton from "./LockButton";
import BookmarkBtn from "./BookmarkBtn";

const dancing_script = Dancing_Script({ subsets: ["latin"] });
const roboto_mono = Roboto_Mono({ subsets: ["latin"] });
const kalam = Kalam({ weight: "400", subsets: ["latin"] });
const noto_serif = Noto_Serif({ subsets: ["latin"] });

export default function DiaryPage() {
  const [value, setValue] = useState<string>("");
  const [textareaHeight, setTextareaHeight] = useState<string>("50vh");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const [fontFamily, setFontFamily] = useState(roboto_mono);
  const { page, setPage, pageId, items } = useItems();
  const ref = useRef<HTMLUListElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    const newHeight = event.target.scrollHeight;
    setTextareaHeight(`${newHeight}px`);

    const newValue = event.target.value;
    setPage({
      ...page,
      body: newValue,
    });
    dispatch(
      updateItems(
        items.map((item) =>
          item.id === pageId ? { ...item, body: newValue } : item
        )
      )
    );
  };

  const handleFontFamilyChange = (family: any) => {
    setFontFamily(family);
  };

  const toggleMenuButton = () => {
    setShowMenu(!showMenu);
  };

  const fontSizeIncrement = () => {
    setFontSize(fontSize + 1);
  };

  const fontSizeDecrement = () => {
    setFontSize(fontSize - 1);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="mt-20 mb-20">
      <div className="flex flex-col">
        {/* Date */}
        <p className="text-gray-500 mt-2 text-2xl font-semibold px-4 lg:px-0">
          <span className={dancing_script.className}>
            {/* Day */}
            Saturday
          </span>
          <span className={`${dancing_script.className} text-5xl font-medium`}>
            {" "}
            04
          </span>
        </p>
        <textarea
          value={value}
          onChange={handleChange}
          readOnly={false}
          placeholder="Tell me what you did today"
          className={`${fontFamily.className} mt-5 w-screen px-4 lg:px-0 lg:w-[800px] resize-none border-none ring-0 focus:outline-none`}
          style={{ height: textareaHeight, fontSize: `${fontSize}px` }}
        />
      </div>

      {/* Button */}
      <div className="absolute top-3 left-2 flex items-center space-x-2">
        <BookmarkBtn />
        <span className="text-base font-light text-gray-600">May, 2024</span>
      </div>
      <button
        onClick={toggleMenuButton}
        className="absolute top-5 right-10 group transition-colors w-8 h-7 hover:bg-gray-200 flex items-center justify-center rounded-md"
      >
        <BsThreeDots className="w-7 h-7 text-gray-600 group-hover:text-gray-950 transition-colors" />
      </button>

      {/* Menu */}
      {showMenu && (
        <ul
          className="absolute top-14 right-10 w-60 text-gray-700 rounded-md px-[2px] py-2 border border-slate-300 text-sm font-normal shadow-[0px_10px_20px_5px_#00000024] bg-white"
          ref={ref}
        >
          {/* Font family */}
          <li className="flex items-center justify-between text-3xl px-3">
            <FontFamilyBtn
              className={`${roboto_mono.className} flex flex-col items-center justify-center w-16 h-16 space-y-1 hover:bg-slate-200 rounded-md transition-colors`}
              onClick={() => {
                handleFontFamilyChange(roboto_mono);
              }}
            >
              <span>Ag</span>
              <span className="text-sm font-light">Mono</span>
            </FontFamilyBtn>
            <FontFamilyBtn
              className={`${kalam.className} flex flex-col items-center justify-center w-16 h-16 space-y-1 hover:bg-slate-200 rounded-md transition-colors`}
              onClick={() => {
                handleFontFamilyChange(kalam);
              }}
            >
              <span>Ag</span>
              <span className="text-sm font-light">Hand</span>
            </FontFamilyBtn>
            <FontFamilyBtn
              className={`${noto_serif.className} flex flex-col items-center justify-center w-16 h-16 space-y-1 hover:bg-slate-200 rounded-md transition-colors`}
              onClick={() => {
                handleFontFamilyChange(noto_serif);
              }}
            >
              <span>Ag</span>
              <span className="text-sm font-light">Serif</span>
            </FontFamilyBtn>
          </li>
          <div className="border-b -mx-3 my-3" />

          {/* Font size */}
          <li className="flex items-center justify-between w-full px-[10px]">
            <button onClick={fontSizeDecrement}>
              <FiMinus />
            </button>
            <p>{fontSize}</p>
            <button onClick={fontSizeIncrement}>
              <FiPlus />
            </button>
          </li>
          <div className="border-b -mx-3 my-3" />
          <li className="h-7 flex items-center justify-between hover:bg-slate-200 rounded-sm px-[10px] cursor-pointer">
            <span>Lock page</span>
            <LockButton />
          </li>
          <div className="border-b -mx-3 my-3" />
          <li className="h-7 flex items-center hover:bg-slate-200 rounded-sm px-[10px]">
            <button className="flex flex-row items-center justify-start space-x-2 w-full">
              <RiDeleteBinLine className="text-base" />

              <span>Delete</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

import Link from "next/link";
import React from "react";
import AddButton from "../global/AddButton";
import FilterButton from "./FilterButton";
import DiaryButton from "./DiaryButton";
import { IoIosBookmark } from "react-icons/io";
import SearchButton from "./SearchButton";
import { getRecords } from "@/data/getDiary";
import { convertUTCToLocal } from "@/utils/convert-timestamp";
import DiaryIdBtn from "./DiaryIdBtn";

export default async function LeftBar() {
  const records = await getRecords();

  const getDate = (utcTimestamp: string) => {
    const localTimeStamp = convertUTCToLocal(utcTimestamp);
    return localTimeStamp;
  };

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
        {records?.map((diary, index) => (
          <Link href={`/diary/${diary.id}`} key={index}>
            <DiaryIdBtn id={diary.id}>
              <div className="flex flex-col hover:bg-slate-200 px-2 rounded-md h-14 justify-center">
                <div className="flex items-center space-x-1">
                  <IoIosBookmark className="text-sm text-orange-400" />
                  <span className="text-base font-medium">{diary.title}</span>
                </div>
                <p className="text-xs font-light text-start text-gray-800 pl-[2px]">
                  {getDate(diary.created_at)}
                </p>
              </div>
            </DiaryIdBtn>
          </Link>
        ))}
      </div>
    </div>
  );
}

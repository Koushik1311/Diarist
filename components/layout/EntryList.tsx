"use client";

import { getAllRecords } from "@/data/client/diary";
import { DiaryTypes } from "@/types/diary.types";
import { getDay, getMonth, getYear } from "@/utils/local-date-&-time";
import { ChevronDown, NotebookPen } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Months } from "@/constants/months";
import { getLocalMonth, getLocalYear } from "@/utils/local-day";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function EntryList() {
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [entryRecords, setEntryRecords] = useState<DiaryTypes[]>([]);

  const pathname = usePathname();

  useEffect(() => {
    const getData = async () => {
      let records;
      if (year === undefined && month === undefined) {
        records = await getAllRecords();
      } else {
        records = await getAllRecords(year, month);
      }
      setEntryRecords(records);
    };

    getData();
  }, [year, month]);

  const sortedRecords = entryRecords
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  const onFilterClick = (filterYear: number, filterMonth: number) => {
    setYear(filterYear);
    setMonth(filterMonth);
  };

  const getMonthName = (index: number) => {
    const month = Months.find((m) => m.index === index);
    return month ? month.name : "";
  };

  const colorClasses = [
    "text-emerald-400",
    "text-teal-400",
    "text-cyan-400",
    "text-indigo-400",
    "text-violet-400",
    "text-purple-400",
    "text-fuchsia-400",
    "text-pink-400",
    "text-rose-400",
    "text-rose-600",
    "text-pink-600",
    "text-fuchsia-600",
    "text-purple-600",
    "text-violet-600",
    "text-indigo-600",
    "text-cyan-600",
    "text-teal-600",
    "text-emerald-600",
  ];

  return (
    <>
      <div className="pl-3 pr-1 text-xs font-medium text-zinc-400 mt-2 h-8 flex items-center justify-between rounded-sm">
        <Link href={`/diary/${getLocalYear()}`}>Diaryspace</Link>

        {/* Month & Year */}
        <DropdownMenu>
          <DropdownMenuTrigger className="border-none ring-0 focus:outline-none">
            <div className="h-8 px-2 rounded-sm transition-colors">
              <div className="flex items-center gap-1">
                <span>
                  {!month ? getMonthName(getLocalMonth()) : getMonthName(month)}
                  , {getLocalYear()}
                </span>
                <span>
                  <ChevronDown className="h-4 w-4" />
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="flex items-center justify-center">
              {getLocalYear()}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <ul className="grid grid-cols-4 gap-4">
                {Months.map((month, index) => (
                  <li key={index}>
                    <button
                      onClick={() => onFilterClick(getLocalYear(), month.index)}
                    >
                      {month.name}
                    </button>
                  </li>
                ))}
              </ul>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="-mr-3 flex-1 overflow-y-auto last:pb-6 pr-2">
        {sortedRecords.map((entry, index) => {
          const isActive = pathname.startsWith(`/diary/${entry.id}`);

          const color = colorClasses[index % colorClasses.length];
          return (
            <Link
              key={index}
              href={`/diary/${getLocalYear()}/${entry.id}`}
              className={cn(
                "h-8 hover:bg-zinc-200 flex items-center px-3 rounded-sm",
                isActive && "bg-zinc-200"
              )}
            >
              <div className="">
                <p className="text-sm font-medium flex items-center gap-2">
                  <NotebookPen className={`w-4 h-4 ${color}`} />
                  <span>{entry.title}</span>
                  <span> - </span>
                  <span>{getMonth(entry.created_at)}</span>
                  <span>{getDay(entry.created_at)},</span>
                  <span>{getYear(entry.created_at)}</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

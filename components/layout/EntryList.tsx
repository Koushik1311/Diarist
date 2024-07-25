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
import { browserClient } from "@/utils/supabase/client";
import {
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from "@supabase/supabase-js";

export default function EntryList() {
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [entryRecords, setEntryRecords] = useState<DiaryTypes[]>([]);

  const pathname = usePathname();

  const supabase = browserClient();

  useEffect(() => {
    const channel = supabase
      .channel("realtime entry")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "diary_entries",
        },
        (payload: RealtimePostgresInsertPayload<DiaryTypes>) => {
          setEntryRecords((prevRecords) => [payload.new, ...prevRecords]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "diary_entries",
        },
        (payload: RealtimePostgresUpdatePayload<DiaryTypes>) => {
          setEntryRecords((prevRecords) =>
            prevRecords.map((record) =>
              record.id === payload.new.id ? payload.new : record
            )
          );
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "diary_entries",
        },
        (payload: RealtimePostgresDeletePayload<DiaryTypes>) => {
          setEntryRecords((prevRecords) =>
            prevRecords.filter((record) => record.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

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

  return (
    <>
      <div className="pl-3 pr-1 text-xs font-medium text-zinc-400 mt-2 h-8 flex items-center justify-between rounded-sm">
        <Link href={`/diary/${getLocalYear()}`}>Diaryspace</Link>

        {/* Month & Year */}
        <DropdownMenu>
          <DropdownMenuTrigger className="border-none ring-0 focus:outline-none">
            <div className="h-8 flex items-center px-2 rounded-sm transition-colors">
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
          const isActive = pathname.startsWith(
            `/diary/${getLocalYear()}/${entry.id}`
          );

          return (
            <>
              <Link
                key={index}
                href={`/diary/${getLocalYear()}/${entry.id}`}
                className={cn(
                  "h-14 hover:bg-zinc-200 flex items-center px-3 rounded-sm w-full",
                  isActive && "bg-zinc-200/60"
                )}
              >
                <div className="text-sm font-medium w-full">
                  <div className="flex items-center gap-1 font-bold">
                    <NotebookPen className={`w-[14px] h-[14px]`} />
                    <p className="flex-1 truncate">{entry.title}</p>
                  </div>
                  <div className="text-xs mt-1">
                    <p className="truncate">
                      {getMonth(entry.created_at)} {getDay(entry.created_at)},{" "}
                      {getYear(entry.created_at)}
                    </p>
                  </div>
                </div>
              </Link>
              {!isActive && <div className="border-b border-zinc-200" />}
            </>
          );
        })}
      </div>
    </>
  );
}

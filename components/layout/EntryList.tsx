"use client";

import { getAllRecords } from "@/data/diary";
import { DiaryTypes } from "@/types/diary.types";
import { getDay, getMonth } from "@/utils/local-date-&-time";
import { ChevronDown, NotebookPen } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllMoods, getDiaryEntriesByMoodId } from "@/data/mood";
import { MoodTypes } from "@/types/mood.types";
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
import TimeCapsule from "./left-list/TimeCapsule";

export default function EntryList() {
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [entryRecords, setEntryRecords] = useState<DiaryTypes[]>([]);
  const [filterBox, setFilterBox] = useState<string>("FilterByMood");
  const [moods, setMoods] = useState<MoodTypes[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  // Filter by mood
  useEffect(() => {
    const fetchMoods = async () => {
      const { data } = await getAllMoods();

      if (data) {
        setMoods(data);
      }
    };

    fetchMoods();
  }, []);

  const filterData = async (id: number, name: string) => {
    setFilterBox(name);
    const data = await getDiaryEntriesByMoodId(id);

    if (!data) {
      console.log("Error filtering");
    }
    setEntryRecords(data);
  };

  // Filter moods based on search query
  const filteredMoods = moods.filter((mood) =>
    mood.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="pl-3 pr-1 text-xs font-medium text-zinc-400 mt-2 h-8 flex items-center justify-between rounded-sm">
        {/* Filter by moods */}

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 border-none ring-0 focus:outline-none">
            <span>{filterBox}</span>
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-80 overflow-auto ml-1">
            <div className="p-2">
              <input
                type="text"
                placeholder="Search moods"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                ref={inputRef}
                onBlur={() => inputRef.current?.focus({ preventScroll: true })}
                className="h-9 px-3 text-sm rounded-[6px] border border-zinc-300 focus:outline-none w-full"
              />
            </div>
            {filteredMoods.map((mood) => (
              <DropdownMenuItem key={mood.id}>
                <button onClick={() => filterData(mood.id, mood.name)}>
                  <span>{mood.name}</span>
                </button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

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
            <div key={index}>
              <Link
                key={index}
                href={`/diary/${getLocalYear()}/${entry.id}`}
                className={cn(
                  "h-8 hover:bg-zinc-200/60 flex items-center px-3 rounded-sm w-full",
                  isActive && "bg-zinc-200/50"
                )}
              >
                <div className="text-sm w-full">
                  <div className="flex items-center gap-2 font-medium text-zinc-600">
                    <NotebookPen className={`w-4 h-4`} />
                    <p className="flex-1 truncate">{entry.title}</p>
                    <p className="truncate text-xs">
                      {getMonth(entry.created_at)} {getDay(entry.created_at)}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <TimeCapsule />
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { getAllRecords } from "@/data/diary";
import { getAllMoods, getDiaryEntriesByMoodId } from "@/data/mood";
import { MoodTypes } from "@/types/mood.types";
import { Months } from "@/constants/months";
import { usePathname } from "next/navigation";
import { getDay, getMonth } from "@/utils/local-date-&-time";
import { ChevronDown, NotebookPen } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getLocalMonth, getLocalYear } from "@/utils/local-day";
import { cn } from "@/lib/utils";

type Props = {
  entryRecords: DiaryEntry[];
  setEntryRecords: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
};

export default function NormalEntry({ entryRecords, setEntryRecords }: Props) {
  const [showEntry, setShowEntry] = useState<boolean>(false);
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [filterBox, setFilterBox] = useState<string>("FilterByMood");
  const [moods, setMoods] = useState<MoodTypes[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    <div>
      <div className="pl-3 text-xs font-medium text-zinc-500 mt-2 h-8 flex items-center justify-between rounded-sm w-full">
        <button
          onClick={() => setShowEntry(!showEntry)}
          className="flex-1 text-left"
        >
          <p>Diary Entry</p>
        </button>

        {/* <DropdownMenu>
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
        </DropdownMenu> */}

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

      {showEntry && (
        <div className="">
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
      )}
    </div>
  );
}

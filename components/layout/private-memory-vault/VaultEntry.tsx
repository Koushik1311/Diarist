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
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";

type Props = {
  vaultEntryRecords: PrivateMemoryVaultType[];
  setVaultEntryRecords: React.Dispatch<
    React.SetStateAction<PrivateMemoryVaultType[]>
  >;
};

export default function VaultEntry({
  vaultEntryRecords,
  setVaultEntryRecords,
}: Props) {
  const [showEntry, setShowEntry] = useState<boolean>(true);

  const pathname = usePathname();

  useEffect(() => {
    const storedValue = getFromLocalStorage("show-normal-entry");
    if (storedValue !== null) {
      setShowEntry(JSON.parse(storedValue));
    }
  }, []);

  //   useEffect(() => {
  //     const getData = async () => {
  //         //   TODO: Get all vault records
  //       let records;
  //       if (year === undefined && month === undefined) {
  //         records = await getAllRecords();
  //       } else {
  //         records = await getAllRecords(year, month);
  //       }
  //       setVaultEntryRecords(records);
  //     };

  //     getData();
  //   }, [year, month]);

  //   const sortedRecords = vaultEntryRecords
  //     .slice()
  //     .sort(
  //       (a, b) =>
  //         new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  //     );

  return (
    <div>
      <div className="pl-3 text-xs font-medium text-zinc-500 mt-2 h-8 flex items-center justify-between rounded-sm w-full">
        <button
          onClick={() => {
            setShowEntry(!showEntry);
            saveToLocalStorage("show-normal-entry", JSON.stringify(!showEntry));
          }}
          className="flex-1 text-left"
        >
          <p>Private Memory Vault</p>
        </button>
      </div>

      {/* {showEntry && (
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
      )} */}
    </div>
  );
}

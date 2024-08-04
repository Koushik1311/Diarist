"use client";

import { fetchAllTimeCapsuleEntries } from "@/data/timeCapsule";
import { sortEntries } from "@/helper/sorted-entry";
import { cn } from "@/lib/utils";
import { getDay, getMonth } from "@/utils/local-date-&-time";
import { getLocalYear } from "@/utils/local-day";
import { Timer } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TimeCapsule() {
  const [timeCapsuleEntries, setTimeCapsuleEntries] = useState<DiaryEntry[]>(
    []
  );

  const pathname = usePathname();

  useEffect(() => {
    const getTimeCapsuleEntries = async () => {
      const { data, error } = await fetchAllTimeCapsuleEntries();
      if (error) {
        toast.error("Error getting Time Capsule Entries");
        return [];
      }
      setTimeCapsuleEntries(data);
    };

    getTimeCapsuleEntries();
  }, []);

  const sortedEntries = sortEntries(timeCapsuleEntries);

  return (
    <div>
      <div className="pl-3 pr-1 text-xs font-medium text-zinc-400 mt-2 h-8 flex items-center justify-between rounded-sm">
        <p>Time Capsule</p>

        {/* Notify */}
      </div>

      <div className="-mr-3 flex-1 overflow-y-auto last:pb-6 pr-2">
        {sortedEntries.map((entry, index) => {
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
                    <Timer className={`w-4 h-4`} />
                    <p className="flex-1 truncate">{entry.title}</p>
                    <p className="truncate text-xs">
                      {getMonth(entry.unlock_date!)}{" "}
                      {getDay(entry.unlock_date!)}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import AddTimeCapsuleButton from "@/components/global/AddTimeCapsuleButton";
import { fetchAllTimeCapsuleEntries } from "@/data/timeCapsule";
import { sortEntries } from "@/helper/sorted-entry";
import { cn } from "@/lib/utils";
import { getDay, getMonth } from "@/utils/local-date-&-time";
import { getLocalYear } from "@/utils/local-day";
import { Plus, Timer } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  timeCapsuleEntries: DiaryEntry[];
  setTimeCapsuleEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
};

export default function TimeCapsule({
  timeCapsuleEntries,
  setTimeCapsuleEntries,
}: Props) {
  const [showEntry, setShowEntry] = useState<boolean>(false);

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
      <div
        onClick={() => setShowEntry(!showEntry)}
        className="pl-3 pr-1 text-xs font-medium text-zinc-500 mt-2 h-8 flex items-center justify-between rounded-sm"
      >
        <button
          onClick={() => setShowEntry(!showEntry)}
          className="flex-1 text-left"
        >
          <p>Time Capsule</p>
        </button>

        <div>
          <AddTimeCapsuleButton className="w-6 h-6 hover:bg-zinc-200 flex items-center justify-center rounded-sm">
            <Plus className="h-4 w-4 text-zinc-600" />
          </AddTimeCapsuleButton>
        </div>

        {/* Notify */}
      </div>

      {showEntry && (
        <div>
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
                        {/* {getMonth(entry.unlock_date!)}{" "}
                        {getDay(entry.unlock_date!)} */}
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

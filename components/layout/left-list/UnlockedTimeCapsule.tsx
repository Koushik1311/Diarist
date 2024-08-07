"use client";

import { fetchUnlockedTimeCapsule } from "@/data/client/time-capsule";
import { cn } from "@/lib/utils";
import { getLocalYear } from "@/utils/local-day";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { Pill, Plus, Timer, TimerOff } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  unlockedTimeCapsuleEntries: TimeCapsuleType[];
  setUnlockedTimeCapsuleEntries: React.Dispatch<
    React.SetStateAction<TimeCapsuleType[]>
  >;
};

export default function UnlockedTimeCapsule({
  unlockedTimeCapsuleEntries,
  setUnlockedTimeCapsuleEntries,
}: Props) {
  const [showEntry, setShowEntry] = useState<boolean>(true);

  const pathname = usePathname();

  useEffect(() => {
    const storedValue = getFromLocalStorage("show-unlocked-time-capsule-entry");
    if (storedValue !== null) {
      setShowEntry(JSON.parse(storedValue));
    }
  }, []);

  useEffect(() => {
    const getTimeCapsuleEntries = async () => {
      // const { data, error } = await fetchAllTimeCapsuleEntries();
      const { data, error } = await fetchUnlockedTimeCapsule();

      if (error) {
        toast.error("Error getting Time Capsule Entries");
        return [];
      }
      setUnlockedTimeCapsuleEntries(data);
    };

    getTimeCapsuleEntries();
  }, []);

  const sortEntries = (entries: TimeCapsuleType[]) => {
    return entries
      .slice()
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  };

  const sortedTimeCapsuleEntries = sortEntries(unlockedTimeCapsuleEntries);

  console.log("Show entry:", showEntry);

  return (
    <div>
      <div className="pl-3 pr-1 text-xs font-medium text-zinc-500 mt-2 h-8 flex items-center justify-between rounded-sm">
        <button
          onClick={() => {
            setShowEntry(!showEntry);
            saveToLocalStorage(
              "show-unlocked-time-capsule-entry",
              JSON.stringify(!showEntry)
            );
          }}
          className="flex-1 text-left"
        >
          <p>Unlocked Time Capsule</p>
        </button>
      </div>

      {showEntry && (
        <div>
          {sortedTimeCapsuleEntries.map((entry, index) => {
            const isActive = pathname.startsWith(
              `/diary/${getLocalYear()}/unlocked-time-capsule/${entry.id}`
            );

            return (
              <div key={index}>
                <Link
                  key={index}
                  href={`/diary/${getLocalYear()}/unlocked-time-capsule/${
                    entry.id
                  }`}
                  className={cn(
                    "h-8 hover:bg-zinc-200/60 flex items-center px-3 rounded-sm w-full",
                    isActive && "bg-zinc-200/50"
                  )}
                >
                  <div className="text-sm w-full">
                    <div className="flex items-center gap-2 font-medium text-zinc-600">
                      <Pill className="w-4 h-4" />
                      <p className="flex-1 truncate">{entry.title}</p>
                      {}
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

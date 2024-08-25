"use client";

import AddTimeCapsuleButton from "@/components/global/AddTimeCapsuleButton";
import { fetchLockedTimeCapsule } from "@/data/client/time-capsule";

import { cn } from "@/lib/utils";
import { getLocalYear } from "@/utils/local-day";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { Plus, Timer } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  timeCapsuleEntries: TimeCapsuleType[];
  setTimeCapsuleEntries: React.Dispatch<
    React.SetStateAction<TimeCapsuleType[]>
  >;
};

// Define the shape of the remaining time object
type RemainingTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export default function TimeCapsule({
  timeCapsuleEntries,
  setTimeCapsuleEntries,
}: Props) {
  const [showEntry, setShowEntry] = useState<boolean>(true);
  const [currentTimes, setCurrentTimes] = useState<{
    [key: string]: RemainingTime;
  }>({});
  const pathname = usePathname();

  useEffect(() => {
    const storedValue = getFromLocalStorage("show-time-capsule-entry");
    if (storedValue !== null) {
      setShowEntry(JSON.parse(storedValue));
    }
  }, []);

  useEffect(() => {
    const getTimeCapsuleEntries = async () => {
      // const { data, error } = await fetchAllTimeCapsuleEntries();
      const { data, error } = await fetchLockedTimeCapsule();

      if (error) {
        toast.error("Error getting Time Capsule Entries");
        return [];
      }
      setTimeCapsuleEntries(data);
    };

    getTimeCapsuleEntries();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedTimes = timeCapsuleEntries.reduce((acc, entry) => {
        acc[entry.id] = countdown(entry.unlock_date!);
        return acc;
      }, {} as { [key: string]: RemainingTime });
      setCurrentTimes(updatedTimes);
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [timeCapsuleEntries]);

  const sortEntries = (entries: TimeCapsuleType[]) => {
    return entries
      .slice()
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  };

  const countdown = (timestamp: string): RemainingTime => {
    const now = new Date();
    const targetDate = new Date(timestamp);

    // Calculate the difference in milliseconds
    const differenceInMs = targetDate.getTime() - now.getTime();

    if (differenceInMs <= 0) {
      // If the target date is in the past, return all zeros
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };
    }

    // Calculate time components
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const millisecondsInAnHour = 1000 * 60 * 60;
    const millisecondsInAMinute = 1000 * 60;
    const millisecondsInASecond = 1000;

    const days = Math.floor(differenceInMs / millisecondsInADay);
    const hours = Math.floor(
      (differenceInMs % millisecondsInADay) / millisecondsInAnHour
    );
    const minutes = Math.floor(
      (differenceInMs % millisecondsInAnHour) / millisecondsInAMinute
    );
    const seconds = Math.floor(
      (differenceInMs % millisecondsInAMinute) / millisecondsInASecond
    );
    const milliseconds = Math.floor(differenceInMs % millisecondsInASecond);

    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  };

  const sortedTimeCapsuleEntries = sortEntries(timeCapsuleEntries);

  return (
    <div>
      <div className="pl-3 pr-1 text-xs font-medium text-zinc-500 mt-2 h-8 flex items-center justify-between rounded-sm">
        <button
          onClick={() => {
            setShowEntry(!showEntry);
            saveToLocalStorage(
              "show-time-capsule-entry",
              JSON.stringify(!showEntry)
            );
          }}
          className="flex-1 text-left"
        >
          <p>Time Capsule</p>
        </button>

        <div>
          <AddTimeCapsuleButton className="w-6 h-6 hover:bg-zinc-200 flex items-center justify-center rounded-sm">
            <Plus className="h-4 w-4 text-zinc-600" />
          </AddTimeCapsuleButton>
        </div>
      </div>

      {showEntry && (
        <div>
          {sortedTimeCapsuleEntries.map((entry, index) => {
            const isActive = pathname.startsWith(
              `/diary/${getLocalYear()}/time-capsule/${entry.id}`
            );
            const remainingTime = currentTimes[entry.id];

            const enable = entry.unlock_date === null ? true : false;

            return (
              <div key={index}>
                {enable ? (
                  <Link
                    key={index}
                    href={`/diary/${getLocalYear()}/time-capsule/${entry.id}`}
                    className={cn(
                      "h-8 hover:bg-zinc-200/60 flex items-center px-3 rounded-sm w-full",
                      isActive && "bg-zinc-200/50"
                    )}
                  >
                    <div className="text-sm w-full">
                      <div className="flex items-center gap-2 font-medium text-zinc-600">
                        <Timer className="w-4 h-4" />
                        <p className="flex-1 truncate">{entry.title}</p>
                        {remainingTime ? (
                          <p className="truncate text-xs">
                            {remainingTime.days}d {remainingTime.hours}h{" "}
                            {remainingTime.minutes}m {remainingTime.seconds}s
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div
                    key={index}
                    className={cn(
                      "h-8 flex items-center px-3 rounded-sm w-full cursor-not-allowed"
                    )}
                  >
                    <div className="text-sm w-full">
                      <div className="flex items-center gap-2 font-medium text-zinc-400">
                        <Timer className="w-4 h-4" />
                        <p className="flex-1 truncate font-light">
                          {entry.title}
                        </p>
                        {remainingTime ? (
                          <p className="truncate text-xs text-zinc-600">
                            {remainingTime.days}d {remainingTime.hours}h{" "}
                            {remainingTime.minutes}m {remainingTime.seconds}s
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

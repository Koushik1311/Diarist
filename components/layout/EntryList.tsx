"use client";

import React, { useEffect, useRef, useState } from "react";

import { browserClient } from "@/utils/supabase/client";
import {
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from "@supabase/supabase-js";
import TimeCapsule from "./left-list/TimeCapsule";
import NormalEntry from "./left-list/NormalEntry";
import UnlockedTimeCapsule from "./left-list/UnlockedTimeCapsule";

export default function EntryList() {
  const [entryRecords, setEntryRecords] = useState<DiaryEntryType[]>([]);
  const [timeCapsuleEntries, setTimeCapsuleEntries] = useState<
    TimeCapsuleType[]
  >([]);
  const [unlockedTimeCapsuleEntries, setUnlockedTimeCapsuleEntries] = useState<
    TimeCapsuleType[]
  >([]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const supabase = browserClient();

  // Realtime subscription
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
        (payload: RealtimePostgresInsertPayload<DiaryEntryType>) => {
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
        (payload: RealtimePostgresUpdatePayload<DiaryEntryType>) => {
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
        (payload: RealtimePostgresDeletePayload<DiaryEntryType>) => {
          setEntryRecords((prevRecords) =>
            prevRecords.filter((record) => record.id !== payload.old.id)
          );
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "time_capsules",
        },
        (payload: RealtimePostgresInsertPayload<TimeCapsuleType>) => {
          setTimeCapsuleEntries((prevRecords) => [payload.new, ...prevRecords]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "time_capsules",
        },
        (payload: RealtimePostgresUpdatePayload<TimeCapsuleType>) => {
          setTimeCapsuleEntries((prevEntry) =>
            prevEntry.map((record) =>
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
          table: "time_capsules",
        },
        (payload: RealtimePostgresDeletePayload<TimeCapsuleType>) => {
          setTimeCapsuleEntries((prevEntry) =>
            prevEntry.filter((record) => record.id !== payload.old.id)
          );
          setUnlockedTimeCapsuleEntries((prevEntry) =>
            prevEntry.filter((record) => record.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        if (containerRef.current.scrollTop > 0) {
          containerRef.current.classList.add("border-t", "border-gray-200");
        } else {
          containerRef.current.classList.remove("border-t", "border-gray-200");
        }
      }
    };

    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      className="-mr-3 flex-1 overflow-y-auto pb-5 pr-2 mt-2"
      ref={containerRef}
    >
      <NormalEntry
        entryRecords={entryRecords}
        setEntryRecords={setEntryRecords}
      />
      <TimeCapsule
        timeCapsuleEntries={timeCapsuleEntries}
        setTimeCapsuleEntries={setTimeCapsuleEntries}
      />

      <UnlockedTimeCapsule
        unlockedTimeCapsuleEntries={unlockedTimeCapsuleEntries}
        setUnlockedTimeCapsuleEntries={setUnlockedTimeCapsuleEntries}
      />
    </div>
  );
}

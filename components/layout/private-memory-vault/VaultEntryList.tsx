"use client";

import React, { useEffect, useRef, useState } from "react";

import { browserClient } from "@/utils/supabase/client";
import {
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from "@supabase/supabase-js";
import VaultEntry from "./VaultEntry";

export default function VaultEntryList() {
  const [vaultEntryRecords, setVaultEntryRecords] = useState<
    PrivateMemoryVaultType[]
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
          table: "private_memory_vault",
        },
        (payload: RealtimePostgresInsertPayload<PrivateMemoryVaultType>) => {
          setVaultEntryRecords((prevRecords) => [payload.new, ...prevRecords]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "private_memory_vault",
        },
        (payload: RealtimePostgresUpdatePayload<PrivateMemoryVaultType>) => {
          setVaultEntryRecords((prevRecords) =>
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
          table: "private_memory_vault",
        },
        (payload: RealtimePostgresDeletePayload<PrivateMemoryVaultType>) => {
          setVaultEntryRecords((prevRecords) =>
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
      <VaultEntry
        vaultEntryRecords={vaultEntryRecords}
        setVaultEntryRecords={setVaultEntryRecords}
      />
    </div>
  );
}

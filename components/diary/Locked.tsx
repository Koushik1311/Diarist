"use client";

import { setIsLocked } from "@/redux/features/isLocked.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { browserClient } from "@/utils/supabase/client";
import { RealtimePostgresUpdatePayload } from "@supabase/supabase-js";
import { Lock } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  locked: boolean;
};

export default function Locked({ locked }: Props) {
  const supabase = browserClient();
  const [isLockedState, setIsLockedState] = useState<boolean>(locked);
  const dispatch = useAppDispatch();
  dispatch(setIsLocked(locked));

  useEffect(() => {
    const channel = supabase
      .channel("realtime entry")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "diary_entries",
        },
        (payload: RealtimePostgresUpdatePayload<{ is_locked: boolean }>) => {
          setIsLockedState(payload.new.is_locked);
          dispatch(setIsLocked(payload.new.is_locked));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, dispatch]);

  return (
    <>
      {isLockedState === true && (
        <div className="flex items-center justify-center gap-2 text-zinc-400 font-light">
          <Lock className="w-4 h-4" />
          <span>Locked</span>
        </div>
      )}
    </>
  );
}

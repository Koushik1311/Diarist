"use client";

import {
  deleteGoalsForTomorrow,
  fetchAllGoalsForTomorrow,
} from "@/data/client/goals-for-tomorrow";
import { browserClient } from "@/utils/supabase/client";
import {
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
} from "@supabase/supabase-js";
import { CheckCheck, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function GoalsList() {
  const [goalsForTomorrow, setGoalsForTomorrow] = useState<
    GoalsForTomorrowType[]
  >([]);

  const supabase = browserClient();

  useEffect(() => {
    async function getAllGoalsForTomorrow() {
      const { data, error } = await fetchAllGoalsForTomorrow();

      if (error) {
        setGoalsForTomorrow([]);
      }

      setGoalsForTomorrow(data!);
    }

    getAllGoalsForTomorrow();
  }, []);

  useEffect(() => {
    const goalsChannel = supabase
      .channel("realtime goalsEntry")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "goals_for_tomorrow",
        },
        (payload: RealtimePostgresInsertPayload<GoalsForTomorrowType>) => {
          setGoalsForTomorrow((prevRecords) => [payload.new, ...prevRecords]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "goals_for_tomorrow",
        },
        (payload: RealtimePostgresDeletePayload<GoalsForTomorrowType>) => {
          setGoalsForTomorrow((prevRecords) =>
            prevRecords.filter((record) => record.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(goalsChannel);
    };
  }, [supabase]);

  const handleCompleteButtonClick = async (goalId: string) => {
    const loadingToastId = toast.loading("Adding goal for tomorrow...");
    const error = await deleteGoalsForTomorrow(goalId);

    if (error) {
      toast.info("Something went wrong.", { id: loadingToastId });
    }
    toast.success("Goal completed successfully.", { id: loadingToastId });
  };

  const handleDeleteButtonClick = async (goalId: string) => {
    const loadingToastId = toast.loading("Adding goal for tomorrow...");
    const error = await deleteGoalsForTomorrow(goalId);

    if (error) {
      toast.info("Error deleting goal.", { id: loadingToastId });
    }
    toast.success("Goal deleted successfully.", { id: loadingToastId });
  };

  return (
    <ul className="space-y-2 text-zinc-700">
      {goalsForTomorrow.map((goals, index) => (
        <li key={index} className="flex items-center gap-8">
          <>{goals.goal}</>
          <div className="flex items-center gap-4">
            <button onClick={() => handleCompleteButtonClick(goals.id)}>
              <CheckCheck className="h-4 w-4" />
            </button>
            <button onClick={() => handleDeleteButtonClick(goals.id)}>
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

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
  const [loading, setLoading] = useState(true);

  const supabase = browserClient();

  useEffect(() => {
    async function getAllGoalsForTomorrow() {
      const { data, error } = await fetchAllGoalsForTomorrow();
      setLoading(false);

      if (error) {
        toast.error("Failed to load goals.");
        setGoalsForTomorrow([]);
      } else {
        setGoalsForTomorrow(data!);
      }
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
    const loadingToastId = toast.loading("Completing goal...");
    const error = await deleteGoalsForTomorrow(goalId);

    if (error) {
      toast.error("Failed to complete goal.", { id: loadingToastId });
    } else {
      toast.success("Goal completed successfully.", { id: loadingToastId });
    }
  };

  const handleDeleteButtonClick = async (goalId: string) => {
    const loadingToastId = toast.loading("Deleting goal...");
    const error = await deleteGoalsForTomorrow(goalId);

    if (error) {
      toast.error("Error deleting goal.", { id: loadingToastId });
    } else {
      toast.success("Goal deleted successfully.", { id: loadingToastId });
    }
  };

  return (
    <ul className="space-y-2 text-zinc-700">
      {loading ? (
        <p>Loading goals...</p>
      ) : goalsForTomorrow.length === 0 ? (
        <p>No goals set for tomorrow.</p>
      ) : (
        goalsForTomorrow.map((goal, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-4 p-2 border-x-2 hover:bg-gray-100"
          >
            <span>{goal.goal}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => handleCompleteButtonClick(goal.id)}>
                <CheckCheck className="h-4 w-4 hover:text-green-500 transition-all duration-300" />
              </button>
              <button onClick={() => handleDeleteButtonClick(goal.id)}>
                <Trash2 className="h-4 w-4 hover:text-red-500 transition-all duration-300" />
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

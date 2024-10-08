"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { insertGoalsForTomorrow } from "@/data/client/goals-for-tomorrow";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AddGoalsForTomorrow({ userId }: { userId: string }) {
  const [goal, setGoal] = useState<string>("");

  const onButtonClick = async () => {
    const { data, error } = await insertGoalsForTomorrow(goal, userId);

    const loadingToastId = toast.loading("Adding goal for tomorrow...");

    if (error) {
      toast.info("Error adding goal.", { id: loadingToastId });
    }

    if (!data) {
      toast.error("Something went wrong.", { id: loadingToastId });
    }

    toast.success("Goal added successfully.", { id: loadingToastId });
    setGoal("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 rounded-full hover:bg-zinc-200 transition-all duration-300">
          <Plus />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="w-full flex items-center justify-center gap-4">
            <input
              onChange={(e) => setGoal(e.target.value)}
              value={goal}
              type="text"
              name="goal"
              placeholder="What is your goal for tomorrow?"
              required
              className="h-9 px-3 text-sm rounded-[6px] border border-slate-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 flex-1 text-zinc-950"
            />
            <DialogClose asChild>
              <button
                onClick={onButtonClick}
                disabled={!goal}
                className={`p-2 rounded-md ${
                  goal
                    ? "hover:bg-zinc-200 transition-all duration-300"
                    : "cursor-not-allowed"
                }`}
              >
                <Plus />
              </button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

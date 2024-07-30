"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllMoods } from "@/data/mood";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ListedMoods from "./ListedMoods";
import { insertRecord } from "@/data/diaryEntriesMoods";

type Props = {
  id: number;
};

type MoodsType = {
  id: number;
  name: string;
};

export default function Moods({ id }: Props) {
  const [moods, setMoods] = useState<MoodsType[]>([]);

  useEffect(() => {
    async function fetchAllMoods() {
      const { data, error } = await getAllMoods();

      if (error) {
        toast.error("Error getting moods.");
      }

      setMoods(data!);
    }

    fetchAllMoods();
  }, []);

  const insertMoods = async (moodId: number) => {
    const error = await insertRecord(id, moodId);

    if (error) {
      if (
        error.error &&
        error.error.includes("duplicate key value violates unique constraint")
      ) {
        toast.error("Duplicate mood cannot be added.");
      } else if (
        error.error.includes("A diary entry can have a maximum of 5 moods")
      ) {
        toast.error(`${error.error}`);
      } else {
        toast.error("Error adding mood.");
      }
      return;
    }

    toast.success("Mood added successfully.");
  };

  return (
    <div className="flex flex-wrap items-center gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none ring-0 focus:outline-none flex items-center justify-center gap-2 h-6 hover:bg-zinc-200 transition-colors lg:px-2 rounded-md">
          <span>Add moods</span>
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="h-80 overflow-auto">
          {moods.map((mood, index) => (
            <DropdownMenuItem key={index}>
              <button
                onClick={() => insertMoods(mood.id)}
                className="w-full text-left"
              >
                {mood.name}
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <ListedMoods id={id} />
    </div>
  );
}

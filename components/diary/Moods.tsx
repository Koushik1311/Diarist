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
      toast.error("Error adding mood.");
      return;
    }

    toast.success("Mood added successfully.");
  };

  return (
    <div className="flex items-center gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none ring-0 focus:outline-none flex items-center justify-center gap-2 h-6 hover:bg-zinc-200 transition-colors px-2 rounded-md">
          <span>Add moods</span>
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
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

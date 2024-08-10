"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllMoods, getSingleMood } from "@/data/mood";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getMoodId, insertRecord } from "@/data/diaryEntriesMoods";
import TimeCapsuleListedMoods from "./TimeCapsuleListedMoods";
import {
  fetchMoodId,
  insertTimeCapsuleMood,
} from "@/data/client/time-capsule-mood";
import { motion } from "framer-motion";
import { Gloria_Hallelujah } from "next/font/google";
import { Button } from "../ui/button";

const gloriaHallelujah = Gloria_Hallelujah({
  weight: "400",
  subsets: ["latin"],
});

type Props = {
  id: string;
};

export default function ShowMoods({ id }: Props) {
  const [moods, setMoods] = useState<MoodType[]>([]);

  async function fetchMood() {
    const { data, error } = await fetchMoodId(id);

    if (error) {
      toast.error("Error getting moods.");
      return;
    }

    if (data) {
      const moodPromises = data.map(async (mood) => {
        const response = await getSingleMood(mood.mood_id!);
        if (response.error) {
          toast.error(`Error getting mood with ID ${mood.mood_id}.`);
          return null;
        }
        return response.data
          ? { id: response.data[0].id, name: response.data[0].name }
          : null;
      });

      const fetchedMoods = await Promise.all(moodPromises);
      const validMoods = fetchedMoods.filter(
        (mood): mood is MoodType => mood !== null
      );
      setMoods(validMoods);
    }
  }

  useEffect(() => {
    fetchMood();
  }, [id]);

  return (
    <div className="flex flex-wrap items-center gap-x-5 text-[18px]">
      <p className="border-none ring-0 focus:outline-none flex items-center justify-center gap-2 h-6">
        How&apos;s your mood today?
      </p>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
          duration: 2,
        }}
        className={`relative flex flex-wrap gap-4 ${gloriaHallelujah.className}`}
      >
        {moods.map((mood) => {
          return (
            <p className="flex items-center gap-1 text-sm text-zinc-900 px-[-14px] h-6">
              <span>{mood.name}</span>
            </p>
          );
        })}
      </motion.div>
    </div>
  );
}

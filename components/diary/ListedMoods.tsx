"use client";

import { getMoodId, removeMood } from "@/data/diaryEntriesMoods";
import { getSingleMood } from "@/data/mood";
import { browserClient } from "@/utils/supabase/client";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";

import { GeistSans } from "geist/font/sans";
import { Gloria_Hallelujah } from "next/font/google";

const gloriaHallelujah = Gloria_Hallelujah({
  weight: "400",
  subsets: ["latin"],
});

export default function ListedMoods({ id }: { id: string }) {
  const [moods, setMoods] = useState<MoodType[]>([]);

  const supabase = browserClient();

  useEffect(() => {
    const channel = supabase
      .channel("realtime_entry")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "diary_entries_moods",
        },
        async (
          payload: RealtimePostgresInsertPayload<DiaryEntriesMoodsType>
        ) => {
          // Fetch the new mood data

          const { data, error } = await getSingleMood(payload.new.mood_id!);
          if (error) {
            toast.error(`Error getting mood with ID ${payload.new.mood_id}.`);
            return;
          }

          if (data) {
            setMoods((prevMoods) => [
              ...prevMoods,
              {
                id: data[0].id,
                name: data[0].name,
                created_at: data[0].created_at,
              },
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  async function fetchMood() {
    const { data, error } = await getMoodId(id);

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

  const deleteMood = async (moodId: number) => {
    const response = await removeMood(id, moodId);

    if (response.status === 204) {
      toast.success("Mood removed successfully.");

      await fetchMood();
    } else {
      console.error(response);
      toast.error("Error removing mood.");
    }
  };

  return (
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
          <HoverCard key={mood.id}>
            <HoverCardTrigger asChild>
              <Button
                className="flex items-center gap-1 text-sm text-zinc-900 px-[-14px] h-6"
                variant="link"
              >
                <span>{mood.name}</span>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-full">
              <button
                onClick={() => deleteMood(mood.id)}
                className="flex items-center gap-1 text-sm"
              >
                <X className="w-4 h-4" />
                <span className={GeistSans.className}>Remove</span>
              </button>
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </motion.div>
  );
}

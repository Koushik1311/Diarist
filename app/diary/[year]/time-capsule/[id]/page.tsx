import React from "react";
import { Dancing_Script } from "next/font/google";
import { getDay, getWeekday } from "@/utils/local-date-&-time";
import TitleInput from "@/components/diary/TitleInput";
import { NotebookPen, Timer } from "lucide-react";
import OptionBtn from "@/components/diary/OptionBtn";
import { fetchInitialTimeCapsuleEntry } from "@/data/server/timeCapsule";
import { notFound } from "next/navigation";
import TimeCapsuleEditor from "@/components/time-capsule/TimeCapsuleEditor";
import Moods from "@/components/time-capsule/Moods";
import { DateTimePicker } from "@/components/time-capsule/DateTimePicker";
import TimeCapsuleTitleInput from "@/components/time-capsule/TimeCapsuleTitleEntry";

const dancing_script = Dancing_Script({ subsets: ["latin"] });

export default async function TimeCapsulePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data, error } = await fetchInitialTimeCapsuleEntry(id);

  if (error || !data) {
    return notFound();
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-start pl-10 md:px-6 py-2">
        <div className="flex items-start">
          <div className="w-4 h-4">
            <Timer className="w-4 h-4 mr-1 mt-1" />
          </div>
          <TimeCapsuleTitleInput id={data.id} title={data.title!} />
        </div>
        <OptionBtn id={data.id} />
      </div>

      <div className="flex-1 overflow-y-scroll pt-20 pb-20 md:py-[20vh]">
        <div className="max-w-2xl mx-3 md:mx-auto">
          <div className="flex items-center justify-between">
            <h1
              className={`${dancing_script.className} text-4xl font-extrabold mb-2`}
            >
              <span>{getWeekday(data.created_at)} </span>
              <span>{getDay(data.created_at)}</span>
            </h1>

            {/* date */}
            <DateTimePicker id={data.id} />
          </div>
          {/* Moods */}
          <Moods id={data.id} />
          {/* Editor */}
          <div className="border-b border-zinc-200 mt-3" />

          <TimeCapsuleEditor id={data.id} content={data.content!} />
        </div>
      </div>
    </div>
  );
}

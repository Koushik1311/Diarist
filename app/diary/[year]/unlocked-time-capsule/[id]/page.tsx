import React from "react";
import { Dancing_Script } from "next/font/google";
import {
  getDay,
  getMonth,
  getTime,
  getWeekday,
  getYear,
} from "@/utils/local-date-&-time";
import TitleInput from "@/components/diary/TitleInput";
import { Pill } from "lucide-react";
import { fetchTimeCapsuleEntry } from "@/data/server/timeCapsule";
import { notFound } from "next/navigation";
import TimeCapsuleEditor from "@/components/time-capsule/TimeCapsuleEditor";
import Moods from "@/components/time-capsule/Moods";
import { DateTimePicker } from "@/components/time-capsule/DateTimePicker";
import TimeCapsuleContent from "@/components/time-capsule/TimeCapsuleContent";
import ShowMoods from "@/components/time-capsule/ShowMoods";
import OptionBtn from "@/components/time-capsule/OptionBtn";

const dancing_script = Dancing_Script({ subsets: ["latin"] });

export default async function TimeCapsulePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data, error } = await fetchTimeCapsuleEntry(id);

  if (error || !data) {
    return notFound();
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-start pl-10 md:px-6 py-2">
        <div className="flex items-start gap-2">
          <div className="w-4 h-4">
            <Pill className="w-4 h-4 mr-1 mt-1" />
          </div>
          <p>{data.title}</p>
        </div>
        <OptionBtn id={data.id} />
      </div>

      <div className="flex-1 overflow-y-scroll pt-20 pb-20 md:py-[20vh]">
        <div className="max-w-2xl mx-3 md:mx-auto">
          <div className="flex items-center justify-between">
            <h1
              className={`${dancing_script.className} text-4xl font-extrabold mb-2`}
            >
              <span>{getMonth(data.created_at)} </span>
              <span>{getDay(data.created_at)}</span>
              {", "}
              <span>{getYear(data.created_at)}</span>
            </h1>

            {/* date */}
            <h2>
              <span>{getMonth(data.unlock_date!)} </span>
              <span>{getDay(data.unlock_date!)}</span>
              {", "}
              <span>{getYear(data.unlock_date!)}</span>
              {" | "}
              <span>{getTime(data.unlock_date!)}</span>
            </h2>
          </div>
          {/* Moods */}
          <ShowMoods id={data.id} />
          {/* Editor */}
          <div className="border-b border-zinc-200 mt-3" />

          <TimeCapsuleContent content={data.content!} />
          {/* <p>{data.content}</p> */}
        </div>
      </div>
    </div>
  );
}

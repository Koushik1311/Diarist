import Edditor from "@/components/diary/Edditor";
import { Ellipsis } from "lucide-react";
import React from "react";
import { Dancing_Script } from "next/font/google";
import { getSingleRecord } from "@/data/action/diary_entry";
import { getDay, getMonth, getYear, getTime } from "@/utils/local-date-&-time";
import ContentUpdateButton from "@/components/global/ContentUpdateButton";
import EditorCopy from "@/components/diary/Edditor copy";

const dancing_script = Dancing_Script({ subsets: ["latin"] });

export default async function DiaryPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const record = await getSingleRecord(id);

  return (
    <div className="flex flex-col h-screen">
      <div>
        <div className="flex justify-between w-full px-6 py-3">
          {/* Top */}
          <div>
            <p className="text-base font-normal flex items-center gap-2">
              <span>{record.title}</span>
              <span> - </span>
              <span>{getMonth(record.created_at)}</span>
              <span>{getDay(record.created_at)},</span>
              <span>{getYear(record.created_at)}</span>
              <span> | </span>
              <span>{getTime(record.created_at)}</span>
            </p>
          </div>

          <Ellipsis />
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll py-[20vh]">
        {/* Editor */}
        <div className="max-w-2xl mx-auto">
          <div>
            <h1
              className={`${dancing_script.className} text-4xl font-extrabold`}
            >
              <span>Tuesday </span> <span>28</span>
            </h1>
          </div>
          <div className="border-b border-zinc-200 mt-3" />
          {/* <Edditor id={id} content={record.content} /> */}
          <EditorCopy id={id} content={record.content} />
        </div>
      </div>
    </div>
  );
}

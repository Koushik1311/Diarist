import Editor from "@/components/diary/Editor";

import React from "react";
import { Dancing_Script } from "next/font/google";
import { getSingleRecord } from "@/data/action/diary_entry";
import { getDay, getWeekday } from "@/utils/local-date-&-time";
import TitleInput from "@/components/diary/TitleInput";
import { NotebookPen } from "lucide-react";
import OptionBtn from "@/components/diary/OptionBtn";

const dancing_script = Dancing_Script({ subsets: ["latin"] });

export default async function DiaryPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const record = await getSingleRecord(id);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between pl-10 md:px-6 py-2">
        <div className="flex items-start">
          <div className="w-4 h-4">
            <NotebookPen className="w-4 h-4 mr-1 mt-1" />
          </div>
          <TitleInput id={id} title={record.title} />
        </div>
        <div className="">
          <OptionBtn id={id} />
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll pt-20 pb-20 md:py-[20vh]">
        {/* Editor */}
        <div className="max-w-2xl mx-3 md:mx-auto">
          <div>
            <h1
              className={`${dancing_script.className} text-4xl font-extrabold`}
            >
              <span>{getWeekday(record.created_at)} </span>{" "}
              <span>{getDay(record.created_at)}</span>
            </h1>
          </div>
          <div className="border-b border-zinc-200 mt-3" />

          <Editor id={id} content={record.content} />
        </div>
      </div>
    </div>
  );
}

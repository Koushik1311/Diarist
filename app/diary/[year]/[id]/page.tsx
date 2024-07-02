import Editor from "@/components/diary/Editor";

import React from "react";
import { Dancing_Script } from "next/font/google";
import { getSingleRecord } from "@/data/action/diary_entry";
import { getDay, getWeekday } from "@/utils/local-date-&-time";
import TitleInput from "@/components/diary/TitleInput";
import { NotebookPen } from "lucide-react";
import PageMenu from "@/components/diary/PageMenu";
import Locked from "@/components/diary/Locked";
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
        <div className="flex justify-between w-full px-3 md:px-6 py-2">
          {/* Top */}
          <div className="text-base font-normal flex items-center">
            <NotebookPen className={`w-4 h-4`} />
            <TitleInput id={id} title={record.title} />

            <div>
              <Locked locked={record.is_locked} />
            </div>
          </div>

          <PageMenu id={id} locked={record.is_locked} />
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

          {/* <TagsInput /> */}
          {/* <CategoryInput id={id} /> */}
          {/* <Edditor id={id} content={record.content} /> */}
          <Editor id={id} content={record.content} locked={record.is_locked} />
          {/* <EditorCopy
            id={id}
            content={record.content}
            locked={record.is_locked}
          /> */}
        </div>
      </div>
    </div>
  );
}

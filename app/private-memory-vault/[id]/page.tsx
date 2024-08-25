import Editor from "@/components/diary/Editor";

import React from "react";
import { Dancing_Script } from "next/font/google";
import { getSingleRecord } from "@/data/action/diary_entry";
import { getDay, getWeekday } from "@/utils/local-date-&-time";
import TitleInput from "@/components/diary/TitleInput";
import { NotebookPen } from "lucide-react";
import Moods from "@/components/diary/Moods";
import { fetchSingleEntry } from "@/data/server/diary";
import { notFound } from "next/navigation";

const dancing_script = Dancing_Script({ subsets: ["latin"] });

import OptionBtn from "@/components/diary/OptionBtn";
import VaultEditor from "@/components/private-memory-vault/VaultEditor";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const record = await fetchSingleEntry(id);

  if (!record) {
    return notFound();
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-start pl-10 md:px-6 py-2">
        <div className="flex items-start">
          <div className="w-4 h-4">
            <NotebookPen className="w-4 h-4 mr-1 mt-1" />
          </div>
          {/* <TitleInput id={id} title={record?.title!} /> */}
        </div>
        <OptionBtn id={id} />
      </div>

      <div className="flex-1 overflow-y-scroll pt-20 pb-20 md:py-[20vh]">
        <div className="max-w-2xl mx-3 md:mx-auto">
          <h1
            className={`${dancing_script.className} text-4xl font-extrabold mb-2`}
          >
            <span>{getWeekday(record?.created_at!)} </span>
            <span>{getDay(record?.created_at!)}</span>
          </h1>
          {/* Moods */}
          <Moods id={id} />
          {/* Editor */}
          <div className="border-b border-zinc-200 mt-3" />

          <VaultEditor id={id} content={record?.content!} />
        </div>
      </div>
    </div>
  );
}

"use client";

import { NotebookPen } from "lucide-react";
import TitleInput from "./TitleInput";
import OptionBtn from "./OptionBtn";
import { getDay, getWeekday } from "@/utils/local-date-&-time";
import Moods from "./Moods";
import Editor from "./Editor";
import { useEffect, useState } from "react";
import { fetchSingleEntryOnClient } from "@/data/client/diary";
import { Dancing_Script } from "next/font/google";
import { FaSpinner } from "react-icons/fa6";

const dancing_script = Dancing_Script({ subsets: ["latin"] });

export default function SingleDiaryEntry({ id }: { id: string }) {
  const [record, setRecord] = useState<DiaryEntryType>();
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const getRecord = async () => {
      const record = await fetchSingleEntryOnClient(id);

      if (!record) {
        // Handle the case when the record is not found or an error occurs
      }

      setRecord(record!);
      setLoading(false); // Set loading to false after data is fetched
    };

    getRecord();
  }, [id]); // Add id to dependency array to refetch if id changes

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner /> {/* Display a loading spinner */}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col h-screen">
        <div className="flex justify-between items-start pl-10 md:px-6 py-2">
          <div className="flex items-start">
            <div className="w-4 h-4">
              <NotebookPen className="w-4 h-4 mr-1 mt-1" />
            </div>
            <TitleInput id={id} title={record?.title!} />
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
            <Moods id={id} />
            <div className="border-b border-zinc-200 mt-3" />

            <Editor id={id} content={record?.content!} />
          </div>
        </div>
      </div>
    </div>
  );
}

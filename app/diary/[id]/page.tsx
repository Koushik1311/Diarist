import Edditor from "@/components/diary/Edditor";
import { Ellipsis } from "lucide-react";
import React from "react";

export default function DiaryPage({
  params: { id },
}: {
  params: { id: number };
}) {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <div className="flex justify-between w-full px-6 py-3">
          {/* Top */}
          <span>Diary Entry 12 - Jan 12, 2024 | 10:30 PM</span>
          <Ellipsis />
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll py-[30vh]">
        {/* Editor */}
        <div className="max-w-2xl mx-auto">
          <Edditor />
        </div>
      </div>
    </div>
  );
}

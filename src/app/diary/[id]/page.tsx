import BookmarkBtn from "@/components/diary/BookmarkBtn";
import { GetSingleRecord } from "@/data/getDiary";
import { dancing_script } from "@/utils/Fonts";
import React from "react";

export default async function page({
  params: { id },
}: {
  params: { id: number };
}) {
  const record = await GetSingleRecord(id);

  if (record === null) {
    return <h1>its nothing</h1>;
  }
  return (
    <div className="mt-20 mb-20">
      <div className="flex flex-col">
        {/* Date */}
        <p className="text-gray-500 mt-2 text-2xl font-semibold px-4 lg:px-0">
          <span className={dancing_script.className}>
            {/* Day */}
            Saturday
          </span>
          <span className={`${dancing_script.className} text-5xl font-medium`}>
            {" "}
            04
          </span>
        </p>
        <textarea
          value={record.content}
          readOnly={false}
          placeholder="Tell me what you did today"
          className="mt-5 w-screen px-4 lg:px-0 lg:w-[800px] resize-none border-none ring-0 focus:outline-none"
        />
      </div>

      {/* Button */}
      <div className="absolute top-3 left-2 flex items-center space-x-2">
        <BookmarkBtn />
        <span className="text-base font-light text-gray-600">May, 2024</span>
      </div>
    </div>
  );
}

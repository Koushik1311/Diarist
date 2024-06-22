import React from "react";
import { Balsamiq_Sans } from "next/font/google";
import AddEntryButton from "@/components/global/AddEntryButton";
import { Plus } from "lucide-react";
import { getUser } from "@/data/User";

const sacramento = Balsamiq_Sans({ subsets: ["latin"], weight: "400" });

export default async function DiarySpace() {
  const user = await getUser();

  const categories = ["Work", "Personal", "Health", "Ideas"];
  const tags = ["Inspiration", "Gratitude", "Challenges", "Goals"];

  return (
    <div
      className={`${sacramento.className} flex flex-col items-center justify-start gap-6 p-6 h-screen bg-gray-100`}
    >
      <div className="w-full max-w-3xl mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <li
                key={index}
                className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full cursor-pointer hover:bg-violet-200 transition"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full cursor-pointer hover:bg-green-200 transition"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

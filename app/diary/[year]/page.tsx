import React from "react";
import { Balsamiq_Sans } from "next/font/google";
import AddEntryButton from "@/components/global/AddEntryButton";
import { Plus } from "lucide-react";
import { getUser } from "@/data/User";

const sacramento = Balsamiq_Sans({ subsets: ["latin"], weight: "400" });

export default async function DiarySpace() {
  const user = await getUser();

  return (
    <div
      className={`${sacramento.className} flex flex-col items-center justify-center gap-1 h-screen`}
    >
      <div className="flex flex-col gap-1 md:flex-row items-center">
        <div className="bg-zinc-200 rounded-lg py-3 px-4 text flex flex-col items-center justify-center gap-1 w-[356px] md:w-44 h-24">
          <span className="uppercase text-base font-semibold">Weekly</span>
          <span className="text-4xl font-semibold">7</span>
        </div>
        <div className="bg-zinc-200 rounded-lg py-3 px-4 text flex flex-col items-center justify-center gap-1 w-[356px] md:w-44 h-24">
          <span className="uppercase text-base font-semibold">Monthly</span>
          <span className="text-4xl font-semibold">30</span>
        </div>
      </div>
      <div className="bg-zinc-200 rounded-lg py-3 px-4 text flex flex-col items-center justify-center gap-1 w-[356px] h-24">
        <span className="uppercase text-base font-semibold">Yearly</span>
        <span className="text-4xl font-semibold">255</span>
      </div>

      <div className="absolute bottom-12 right-16">
        <AddEntryButton
          className="w-14 h-14 bg-zinc-200 hover:bg-zinc-300 transition-colors flex items-center justify-center rounded-full"
          userId={user?.id!}
        >
          <Plus className="text-zinc-600" />
        </AddEntryButton>
      </div>
    </div>
  );
}

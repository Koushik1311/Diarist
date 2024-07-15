import React from "react";
import { Balsamiq_Sans } from "next/font/google";
import AddEntryButton from "@/components/global/AddEntryButton";
import { Plus } from "lucide-react";
import { getUser } from "@/data/User";
import Milestone from "@/components/diary/Milestone";

const sacramento = Balsamiq_Sans({ subsets: ["latin"], weight: "400" });

export default async function DiarySpace() {
  const user = await getUser();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0 for January, 1 for February, etc.
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentMonth + 1,
    0
  ).getDate();

  const monthlyMilestones = [
    {
      title: `${currentMonth + 1} Days Streak`, // Displaying current month number as title
      description: `Keep writing for ${daysInMonth} days this month!`,
      progress: 0, // Initialize progress
      total: daysInMonth, // Total days in current month
    },
  ];

  return (
    <div
      className={`${sacramento.className} flex flex-col items-center justify-start gap-6 p-6 h-screen bg-zinc-100`}
    >
      <div className="w-full max-w-3xl mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Welcome back,{" "}
            {user?.user_metadata.display_name || user?.user_metadata.full_name}!
          </h3>
          <p className="text-zinc-700 mb-6">
            Keep up the great work and achieve new milestones!
          </p>
          <h3 className="text-lg font-semibold mb-4">Monthly Milestone</h3>
          <Milestone />
        </div>
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

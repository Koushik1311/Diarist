import AddEntryButton from "@/components/global/AddEntryButton";
import { motivationalQuotes } from "@/constants/motivationalQuotes";
import { getUser } from "@/data/User";
import { NotebookPen } from "lucide-react";
import { RiDoubleQuotesL } from "react-icons/ri";
import { Kalam } from "next/font/google";
import React from "react";

const kalam = Kalam({ weight: "400", subsets: ["latin"] });

// Function to get the current day of the year
const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return dayOfYear;
};

// Function to get the quote for the current day
const getQuoteForToday = () => {
  const dayOfYear = getDayOfYear(new Date());
  // Use the modulo operator to cycle through the quotes array
  const quoteIndex = dayOfYear % motivationalQuotes.length;
  return motivationalQuotes[quoteIndex];
};

export default async function DiarySpace() {
  const user = await getUser();

  const { quote, author } = getQuoteForToday();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-sm px-6 py-16 flex flex-col items-center justify-center gap-8 lg:mr-16">
        <RiDoubleQuotesL className="w-12 h-12 text-gray-600" />
        <p className={`text-xl text-gray-600 text-center ${kalam.className}`}>
          {quote}
        </p>
        <p className={`text-xl text-gray-600 text-center ${kalam.className}`}>
          {author}
        </p>
      </div>

      <div className="absolute bottom-10 right-10">
        <AddEntryButton
          userId={user?.id!}
          className="flex items-center justify-center gap-2 border border-zinc-400 hover:border-zinc-800 transition-colors rounded-full px-5 py-3"
        >
          <NotebookPen className="w-4 h-4" />
          <span>Add Today's Entry</span>
        </AddEntryButton>
      </div>
    </div>
  );
}

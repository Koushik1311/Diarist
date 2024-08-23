import { getUser } from "@/data/User";
import { redirect } from "next/navigation";
import React from "react";
import { Sacramento } from "next/font/google";
import { getLocalYear } from "@/utils/local-day";
import Link from "next/link";
import { Key, Lock } from "lucide-react";
import { motivationalQuotes } from "@/constants/motivationalQuotes";
import { RiDoubleQuotesL } from "react-icons/ri";
import { bebas_neus } from "@/utils/google-fonts";

const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

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

export default async function DiaryHome() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const { quote, author } = getQuoteForToday();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div
          className={` max-w-xl pt-6 flex flex-col items-center justify-center text-5xl`}
        >
          {/* <RiDoubleQuotesL className="w-12 h-12 text-gray-600" /> */}
          <button
            className={`${bebas_neus.className} ml-5 text-3xl text-zinc-600 uppercase tracking-[0.5em] text-center mt-2`}
          >
            {getLocalYear()}
          </button>
          <p
            className={`${sacramento.className} text-zinc-600 text-center mt-5`}
          >
            {quote}
          </p>
          <p
            className={`${sacramento.className} text-zinc-600 text-center mt-3`}
          >
            -{author}
          </p>

          <p
            className={`${bebas_neus.className} ml-6 mt-5 text-2xl text-zinc-600 uppercase tracking-[0.5em] text-center`}
          >
            {user?.user_metadata.display_name || user?.user_metadata.full_name}
          </p>
        </div>
      </div>

      <Link
        href={`/diary/${getLocalYear()}`}
        className="absolute bottom-8 ml-6 text-xl font-medium text-zinc-500 hover:text-zinc-700 transition duration-300 uppercase tracking-[0.4em]"
      >
        Open
      </Link>
    </div>
  );
}

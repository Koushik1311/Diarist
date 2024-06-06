import { getUser } from "@/data/User";
import { redirect } from "next/navigation";
import React from "react";
import { Sacramento } from "next/font/google";
import { getLocalYear } from "@/utils/local-day";
import Link from "next/link";
import { NotebookText, PanelLeftOpen } from "lucide-react";

const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

export default async function DiaryHome() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className={`${sacramento.className} text-[10rem]`}>Diary</h1>
        <div className="flex flex-col items-center">
          <p className="text-2xl uppercase tracking-[0.5em] text-center">
            {user?.user_metadata.display_name}
          </p>
          <p className="text-2xl uppercase tracking-[0.5em] text-center">
            {getLocalYear()}
          </p>

          <Link
            href={`/diary/${getLocalYear()}`}
            className="flex items-center gap-1 group mt-5"
          >
            <span className="uppercase text-lg tracking-[0.4em] transition duration-700">
              Open
            </span>
            {/* <PanelLeftOpen className="w-4 h-4 group-hover:translate-x-3 transition duration-700" /> */}
          </Link>
        </div>
      </div>
    </div>
  );
}

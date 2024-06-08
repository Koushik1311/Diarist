import { getUser } from "@/data/User";
import { redirect } from "next/navigation";
import React from "react";
import { Sacramento } from "next/font/google";
import { getLocalYear } from "@/utils/local-day";
import Link from "next/link";
import { Key, Lock } from "lucide-react";

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
          <button className="text-2xl uppercase tracking-[0.5em] text-center mt-2">
            {getLocalYear()}
          </button>

          <Link
            href={`/diary/${getLocalYear()}`}
            className="flex items-center group mt-5"
          >
            <Lock className="w-[18px] h-[18px] group-hover:text-white group-hover:-translate-x-3 mr-2 transition duration-500" />
            <span className="uppercase text-lg tracking-[0.4em] last:tracking-[0px]">
              Open
            </span>
            <Key className="w-[18px] h-[18px] ml-[1px] translate-x-3 text-white group-hover:text-zinc-950 group-hover:translate-x-0 transition duration-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}

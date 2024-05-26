import React from "react";
import { getUser } from "@/data/User";
import { ChevronDown, Home, LogOut, NotebookPen, Plus } from "lucide-react";
import AddEntryButton from "../global/AddEntryButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { DiaryEntryList } from "@/constants/DiaryEntryList";
import DiaryFilter from "../filter/DiaryFilter";

export default async function Leftbar() {
  const user = await getUser();
  const first_letter = user?.user_metadata.display_name.charAt(0);

  const colorClasses = [
    "text-emerald-400",
    "text-teal-400",
    "text-cyan-400",
    "text-indigo-400",
    "text-violet-400",
    "text-purple-400",
    "text-fuchsia-400",
    "text-pink-400",
    "text-rose-400",
    "text-rose-600",
    "text-pink-600",
    "text-fuchsia-600",
    "text-purple-600",
    "text-violet-600",
    "text-indigo-600",
    "text-cyan-600",
    "text-teal-600",
    "text-emerald-600",
  ];

  return (
    <div className="relative w-80">
      <div className="absolute w-full left-2 pt-4 pr-5 flex flex-col h-screen group">
        {/* Top */}
        <div className="flex items-center justify-between px-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none ring-0 focus:outline-none flex items-center gap-2 text-zinc-600 hover:text-zinc-900">
              <span className="h-6 w-6 rounded-sm text-sm font-medium bg-zinc-200 flex items-center justify-center uppercase">
                {first_letter}
              </span>
              <span className="font-medium">
                {user?.user_metadata.display_name}
              </span>
              <span>
                <ChevronDown className="h-4 w-4" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-5">
              <DropdownMenuLabel className="text-xs font-normal text-zinc-400">
                {user?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center">
                <span className="h-6 w-6 rounded-sm text-sm font-medium bg-zinc-200 flex items-center justify-center uppercase">
                  {first_letter}
                </span>
                <span>{user?.user_metadata.display_name}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <button className="w-full cursor-pointer">
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <LogOut className="w-4 h-4 text-zinc-700" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </button>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add button */}
          <AddEntryButton className="w-6 h-6 hover:bg-zinc-200 flex items-center justify-center rounded-sm">
            <Plus className="h-5 w-5 text-zinc-600" />
          </AddEntryButton>
        </div>
        <Link
          href="/diary"
          className="flex items-center gap-2 px-4 h-8 mt-2 hover:bg-zinc-200 rounded-sm"
        >
          <Home className="w-4 h-4" />
          <span className="text-sm">Home</span>
        </Link>

        {/* Middle */}
        <div className="pl-3 pr-1 text-xs font-medium text-zinc-400 mt-2 h-8 flex items-center justify-between rounded-sm">
          <span>Diaryspace</span>

          {/* Month & Year */}
          {/* <DiaryFilter className="h-8 px-2 rounded-sm transition-colors">
            <div className="flex items-center gap-1">
              <span>Jan, 2024</span>
              <span>
                <ChevronDown className="h-4 w-4" />
              </span>
            </div>
          </DiaryFilter> */}
        </div>

        {/* Entry */}
        <div className="mr-3 flex-1 overflow-y-auto last:pb-6">
          {DiaryEntryList.slice()
            .reverse()
            .map((entry, index) => {
              const color = colorClasses[index % colorClasses.length];
              return (
                <Link
                  key={index}
                  href="/diary/12"
                  className="h-8 hover:bg-zinc-200 flex items-center px-3 rounded-sm"
                >
                  <div className="">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <NotebookPen className={`w-4 h-4 ${color}`} />
                      <span>{entry.title}</span>
                      <span> - </span>
                      <span>{entry.date}</span>
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>

        {/* Bottom */}
      </div>
    </div>
  );
}

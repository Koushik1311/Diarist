import React from "react";
import { getUser } from "@/data/User";
import { ChevronDown, CreditCard, Home, LogOut, Plus } from "lucide-react";
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
import EntryList from "./EntryList";
import { signOut } from "@/actions/auth";
import { getLocalYear } from "@/utils/local-day";

export default async function Leftbar() {
  const user = await getUser();
  const first_letter =
    user?.user_metadata.display_name?.charAt(0) ??
    user?.user_metadata.full_name?.charAt(0) ??
    "";

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
                {user?.user_metadata.display_name ||
                  user?.user_metadata.full_name}
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
              <DropdownMenuItem className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-sm text-xl text-zinc-500 bg-zinc-200 flex items-center justify-center uppercase">
                  {first_letter}
                </span>
                <div>
                  <p className="text-sm text-zinc-500">
                    {user?.user_metadata.display_name ||
                      user?.user_metadata.full_name}
                  </p>
                  {/* TODO: Make me dynamic */}
                  <p className="text-xs text-zinc-700 font-extralight">
                    Lifetime Plan <span>. 5 entry</span>
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <form action={signOut}>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2 w-full">
                  <CreditCard className="w-4 h-4 text-zinc-700" />
                  <span>Purchase entry</span>
                </DropdownMenuItem>
                <button className="w-full cursor-pointer">
                  <DropdownMenuItem className="cursor-pointer flex items-center gap-2 w-full">
                    <LogOut className="w-4 h-4 text-zinc-700" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add button */}
          <AddEntryButton
            userId={user?.id!}
            className="w-6 h-6 hover:bg-zinc-200 flex items-center justify-center rounded-sm"
          >
            <Plus className="h-5 w-5 text-zinc-600" />
          </AddEntryButton>
        </div>
        <Link
          href={`/diary/${getLocalYear()}`}
          className="flex items-center gap-2 px-4 h-8 mt-2 hover:bg-zinc-200 rounded-sm"
        >
          <Home className="w-4 h-4" />
          <span className="text-sm">Home</span>
        </Link>

        <EntryList />
      </div>
    </div>
  );
}

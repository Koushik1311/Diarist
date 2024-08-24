import {
  BookLock,
  ChevronDown,
  CreditCard,
  Home,
  LogOut,
  MessageCircle,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "@/actions/auth";
import { getLocalYear } from "@/utils/local-day";
import { getUser } from "@/data/User";
import { fetchSubscription } from "@/data/server/subscription";

export default async function LeftbarMenu() {
  const user = await getUser();
  const first_letter =
    user?.user_metadata.display_name?.charAt(0) ??
    user?.user_metadata.full_name?.charAt(0) ??
    "";

  const subscription = await fetchSubscription(user?.id!);

  return (
    <div className="w-80 pt-4 pr-5 flex flex-col h-screen group">
      {/* Top */}
      <div className="flex items-center justify-between pl-3">
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
          <DropdownMenuContent className="ml-5 min-w-48">
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
                <p className="text-xs text-zinc-700 font-extralight">
                  <span>Lifetime: </span>
                  {subscription?.lifetime === "none" && <></>}
                  {subscription?.lifetime === "premium" && <>Premium </>}
                  {subscription?.lifetime === "elite" && <>Elite </>}
                  <span>. Entries: {subscription?.entries}</span>
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <form action={signOut}>
              <Link href="/pricing/bundle">
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2 w-full">
                  <CreditCard className="w-4 h-4 text-zinc-700" />
                  <span>Purchase entry</span>
                </DropdownMenuItem>
              </Link>
              <a href="https://insigh.to/b/diarist" target="_blank">
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2 w-full">
                  <MessageCircle className="w-4 h-4 text-zinc-700" />
                  <span>Suggest & Explore Features</span>
                </DropdownMenuItem>
              </a>
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
        {/* <AddEntryButton
            userId={user?.id!}
            className="w-6 h-6 hover:bg-zinc-200 flex items-center justify-center rounded-sm"
          >
            <Plus className="h-5 w-5 text-zinc-600" />
          </AddEntryButton> */}
      </div>
      <Link
        href={`/diary/${getLocalYear()}`}
        className="flex items-center gap-2 px-4 h-8 mt-2 hover:bg-zinc-200 rounded-sm"
      >
        <Home className="w-4 h-4" />
        <span className="text-sm">Home</span>
      </Link>

      {/* <EntryList /> */}
    </div>
  );
}

import { Home } from "lucide-react";

import VaultEntryList from "./VaultEntryList";
import Link from "next/link";

export default async function LeftbarMenu() {
  return (
    <div className="w-80 pt-4 pr-5 flex flex-col h-screen group">
      <Link
        href={`/private-memory-vault`}
        className="flex items-center gap-2 px-4 h-8 mt-2 hover:bg-zinc-200 rounded-sm"
      >
        <Home className="w-4 h-4" />
        <span className="text-sm">Memory Vault</span>
      </Link>

      <VaultEntryList />
    </div>
  );
}

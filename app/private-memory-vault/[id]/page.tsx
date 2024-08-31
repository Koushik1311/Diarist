import React from "react";
import { Dancing_Script } from "next/font/google";
import { getDay, getWeekday } from "@/utils/local-date-&-time";
import { NotebookPen } from "lucide-react";
import Moods from "@/components/diary/Moods";
import { notFound } from "next/navigation";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const dancing_script = Dancing_Script({ subsets: ["latin"] });

import OptionBtn from "@/components/diary/OptionBtn";
import VaultEditor from "@/components/private-memory-vault/VaultEditor";
import { fetchSingleVaultEntry } from "@/data/server/private-memory-vault";
import decryptAfterVerification from "@/helper/decrypt-after-verification";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const record = await fetchSingleVaultEntry(id);

  if (!record) {
    return notFound();
  }

  if (record.iv || record.salt) {
    return (
      <Dialog open={true}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Passkey</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-1 w-full h-full">
            <label
              htmlFor="passkey"
              className="text-xs text-zinc-500 font-medium mt-4"
            >
              Passkey
            </label>
            <input
              type="password"
              name="passkey"
              placeholder="Enter your passkey"
              required
              className="h-9 px-3 text-sm rounded-[6px] border border-zinc-300 focus:outline-zinc-600 text-zinc-950"
            />
            <DialogClose asChild className="mt-4">
              <button type="submit">Create</button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-start pl-10 md:px-6 py-2">
        <div className="flex items-start">
          <div className="w-4 h-4">
            <NotebookPen className="w-4 h-4 mr-1 mt-1" />
          </div>
          {/* <TitleInput id={id} title={record?.title!} /> */}
        </div>
        <OptionBtn id={id} />
      </div>

      <div className="flex-1 overflow-y-scroll pt-20 pb-20 md:py-[20vh]">
        <div className="max-w-2xl mx-3 md:mx-auto">
          <h1
            className={`${dancing_script.className} text-4xl font-extrabold mb-2`}
          >
            <span>{getWeekday(record?.created_at!)} </span>
            <span>{getDay(record?.created_at!)}</span>
          </h1>
          {/* Moods */}
          <Moods id={id} />
          {/* Editor */}
          <div className="border-b border-zinc-200 mt-3" />

          <VaultEditor id={id} content={record?.content!} />
        </div>
      </div>
    </div>
  );
}

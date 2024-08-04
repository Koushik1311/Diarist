"use client";

import { createEntry } from "@/helper/entry-creation-limit";
import { getLocalYear } from "@/utils/local-day";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  className: string;
  userId: string;
};

export default function AddEntryButton({ children, className, userId }: Props) {
  const router = useRouter();

  const insertEntry = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const loadingToastId = toast.loading("Creating entry...");

    try {
      const { entryData, error } = await createEntry(userId);
      if (!error) {
        console.error("Error inserting record.", error);
        toast.info(error, { id: loadingToastId });
      }

      if (entryData) {
        const lastRecord = entryData[entryData.length - 1];
        router.push(`/diary/${getLocalYear()}/${lastRecord.id}`);
        toast.success("Entry created successfully!", { id: loadingToastId });
      }
    } catch (error) {
      console.error("Error inserting record: ", error);
    }
  };

  return (
    <form>
      <button className={className} onClick={insertEntry}>
        {children}
      </button>
    </form>
  );
}

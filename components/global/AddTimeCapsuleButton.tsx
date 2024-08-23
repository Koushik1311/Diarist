"use client";

import { getUserOnClient } from "@/data/client/user";
import { createTimeCapsule } from "@/helper/time-capsule-creation";
import { getLocalYear } from "@/utils/local-day";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  className: string;
};

export default function AddTimeCapsuleButton({ children, className }: Props) {
  const router = useRouter();

  const insertEntry = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const loadingToastId = toast.loading("Creating entry...");

    try {
      const user = await getUserOnClient();
      const { timeCapsuleEntry, error } = await createTimeCapsule(user?.id!);
      if (error) {
        console.error("Error inserting Time Capsule.", error);
        toast.info(error, { id: loadingToastId });
      }

      if (timeCapsuleEntry) {
        const lastRecord = timeCapsuleEntry[timeCapsuleEntry.length - 1];
        router.push(`/diary/${getLocalYear()}/time-capsule/${lastRecord.id}`);
        toast.success("Time Capsule created successfully!", {
          id: loadingToastId,
        });
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

"use client";

import { insertRecord } from "@/data/diary";
import { getLocalYear } from "@/utils/local-day";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
  className: string;
  userId: string;
};

export default function AddEntryButton({ children, className, userId }: Props) {
  const router = useRouter();

  const insertEntry = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const { data, error } = await insertRecord(userId);
      if (error) {
        console.error("Error inserting record: ", error);
        toast(error, {
          icon: "💰",
        });
        // Handle error scenario, e.g., show a message to the user
      }

      console.log(data);

      if (data) {
        const lastRecord = data[data.length - 1];
        router.push(`/diary/${getLocalYear()}/${lastRecord.id}`);
        toast.success("Entry created");
      }
    } catch (error) {
      console.error("Error inserting record: ", error);
      // Handle unexpected error scenario
    }
  };

  return (
    <form>
      <button className={className} onClick={insertEntry}>
        {children}
      </button>
      <Toaster position="top-right" />
    </form>
  );
}

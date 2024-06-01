import { insertRecord } from "@/data/action/diary_entry";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  className: string;
  userId: string;
};

export default async function AddEntryButton({
  children,
  className,
  userId,
}: Props) {
  const insertEntry = async () => {
    "use server";
    const records = await insertRecord(userId);
    if (records && records.length > 0) {
      const lastRecord = records[records.length - 1];
      console.log(lastRecord);
      redirect(`/diary/${lastRecord.id}`);
    }
  };

  // useEffect(() => {
  //   const insertEntry = async () => {
  //     "use server"
  //     const record = await insertRecord();
  //     if (record) {
  //       console.log()
  //     }
  //   }
  // })

  return (
    <form action={insertEntry}>
      <button className={className}>{children}</button>
    </form>
  );
}

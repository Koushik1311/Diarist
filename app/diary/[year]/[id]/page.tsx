import React from "react";
import { Dancing_Script } from "next/font/google";
import { fetchSingleEntry } from "@/data/server/diary";
import { notFound } from "next/navigation";
import SingleDiaryEntry from "@/components/diary/SingleDiaryEntry";

const dancing_script = Dancing_Script({ subsets: ["latin"] });

export default async function DiaryPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const record = await fetchSingleEntry(id);

  if (!record) {
    return notFound();
  }

  return (
    <>
      <SingleDiaryEntry id={id} />
    </>
  );
}

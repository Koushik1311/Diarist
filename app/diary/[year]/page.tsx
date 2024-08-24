import AddEntryButton from "@/components/global/AddEntryButton";
import { getUser } from "@/data/User";
import { NotebookPen } from "lucide-react";
import React from "react";

export default async function DiarySpace() {
  const user = await getUser();

  return <div className="flex flex-col mt-2 mx-4 lg:mx-16 p-8"></div>;
}

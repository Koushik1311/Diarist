import GoalsForTomorrow from "@/components/goals/GoalsForTomorrow";
import { getUser } from "@/data/User";
import React from "react";

export default async function DiarySpace() {
  const user = await getUser();

  return (
    <div className="flex flex-col items-center justify-center h-[95vh] mt-2 mx-4 lg:mx-16 p-8">
      <GoalsForTomorrow />
    </div>
  );
}

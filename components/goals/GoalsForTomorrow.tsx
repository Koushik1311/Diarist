import { getUser } from "@/data/User";
import AddGoalsForTomorrow from "./AddGoalsForTomorrow";
import GoalsList from "./GoalsList";

export default async function GoalsForTomorrow() {
  const user = await getUser();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium text-zinc-700">Goals For Tomorrow</h2>
        <AddGoalsForTomorrow userId={user?.id!} />
      </div>

      <GoalsList />
    </div>
  );
}

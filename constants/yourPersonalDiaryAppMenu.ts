import { Notebook, Timer } from "lucide-react";

export const YourPersonalDiaryAppMenu = [
  {
    id: "journal",
    name: "Journal",
    icon: Notebook,
  },
  {
    id: "time-capsule",
    name: "Capsule",
    icon: Timer,
  },
] as const;

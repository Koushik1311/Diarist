import { Notebook, SmilePlus, Timer } from "lucide-react";

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
  {
    id: "private-memory-vault",
    name: "Vault",
    icon: SmilePlus,
  },
] as const;

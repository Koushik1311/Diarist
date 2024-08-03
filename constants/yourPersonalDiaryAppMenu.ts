import { Notebook, SmilePlus, Type, AlignJustify } from "lucide-react";

export const YourPersonalDiaryAppMenu = [
  {
    id: "journal",
    name: "Journal",
    icon: Notebook,
  },
  {
    id: "title",
    name: "Title",
    icon: Type,
  },
  {
    id: "mood",
    name: "Mood",
    icon: SmilePlus,
  },
  {
    id: "text",
    name: "Text",
    icon: AlignJustify,
    image: "./mood.png",
  },
] as const;

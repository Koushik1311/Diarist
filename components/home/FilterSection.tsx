import { CalendarSearch, SmilePlus } from "lucide-react";
import Image from "next/image";

export default function FilterSection() {
  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-y-12 gap-x-5">
      <div className="flex-1">
        <SmilePlus className="w-6 h-6 text-violet-600" />
        <p className="text-lg mt-4 flex flex-col">
          <span className="font-semibold">Sort Your Journal by Mood</span>
          <span>
            Organize your entries to reflect different emotional states, making
            it easier to find and review specific moods.
          </span>
        </p>
        <div className="flex items-center justify-center">
          <Image
            src="/filter_by_mood.png"
            alt="Sort Your Journal by Mood"
            width={2879}
            height={1574}
            quality={100}
            priority
            className="mt-10 w-[70%] h-auto"
          />
        </div>
      </div>
      <div className="flex-1">
        <CalendarSearch className="w-6 h-6 text-violet-600" />
        <p className="text-lg mt-4 flex flex-col">
          <span className="font-semibold">Browse Your Journal by Month</span>
          <span>
            Navigate through your entries by selecting specific months, allowing
            you to easily access and reflect on past periods.
          </span>
        </p>
        <div className="flex items-center justify-center">
          <Image
            src="/filter_by_month.png"
            alt="Browse Your Journal by Month"
            width={2879}
            height={1574}
            quality={100}
            priority
            className="mt-10 w-[70%] h-auto"
          />
        </div>
      </div>
    </div>
  );
}

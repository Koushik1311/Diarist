import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Months } from "@/constants/months";
import { getLocalYear } from "@/utils/local-day";

type DateObject = {
  year: number;
  month: number;
};

type Props = {
  children: React.ReactNode;
  className: string;
  formAction: (year: number, month: number) => void;
};

export default function DiaryFilter({
  children,
  className,
  formAction,
}: Props) {
  return (
    <form>
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none ring-0 focus:outline-none">
          <span className={className}>{children}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex items-center justify-center">
            {getLocalYear()}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <ul className="grid grid-cols-4 gap-4">
              {Months.map((month, index) => (
                <li key={index}>
                  <button
                    formAction={() => formAction(getLocalYear(), month.index)}
                  >
                    {month.name}
                  </button>
                </li>
              ))}
            </ul>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </form>
  );
}

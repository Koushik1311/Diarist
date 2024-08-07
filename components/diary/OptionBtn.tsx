"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteRecord } from "@/data/diary";
import { setTextStyle } from "@/redux/features/textStyle.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getLocalYear } from "@/utils/local-day";
import { Ellipsis, Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Gloria_Hallelujah, Kalam } from "next/font/google";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { saveToLocalStorage } from "@/utils/localStorage";

const kalam = Kalam({
  weight: "400",
  subsets: ["latin"],
});

const gloriaHallelujah = Gloria_Hallelujah({
  weight: "400",
  subsets: ["latin"],
});

export default function OptionBtn({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const textSize = useAppSelector((state) => state.textStyleReducer.text_size);
  const router = useRouter();

  const handleIncrementSize = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const newSize = textSize + 1;
    dispatch(setTextStyle({ text_size: newSize }));

    saveToLocalStorage("text_size", newSize);
  };

  const handleDecrementSize = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const newSize = textSize - 1;
    dispatch(setTextStyle({ text_size: newSize }));

    saveToLocalStorage("text_size", newSize);
  };

  const handleFontChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    fontName: string
  ) => {
    event.stopPropagation();
    dispatch(setTextStyle({ text_font: fontName }));

    saveToLocalStorage("text_font", fontName);
  };

  const handleDelete = async () => {
    const loadingToadtId = toast.loading("Deleting entry...");
    const { error } = await deleteRecord(id);

    if (error) {
      toast.info(error, {
        id: loadingToadtId,
      });
    }
    router.push(`/diary/${getLocalYear()}`);
    toast.success("Entry deleted successfully!", { id: loadingToadtId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-none ring-0 focus:outline-none text-zinc-600 hover:text-zinc-900">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-3">
        {/* Typography */}
        <DropdownMenuItem className="grid grid-cols-3 mx-2">
          <button
            onClick={(event) => handleFontChange(event, "kalam")}
            className={`flex flex-col items-center justify-center text-zinc-500 hover:text-zinc-800 transition-colors ${kalam.className}`}
          >
            <span className="text-2xl">Ag</span>
            <span className="text-xs font-light">Kalam</span>
          </button>

          <button
            onClick={(event) => handleFontChange(event, "gloriaHallelujah")}
            className={`flex flex-col items-center justify-center text-zinc-500 hover:text-zinc-800 transition-colors ${gloriaHallelujah.className}`}
          >
            <span className="text-2xl">Ag</span>
            <span className="text-xs font-light">IF</span>
          </button>

          <button
            onClick={(event) => handleFontChange(event, "normal")}
            className="flex flex-col items-center justify-center text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            <span className="text-2xl">Ag</span>
            <span className="text-xs font-light">Normal</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-between">
          <button onClick={handleDecrementSize}>
            <Minus />
          </button>
          <span>{textSize}</span>
          <button onClick={handleIncrementSize}>
            <Plus />
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={handleDelete} className="flex items-center gap-3">
            <Trash2 className="w-[18px] h-[18px]" />
            <span>Delete</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

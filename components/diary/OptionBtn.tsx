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

export default function OptionBtn({ id }: { id: number }) {
  const dispatch = useAppDispatch();
  const textSize = useAppSelector((state) => state.textStyleReducer.text_size);
  const router = useRouter();

  const handleIncrementSize = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(setTextStyle({ text_size: textSize + 1 }));
  };

  const handleDecrementSize = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(setTextStyle({ text_size: textSize - 1 }));
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
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-3">
        {/* Typography */}
        <DropdownMenuItem>Profile</DropdownMenuItem>
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
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

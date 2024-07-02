"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { browserClient } from "@/utils/supabase/client";
import { HardDriveUpload } from "lucide-react";

export default function TitleInput({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const [inputTitle, setInputTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const supabase = browserClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setInputTitle(newTitle);
  };

  const handleSave = async () => {
    const { data, error } = await supabase
      .from("diary_entries")
      .update({ title: inputTitle })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating content:", error);
    }
  };

  // const handleKeyDown = () => {
  //   if (e.key === "Enter") {
  //     handleSave(e);
  //   }
  // };

  useEffect(() => {
    const handleClickOutside = () => {
      if (!inputRef.current) {
        handleSave();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, inputTitle, id]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative border-none ring-0 focus:outline-none px-2 rounded-sm hover:bg-zinc-200">
        {inputTitle}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="absolute top-full left-1 w-screen pr-10 md:w-96"
      >
        <>
          <input
            ref={inputRef}
            value={inputTitle}
            onChange={handleInputChange}
            // onKeyDown={handleKeyDown}
            className="h-9 px-3 text-sm rounded-[6px] border border-zinc-300 focus:outline-none w-full"
          />
          {/* <button
            onClick={handleSave}
            className="mt-2 bg-zinc-300 w-12 h-12 rounded-full flex items-center justify-center"
          >
            <HardDriveUpload />
          </button> */}
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { browserClient } from "@/utils/supabase/client";

export default function TimeCapsuleTitleInput({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [inputTitle, setInputTitle] = useState(title);
  const [checkTitle, setCheckTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const supabase = browserClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setInputTitle(newTitle);
  };

  const handleSave = async () => {
    const { data, error } = await supabase
      .from("time_capsules")
      .update({ title: inputTitle })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating content:", error);
    }

    if (data) {
      setCheckTitle(data?.title!);
    }
  };

  // const handleKeyDown = () => {
  //   if (e.key === "Enter") {
  //     handleSave(e);
  //   }
  // };

  useEffect(() => {
    const handleClickOutside = () => {
      if (!inputRef.current && inputTitle !== checkTitle) {
        handleSave();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, inputTitle, checkTitle, id]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative border-none ring-0 focus:outline-none px-2 rounded-sm hover:bg-zinc-200 text-left">
        <p className="text-wrap">{inputTitle}</p>
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
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

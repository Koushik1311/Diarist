"use client";

import { Ellipsis } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "../ui/switch";
import { setIsLocked } from "@/data/diary";

type Props = {
  id: number;
  locked: boolean;
};

export default function PageMenu({ id, locked }: Props) {
  const [isLocked, setIslocked] = useState<boolean>(locked);

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleLockPageClick = () => {
    setIslocked(!isLocked);
    setIsLocked(id, !isLocked);
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none ring-0 focus:outline-none h-7 rounded-md px-1 hover:bg-zinc-300 transition-colors flex items-center justify-center">
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute right-0">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleItemClick}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={handleItemClick}>Billing</DropdownMenuItem>
          <DropdownMenuItem onClick={handleItemClick}>
            <span>Lock page</span>
            <Switch checked={isLocked} onCheckedChange={handleLockPageClick} />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleItemClick}>Subsc</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

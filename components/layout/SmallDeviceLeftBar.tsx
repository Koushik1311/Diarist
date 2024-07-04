"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  CreditCard,
  Home,
  LogOut,
  Menu,
  Plus,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/actions/auth";
import Link from "next/link";
import AddEntryButton from "../global/AddEntryButton";
import { getLocalYear } from "@/utils/local-day";
import EntryList from "./EntryList";

type Props = {
  user: any;
  firstLetter: string;
};

export default function SmallDeviceLeftBar({ user, firstLetter }: Props) {
  const [showLeftBar, setShowLeftBar] = useState<boolean>(false);

  const onButtonClick = () => {
    setShowLeftBar(!showLeftBar);
  };

  return (
    <div>
      <button onClick={onButtonClick}>
        <Menu />
      </button>
      {showLeftBar && (
        <div className="relative w-screen">
          <EntryList />
        </div>
      )}
    </div>
  );
}

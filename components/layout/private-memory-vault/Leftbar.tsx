import React from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LeftbarMenu from "./LeftbarMenu";

export default async function Leftbar() {
  return (
    <div className="relative">
      <div className="lg:hidden absolute top-2 left-2">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="w-[355px]">
            <div>
              <LeftbarMenu />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:inline">
        <LeftbarMenu />
      </div>
    </div>
  );
}

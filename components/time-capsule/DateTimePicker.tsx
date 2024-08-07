"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css"; // Import default styles

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SaveAlert from "./SaveAlert";

export function DateTimePicker({ id }: { id: string }) {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<string | null>("00:00");

  // Combine date and time into a single Date object
  const combinedDateTime = date
    ? new Date(
        date.setHours(
          parseInt(time!.split(":")[0]),
          parseInt(time!.split(":")[1])
        )
      )
    : undefined;

  const isoDate = combinedDateTime ? combinedDateTime.toISOString() : undefined;

  // console.log("ISO Date: ", isoDate);

  return (
    <div className="flex items-center">
      {isoDate === undefined ? (
        <></>
      ) : (
        <SaveAlert id={id} timestamp={isoDate} />
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            className={cn(
              "justify-start rounded-md text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {combinedDateTime ? (
              format(combinedDateTime, "PPP p")
            ) : (
              <span>Pick a date and time</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="flex flex-col space-y-2 p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className=""
            />
            <TimePicker
              onChange={setTime}
              value={time}
              disableClock={true}
              clearIcon={null}
              className="custom-time-picker"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, type CalendarProps } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { cn } from "@/lib/cn";

export interface DatePickerProps extends Omit<CalendarProps, "selected" | "onSelect" | "className"> {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  placeholder?: string;
  /** Intl.DateTimeFormat options for the trigger label */
  format?: Intl.DateTimeFormatOptions;
  className?: string;
}

/** Button + popover calendar. Works controlled (`value`/`onChange`) or uncontrolled. */
export function DatePicker({
  value,
  defaultValue = null,
  onChange,
  placeholder = "Pick a date",
  format = { year: "numeric", month: "short", day: "numeric" },
  locale,
  className,
  ...calendar
}: DatePickerProps) {
  const [internal, setInternal] = React.useState<Date | null>(defaultValue);
  const [open, setOpen] = React.useState(false);
  const date = value !== undefined ? value : internal;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" className={cn("w-56 justify-between font-normal", !date && "text-subtle", className)} />
        }
      >
        <span>{date ? new Intl.DateTimeFormat(locale, format).format(date) : placeholder}</span>
        <PixelIcon name="calendar" size={2} />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <Calendar
          {...calendar}
          locale={locale}
          selected={date}
          onSelect={(d) => {
            setInternal(d);
            onChange?.(d);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

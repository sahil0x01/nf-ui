"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { PixelIcon } from "@/components/ui/pixel-icon";

/* ── date helpers (local time, no dependencies) ── */
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d: Date, n: number) => {
  const t = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const last = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
  return new Date(t.getFullYear(), t.getMonth(), Math.min(d.getDate(), last));
};
const isSameDay = (a?: Date | null, b?: Date | null) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const key = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

export interface CalendarProps {
  /** selected date (controlled) */
  selected?: Date | null;
  onSelect?: (date: Date) => void;
  /** month to show first (defaults to selected or today) */
  defaultMonth?: Date;
  min?: Date;
  max?: Date;
  /** return true to disable a day */
  isDisabled?: (date: Date) => boolean;
  /** 0 = Sunday, 1 = Monday */
  weekStartsOn?: 0 | 1;
  locale?: string;
  className?: string;
}

/**
 * Single-date calendar.
 * Keyboard: ←/→ day · ↑/↓ week · PageUp/PageDown month · Home/End week start/end · Enter/Space select.
 */
export function Calendar({
  selected,
  onSelect,
  defaultMonth,
  min,
  max,
  isDisabled,
  weekStartsOn = 0,
  locale,
  className,
}: CalendarProps) {
  const today = React.useMemo(() => startOfDay(new Date()), []);
  const [focused, setFocused] = React.useState<Date>(() => startOfDay(selected ?? defaultMonth ?? today));
  const [view, setView] = React.useState<Date>(() => new Date(focused.getFullYear(), focused.getMonth(), 1));
  const gridRef = React.useRef<HTMLDivElement>(null);
  const wantFocus = React.useRef(false);

  const disabled = (d: Date) =>
    (min && d < startOfDay(min)) || (max && d > startOfDay(max)) || !!isDisabled?.(d);

  const monthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(view);
  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2023, 0, 1 + ((i + weekStartsOn) % 7)); // Jan 1 2023 is a Sunday
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(d).slice(0, 2);
  });

  // 6 weeks always, so the popover never changes height
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const days = Array.from({ length: 42 }, (_, i) => addDays(first, i - offset));

  const moveTo = (d: Date) => {
    wantFocus.current = true;
    setFocused(d);
    setView(new Date(d.getFullYear(), d.getMonth(), 1));
  };

  React.useEffect(() => {
    if (!wantFocus.current) return;
    wantFocus.current = false;
    gridRef.current?.querySelector<HTMLElement>(`[data-key="${key(focused)}"]`)?.focus();
  }, [focused, view]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, () => Date> = {
      ArrowLeft: () => addDays(focused, -1),
      ArrowRight: () => addDays(focused, 1),
      ArrowUp: () => addDays(focused, -7),
      ArrowDown: () => addDays(focused, 7),
      PageUp: () => addMonths(focused, e.shiftKey ? -12 : -1),
      PageDown: () => addMonths(focused, e.shiftKey ? 12 : 1),
      Home: () => addDays(focused, -((focused.getDay() - weekStartsOn + 7) % 7)),
      End: () => addDays(focused, 6 - ((focused.getDay() - weekStartsOn + 7) % 7)),
    };
    const next = map[e.key]?.();
    if (next) {
      e.preventDefault();
      moveTo(next);
    }
  };

  const step = (n: number) => {
    const v = addMonths(view, n);
    setView(new Date(v.getFullYear(), v.getMonth(), 1));
    setFocused(new Date(v.getFullYear(), v.getMonth(), Math.min(focused.getDate(), 28)));
  };

  const navBtn = "nf-pixel-flat flex size-7 items-center justify-center bg-surface hover:bg-surface-2 active:translate-y-0.5";

  return (
    <div data-slot="calendar" className={cn("inline-block font-sans", className)}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <button type="button" aria-label="Previous month" className={navBtn} onClick={() => step(-1)}>
          <PixelIcon name="chevron-left" size={2} />
        </button>
        <div aria-live="polite" className="nf-h4">{monthLabel}</div>
        <button type="button" aria-label="Next month" className={navBtn} onClick={() => step(1)}>
          <PixelIcon name="chevron-right" size={2} />
        </button>
      </div>
      <div role="grid" aria-label={monthLabel} ref={gridRef} onKeyDown={onKeyDown}>
        <div role="row" className="mb-1 grid grid-cols-7">
          {weekdays.map((w, i) => (
            <div key={i} role="columnheader" className="nf-label py-1 text-center">{w}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {days.map((d) => {
            const inMonth = d.getMonth() === view.getMonth();
            const sel = isSameDay(d, selected);
            const isToday = isSameDay(d, today);
            const off = disabled(d);
            return (
              <button
                key={key(d)}
                type="button"
                role="gridcell"
                data-key={key(d)}
                aria-selected={sel}
                aria-current={isToday ? "date" : undefined}
                aria-label={d.toDateString()}
                disabled={off}
                tabIndex={isSameDay(d, focused) ? 0 : -1}
                onClick={() => {
                  setFocused(d);
                  if (!inMonth) setView(new Date(d.getFullYear(), d.getMonth(), 1));
                  onSelect?.(d);
                }}
                className={cn(
                  "relative flex size-9 items-center justify-center text-sm transition-colors duration-[var(--nf-dur-instant)]",
                  "hover:bg-surface-2 focus-visible:outline-offset-[-3px]",
                  !inMonth && "text-subtle",
                  isToday && !sel && "font-semibold after:absolute after:bottom-1 after:size-1 after:bg-accent",
                  sel && "bg-accent font-semibold text-accent-foreground hover:bg-accent",
                  off && "pointer-events-none opacity-35",
                )}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

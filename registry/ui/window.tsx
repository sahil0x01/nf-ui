"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

/** 16-bit desktop window: striped title bar, pixel close box. */
export function Window({
  title = "untitled",
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("nf-pixel bg-surface [--nf-drop:4px]", className)}>
      <div className="flex items-center gap-2 bg-sun px-2 py-1 text-sun-foreground">
        <span aria-hidden className="nf-pixel-flat size-3 bg-surface" />
        <span aria-hidden className="h-2 flex-1 bg-dither opacity-60" />
        <span className="font-label text-[0.625rem] uppercase">{title}</span>
        <span aria-hidden className="h-2 flex-1 bg-dither opacity-60" />
      </div>
      <div className={cn("p-4", bodyClassName)}>{children}</div>
    </div>
  );
}

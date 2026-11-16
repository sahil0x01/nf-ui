import * as React from "react";
import { Button } from "@/components/ui/button";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { cn } from "@/lib/cn";

/** 1-based page numbers with "…" gaps, e.g. [1, "…", 4, 5, 6, "…", 12] */
export function pageRange(page: number, pageCount: number, siblings = 1): (number | "…")[] {
  const total = siblings * 2 + 5; // first, last, current, 2 gaps, siblings
  if (pageCount <= total) return Array.from({ length: pageCount }, (_, i) => i + 1);
  const left = Math.max(page - siblings, 2);
  const right = Math.min(page + siblings, pageCount - 1);
  const out: (number | "…")[] = [1];
  if (left > 2) out.push("…");
  for (let p = left; p <= right; p++) out.push(p);
  if (right < pageCount - 1) out.push("…");
  out.push(pageCount);
  return out;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblings = 1,
  className,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblings?: number;
  className?: string;
}) {
  return (
    <nav aria-label="Pagination" className={cn("flex flex-wrap items-center gap-2", className)}>
      <Button
        size="icon"
        variant="outline"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <PixelIcon name="chevron-left" size={2} />
      </Button>
      {pageRange(page, pageCount, siblings).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} aria-hidden className="w-6 text-center font-label text-xs text-subtle">
            …
          </span>
        ) : (
          <Button
            key={p}
            size="icon"
            variant={p === page ? "default" : "outline"}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
            onClick={() => onPageChange(p)}
            className="font-label text-xs"
          >
            {p}
          </Button>
        ),
      )}
      <Button
        size="icon"
        variant="outline"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        <PixelIcon name="chevron-right" size={2} />
      </Button>
    </nav>
  );
}

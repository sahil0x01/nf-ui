import * as React from "react";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { cn } from "@/lib/cn";

/** `dashed` renders a pixel-dash rule. */
export function Separator({
  className,
  dashed,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof BaseSeparator> & { dashed?: boolean }) {
  return (
    <BaseSeparator
      orientation={orientation}
      className={cn(
        orientation === "horizontal" ? "h-0.5 w-full" : "h-full w-0.5",
        dashed ? "bg-dither opacity-50" : "bg-border",
        className,
      )}
      {...props}
    />
  );
}

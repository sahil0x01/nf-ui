import * as React from "react";
import { cn } from "@/lib/cn";

/** Raised pixel panel with a hard drop shadow. Hops up one pixel on hover. */
export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "nf-pixel bg-surface p-4 [--nf-drop:4px]",
        "transition-transform duration-[var(--nf-dur-fast)] ease-[steps(2,end)] hover:-translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mb-3 flex flex-col gap-1.5", className)} {...props} />;
}
export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("nf-h3", className)} {...props} />;
}
export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("nf-small", className)} {...props} />;
}
export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mt-5 flex items-center gap-3", className)} {...props} />;
}

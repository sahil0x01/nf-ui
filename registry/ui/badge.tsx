import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "nf-pixel-flat inline-flex items-center gap-1.5 px-2 py-1 font-label text-[0.625rem] leading-none uppercase",
  {
    variants: {
      variant: {
        default: "bg-surface text-foreground",
        accent: "bg-accent text-accent-foreground",
        sun: "bg-sun text-sun-foreground",
        teal: "bg-teal text-teal-foreground",
        sage: "bg-sage text-sage-foreground",
        danger: "bg-danger text-danger-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  /** blinking status pixel */
  dot?: boolean;
}

export function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span className="size-1.5 animate-blink bg-current" />}
      {children}
    </span>
  );
}

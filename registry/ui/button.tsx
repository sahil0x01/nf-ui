import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  [
    "nf-pixel nf-pressable inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap select-none",
    "font-sans font-medium",
    "disabled:pointer-events-none disabled:opacity-45 disabled:saturate-50",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground",
        sun: "bg-sun text-sun-foreground",
        teal: "bg-teal text-teal-foreground",
        sage: "bg-sage text-sage-foreground",
        outline: "bg-surface text-foreground",
        secondary: "bg-surface-2 text-foreground",
        destructive: "bg-danger text-danger-foreground",
        ghost:
          "bg-transparent text-muted shadow-none hover:bg-surface-2 hover:text-foreground active:translate-y-0",
        link: "bg-transparent text-accent underline underline-offset-4 shadow-none active:translate-y-0",
      },
      size: {
        sm: "h-7 px-3 text-xs",
        md: "h-9 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export interface ButtonProps
  extends React.ComponentProps<typeof BaseButton>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, render, ...props }: ButtonProps) {
  return (
    <BaseButton
      data-slot="button"
      render={render}
      // rendering as a link (or any non-button) must opt out of native button semantics
      nativeButton={render ? false : undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

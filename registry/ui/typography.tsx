import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const headingVariants = cva("text-foreground", {
  variants: {
    level: { display: "nf-display", h1: "nf-h1", h2: "nf-h2", h3: "nf-h3", h4: "nf-h4" },
  },
  defaultVariants: { level: "h2" },
});

const tagFor = { display: "h1", h1: "h1", h2: "h2", h3: "h3", h4: "h4" } as const;

export function Heading({
  level = "h2",
  as,
  className,
  ...props
}: Omit<React.ComponentProps<"h1">, "color"> &
  VariantProps<typeof headingVariants> & { as?: React.ElementType }) {
  const Tag = as ?? tagFor[level ?? "h2"];
  return <Tag className={cn(headingVariants({ level }), className)} {...props} />;
}

/** Highlighted word inside a heading: <Heading>Make it <Swash>yours</Swash></Heading> */
export function Swash({ className, ...props }: React.ComponentProps<"em">) {
  return <em className={cn("nf-swash", className)} {...props} />;
}

/** Highlighter-marker emphasis */
export function Mark({ className, ...props }: React.ComponentProps<"mark">) {
  return <mark className={cn("nf-mark bg-transparent text-inherit", className)} {...props} />;
}

/** Mono micro-label / eyebrow */
export function Label({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("nf-label", className)} {...props} />;
}

export function Text({
  variant = "body",
  className,
  ...props
}: React.ComponentProps<"p"> & { variant?: "lead" | "body" | "small" }) {
  const cls = { lead: "nf-lead", body: "nf-body text-muted", small: "nf-small" }[variant];
  return <p className={cn(cls, className)} {...props} />;
}

export function Code({ className, ...props }: React.ComponentProps<"code">) {
  return <code className={cn("nf-code", className)} {...props} />;
}

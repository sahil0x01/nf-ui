import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icon";

const alertVariants = cva("nf-pixel-flat flex gap-3 p-3", {
  variants: {
    variant: {
      default: "bg-surface text-foreground",
      info: "bg-surface text-foreground [&_[data-icon]]:text-teal",
      success: "bg-surface text-foreground [&_[data-icon]]:text-sage",
      warning: "bg-surface text-foreground [&_[data-icon]]:text-sun",
      error: "bg-surface text-foreground [&_[data-icon]]:text-danger",
    },
  },
  defaultVariants: { variant: "default" },
});

const icons: Record<string, PixelIconName> = {
  default: "info", info: "info", success: "check", warning: "sparkle", error: "cross",
};

export function Alert({
  className,
  variant = "default",
  title,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & VariantProps<typeof alertVariants> & { title?: React.ReactNode }) {
  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      <span data-icon className="mt-0.5"><PixelIcon name={icons[variant ?? "default"]} size={2.5} /></span>
      <div className="flex-1">
        {title && <div className="nf-h4">{title}</div>}
        {children && <div className="nf-small mt-0.5">{children}</div>}
      </div>
    </div>
  );
}

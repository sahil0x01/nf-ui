import * as React from "react";
import { cn } from "@/lib/cn";
import { PixelIcon } from "@/components/ui/pixel-icon";

export function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="Breadcrumb" className={className} {...props} />;
}
export function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return <ol className={cn("flex flex-wrap items-center gap-2 font-sans text-sm text-muted", className)} {...props} />;
}
export function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("inline-flex items-center gap-2", className)} {...props} />;
}
export function BreadcrumbLink({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      className={cn("underline-offset-4 hover:text-foreground hover:underline", className)}
      {...props}
    />
  );
}
export function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return <span aria-current="page" className={cn("font-medium text-foreground", className)} {...props} />;
}
export function BreadcrumbSeparator({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li role="presentation" aria-hidden className={cn("text-subtle", className)} {...props}>
      <PixelIcon name="chevron-right" size={1.5} />
    </li>
  );
}

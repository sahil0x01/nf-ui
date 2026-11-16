import * as React from "react";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cn } from "@/lib/cn";

/** Square pixel avatar; falls back to initials. */
export function Avatar({
  src,
  alt,
  fallback,
  className,
}: {
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
}) {
  return (
    <BaseAvatar.Root
      className={cn("nf-pixel-flat inline-flex size-10 items-center justify-center overflow-hidden bg-surface-2 align-middle", className)}
    >
      {src && <BaseAvatar.Image src={src} alt={alt} className="size-full object-cover" />}
      <BaseAvatar.Fallback className="font-label text-xs uppercase text-muted">{fallback}</BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}

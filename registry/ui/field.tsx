import * as React from "react";
import { Field as BaseField } from "@base-ui/react/field";
import { cn } from "@/lib/cn";

/** Label + control + description + error, wired for accessibility and validation. */
export function Field({ className, ...props }: React.ComponentProps<typeof BaseField.Root>) {
  return <BaseField.Root className={cn("flex flex-col gap-1.5", className)} {...props} />;
}
export function FieldLabel({ className, ...props }: React.ComponentProps<typeof BaseField.Label>) {
  return <BaseField.Label className={cn("font-sans text-sm font-medium", className)} {...props} />;
}
export const FieldControl = BaseField.Control;
export function FieldDescription({ className, ...props }: React.ComponentProps<typeof BaseField.Description>) {
  return <BaseField.Description className={cn("nf-small", className)} {...props} />;
}
export function FieldError({ className, ...props }: React.ComponentProps<typeof BaseField.Error>) {
  return <BaseField.Error className={cn("font-label text-xs text-danger", className)} {...props} />;
}

"use client";
import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "@/lib/cn";
import { PixelIcon } from "@/components/ui/pixel-icon";

/**
 * Command palette.
 *
 *   const [open, setOpen] = React.useState(false);
 *   useCommandHotkey(setOpen);                      // ⌘K / Ctrl+K
 *   <CommandDialog open={open} onOpenChange={setOpen}>
 *     <CommandInput placeholder="Type a command…" />
 *     <CommandList>
 *       <CommandEmpty>No results.</CommandEmpty>
 *       <CommandGroup heading="Actions">
 *         <CommandItem onSelect={() => …}>New project <CommandShortcut>N</CommandShortcut></CommandItem>
 *       </CommandGroup>
 *     </CommandList>
 *   </CommandDialog>
 *
 * Filtering: every word typed must appear (case-insensitive) in the item's `value` or text.
 * Keyboard: ↑ ↓ move, Enter selects, Esc closes.
 */

type Ctx = {
  query: string;
  setQuery: (q: string) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  listRef: React.RefObject<HTMLDivElement | null>;
  empty: boolean;
};
const CommandContext = React.createContext<Ctx | null>(null);
const useCommand = () => {
  const c = React.useContext(CommandContext);
  if (!c) throw new Error("Command parts must be used inside <Command> or <CommandDialog>");
  return c;
};

/** true if every whitespace-separated word of `q` appears in `text` (case-insensitive) */
function matches(text: string, q: string) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const t = text.toLowerCase();
  return words.every((w) => t.includes(w));
}

/** Plain text of a React node (used when an item has no explicit `value`). */
function textOf(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    // shortcuts are hints, not searchable text
    if (node.type === CommandShortcut) return "";
    return textOf(node.props.children);
  }
  return "";
}

/** Opens/closes with ⌘K or Ctrl+K. */
export function useCommandHotkey(setOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);
}

export function Command({ className, children, ...props }: React.ComponentProps<"div">) {
  const [query, setQuery] = React.useState("");
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [empty, setEmpty] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const options = () => Array.from(listRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? []);

  // after every query change: activate the first match and track emptiness
  React.useLayoutEffect(() => {
    const opts = options();
    setEmpty(opts.length === 0);
    setActiveId(opts[0]?.id ?? null);
  }, [query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const opts = options();
    if (!opts.length) return;
    const i = opts.findIndex((o) => o.id === activeId);
    const move = (n: number) => {
      const next = opts[(n + opts.length) % opts.length];
      setActiveId(next.id);
      next.scrollIntoView({ block: "nearest" });
    };
    if (e.key === "ArrowDown") { e.preventDefault(); move(i + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(i - 1); }
    else if (e.key === "Home") { e.preventDefault(); move(0); }
    else if (e.key === "End") { e.preventDefault(); move(opts.length - 1); }
    else if (e.key === "Enter") { e.preventDefault(); opts[i]?.click(); }
  };

  return (
    <CommandContext.Provider value={{ query, setQuery, activeId, setActiveId, listRef, empty }}>
      <div data-slot="command" onKeyDown={onKeyDown} className={cn("flex flex-col", className)} {...props}>
        {children}
      </div>
    </CommandContext.Provider>
  );
}

export function CommandDialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-background/70 transition-opacity duration-[var(--nf-dur-fast)] ease-[steps(3,end)]",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
          )}
        />
        <BaseDialog.Popup
          aria-label="Command palette"
          className={cn(
            "nf-pop nf-pixel fixed z-50 top-[18%] left-1/2 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 bg-surface outline-none [--nf-drop:4px]",
            "data-[starting-style]:-translate-x-1/2 data-[ending-style]:-translate-x-1/2",
          )}
        >
          {/* remount Command on each open so query/active state resets */}
          <Command>{children}</Command>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

export function CommandInput({ className, ...props }: Omit<React.ComponentProps<"input">, "value" | "onChange">) {
  const { query, setQuery, activeId } = useCommand();
  return (
    <div className="flex items-center gap-3 border-b-2 border-ink px-4">
      <PixelIcon name="search" size={2} className="text-muted" />
      <input
        data-slot="command-input"
        role="combobox"
        aria-expanded
        aria-controls="nf-command-list"
        aria-activedescendant={activeId ?? undefined}
        autoComplete="off"
        spellCheck={false}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={cn(
          "h-12 w-full bg-transparent font-sans text-sm text-foreground outline-none placeholder:text-subtle",
          className,
        )}
        {...props}
      />
      <span className="nf-label shrink-0">esc</span>
    </div>
  );
}

export function CommandList({ className, ...props }: React.ComponentProps<"div">) {
  const { listRef } = useCommand();
  return (
    <div
      id="nf-command-list"
      ref={listRef}
      role="listbox"
      className={cn("max-h-80 overflow-y-auto p-2", className)}
      {...props}
    />
  );
}

export function CommandEmpty({ className, children = "No results.", ...props }: React.ComponentProps<"div">) {
  const { empty } = useCommand();
  if (!empty) return null;
  return (
    <div className={cn("nf-small px-3 py-8 text-center", className)} {...props}>
      {children}
    </div>
  );
}

export function CommandGroup({
  heading,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { heading?: string }) {
  const { query } = useCommand();
  const ref = React.useRef<HTMLDivElement>(null);
  const [hasItems, setHasItems] = React.useState(true);
  // hide the group (and its heading) when the filter leaves it empty
  React.useLayoutEffect(() => {
    setHasItems(!!ref.current?.querySelector('[role="option"]'));
  }, [query]);
  return (
    <div ref={ref} role="group" aria-label={heading} hidden={!hasItems} className={cn(className)} {...props}>
      {heading && <div className="nf-label px-2 pt-2 pb-1.5">{heading}</div>}
      {children}
    </div>
  );
}

export function CommandItem({
  value,
  onSelect,
  disabled,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "onSelect"> & {
  /** text used for filtering; defaults to the item's text content (shortcuts excluded) */
  value?: string;
  onSelect?: () => void;
  disabled?: boolean;
}) {
  const { query, activeId, setActiveId } = useCommand();
  const id = React.useId();
  if (!matches(value ?? textOf(children), query)) return null;
  const active = activeId === id;
  return (
    <div
      id={id}
      role="option"
      aria-selected={active}
      aria-disabled={disabled || undefined}
      data-active={active ? "" : undefined}
      onMouseMove={() => !disabled && !active && setActiveId(id)}
      onClick={() => !disabled && onSelect?.()}
      className={cn(
        "flex cursor-default items-center gap-3 px-2 py-2 font-sans text-sm select-none",
        "data-[active]:bg-accent data-[active]:text-accent-foreground",
        "aria-disabled:opacity-45",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("ml-auto font-label text-xs opacity-70", className)} {...props} />;
}

export function CommandSeparator({ className, ...props }: React.ComponentProps<"div">) {
  const { query } = useCommand();
  if (query) return null; // separators only make sense when everything is listed
  return <div role="separator" className={cn("my-1 h-0.5 bg-border", className)} {...props} />;
}

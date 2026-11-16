import * as React from "react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/typography";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, useCommandHotkey } from "@/components/ui/command";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Link, navigate, usePath } from "./router";
import { guides } from "./nav";
import { componentDocs } from "./pages/component-docs";
import { slugify } from "./parts";
import { cn } from "@/lib/cn";

/* ── theme ── */
export function useTheme() {
  const [dark, setDark] = React.useState(() => {
    try {
      const saved = localStorage.getItem("nf-theme");
      if (saved) return saved === "dark";
    } catch {}
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("nf-theme", dark ? "dark" : "light"); } catch {}
  }, [dark]);
  return [dark, () => setDark((d) => !d)] as const;
}

/* ── sidebar ── */
function SidebarLink({ href, children }: { href: string; children: React.ReactNode }) {
  const path = usePath();
  const active = path === href || (href === "/docs/introduction" && path === "/docs");
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative block px-3 py-1.5 font-sans text-sm text-muted transition-colors hover:text-foreground",
        active && "bg-sun font-medium text-sun-foreground hover:text-sun-foreground",
      )}
    >
      {children}
    </Link>
  );
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Documentation" className="space-y-7 pb-10" onClick={onNavigate}>
      <div>
        <Label className="mb-2 block px-3">Getting started</Label>
        {guides.map((g) => (
          <SidebarLink key={g.slug} href={`/docs/${g.slug}`}>{g.title}</SidebarLink>
        ))}
      </div>
      <div>
        <Label className="mb-2 block px-3">Components <span className="text-subtle">· {componentDocs.length}</span></Label>
        {componentDocs.map((c) => (
          <SidebarLink key={c.slug} href={`/docs/components/${c.slug}`}>{c.name}</SidebarLink>
        ))}
      </div>
    </nav>
  );
}

/* ── right-hand "On this page" ── */
export function Toc() {
  const path = usePath();
  const [items, setItems] = React.useState<{ id: string; text: string; level: string }[]>([]);
  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => {
    const t = setTimeout(() => {
      const hs = Array.from(document.querySelectorAll<HTMLElement>("article [data-toc]"));
      setItems(hs.map((h) => ({ id: h.id, text: h.textContent?.replace(/#$/, "") ?? "", level: h.dataset.toc! })));
      const io = new IntersectionObserver(
        (entries) => {
          const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (vis[0]) setActive(vis[0].target.id);
        },
        { rootMargin: "-90px 0px -65% 0px" },
      );
      hs.forEach((h) => io.observe(h));
      (window as any).__tocIo?.disconnect();
      (window as any).__tocIo = io;
    }, 120);
    return () => clearTimeout(t);
  }, [path]);

  if (!items.length) return null;
  return (
    <aside aria-label="On this page" className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-52 shrink-0 self-start overflow-y-auto xl:block">
      <Label className="mb-3 block">On this page</Label>
      <ul className="space-y-1 border-l-2 border-border">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={cn(
                "-ml-0.5 block border-l-2 border-transparent py-1 font-sans text-sm text-muted hover:text-foreground",
                i.level === "h3" ? "pl-6" : "pl-3",
                active === i.id && "border-ink font-medium text-foreground",
              )}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ── search ── */
export function Search({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  useCommandHotkey(setOpen);
  const go = (href: string) => () => { setOpen(false); navigate(href); };
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search documentation…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Getting started">
          {guides.map((g) => (
            <CommandItem key={g.slug} onSelect={go(`/docs/${g.slug}`)} value={`${g.title} ${g.description}`}>{g.title}</CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Components">
          {componentDocs.map((c) => (
            <CommandItem key={c.slug} onSelect={go(`/docs/components/${c.slug}`)} value={`${c.name} ${c.description}`}>
              {c.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

/* ── header ── */
export function Header({ onSearch }: { onSearch: () => void }) {
  const [dark, toggle] = useTheme();
  const path = usePath();
  const [menu, setMenu] = React.useState(false);
  const navLink = (href: string, label: string, match: (p: string) => boolean) => (
    <Link href={href} className={cn("nf-label hidden hover:text-foreground md:inline", match(path) && "text-foreground")}>
      {label}
    </Link>
  );
  return (
    <header className="sticky top-0 z-30 border-b-2 border-ink bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[88rem] items-center gap-4 px-4 sm:px-6">
        <Sheet open={menu} onOpenChange={setMenu}>
          <SheetTrigger render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu" />}>
            <PixelIcon name="menu" size={2} />
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto">
            <SheetTitle className="!text-lg mb-6">nullfuse</SheetTitle>
            <Sidebar onNavigate={() => setMenu(false)} />
            <SheetClose className="sr-only">Close</SheetClose>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-sans text-lg font-semibold tracking-tight">
          <PixelIcon name="heart" size={2} className="text-danger" /> nullfuse
        </Link>
        <nav className="ml-4 flex items-center gap-5">
          {navLink("/docs/introduction", "Docs", (p) => p.startsWith("/docs") && !p.startsWith("/docs/components"))}
          {navLink("/docs/components/button", "Components", (p) => p.startsWith("/docs/components"))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onSearch} className="w-9 justify-between gap-6 px-0 font-normal text-muted sm:w-64 sm:px-3">
            <span className="hidden sm:inline">Search documentation…</span>
            <span className="sm:hidden"><PixelIcon name="search" size={2} /></span>
            <span className="hidden items-center gap-1 sm:flex"><Kbd>⌘</Kbd><Kbd>K</Kbd></span>
          </Button>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" size="icon" onClick={toggle} aria-label="Toggle theme" />}>
              <PixelIcon name={dark ? "sun" : "moon"} size={2} />
            </TooltipTrigger>
            <TooltipContent>{dark ? "switch to white" : "switch to black"}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}

/* ── docs shell ── */
export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[88rem] gap-10 px-4 sm:px-6">
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r-2 border-border py-8 pr-4 lg:block">
        <Sidebar />
      </aside>
      <main className="min-w-0 flex-1 py-10 lg:py-12">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>
      <Toc />
    </div>
  );
}

export { slugify };

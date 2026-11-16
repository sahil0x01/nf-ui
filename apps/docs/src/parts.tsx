import * as React from "react";
import registry from "../../../registry/registry.json";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";
import { CodeBlock, type CodeLanguage } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Heading, Text, Label } from "@/components/ui/typography";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { Link } from "./router";
import { cn } from "@/lib/cn";

/* raw component sources, for the "Manual" install tab */
const sources = import.meta.glob("../../../registry/ui/*.tsx", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
export const sourceOf = (slug: string) => sources[`../../../registry/ui/${slug}.tsx`] ?? "";
export const registryItem = (slug: string) => registry.items.find((i) => i.name === slug);
export const registryDepsOf = (slug: string) => {
  const names = new Set(registry.items.map((i) => i.name));
  const deps = new Set<string>();
  for (const m of sourceOf(slug).matchAll(/from\s+["']@\/components\/ui\/([\w-]+)["']/g)) {
    if (names.has(m[1]) && m[1] !== slug) deps.add(m[1]);
  }
  return [...deps];
};

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ── headings with anchors (these feed the right-hand TOC) ── */

function AnchorHeading({
  as: Tag,
  children,
  className,
}: {
  as: "h2" | "h3";
  children: string;
  className?: string;
}) {
  const id = slugify(children);
  return (
    <Tag id={id} data-toc={Tag} className={cn("group scroll-mt-24", className)}>
      <a href={`#${id}`} className="no-underline">
        {children}
        <span aria-hidden className="ml-2 text-subtle opacity-0 transition-opacity group-hover:opacity-100">#</span>
      </a>
    </Tag>
  );
}
export const H2 = ({ children }: { children: string }) => (
  <AnchorHeading as="h2" className="nf-h2 mt-14 mb-4 border-b-2 border-border pb-3">{children}</AnchorHeading>
);
export const H3 = ({ children }: { children: string }) => (
  <AnchorHeading as="h3" className="nf-h3 mt-9 mb-3">{children}</AnchorHeading>
);

export function P({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("nf-body my-4 text-muted", className)} {...props} />;
}
export function UL({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("nf-body my-4 ml-1 list-none space-y-2 text-muted [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:top-[0.65em] [&>li]:before:left-0 [&>li]:before:size-1.5 [&>li]:before:bg-ink [&>li]:before:content-['']", className)} {...props} />;
}
export function Ic({ children }: { children: React.ReactNode }) {
  return <code className="nf-code text-foreground">{children}</code>;
}

/* ── page frame ── */

export function DocPage({
  eyebrow,
  title,
  description,
  badges,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  badges?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <article className="min-w-0 pb-16">
      <Label>{eyebrow}</Label>
      <Heading level="h1" className="mt-3">{title}</Heading>
      <Text variant="lead" className="mt-3 max-w-2xl">{description}</Text>
      {badges && <div className="mt-4 flex flex-wrap gap-2">{badges}</div>}
      <div className="mt-8">{children}</div>
    </article>
  );
}

/* ── live preview + code ── */

export function Preview({
  children,
  code,
  language = "tsx",
  className,
  bare,
}: {
  children: React.ReactNode;
  code: string;
  language?: CodeLanguage;
  className?: string;
  /** don't center the preview (for wide/stacked demos) */
  bare?: boolean;
}) {
  return (
    <Tabs defaultValue="preview" className="my-5">
      <TabsList>
        <TabsTab value="preview">Preview</TabsTab>
        <TabsTab value="code">Code</TabsTab>
      </TabsList>
      <TabsPanel value="preview" className="pt-4">
        <div
          className={cn(
            "nf-pixel-flat bg-surface/50 p-6",
            !bare && "flex min-h-40 flex-wrap items-center justify-center gap-4",
            className,
          )}
        >
          {children}
        </div>
      </TabsPanel>
      <TabsPanel value="code" className="pt-4">
        <CodeBlock code={code} language={language} filename="example.tsx" />
      </TabsPanel>
    </Tabs>
  );
}

/* ── steps ── */

export function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="my-6 space-y-8 [counter-reset:step]">{children}</ol>;
}
export function Step({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <li className="relative pl-12 [counter-increment:step]">
      <span
        aria-hidden
        className="nf-pixel-flat absolute top-0 left-1 flex size-7 items-center justify-center bg-sun font-label text-xs text-sun-foreground before:content-[counter(step)]"
      />
      <div id={slugify(title)} data-toc="h2" className="nf-h4 scroll-mt-24 pt-1">{title}</div>
      <div className="mt-2">{children}</div>
    </li>
  );
}

/* ── install block (CLI / Manual), as on shadcn ── */

export function Install({ slug }: { slug: string }) {
  const item = registryItem(slug);
  const deps = item?.dependencies ?? [];
  const other = registryDepsOf(slug);
  const src = sourceOf(slug);
  const [expanded, setExpanded] = React.useState(false);
  const lines = src.split("\n").length;
  return (
    <Tabs defaultValue="cli" className="my-5">
      <TabsList>
        <TabsTab value="cli">CLI</TabsTab>
        <TabsTab value="manual">Manual</TabsTab>
      </TabsList>
      <TabsPanel value="cli" className="pt-4">
        <CodeBlock language="bash" filename="terminal" code={`npx nullfuse add ${slug}`} />
        {other.length > 0 && (
          <P className="!mt-3 !mb-0 text-sm">
            Also installs: {other.map((o, i) => (
              <React.Fragment key={o}>{i > 0 && ", "}<Link href={`/docs/components/${o}`} className="underline underline-offset-4">{o}</Link></React.Fragment>
            ))}.
          </P>
        )}
      </TabsPanel>
      <TabsPanel value="manual" className="pt-4">
        <Steps>
          {(deps.length > 0 || true) && (
            <Step title="Install the dependencies">
              <CodeBlock language="bash" filename="terminal" code={`npm install ${["@nullfuse/core", "clsx", "tailwind-merge", ...deps].join(" ")}`} />
            </Step>
          )}
          {other.length > 0 && (
            <Step title="Add the components it uses">
              <P className="!my-0 text-sm">
                {other.map((o, i) => (
                  <React.Fragment key={o}>{i > 0 && ", "}<Link href={`/docs/components/${o}`} className="underline underline-offset-4">{o}</Link></React.Fragment>
                ))}
              </P>
            </Step>
          )}
          <Step title="Copy and paste the code into your project">
            <p className="nf-small mb-3">
              Save it as <Ic>components/ui/{slug}.tsx</Ic>. It needs the <Ic>cn</Ic> helper at <Ic>@/lib/cn</Ic> (created by <Ic>nullfuse init</Ic>).
            </p>
            <div className={cn("relative", !expanded && "max-h-80 overflow-hidden")}>
              <CodeBlock language="tsx" filename={`${slug}.tsx`} code={src} />
            </div>
            {lines > 18 && (
              <Button size="sm" variant="outline" className="mt-3" onClick={() => setExpanded((e) => !e)}>
                {expanded ? "Collapse" : `Expand (${lines} lines)`}
              </Button>
            )}
          </Step>
          <Step title="Update the import paths to match your project setup" />
        </Steps>
      </TabsPanel>
    </Tabs>
  );
}

/* ── props table ── */

export type Prop = { name: string; type: string; default?: string; description?: string };

export function PropsTable({ props }: { props: Prop[] }) {
  return (
    <div className="nf-pixel-flat my-5 overflow-x-auto bg-surface">
      <table className="w-full border-collapse text-left font-sans text-sm">
        <thead className="border-b-2 border-ink bg-surface-2">
          <tr>
            {["Prop", "Type", "Default"].map((h) => (
              <th key={h} className="nf-label px-4 py-2.5 font-normal">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name} className="border-b border-border align-top last:border-b-0">
              <td className="px-4 py-3">
                <code className="nf-code text-foreground">{p.name}</code>
                {p.description && <div className="nf-small mt-1.5 max-w-xs">{p.description}</div>}
              </td>
              <td className="px-4 py-3 font-label text-xs text-code-type">{p.type}</td>
              <td className="px-4 py-3 font-label text-xs text-muted">{p.default ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Callout({
  title,
  children,
  variant = "info",
}: {
  title: string;
  children: React.ReactNode;
  variant?: "info" | "warning" | "success";
}) {
  return (
    <Alert variant={variant} title={title} className="my-5">
      {children}
    </Alert>
  );
}

/* ── prev / next ── */

export function Pager({
  prev,
  next,
}: {
  prev?: { href: string; title: string };
  next?: { href: string; title: string };
}) {
  return (
    <nav className="mt-16 grid grid-cols-2 gap-4" aria-label="Pagination">
      {prev ? (
        <Link href={prev.href} className="nf-pixel-flat group flex flex-col gap-1 bg-surface p-4 hover:bg-surface-2">
          <Label>previous</Label>
          <span className="flex items-center gap-2 font-medium"><PixelIcon name="chevron-left" size={2} />{prev.title}</span>
        </Link>
      ) : <span />}
      {next ? (
        <Link href={next.href} className="nf-pixel-flat group flex flex-col items-end gap-1 bg-surface p-4 hover:bg-surface-2">
          <Label>next</Label>
          <span className="flex items-center gap-2 font-medium">{next.title}<PixelIcon name="chevron-right" size={2} /></span>
        </Link>
      ) : <span />}
    </nav>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <Badge variant="default" className="normal-case tracking-normal">{children}</Badge>;
}

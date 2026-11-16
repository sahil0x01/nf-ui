import * as React from "react";
import registry from "../../../../registry/registry.json";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { Heading, Text, Label, Mark } from "@/components/ui/typography";
import { Typewriter } from "@/components/ui/typewriter";
import { Hop } from "@/components/ui/hop";
import { Kbd } from "@/components/ui/kbd";
import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icon";
import { Separator } from "@/components/ui/separator";
import { Link } from "../router";
import { guides } from "../nav";
import { DocPage, H2, H3, P, UL, Ic, Steps, Step, Preview, Callout, PropsTable, Pager, Tag } from "../parts";

const idx = (slug: string) => guides.findIndex((g) => g.slug === slug);
const pager = (slug: string) => {
  const i = idx(slug);
  const prev = guides[i - 1];
  const next = guides[i + 1];
  return (
    <Pager
      prev={prev ? { href: `/docs/${prev.slug}`, title: prev.title } : undefined}
      next={next ? { href: `/docs/${next.slug}`, title: next.title } : { href: "/docs/components/accordion", title: "Components" }}
    />
  );
};
const Page = ({ slug, children, badges }: { slug: string; children: React.ReactNode; badges?: React.ReactNode }) => {
  const g = guides[idx(slug)];
  return (
    <DocPage eyebrow="Getting started" title={g.title} description={g.description} badges={badges}>
      {children}
      {pager(slug)}
    </DocPage>
  );
};

/* ─────────────────────────── Introduction ─────────────────────────── */

function Introduction() {
  return (
    <Page slug="introduction">
      <P>
        Nullfuse UI is the shared design system behind every Nullfuse product. It is a set of
        pixel-crisp, accessible components, plus the tokens, type scale and motion language that give our
        products one consistent look and feel.
      </P>
      <Callout title="This is not a component library" variant="info">
        You do not install it as a dependency. You copy the components into your project and own the code.
        Change anything.
      </Callout>

      <H2>Philosophy</H2>
      <div className="my-5 grid gap-5 sm:grid-cols-2">
        {[
          ["Copy and own", "Components live in your repo. The CLI copies the source, so you can read it, edit it and ship it."],
          ["Pixel-crisp components", "Notched 2px borders, thin bevels and hard drop shadows. Pixel styling on the components only; text stays readable Geist."],
          ["Black & white", "Two themes, one accent (ink), and four restrained status colors that appear only when they mean something."],
          ["Frame-by-frame motion", "Everything animates in discrete steps like sprite frames: press sinks a pixel, entrances pop in over five frames."],
        ].map(([t, d]) => (
          <Card key={t}>
            <CardHeader><CardTitle>{t}</CardTitle><CardDescription>{d}</CardDescription></CardHeader>
          </Card>
        ))}
      </div>

      <H2>What is in the box</H2>
      <UL>
        <li><strong className="text-foreground">{registry.items.length} components</strong> built on Base UI primitives, from <Link href="/docs/components/button" className="underline underline-offset-4">Button</Link> to a <Link href="/docs/components/command" className="underline underline-offset-4">⌘K command palette</Link>.</li>
        <li><strong className="text-foreground">@nullfuse/core</strong>: design tokens, the type scale, pixel utilities and the motion helpers.</li>
        <li><strong className="text-foreground">nullfuse CLI</strong>: <Ic>init</Ic> and <Ic>add</Ic> commands that copy components into your project.</li>
      </UL>

      <H2>Tech stack</H2>
      <div className="my-4 flex flex-wrap gap-2">
        {["React 19", "Tailwind CSS v4", "Base UI", "motion", "class-variance-authority", "Geist"].map((t) => <Tag key={t}>{t}</Tag>)}
      </div>

      <H2>FAQ</H2>
      <Accordion className="my-5">
        <AccordionItem value="1">
          <AccordionTrigger>Why copy the components instead of installing a package?</AccordionTrigger>
          <AccordionPanel>Products evolve at different speeds. Owning the source means you can adapt a component without waiting on, or fighting, a shared package. Tokens still live in <code className="nf-code">@nullfuse/core</code>, so the look stays consistent.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger>How do I get updates?</AccordionTrigger>
          <AccordionPanel>Run <code className="nf-code">npx nullfuse add button --overwrite</code> to pull the latest version of a component. Diff it against your local changes first.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger>Does it work with Next.js?</AccordionTrigger>
          <AccordionPanel>Yes. Interactive components include the <code className="nf-code">"use client"</code> directive where they need it. See <Link href="/docs/installation" className="underline underline-offset-4">Installation</Link>.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="4">
          <AccordionTrigger>Can I change the look?</AccordionTrigger>
          <AccordionPanel>Yes: override the CSS variables (see <Link href="/docs/theming" className="underline underline-offset-4">Theming</Link>) or edit the components directly.</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Page>
  );
}

/* ─────────────────────────── Installation ─────────────────────────── */

function Installation() {
  return (
    <Page slug="installation" badges={<><Tag>React 19+</Tag><Tag>Tailwind v4</Tag></>}>
      <P>Set up Nullfuse UI in a new or existing React project in a few minutes.</P>
      <Steps>
        <Step title="Create a project and install Tailwind">
          <P className="!mt-0">Any React 19 + Tailwind CSS v4 project works. Pick your framework:</P>
          <Tabs defaultValue="vite">
            <TabsList>
              <TabsTab value="vite">Vite</TabsTab>
              <TabsTab value="next">Next.js</TabsTab>
            </TabsList>
            <TabsPanel value="vite">
              <CodeBlock language="bash" filename="terminal" code={`npm create vite@latest my-app -- --template react-ts\ncd my-app\nnpm install tailwindcss @tailwindcss/vite`} />
              <P className="!mb-2 text-sm">Add the Tailwind plugin and the <Ic>@</Ic> path alias:</P>
              <CodeBlock language="ts" filename="vite.config.ts" code={`import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nimport tailwindcss from "@tailwindcss/vite";\nimport path from "node:path";\n\nexport default defineConfig({\n  plugins: [react(), tailwindcss()],\n  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },\n});`} />
            </TabsPanel>
            <TabsPanel value="next">
              <CodeBlock language="bash" filename="terminal" code={`npx create-next-app@latest my-app --typescript --tailwind --app --src-dir\ncd my-app`} />
              <P className="!mb-0 text-sm">Next.js already sets up the <Ic>@/*</Ic> alias to <Ic>./src/*</Ic>.</P>
            </TabsPanel>
          </Tabs>
        </Step>

        <Step title="Run init">
          <P className="!mt-0">Creates <Ic>nullfuse.json</Ic>, the <Ic>cn</Ic> helper, and installs <Ic>@nullfuse/core</Ic> and the fonts.</P>
          <CodeBlock language="bash" filename="terminal" code="npx nullfuse init" />
        </Step>

        <Step title="Import the styles">
          <P className="!mt-0">Add the core stylesheet and fonts to your global CSS:</P>
          <CodeBlock language="css" filename="src/index.css" code={`@import "tailwindcss";\n@import "@nullfuse/core/styles.css";\n@import "@fontsource-variable/geist";\n@import "@fontsource-variable/geist-mono";`} />
        </Step>

        <Step title="Configure the path alias">
          <P className="!mt-0">Components import each other through <Ic>@/</Ic>. Point it at <Ic>src</Ic> in your tsconfig:</P>
          <CodeBlock language="json" filename="tsconfig.json" code={`{\n  "compilerOptions": {\n    "baseUrl": ".",\n    "paths": { "@/*": ["./src/*"] }\n  }\n}`} />
        </Step>

        <Step title="Add your first component">
          <CodeBlock language="bash" filename="terminal" code="npx nullfuse add button" />
          <CodeBlock className="mt-4" language="tsx" filename="App.tsx" code={`import { Button } from "@/components/ui/button";\n\nexport default function App() {\n  return <Button variant="sun">Hello, pixels</Button>;\n}`} />
        </Step>

        <Step title="Respect reduced motion">
          <P className="!mt-0">Wrap your app once so every animation honors the user's system setting:</P>
          <CodeBlock language="tsx" filename="main.tsx" code={`import { MotionConfig } from "motion/react";\n\n<MotionConfig reducedMotion="user">\n  <App />\n</MotionConfig>`} />
        </Step>
      </Steps>

      <Callout title="Some components need a provider" variant="warning">
        <Ic>Tooltip</Ic> needs <Ic>TooltipProvider</Ic> and <Ic>Toast</Ic> needs <Ic>ToastProvider</Ic> near the root.
        Each component page says so under Usage.
      </Callout>
    </Page>
  );
}

/* ─────────────────────────── CLI ─────────────────────────── */

function Cli() {
  return (
    <Page slug="cli">
      <H2>init</H2>
      <P>Use the <Ic>init</Ic> command to initialize a project.</P>
      <CodeBlock language="bash" filename="terminal" code="npx nullfuse init" />
      <P>It writes <Ic>nullfuse.json</Ic>, creates <Ic>src/lib/cn.ts</Ic>, installs <Ic>@nullfuse/core</Ic>, <Ic>clsx</Ic>, <Ic>tailwind-merge</Ic>, <Ic>motion</Ic> and the fonts, then prints the CSS imports to add.</P>
      <PropsTable props={[{ name: "--no-install", type: "flag", description: "Write files only; skip the package install." }]} />

      <H2>add</H2>
      <P>Use the <Ic>add</Ic> command to add components to your project.</P>
      <CodeBlock language="bash" filename="terminal" code="npx nullfuse add button card tabs" />
      <P>Components that depend on other components (for example <Link href="/docs/components/date-picker" className="underline underline-offset-4">Date Picker</Link> needs Calendar, Popover and Button) pull them in automatically. npm dependencies are installed too.</P>
      <PropsTable props={[
        { name: "--overwrite", type: "flag", description: "Replace files that already exist." },
        { name: "--no-install", type: "flag", description: "Copy files only; skip npm installs." },
      ]} />

      <H2>list</H2>
      <P>List everything available in the registry.</P>
      <CodeBlock language="bash" filename="terminal" code="npx nullfuse list" />

      <H2>Configuration</H2>
      <P><Ic>nullfuse.json</Ic> tells the CLI where to put files:</P>
      <CodeBlock language="json" filename="nullfuse.json" code={`{\n  "registry": "https://ui.nullfuse.com/r",\n  "css": "src/index.css",\n  "aliases": {\n    "components": "src/components/ui",\n    "lib": "src/lib"\n  }\n}`} />
      <H3>Using a different registry</H3>
      <P>Point the CLI at a local build or a mirror with an environment variable. It overrides <Ic>nullfuse.json</Ic>.</P>
      <CodeBlock language="bash" filename="terminal" code="NULLFUSE_REGISTRY=http://localhost:5174/r npx nullfuse add button" />
    </Page>
  );
}

/* ─────────────────────────── Theming ─────────────────────────── */

const swatches: [string, string, string, string][] = [
  ["background", "bg-background", "--nf-bg", "page"],
  ["surface", "bg-surface", "--nf-surface", "panels, cards"],
  ["surface-2", "bg-surface-2", "--nf-surface-2", "wells, hover"],
  ["ink", "bg-ink", "--nf-ink", "borders, shadows"],
  ["accent", "bg-accent", "--nf-accent", "primary (= ink)"],
  ["sun", "bg-sun", "--nf-sun", "highlight, warning"],
  ["teal", "bg-teal", "--nf-teal", "info"],
  ["sage", "bg-sage", "--nf-sage", "success"],
  ["danger", "bg-danger", "--nf-danger", "error"],
  ["muted", "bg-muted", "--nf-fg-muted", "secondary text"],
  ["subtle", "bg-subtle", "--nf-fg-subtle", "tertiary text"],
  ["border", "bg-border", "--nf-border", "dividers"],
];

function Theming() {
  return (
    <Page slug="theming">
      <P>
        Theming is done with CSS variables that Tailwind reads through its theme. Components only use
        token utilities (<Ic>bg-surface</Ic>, <Ic>text-muted</Ic>, <Ic>border-ink</Ic>), so changing a variable restyles everything.
      </P>

      <H2>Colors</H2>
      <div className="my-5 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {swatches.map(([n, c, v, d]) => (
          <div key={n} className="nf-pixel-flat bg-surface p-2">
            <div className={`h-12 ${c}`} />
            <div className="mt-2 px-1 pb-1">
              <div className="text-sm font-semibold">{n}</div>
              <div className="nf-label mt-1.5 normal-case">{v}</div>
              <div className="nf-small mt-1">{d}</div>
            </div>
          </div>
        ))}
      </div>
      <Callout title="Four inks, used sparingly" variant="info">
        The interface is black and white. <Ic>sun</Ic>, <Ic>teal</Ic>, <Ic>sage</Ic> and <Ic>danger</Ic> appear only when a color carries meaning: highlight, info, success, error.
      </Callout>

      <H2>Customizing</H2>
      <P>Override any variable after the core import. Set it on <Ic>:root</Ic> for the white theme and <Ic>.dark</Ic> for the black theme.</P>
      <CodeBlock language="css" filename="src/index.css" code={`@import "tailwindcss";\n@import "@nullfuse/core/styles.css";\n\n:root {\n  --nf-sun: oklch(0.85 0.17 80); /* warmer highlight */\n}\n.dark {\n  --nf-sun: oklch(0.82 0.15 80);\n}`} />

      <H2>Shape and pixels</H2>
      <P>One variable controls the pixel grid: <Ic>--nf-px</Ic> (2px by default). Borders, bevels and shadows all derive from it. Raise it for a chunkier look.</P>
      <CodeBlock language="css" filename="src/index.css" code={`:root {\n  --nf-px: 3px; /* chunkier pixels everywhere */\n}`} />
      <P>See <Link href="/docs/pixel-system" className="underline underline-offset-4">Pixel system</Link> for the primitives.</P>

      <H2>Syntax colors</H2>
      <P>Code blocks use <Ic>--nf-code-keyword</Ic>, <Ic>-string</Ic>, <Ic>-number</Ic>, <Ic>-function</Ic>, <Ic>-type</Ic>, <Ic>-comment</Ic> and <Ic>-punct</Ic>. Each has a white and a black value.</P>

      <H2>Adding a color</H2>
      <P>Define a variable, then expose it to Tailwind with <Ic>@theme inline</Ic>:</P>
      <CodeBlock language="css" filename="src/index.css" code={`:root { --nf-brand: oklch(0.6 0.2 30); }\n.dark { --nf-brand: oklch(0.75 0.15 30); }\n\n@theme inline {\n  --color-brand: var(--nf-brand);\n}`} />
      <P>Now <Ic>bg-brand</Ic> and <Ic>text-brand</Ic> work and follow the theme.</P>
    </Page>
  );
}

/* ─────────────────────────── Dark mode ─────────────────────────── */

function DarkMode() {
  return (
    <Page slug="dark-mode">
      <P>
        Nullfuse UI has two themes: <strong className="text-foreground">white</strong> (default) and <strong className="text-foreground">black</strong>.
        The black theme turns on when the <Ic>dark</Ic> class is on <Ic>&lt;html&gt;</Ic>.
      </P>

      <H2>Toggling</H2>
      <Preview
        code={`const [dark, setDark] = React.useState(false);\nReact.useEffect(() => {\n  document.documentElement.classList.toggle("dark", dark);\n}, [dark]);\n\n<Button onClick={() => setDark((d) => !d)}>Toggle theme</Button>`}
      >
        <Button variant="outline" onClick={() => document.documentElement.classList.toggle("dark")}>Toggle theme</Button>
      </Preview>

      <H2>Avoiding a flash</H2>
      <P>Set the class before first paint with a tiny inline script in your <Ic>index.html</Ic> (or root layout):</P>
      <CodeBlock language="tsx" filename="index.html" code={`<script>\n  try {\n    var t = localStorage.getItem("theme");\n    var dark = t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;\n    document.documentElement.classList.toggle("dark", dark);\n  } catch (e) {}\n</script>`} />

      <H2>Using the dark variant</H2>
      <P>The core stylesheet registers a Tailwind <Ic>dark:</Ic> variant keyed on the same class, so <Ic>dark:bg-surface-2</Ic> works if you ever need a one-off.</P>
    </Page>
  );
}

/* ─────────────────────────── Typography ─────────────────────────── */

function Typography() {
  return (
    <Page slug="typography">
      <P>
        Type is clean <strong className="text-foreground">Geist</strong>, with <strong className="text-foreground">Geist Mono</strong> for labels and code.
        The pixel character lives in the components, not the letterforms, so text stays comfortable to read.
      </P>

      <H2>Scale</H2>
      <div className="nf-pixel my-5 space-y-6 bg-surface p-6 [--nf-drop:4px]">
        <div><Label>nf-display · fluid 40→80px · 650</Label><div className="nf-display mt-3">Null Fuse</div></div>
        <Separator />
        <div><Label>nf-h1 · fluid 28→40px</Label><div className="nf-h1 mt-3">Build the thing</div></div>
        <div><Label>nf-h2 · fluid 22→30px</Label><div className="nf-h2 mt-3">Build the thing</div></div>
        <div><Label>nf-h3 · 18px</Label><div className="nf-h3 mt-3">Build the thing</div></div>
        <div><Label>nf-h4 · 15px · 600</Label><div className="nf-h4 mt-3">Build the thing</div></div>
        <Separator />
        <div><Label>nf-lead · 18px</Label><div className="nf-lead mt-2">Lead copy for introductions and summaries.</div></div>
        <div><Label>nf-body · 15px</Label><div className="nf-body mt-2">Body copy is set at 15px with a 1.65 line height for comfortable reading.</div></div>
        <div><Label>nf-small · 13px</Label><div className="nf-small mt-2">Small text for captions and helper copy.</div></div>
        <div><Label>nf-label · mono 11px uppercase</Label><div className="nf-label mt-3">Section eyebrow</div></div>
      </div>

      <H2>Usage</H2>
      <P>Use the utilities directly, or the typed helpers from <Link href="/docs/components/typography" className="underline underline-offset-4">Typography</Link>.</P>
      <CodeBlock language="tsx" filename="example.tsx" code={`<h1 className="nf-display">Design that feels crafted.</h1>\n<p className="nf-lead">Lead copy.</p>\n\n// or\n<Heading level="h1">Title</Heading>\n<Text variant="lead">Lead copy.</Text>`} />

      <H2>Emphasis</H2>
      <P>Two marker-style highlights: <Ic>Mark</Ic> for body text and <Ic>Swash</Ic> for a word inside a heading. Both draw a band behind the lower half of the letters, sized in <Ic>em</Ic> so they fit at any size.</P>
      <Preview
        code={`<Heading level="h2">Design that feels <Swash>crafted</Swash></Heading>\n<Text>Copy that has <Mark>a highlighted phrase</Mark> inside it.</Text>`}
        bare
      >
        <div className="nf-h2">Design that feels <span className="nf-swash">crafted</span></div>
        <Text className="mt-4">Copy that has <Mark>a highlighted phrase</Mark> inside it.</Text>
      </Preview>
    </Page>
  );
}

/* ─────────────────────────── Pixel system ─────────────────────────── */

function PixelSystem() {
  return (
    <Page slug="pixel-system">
      <P>
        The pixel look comes from a handful of CSS utilities. They draw borders with <Ic>box-shadow</Ic> rather than <Ic>border</Ic>,
        so corners are notched like a sprite. Everything derives from <Ic>--nf-px</Ic>.
      </P>

      <H2>Surfaces</H2>
      <div className="my-5 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="nf-pixel bg-surface p-5 [--nf-drop:4px]">raised</div>
          <P className="!mt-3 text-sm"><Ic>nf-pixel</Ic>: notched border, bevel and optional drop shadow via <Ic>[--nf-drop:4px]</Ic>.</P>
        </div>
        <div>
          <div className="nf-pixel-flat bg-surface p-5">flat</div>
          <P className="!mt-3 text-sm"><Ic>nf-pixel-flat</Ic>: notched border only. Good for large containers.</P>
        </div>
        <div>
          <div className="nf-pixel-inset bg-surface-2 p-5">inset</div>
          <P className="!mt-3 text-sm"><Ic>nf-pixel-inset</Ic>: sunken well. Used by inputs and tracks.</P>
        </div>
      </div>

      <H2>Pressable</H2>
      <P>Add <Ic>nf-pressable</Ic> to make a raised surface sink by one pixel and invert its bevel when pressed.</P>
      <Preview code={`<button className="nf-pixel nf-pressable bg-sun px-4 py-2 text-sun-foreground">\n  Press me\n</button>`}>
        <button className="nf-pixel nf-pressable bg-sun px-4 py-2 font-sans text-sm font-medium text-sun-foreground">Press me</button>
      </Preview>

      <H2>Textures</H2>
      <P>Texture comes from dithering, never gradients: <Ic>bg-dither</Ic> and <Ic>bg-pixel-grid</Ic>.</P>
      <Preview bare code={`<div className="bg-dither h-6 opacity-60" />\n<div className="bg-pixel-grid h-24" />`}>
        <div className="bg-dither h-6 opacity-60" />
        <div className="bg-pixel-grid mt-4 h-24 border-2 border-border" />
      </Preview>

      <H2>Sprites</H2>
      <P><Link href="/docs/components/pixel-icon" className="underline underline-offset-4">PixelIcon</Link> renders sprites defined as ASCII grids. Add your own by adding an entry to <Ic>sprites</Ic>.</P>
      <div className="nf-pixel-flat my-5 flex flex-wrap gap-6 bg-surface/50 p-6">
        {(["heart", "star", "coin", "check", "cross", "arrow", "sparkle", "calendar", "search"] as PixelIconName[]).map((n) => (
          <span key={n} className="flex w-14 flex-col items-center gap-2"><PixelIcon name={n} size={3} /><span className="nf-label text-[0.5625rem]">{n}</span></span>
        ))}
      </div>

      <H2>Rules of thumb</H2>
      <UL>
        <li>No <Ic>border-radius</Ic>. Curves break the pixel illusion.</li>
        <li>No blurred shadows. Use <Ic>[--nf-drop:Npx]</Ic> for hard offsets.</li>
        <li>No rotation. It anti-aliases the pixel edges.</li>
        <li>Keep text in Geist. Pixel styling is for surfaces and icons only.</li>
      </UL>
    </Page>
  );
}

/* ─────────────────────────── Motion ─────────────────────────── */

function Motion() {
  return (
    <Page slug="motion">
      <P>
        Everything moves in <strong className="text-foreground">discrete steps</strong>, like frames in a sprite animation, never smooth curves.
        Pressing sinks one pixel unit, entrances pop in over five frames, and idle elements bob.
      </P>

      <H2>Principles</H2>
      <UL>
        <li>Use <Ic>steps()</Ic> easing. In CSS that is <Ic>steps(5, end)</Ic>; in JS use <Ic>ease.frames5</Ic>.</li>
        <li>Feedback ≤ 120ms, panels ≤ 240ms, entrances ≤ 400ms.</li>
        <li>Springs only for rare, juicy moments (<Ic>spring.bouncy</Ic>).</li>
        <li>Reduced motion is honored globally by the core stylesheet and <Ic>MotionConfig</Ic>.</li>
      </UL>

      <H2>Demos</H2>
      <div className="my-5 grid gap-5 sm:grid-cols-2">
        <div className="nf-pixel-flat bg-surface/50 p-5"><Label>press · click</Label><div className="mt-4"><Button variant="sun">Press me</Button></div></div>
        <div className="nf-pixel-flat bg-surface/50 p-5"><Label>hop · hover</Label><div className="mt-4"><Hop className="nf-h2">jump!</Hop></div></div>
        <div className="nf-pixel-flat bg-surface/50 p-5"><Label>typewriter</Label><div className="mt-4"><Typewriter text={["Loading world 1-1…", "Ready."]} loop className="font-label text-sm" /></div></div>
        <div className="nf-pixel-flat bg-surface/50 p-5">
          <Label>stagger pop-in · idle bob</Label>
          <div className="nf-stagger mt-4 flex gap-3">
            {(["heart", "star", "coin", "sparkle", "check"] as PixelIconName[]).map((n, i) => (
              <span key={n} style={{ "--i": i } as React.CSSProperties} className={["text-danger", "text-sun", "text-sun", "text-teal", "text-sage"][i]}>
                <PixelIcon name={n} size={3} className="animate-bob" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <H2>CSS utilities</H2>
      <PropsTable props={[
        { name: "animate-blink", type: "class", description: "1s on/off, for cursors." },
        { name: "animate-pop-in", type: "class", description: "5-frame scale + fade entrance." },
        { name: "animate-fade-up", type: "class", description: "5-frame fade + 8px rise." },
        { name: "animate-hop", type: "class", description: "4-frame jump." },
        { name: "animate-bob", type: "class", description: "Idle 2-frame bob." },
        { name: "animate-skeleton", type: "class", description: "2-frame loading blink." },
        { name: "nf-stagger", type: "class", description: "Parent: children animate in; set style=\"--i: n\" on each." },
      ]} />

      <H2>@nullfuse/core/motion</H2>
      <P>Helpers for the <Ic>motion</Ic> library:</P>
      <CodeBlock language="tsx" filename="example.tsx" code={`import { popIn, fadeUp, stagger, ease, spring, steps } from "@nullfuse/core/motion";\n\n<motion.ul variants={stagger()} initial="hidden" animate="visible">\n  <motion.li variants={popIn} />   {/* 5-frame pop */}\n  <motion.li variants={fadeUp} />  {/* 5-frame rise */}\n</motion.ul>\n\n// custom frame count\n<motion.div animate={{ x: 100 }} transition={{ ease: steps(8) }} />`} />
      <PropsTable props={[
        { name: "duration", type: "{ instant, fast, base, slow, slower }", description: "Seconds: 0.08, 0.12, 0.24, 0.4, 0.7." },
        { name: "ease", type: "{ frames3, frames5, frames8, linear }", description: "Stepped easings." },
        { name: "spring", type: "{ snappy, bouncy }" },
        { name: "fadeIn · fadeUp · popIn · scaleIn · slideIn(side)", type: "Variants" },
        { name: "stagger(gap?, delay?)", type: "Variants" },
        { name: "pressable · hop", type: "props", description: "Spread onto a motion element for press / hop feedback." },
      ]} />
    </Page>
  );
}

/* ─────────────────────────── Changelog ─────────────────────────── */

function Changelog() {
  return (
    <Page slug="changelog">
      <H2>v0.1.0</H2>
      <P className="!mt-0 text-sm"><Badge variant="sage">first release</Badge></P>
      <UL>
        <li><strong className="text-foreground">{registry.items.length} components</strong> on Base UI primitives, in white and black themes.</li>
        <li>Pixel primitives: <Ic>nf-pixel</Ic>, <Ic>nf-pixel-flat</Ic>, <Ic>nf-pixel-inset</Ic>, <Ic>nf-pressable</Ic>, dithering textures.</li>
        <li>Frame-by-frame motion: stepped easings, <Ic>@nullfuse/core/motion</Ic>, CSS animation utilities.</li>
        <li>Sprite icons as ASCII grids with <Ic>PixelIcon</Ic>.</li>
        <li>Command palette, calendar, date picker, combobox, toast, sheet, and a dependency-free syntax highlighter.</li>
        <li><Ic>nullfuse</Ic> CLI: <Ic>init</Ic>, <Ic>add</Ic>, <Ic>list</Ic>.</li>
      </UL>
    </Page>
  );
}

export const guidePages: Record<string, () => React.JSX.Element> = {
  introduction: Introduction,
  installation: Installation,
  cli: Cli,
  theming: Theming,
  "dark-mode": DarkMode,
  typography: Typography,
  "pixel-system": PixelSystem,
  motion: Motion,
  changelog: Changelog,
};

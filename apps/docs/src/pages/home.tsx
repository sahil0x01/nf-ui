import * as React from "react";
import registry from "../../../../registry/registry.json";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Window } from "@/components/ui/window";
import { Progress } from "@/components/ui/progress";
import { CodeBlock } from "@/components/ui/code-block";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { Typewriter } from "@/components/ui/typewriter";
import { Swash, Mark, Label, Text, Heading } from "@/components/ui/typography";
import { Link } from "../router";

const features: [string, string, string, "heart" | "star" | "coin" | "sparkle"][] = [
  ["Copy and own", "Components are copied into your repo with one command. Read them, edit them, ship them.", "/docs/installation", "heart"],
  ["Pixel-crisp", "Notched borders, thin bevels and hard drop shadows, with readable Geist type.", "/docs/pixel-system", "star"],
  ["Frame-by-frame motion", "Stepped easing everywhere. Press sinks a pixel; entrances pop in over five frames.", "/docs/motion", "coin"],
  ["Black & white", "Two themes, one ink accent, four restrained status colors.", "/docs/theming", "sparkle"],
];

const featured = ["button", "dialog", "command", "date-picker", "combobox", "toast", "sheet", "table"];

export function Home() {
  const [hp, setHp] = React.useState(70);
  const total = registry.items.length;
  return (
    <>
      <div className="mx-auto max-w-6xl px-6">
        <section className="grid items-center gap-12 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div>
            <h1 className="nf-display">
              Design that<br />
              feels <Swash>crafted</Swash>.
            </h1>
            <p className="nf-h1 mt-5 h-[1.3em] whitespace-nowrap text-teal">
              <Typewriter text={["Pixel by pixel.", "Frame by frame.", "Level by level."]} loop />
            </p>
            <Text variant="lead" className="mt-8 max-w-lg">
              A copy-and-own component system for every Nullfuse product: pixel-crisp components,
              readable type and frame-by-frame motion. <Mark>Own the code.</Mark>
            </Text>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button size="lg" render={<Link href="/docs/introduction" />}>Get started</Button>
              <Button size="lg" variant="sun" render={<Link href="/docs/components/button" />}>Components</Button>
            </div>
            <CodeBlock className="mt-10 max-w-md" language="bash" filename="terminal" code="npx nullfuse init && npx nullfuse add button card" />
          </div>

          <Reveal delay={0.1}>
            <Window title="preview.tsx" bodyClassName="space-y-5 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="sage" dot>live</Badge>
                <Badge variant="sun">beta</Badge>
                <Badge variant="teal">v0.1</Badge>
              </div>
              <Input placeholder="Search components…" />
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="sun">Highlight</Button>
                <Button size="sm" variant="outline">Outline</Button>
              </div>
              <div>
                <div className="mb-2 flex justify-between"><Label>hp</Label><Label>{hp}/100</Label></div>
                <Progress value={hp} tone="sage" />
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => setHp((h) => Math.max(0, h - 10))}>−10</Button>
                  <Button size="sm" variant="secondary" onClick={() => setHp((h) => Math.min(100, h + 10))}>+10</Button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sun">
                <PixelIcon name="star" size={4} className="animate-bob" />
                <PixelIcon name="heart" size={4} className="animate-bob text-danger [animation-delay:-0.4s]" />
                <PixelIcon name="coin" size={4} className="animate-bob [animation-delay:-0.8s]" />
                <label className="ml-auto flex items-center gap-2 text-sm font-medium text-foreground"><Switch defaultChecked /> sound</label>
              </div>
            </Window>
          </Reveal>
        </section>

        <div className="nf-pixel-flat grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
          {[[String(total), "components"], ["2", "themes"], ["4", "status inks"], ["1", "command to add one"]].map(([n, l]) => (
            <div key={l} className="bg-surface px-5 py-4">
              <div className="nf-h1">{n}</div>
              <Label>{l}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <Marquee items={["pixel-crisp components", "readable type", "frame-by-frame motion", "copy & own", "black & white"]} />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <section className="py-20">
          <Label>why nullfuse</Label>
          <Heading level="h1" className="mt-4 max-w-2xl">One look and feel across <Swash>every product</Swash></Heading>
          <div className="mt-10 grid gap-7 sm:grid-cols-2">
            {features.map(([t, d, href, icon]) => (
              <Link key={t} href={href} className="block">
                <Card className="h-full">
                  <CardHeader>
                    <span className={["text-danger", "text-sun", "text-sun", "text-teal"][["heart", "star", "coin", "sparkle"].indexOf(icon)]}><PixelIcon name={icon} size={3} /></span>
                    <CardTitle>{t}</CardTitle>
                    <CardDescription>{d}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t-2 border-border py-20">
          <Label>components</Label>
          <Heading level="h1" className="mt-4">All <Swash>{total}</Swash> components</Heading>
          <Text variant="lead" className="mt-3 max-w-xl">Browse them in the docs. Each page has a live preview, install steps, usage and API.</Text>
          <div className="mt-8 flex flex-wrap gap-2">
            {registry.items.map((i) => (
              <Link key={i.name} href={`/docs/components/${i.name}`}>
                <Badge variant={featured.includes(i.name) ? "sun" : "default"} className="normal-case tracking-normal hover:bg-surface-2">{i.name}</Badge>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button render={<Link href="/docs/components/button" />}>Browse components</Button>
            <Button variant="outline" render={<Link href="/docs/installation" />}>Installation</Button>
          </div>
        </section>
      </div>
    </>
  );
}

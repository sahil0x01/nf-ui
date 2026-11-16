import * as React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/components/ui/accordion";
import { Alert } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CodeBlock } from "@/components/ui/code-block";
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty } from "@/components/ui/combobox";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator } from "@/components/ui/command";
import { DatePicker } from "@/components/ui/date-picker";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from "@/components/ui/field";
import { Hop } from "@/components/ui/hop";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Marquee } from "@/components/ui/marquee";
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/menu";
import { Pagination } from "@/components/ui/pagination";
import { PixelIcon, sprites, type PixelIconName } from "@/components/ui/pixel-icon";
import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioItem } from "@/components/ui/radio-group";
import { Reveal } from "@/components/ui/reveal";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Heading, Swash, Mark, Label as TLabel, Text, Code } from "@/components/ui/typography";
import { Typewriter } from "@/components/ui/typewriter";
import { Window } from "@/components/ui/window";
import { Link } from "../router";
import { DocPage, H2, H3, Install, Preview, PropsTable, Pager, Callout, Ic, P, type Prop } from "../parts";

export type Example = { title: string; description?: string; code: string; demo: React.ReactNode; bare?: boolean };
export type ComponentDoc = {
  slug: string;
  name: string;
  description: string;
  preview: { code: string; demo: React.ReactNode; bare?: boolean };
  usage: string;
  note?: React.ReactNode;
  examples?: Example[];
  props?: { title?: string; items: Prop[] }[];
  base?: string;
};

/* ── small stateful demos ── */
function ToastButtons() {
  const toast = useToast();
  return (
    <>
      <Button variant="outline" onClick={() => toast.add({ title: "Saved", description: "Your changes are live." })}>Default</Button>
      <Button variant="sage" onClick={() => toast.add({ title: "Deployed", description: "Build #214 is live.", type: "success" })}>Success</Button>
      <Button variant="destructive" onClick={() => toast.add({ title: "Build failed", description: "See logs.", type: "error" })}>Error</Button>
    </>
  );
}
function PaginationDemo() {
  const [page, setPage] = React.useState(5);
  return <Pagination page={page} pageCount={12} onPageChange={setPage} />;
}
function CalendarDemo() {
  const [d, setD] = React.useState<Date | null>(new Date());
  return <Calendar selected={d} onSelect={setD} />;
}
function ProgressDemo() {
  const [v, setV] = React.useState(60);
  return (
    <div className="w-full max-w-sm space-y-3">
      <Progress value={v} tone="sage" />
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => setV((x) => Math.max(0, x - 10))}>−10</Button>
        <Button size="sm" variant="secondary" onClick={() => setV((x) => Math.min(100, x + 10))}>+10</Button>
      </div>
    </div>
  );
}
function CommandDemo() {
  const [open, setOpen] = React.useState(false);
  const toast = useToast();
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Open palette <Kbd>⌘</Kbd><Kbd>K</Kbd></Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command…" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => { setOpen(false); toast.add({ title: "New project", type: "success" }); }}>New project <CommandShortcut>N</CommandShortcut></CommandItem>
            <CommandItem onSelect={() => { setOpen(false); document.documentElement.classList.toggle("dark"); }}>Toggle theme <CommandShortcut>T</CommandShortcut></CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Help">
            <CommandItem onSelect={() => setOpen(false)}>Documentation</CommandItem>
            <CommandItem disabled>Delete everything</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
const frameworks = ["Next.js", "Remix", "Astro", "SvelteKit", "Nuxt", "Solid Start", "Qwik", "Vite"];

/* ── the docs ── */
const docs: ComponentDoc[] = [
  {
    slug: "accordion", name: "Accordion", base: "accordion",
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
    preview: {
      bare: true,
      code: `<Accordion>\n  <AccordionItem value="1">\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionPanel>Yes. It follows the WAI-ARIA pattern.</AccordionPanel>\n  </AccordionItem>\n</Accordion>`,
      demo: (
        <Accordion className="mx-auto max-w-md">
          <AccordionItem value="1"><AccordionTrigger>Is it accessible?</AccordionTrigger><AccordionPanel>Yes. It follows the WAI-ARIA pattern.</AccordionPanel></AccordionItem>
          <AccordionItem value="2"><AccordionTrigger>Is it animated?</AccordionTrigger><AccordionPanel>The panel opens in five frames.</AccordionPanel></AccordionItem>
        </Accordion>
      ),
    },
    usage: `import {\n  Accordion, AccordionItem, AccordionTrigger, AccordionPanel,\n} from "@/components/ui/accordion";`,
  },
  {
    slug: "alert", name: "Alert",
    description: "Displays a callout for user attention, with a status icon.",
    preview: {
      bare: true,
      code: `<Alert variant="info" title="Heads up">A new version is available.</Alert>`,
      demo: <div className="mx-auto max-w-md space-y-3"><Alert variant="info" title="Heads up">A new version is available.</Alert></div>,
    },
    usage: `import { Alert } from "@/components/ui/alert";\n\n<Alert variant="success" title="Deployed">Production is up to date.</Alert>`,
    examples: [
      {
        title: "Variants", bare: true,
        code: `<Alert variant="info" title="Info">…</Alert>\n<Alert variant="success" title="Success">…</Alert>\n<Alert variant="warning" title="Warning">…</Alert>\n<Alert variant="error" title="Error">…</Alert>`,
        demo: (
          <div className="space-y-3">
            <Alert variant="info" title="Info">A new version is available.</Alert>
            <Alert variant="success" title="Success">Production is up to date.</Alert>
            <Alert variant="warning" title="Warning">This build was slow.</Alert>
            <Alert variant="error" title="Error">Could not reach the registry.</Alert>
          </div>
        ),
      },
    ],
    props: [{ items: [
      { name: "variant", type: '"default" | "info" | "success" | "warning" | "error"', default: '"default"' },
      { name: "title", type: "ReactNode" },
    ] }],
  },
  {
    slug: "avatar", name: "Avatar", base: "avatar",
    description: "A square pixel avatar that falls back to initials.",
    preview: { code: `<Avatar src="/me.png" fallback="NF" />\n<Avatar fallback="SK" />`, demo: <><Avatar fallback="NF" /><Avatar fallback="SK" /><Avatar fallback="AB" className="size-14" /></> },
    usage: `import { Avatar } from "@/components/ui/avatar";\n\n<Avatar src="/me.png" alt="Me" fallback="ME" />`,
    props: [{ items: [
      { name: "src", type: "string", description: "Image URL. Falls back when missing or failing." },
      { name: "alt", type: "string" },
      { name: "fallback", type: "string", description: "Initials shown when there's no image." },
    ] }],
  },
  {
    slug: "badge", name: "Badge",
    description: "Displays a small status label, optionally with a blinking dot.",
    preview: {
      code: `<Badge>default</Badge>\n<Badge variant="sage" dot>live</Badge>\n<Badge variant="danger">failed</Badge>`,
      demo: <><Badge>default</Badge><Badge variant="accent">accent</Badge><Badge variant="sun">sun</Badge><Badge variant="teal">teal</Badge><Badge variant="sage" dot>live</Badge><Badge variant="danger">failed</Badge></>,
    },
    usage: `import { Badge } from "@/components/ui/badge";\n\n<Badge variant="sage" dot>live</Badge>`,
    props: [{ items: [
      { name: "variant", type: '"default" | "accent" | "sun" | "teal" | "sage" | "danger"', default: '"default"' },
      { name: "dot", type: "boolean", default: "false", description: "Show a blinking status pixel." },
    ] }],
  },
  {
    slug: "breadcrumb", name: "Breadcrumb",
    description: "Displays the path to the current resource using a hierarchy of links.",
    preview: {
      code: `<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`,
      demo: (
        <Breadcrumb><BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/docs/components/button">Components</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList></Breadcrumb>
      ),
    },
    usage: `import {\n  Breadcrumb, BreadcrumbList, BreadcrumbItem,\n  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,\n} from "@/components/ui/breadcrumb";`,
  },
  {
    slug: "button", name: "Button", base: "button",
    description: "Displays a button or a component that looks like a button.",
    preview: { code: `<Button>Button</Button>`, demo: <Button>Button</Button> },
    usage: `import { Button } from "@/components/ui/button";\n\n<Button variant="outline">Button</Button>`,
    examples: [
      {
        title: "Variants",
        code: `<Button>default</Button>\n<Button variant="sun">sun</Button>\n<Button variant="teal">teal</Button>\n<Button variant="sage">sage</Button>\n<Button variant="outline">outline</Button>\n<Button variant="secondary">secondary</Button>\n<Button variant="destructive">destructive</Button>\n<Button variant="ghost">ghost</Button>\n<Button variant="link">link</Button>`,
        demo: <><Button>default</Button><Button variant="sun">sun</Button><Button variant="teal">teal</Button><Button variant="sage">sage</Button><Button variant="outline">outline</Button><Button variant="secondary">secondary</Button><Button variant="destructive">destructive</Button><Button variant="ghost">ghost</Button><Button variant="link">link</Button></>,
      },
      { title: "Size", code: `<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>\n<Button size="icon" aria-label="Add"><PixelIcon name="plus" /></Button>`, demo: <><Button size="sm">Small</Button><Button>Medium</Button><Button size="lg">Large</Button><Button size="icon" aria-label="Add"><PixelIcon name="plus" size={2} /></Button></> },
      { title: "With icon", code: `<Button><PixelIcon name="star" size={2} /> Favorite</Button>`, demo: <Button><PixelIcon name="star" size={2} /> Favorite</Button> },
      { title: "As a link", description: "Use Base UI's render prop to render a different element.", code: `<Button render={<a href="/docs" />}>Docs</Button>`, demo: <Button render={<a href="#" onClick={(e) => e.preventDefault()} />}>Docs</Button> },
      { title: "Disabled", code: `<Button disabled>Disabled</Button>`, demo: <Button disabled>Disabled</Button> },
    ],
    props: [{ items: [
      { name: "variant", type: '"default" | "sun" | "teal" | "sage" | "outline" | "secondary" | "destructive" | "ghost" | "link"', default: '"default"' },
      { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"' },
      { name: "render", type: "ReactElement", description: "Render as another element (Base UI)." },
    ] }],
  },
  {
    slug: "calendar", name: "Calendar",
    description: "A single-date calendar with full keyboard support. No dependencies.",
    preview: { bare: true, code: `const [date, setDate] = React.useState<Date | null>(new Date());\n\n<Calendar selected={date} onSelect={setDate} />`, demo: <div className="flex justify-center"><CalendarDemo /></div> },
    usage: `import { Calendar } from "@/components/ui/calendar";`,
    note: <>Keyboard: <Kbd>←</Kbd> <Kbd>→</Kbd> day · <Kbd>↑</Kbd> <Kbd>↓</Kbd> week · <Kbd>PageUp</Kbd> <Kbd>PageDown</Kbd> month (with Shift: year) · <Kbd>Home</Kbd> <Kbd>End</Kbd> week start / end.</>,
    examples: [
      { title: "Monday start, min date", bare: true, code: `<Calendar weekStartsOn={1} min={new Date()} />`, demo: <div className="flex justify-center"><Calendar weekStartsOn={1} min={new Date()} /></div> },
    ],
    props: [{ items: [
      { name: "selected", type: "Date | null" },
      { name: "onSelect", type: "(date: Date) => void" },
      { name: "defaultMonth", type: "Date", description: "Month shown first." },
      { name: "min · max", type: "Date" },
      { name: "isDisabled", type: "(date: Date) => boolean" },
      { name: "weekStartsOn", type: "0 | 1", default: "0", description: "0 = Sunday, 1 = Monday." },
      { name: "locale", type: "string", description: "Any Intl locale, e.g. \"en-GB\"." },
    ] }],
  },
  {
    slug: "card", name: "Card",
    description: "A raised pixel panel with header, title, description and footer slots.",
    preview: {
      code: `<Card>\n  <CardHeader>\n    <CardTitle>Registry-first</CardTitle>\n    <CardDescription>Copy the source. Change anything.</CardDescription>\n  </CardHeader>\n  <CardFooter><Button size="sm">Read more</Button></CardFooter>\n</Card>`,
      demo: <Card className="w-72"><CardHeader><CardTitle>Registry-first</CardTitle><CardDescription>Copy the source. Change anything.</CardDescription></CardHeader><CardFooter><Button size="sm">Read more</Button></CardFooter></Card>,
    },
    usage: `import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";`,
  },
  {
    slug: "checkbox", name: "Checkbox", base: "checkbox",
    description: "A control that allows the user to toggle between checked and not checked.",
    preview: { code: `<label className="flex items-center gap-3">\n  <Checkbox defaultChecked /> Accept terms\n</label>`, demo: <><label className="flex items-center gap-3 text-sm font-medium"><Checkbox defaultChecked /> Accept terms</label><label className="flex items-center gap-3 text-sm font-medium"><Checkbox /> Subscribe</label><label className="flex items-center gap-3 text-sm font-medium opacity-60"><Checkbox disabled /> Disabled</label></> },
    usage: `import { Checkbox } from "@/components/ui/checkbox";`,
  },
  {
    slug: "code-block", name: "Code Block",
    description: "Syntax-highlighted code with a filename bar and copy button. Built-in tokenizer, no dependencies.",
    preview: {
      bare: true,
      code: `<CodeBlock\n  language="tsx"\n  filename="Save.tsx"\n  code={source}\n/>`,
      demo: <CodeBlock language="tsx" filename="Save.tsx" code={`export function Save({ count = 3 }: { count?: number }) {\n  // 5-frame pop on mount\n  return <Button variant="sun">Save {count}</Button>;\n}`} />,
    },
    usage: `import { CodeBlock, HighlightedCode } from "@/components/ui/code-block";`,
    note: <><Ic>HighlightedCode</Ic> renders just the highlighted <Ic>&lt;code&gt;</Ic> (no chrome), for use inside your own container. Colors come from the <Ic>--nf-code-*</Ic> tokens.</>,
    examples: [
      { title: "Languages", bare: true, code: `<CodeBlock language="bash" code="npx nullfuse add button" />\n<CodeBlock language="css" code=".card { --nf-drop: 4px; }" />\n<CodeBlock language="json" code='{ "strict": true }' />`, demo: <div className="space-y-3"><CodeBlock language="bash" code="npx nullfuse add button" /><CodeBlock language="css" code=".card { --nf-drop: 4px; }" /><CodeBlock language="json" code='{ "strict": true }' /></div> },
    ],
    props: [{ items: [
      { name: "code", type: "string" },
      { name: "language", type: '"ts" | "tsx" | "js" | "jsx" | "json" | "css" | "bash" | "text"', default: '"text"' },
      { name: "filename", type: "string", description: "Shown in the header; defaults to the language." },
    ] }],
  },
  {
    slug: "combobox", name: "Combobox", base: "combobox",
    description: "An input with a list of suggestions that filters as you type.",
    preview: {
      code: `<Combobox items={frameworks}>\n  <ComboboxInput placeholder="Search framework…" />\n  <ComboboxContent>\n    <ComboboxEmpty>No matches.</ComboboxEmpty>\n    <ComboboxList>\n      {(item: string) => (\n        <ComboboxItem key={item} value={item}>{item}</ComboboxItem>\n      )}\n    </ComboboxList>\n  </ComboboxContent>\n</Combobox>`,
      demo: (
        <div className="w-64"><Combobox items={frameworks}>
          <ComboboxInput placeholder="Search framework…" />
          <ComboboxContent><ComboboxEmpty>No matches.</ComboboxEmpty><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxContent>
        </Combobox></div>
      ),
    },
    usage: `import {\n  Combobox, ComboboxInput, ComboboxContent,\n  ComboboxList, ComboboxItem, ComboboxEmpty,\n} from "@/components/ui/combobox";`,
    note: <>Pass <Ic>items</Ic> (strings, or <Ic>{"{ value, label }"}</Ic> objects) to the root; Base UI filters them.</>,
  },
  {
    slug: "command", name: "Command",
    description: "A ⌘K command palette with fuzzy-free word filtering, groups, shortcuts and full keyboard support.",
    preview: {
      code: `const [open, setOpen] = React.useState(false);\nuseCommandHotkey(setOpen); // ⌘K / Ctrl+K\n\n<CommandDialog open={open} onOpenChange={setOpen}>\n  <CommandInput placeholder="Type a command…" />\n  <CommandList>\n    <CommandEmpty>No results.</CommandEmpty>\n    <CommandGroup heading="Actions">\n      <CommandItem onSelect={() => {}}>\n        New project <CommandShortcut>N</CommandShortcut>\n      </CommandItem>\n    </CommandGroup>\n  </CommandList>\n</CommandDialog>`,
      demo: <CommandDemo />,
    },
    usage: `import {\n  CommandDialog, CommandInput, CommandList, CommandEmpty,\n  CommandGroup, CommandItem, CommandShortcut, CommandSeparator,\n  useCommandHotkey,\n} from "@/components/ui/command";`,
    note: <>Every word you type must appear in the item's text (or its <Ic>value</Ic>). <Kbd>↑</Kbd> <Kbd>↓</Kbd> move, <Kbd>Enter</Kbd> selects, <Kbd>Esc</Kbd> closes. This site's search is built with it.</>,
    props: [{ title: "CommandItem", items: [
      { name: "onSelect", type: "() => void" },
      { name: "value", type: "string", description: "Text to filter on. Defaults to the item's text content." },
      { name: "disabled", type: "boolean" },
    ] }],
  },
  {
    slug: "date-picker", name: "Date Picker",
    description: "A button that opens a popover calendar. Controlled or uncontrolled.",
    preview: { code: `<DatePicker onChange={(date) => console.log(date)} />`, demo: <DatePicker weekStartsOn={1} /> },
    usage: `import { DatePicker } from "@/components/ui/date-picker";`,
    examples: [
      { title: "Controlled", code: `const [date, setDate] = React.useState<Date | null>(null);\n\n<DatePicker value={date} onChange={setDate} />`, demo: <DatePicker defaultValue={new Date()} /> },
      { title: "Custom format", code: `<DatePicker format={{ dateStyle: "full" }} locale="en-GB" />`, demo: <DatePicker format={{ dateStyle: "long" }} className="w-72" defaultValue={new Date()} /> },
    ],
    props: [{ items: [
      { name: "value", type: "Date | null", description: "Controlled value." },
      { name: "defaultValue", type: "Date | null", default: "null" },
      { name: "onChange", type: "(date: Date) => void" },
      { name: "placeholder", type: "string", default: '"Pick a date"' },
      { name: "format", type: "Intl.DateTimeFormatOptions" },
      { name: "…", type: "Calendar props", description: "min, max, isDisabled, weekStartsOn, locale." },
    ] }],
  },
  {
    slug: "dialog", name: "Dialog", base: "dialog",
    description: "A modal window that interrupts the user with important content.",
    preview: {
      code: `<Dialog>\n  <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>\n  <DialogContent>\n    <DialogTitle>Ship it?</DialogTitle>\n    <DialogDescription>This will publish 14 commits.</DialogDescription>\n    <DialogFooter>\n      <DialogClose render={<Button variant="ghost" />}>Not yet</DialogClose>\n      <DialogClose render={<Button variant="sun" />}>Ship it</DialogClose>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`,
      demo: (
        <Dialog>
          <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Ship it?</DialogTitle>
            <DialogDescription>This will publish 14 commits to production. You can roll back any time.</DialogDescription>
            <DialogFooter><DialogClose render={<Button variant="ghost" />}>Not yet</DialogClose><DialogClose render={<Button variant="sun" />}>Ship it</DialogClose></DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
    usage: `import {\n  Dialog, DialogTrigger, DialogContent, DialogTitle,\n  DialogDescription, DialogFooter, DialogClose,\n} from "@/components/ui/dialog";`,
  },
  {
    slug: "field", name: "Field", base: "field",
    description: "A form field with label, control, description and validation error, wired for accessibility.",
    preview: {
      code: `<Field>\n  <FieldLabel>Email</FieldLabel>\n  <FieldControl render={<Input type="email" required />} />\n  <FieldDescription>We never share it.</FieldDescription>\n  <FieldError match="valueMissing">Email is required</FieldError>\n</Field>`,
      demo: <Field className="w-72"><FieldLabel>Email</FieldLabel><FieldControl render={<Input type="email" required placeholder="you@nullfuse.com" />} /><FieldDescription>We never share it.</FieldDescription><FieldError match="valueMissing">Email is required</FieldError></Field>,
    },
    usage: `import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from "@/components/ui/field";`,
  },
  {
    slug: "hop", name: "Hop",
    description: "Wraps text or an element so it hops (a four-frame jump) on hover or focus. Pure CSS.",
    preview: { code: `<Hop className="nf-h2">jump!</Hop>`, demo: <Hop className="nf-h2">jump!</Hop> },
    usage: `import { Hop } from "@/components/ui/hop";`,
  },
  {
    slug: "input", name: "Input", base: "input",
    description: "A sunken pixel text input.",
    preview: { code: `<Input placeholder="player@nullfuse.com" />`, demo: <Input className="w-72" placeholder="player@nullfuse.com" /> },
    usage: `import { Input } from "@/components/ui/input";`,
    examples: [
      { title: "Disabled", code: `<Input disabled placeholder="Disabled" />`, demo: <Input className="w-72" disabled placeholder="Disabled" /> },
      { title: "With label", code: `<div className="flex flex-col gap-1.5">\n  <Label htmlFor="email">Email</Label>\n  <Input id="email" type="email" />\n</div>`, demo: <div className="flex w-72 flex-col gap-1.5"><Label htmlFor="em">Email</Label><Input id="em" type="email" placeholder="you@nullfuse.com" /></div> },
    ],
  },
  {
    slug: "kbd", name: "Kbd",
    description: "Displays a keyboard key.",
    preview: { code: `<Kbd>⌘</Kbd> <Kbd>K</Kbd>`, demo: <span className="text-sm">Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search</span> },
    usage: `import { Kbd } from "@/components/ui/kbd";`,
  },
  {
    slug: "label", name: "Label",
    description: "Renders an accessible label associated with a control.",
    preview: { code: `<Label htmlFor="name">Name</Label>`, demo: <div className="flex flex-col gap-1.5"><Label htmlFor="nm">Name</Label><Input id="nm" className="w-64" /></div> },
    usage: `import { Label } from "@/components/ui/label";`,
    note: <>For labels with descriptions and validation, use <Link href="/docs/components/field" className="underline underline-offset-4">Field</Link>.</>,
  },
  {
    slug: "marquee", name: "Marquee",
    description: "An endless ticker strip that scrolls in discrete steps, like a sprite scroller.",
    preview: { bare: true, code: `<Marquee items={["pixel-crisp", "readable type", "copy & own"]} />`, demo: <Marquee items={["pixel-crisp", "readable type", "copy & own", "black & white"]} /> },
    usage: `import { Marquee } from "@/components/ui/marquee";`,
    props: [{ items: [{ name: "items", type: "ReactNode[]" }, { name: "className", type: "string" }] }],
  },
  {
    slug: "menu", name: "Menu", base: "menu",
    description: "A dropdown menu of actions, opened from a trigger.",
    preview: {
      code: `<Menu>\n  <MenuTrigger render={<Button variant="outline" />}>Menu</MenuTrigger>\n  <MenuContent>\n    <MenuLabel>account</MenuLabel>\n    <MenuItem>Profile <Kbd>P</Kbd></MenuItem>\n    <MenuSeparator />\n    <MenuItem>Sign out</MenuItem>\n  </MenuContent>\n</Menu>`,
      demo: <Menu><MenuTrigger render={<Button variant="outline" />}>Menu</MenuTrigger><MenuContent><MenuLabel>account</MenuLabel><MenuItem>Profile <Kbd>P</Kbd></MenuItem><MenuItem>Settings <Kbd>,</Kbd></MenuItem><MenuSeparator /><MenuItem>Sign out</MenuItem></MenuContent></Menu>,
    },
    usage: `import { Menu, MenuTrigger, MenuContent, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/menu";`,
  },
  {
    slug: "pagination", name: "Pagination",
    description: "Page navigation with next and previous links and collapsing ranges.",
    preview: { code: `const [page, setPage] = React.useState(5);\n\n<Pagination page={page} pageCount={12} onPageChange={setPage} />`, demo: <PaginationDemo /> },
    usage: `import { Pagination, pageRange } from "@/components/ui/pagination";`,
    props: [{ items: [
      { name: "page", type: "number", description: "Current page, 1-based." },
      { name: "pageCount", type: "number" },
      { name: "onPageChange", type: "(page: number) => void" },
      { name: "siblings", type: "number", default: "1", description: "Pages shown either side of the current one." },
    ] }],
  },
  {
    slug: "pixel-icon", name: "Pixel Icon",
    description: "Sprite icons defined as ASCII grids, rendered as crisp SVG.",
    preview: { bare: true, code: `<PixelIcon name="heart" size={4} className="text-danger" />`, demo: <div className="flex flex-wrap justify-center gap-6">{(Object.keys(sprites) as PixelIconName[]).map((n) => <span key={n} className="flex w-16 flex-col items-center gap-2"><PixelIcon name={n} size={3} /><span className="nf-label text-[0.5625rem]">{n}</span></span>)}</div> },
    usage: `import { PixelIcon } from "@/components/ui/pixel-icon";\n\n<PixelIcon name="star" size={3} className="text-sun" />`,
    note: <>Icons use <Ic>currentColor</Ic>, so color them with text utilities. To add a sprite, add a grid to <Ic>sprites</Ic>: <Ic>#</Ic> = color, <Ic>o</Ic> = ink outline, <Ic>w</Ic> = highlight, <Ic>.</Ic> = empty.</>,
    props: [{ items: [
      { name: "name", type: "keyof sprites" },
      { name: "size", type: "number", default: "3", description: "CSS pixels per sprite pixel." },
      { name: "title", type: "string", description: "Accessible label. Omit for decorative icons." },
    ] }],
  },
  {
    slug: "popover", name: "Popover", base: "popover",
    description: "Floating content anchored to a trigger.",
    preview: {
      code: `<Popover>\n  <PopoverTrigger render={<Button variant="outline" />}>Open</PopoverTrigger>\n  <PopoverContent>\n    <PopoverTitle>Heads up</PopoverTitle>\n    <PopoverDescription>Closes on outside click.</PopoverDescription>\n  </PopoverContent>\n</Popover>`,
      demo: <Popover><PopoverTrigger render={<Button variant="outline" />}>Open popover</PopoverTrigger><PopoverContent><PopoverTitle>Heads up</PopoverTitle><PopoverDescription>Popovers anchor to their trigger and close on outside click.</PopoverDescription></PopoverContent></Popover>,
    },
    usage: `import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription } from "@/components/ui/popover";`,
  },
  {
    slug: "progress", name: "Progress",
    description: "A segmented, health-bar style progress indicator.",
    preview: { bare: true, code: `<Progress value={60} tone="sage" />`, demo: <div className="flex justify-center"><ProgressDemo /></div> },
    usage: `import { Progress } from "@/components/ui/progress";`,
    props: [{ items: [
      { name: "value", type: "number", description: "0–100." },
      { name: "segments", type: "number", default: "12" },
      { name: "tone", type: '"accent" | "sun" | "teal" | "sage"', default: '"accent"' },
    ] }],
  },
  {
    slug: "radio-group", name: "Radio Group", base: "radio-group",
    description: "A set of checkable buttons where only one can be selected at a time.",
    preview: { code: `<RadioGroup defaultValue="a" aria-label="Billing">\n  <label className="flex items-center gap-2"><RadioItem value="a" /> Monthly</label>\n  <label className="flex items-center gap-2"><RadioItem value="b" /> Yearly</label>\n</RadioGroup>`, demo: <RadioGroup defaultValue="a" aria-label="Billing"><label className="flex items-center gap-2 text-sm"><RadioItem value="a" /> Monthly</label><label className="flex items-center gap-2 text-sm"><RadioItem value="b" /> Yearly</label></RadioGroup> },
    usage: `import { RadioGroup, RadioItem } from "@/components/ui/radio-group";`,
  },
  {
    slug: "reveal", name: "Reveal",
    description: "Fades its children up when they scroll into view.",
    preview: { code: `<Reveal><Card>…</Card></Reveal>`, demo: <Reveal><Card className="w-64"><CardHeader><CardTitle>I fade up</CardTitle><CardDescription>On scroll into view.</CardDescription></CardHeader></Card></Reveal> },
    usage: `import { Reveal } from "@/components/ui/reveal";`,
    props: [{ items: [{ name: "delay", type: "number", default: "0", description: "Seconds, to sequence siblings." }] }],
  },
  {
    slug: "select", name: "Select", base: "select",
    description: "Displays a list of options for the user to pick from, triggered by a button.",
    preview: {
      code: `<Select defaultValue="pro" items={{ free: "Free", pro: "Pro", team: "Team" }}>\n  <SelectTrigger />\n  <SelectContent>\n    <SelectItem value="free">Free</SelectItem>\n    <SelectItem value="pro">Pro</SelectItem>\n    <SelectItem value="team">Team</SelectItem>\n  </SelectContent>\n</Select>`,
      demo: <div className="w-56"><Select defaultValue="pro" items={{ free: "Free", pro: "Pro", team: "Team" }}><SelectTrigger /><SelectContent><SelectItem value="free">Free</SelectItem><SelectItem value="pro">Pro</SelectItem><SelectItem value="team">Team</SelectItem></SelectContent></Select></div>,
    },
    usage: `import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";`,
    note: <>Pass <Ic>{"items={{ value: \"Label\" }}"}</Ic> to the root so the trigger shows labels instead of raw values.</>,
  },
  {
    slug: "separator", name: "Separator", base: "separator",
    description: "Visually or semantically separates content.",
    preview: { bare: true, code: `<Separator />\n<Separator dashed />\n<Separator orientation="vertical" className="h-6" />`, demo: <div className="mx-auto max-w-sm space-y-4"><Separator /><Separator dashed /><div className="flex h-6 items-center justify-center gap-4 text-sm"><span>Blog</span><Separator orientation="vertical" /><span>Docs</span><Separator orientation="vertical" /><span>Source</span></div></div> },
    usage: `import { Separator } from "@/components/ui/separator";`,
  },
  {
    slug: "sheet", name: "Sheet", base: "dialog",
    description: "A panel that slides in from the edge of the screen.",
    preview: {
      code: `<Sheet>\n  <SheetTrigger render={<Button variant="outline" />}>Open</SheetTrigger>\n  <SheetContent side="right">\n    <SheetTitle>Settings</SheetTitle>\n    <SheetDescription>Slides in over 5 frames.</SheetDescription>\n    <SheetClose render={<Button variant="sun" />}>Done</SheetClose>\n  </SheetContent>\n</Sheet>`,
      demo: <Sheet><SheetTrigger render={<Button variant="outline" />}>Open sheet</SheetTrigger><SheetContent><SheetTitle>Settings</SheetTitle><SheetDescription>Slides in over 5 frames from the edge.</SheetDescription><div className="mt-6"><SheetClose render={<Button variant="sun" />}>Done</SheetClose></div></SheetContent></Sheet>,
    },
    usage: `import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";`,
    props: [{ title: "SheetContent", items: [{ name: "side", type: '"right" | "left" | "bottom"', default: '"right"' }] }],
  },
  {
    slug: "skeleton", name: "Skeleton",
    description: "A loading placeholder that blinks in two frames.",
    preview: { code: `<Skeleton className="h-3 w-2/3" />`, demo: <div className="flex w-64 flex-col gap-3"><Skeleton className="h-3 w-2/3" /><Skeleton className="h-3 w-1/2" /><Skeleton className="h-16 w-full" /></div> },
    usage: `import { Skeleton } from "@/components/ui/skeleton";`,
  },
  {
    slug: "slider", name: "Slider", base: "slider",
    description: "An input where the user selects a value from within a given range.",
    preview: { bare: true, code: `<Slider defaultValue={40} aria-label="Volume" />`, demo: <div className="mx-auto w-full max-w-sm"><Slider defaultValue={40} aria-label="Volume" /></div> },
    usage: `import { Slider } from "@/components/ui/slider";`,
  },
  {
    slug: "switch", name: "Switch", base: "switch",
    description: "A control that toggles between on and off.",
    preview: { code: `<label className="flex items-center gap-3">\n  <Switch defaultChecked /> Notifications\n</label>`, demo: <><label className="flex items-center gap-3 text-sm font-medium"><Switch defaultChecked /> On</label><label className="flex items-center gap-3 text-sm font-medium"><Switch /> Off</label><label className="flex items-center gap-3 text-sm font-medium opacity-60"><Switch disabled /> Disabled</label></> },
    usage: `import { Switch } from "@/components/ui/switch";`,
  },
  {
    slug: "table", name: "Table",
    description: "A responsive table with a pixel frame.",
    preview: {
      bare: true,
      code: `<Table>\n  <TableHeader>\n    <TableRow><TableHead>Service</TableHead><TableHead>Status</TableHead></TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow><TableCell>api</TableCell><TableCell>up</TableCell></TableRow>\n  </TableBody>\n</Table>`,
      demo: <Table><TableHeader><TableRow><TableHead>Service</TableHead><TableHead>Status</TableHead><TableHead>Latency</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>api</TableCell><TableCell><Badge variant="sage" dot>up</Badge></TableCell><TableCell>42ms</TableCell></TableRow><TableRow><TableCell>web</TableCell><TableCell><Badge variant="sage" dot>up</Badge></TableCell><TableCell>88ms</TableCell></TableRow><TableRow><TableCell>worker</TableCell><TableCell><Badge variant="danger">down</Badge></TableCell><TableCell>—</TableCell></TableRow></TableBody></Table>,
    },
    usage: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";`,
  },
  {
    slug: "tabs", name: "Tabs", base: "tabs",
    description: "Folder-style tabs that switch between panels of content.",
    preview: {
      bare: true,
      code: `<Tabs defaultValue="account">\n  <TabsList>\n    <TabsTab value="account">Account</TabsTab>\n    <TabsTab value="password">Password</TabsTab>\n  </TabsList>\n  <TabsPanel value="account">Account settings.</TabsPanel>\n  <TabsPanel value="password">Change your password.</TabsPanel>\n</Tabs>`,
      demo: <Tabs defaultValue="account"><TabsList><TabsTab value="account">Account</TabsTab><TabsTab value="password">Password</TabsTab></TabsList><TabsPanel value="account"><Text>Make changes to your account here.</Text></TabsPanel><TabsPanel value="password"><Text>Change your password here.</Text></TabsPanel></Tabs>,
    },
    usage: `import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";`,
  },
  {
    slug: "textarea", name: "Textarea",
    description: "A sunken, resizable multi-line text input.",
    preview: { code: `<Textarea placeholder="Tell us more…" />`, demo: <Textarea className="w-80" placeholder="Tell us more…" /> },
    usage: `import { Textarea } from "@/components/ui/textarea";`,
  },
  {
    slug: "toast", name: "Toast", base: "toast",
    description: "A transient message that appears in the corner and dismisses itself.",
    preview: { code: `const toast = useToast();\n\n<Button onClick={() => toast.add({ title: "Saved", description: "Your changes are live." })}>\n  Show toast\n</Button>`, demo: <ToastButtons /> },
    usage: `import { ToastProvider, useToast } from "@/components/ui/toast";\n\n// 1. wrap your app once\n<ToastProvider>\n  <App />\n</ToastProvider>\n\n// 2. fire from anywhere inside\nconst toast = useToast();\ntoast.add({ title: "Deployed", type: "success" });`,
    note: <>Wrap your app in <Ic>ToastProvider</Ic> once. <Ic>type</Ic> can be <Ic>"success"</Ic>, <Ic>"error"</Ic>, <Ic>"info"</Ic> or omitted.</>,
    props: [{ title: "ToastProvider", items: [{ name: "timeout", type: "number", default: "4000", description: "Auto-dismiss delay in ms." }] }],
  },
  {
    slug: "tooltip", name: "Tooltip", base: "tooltip",
    description: "A popup that displays information related to an element on hover or focus.",
    preview: { code: `<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger render={<Button variant="outline" />}>Hover</TooltipTrigger>\n    <TooltipContent>Add to library</TooltipContent>\n  </Tooltip>\n</TooltipProvider>`, demo: <Tooltip><TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger><TooltipContent>Add to library</TooltipContent></Tooltip> },
    usage: `import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";`,
    note: <>Wrap your app in <Ic>TooltipProvider</Ic> once.</>,
  },
  {
    slug: "typewriter", name: "Typewriter",
    description: "Types text out one character at a time, like a terminal. Respects reduced motion.",
    preview: { code: `<Typewriter text={["Pixel by pixel.", "Frame by frame."]} loop />`, demo: <Typewriter text={["Pixel by pixel.", "Frame by frame.", "Level by level."]} loop className="nf-h2" /> },
    usage: `import { Typewriter } from "@/components/ui/typewriter";`,
    props: [{ items: [
      { name: "text", type: "string | string[]", description: "An array cycles through lines." },
      { name: "speed", type: "number", default: "14", description: "Characters per second." },
      { name: "hold", type: "number", default: "1600", description: "ms to hold a finished line (arrays only)." },
      { name: "loop", type: "boolean", default: "false" },
      { name: "cursor", type: "boolean", default: "true" },
    ] }],
  },
  {
    slug: "typography", name: "Typography",
    description: "Typed helpers for headings, text, labels and inline code, plus highlighted emphasis.",
    preview: { bare: true, code: `<Heading level="h1">Design that feels <Swash>crafted</Swash></Heading>\n<Text variant="lead">A lead paragraph.</Text>\n<Text>Body with <Mark>a highlight</Mark> and <Code>inline code</Code>.</Text>\n<Label>eyebrow</Label>`, demo: <div className="space-y-3"><TLabel>eyebrow</TLabel><Heading level="h1">Design that feels <Swash>crafted</Swash></Heading><Text variant="lead">A lead paragraph.</Text><Text>Body with <Mark>a highlight</Mark> and <Code>inline code</Code>.</Text></div> },
    usage: `import { Heading, Text, Label, Code, Swash, Mark } from "@/components/ui/typography";`,
    note: <>See <Link href="/docs/typography" className="underline underline-offset-4">Typography</Link> for the full scale.</>,
    props: [{ title: "Heading", items: [{ name: "level", type: '"display" | "h1" | "h2" | "h3" | "h4"', default: '"h2"' }, { name: "as", type: "ElementType" }] }, { title: "Text", items: [{ name: "variant", type: '"lead" | "body" | "small"', default: '"body"' }] }],
  },
  {
    slug: "window", name: "Window",
    description: "A 16-bit desktop window frame with a striped title bar.",
    preview: { code: `<Window title="readme.txt">\n  <Text>Hello from the 16-bit desktop.</Text>\n</Window>`, demo: <Window title="readme.txt" className="w-80"><Text>Hello from the 16-bit desktop.</Text></Window> },
    usage: `import { Window } from "@/components/ui/window";`,
    props: [{ items: [{ name: "title", type: "string", default: '"untitled"' }, { name: "bodyClassName", type: "string" }] }],
  },
];

export const componentDocs = docs.slice().sort((a, b) => a.name.localeCompare(b.name));

/* ── page renderer ── */
export function ComponentPage({ slug }: { slug: string }) {
  const i = componentDocs.findIndex((c) => c.slug === slug);
  const doc = componentDocs[i];
  if (!doc) return null;
  const prev = componentDocs[i - 1];
  const next = componentDocs[i + 1];
  return (
    <TooltipProvider>
      <DocPage
        eyebrow="Components"
        title={doc.name}
        description={doc.description}
        badges={doc.base ? <a href={`https://base-ui.com/react/components/${doc.base}`} target="_blank" rel="noreferrer"><Badge variant="default" className="normal-case tracking-normal hover:bg-surface-2">Base UI · {doc.base} ↗</Badge></a> : undefined}
      >
        <Preview code={doc.preview.code} bare={doc.preview.bare}>{doc.preview.demo}</Preview>

        <H2>Installation</H2>
        <Install slug={doc.slug} />

        <H2>Usage</H2>
        <CodeBlock language="tsx" filename="example.tsx" code={doc.usage} />
        {doc.note && <P className="!text-sm">{doc.note}</P>}

        {doc.examples && doc.examples.length > 0 && (
          <>
            <H2>Examples</H2>
            {doc.examples.map((e) => (
              <section key={e.title}>
                <H3>{e.title}</H3>
                {e.description && <P className="!my-2 text-sm">{e.description}</P>}
                <Preview code={e.code} bare={e.bare}>{e.demo}</Preview>
              </section>
            ))}
          </>
        )}

        {doc.props && (
          <>
            <H2>API Reference</H2>
            {doc.props.map((g, k) => (
              <section key={k}>
                {g.title && <H3>{g.title}</H3>}
                <PropsTable props={g.items} />
              </section>
            ))}
          </>
        )}

        <Pager
          prev={prev ? { href: `/docs/components/${prev.slug}`, title: prev.name } : { href: "/docs/changelog", title: "Changelog" }}
          next={next ? { href: `/docs/components/${next.slug}`, title: next.name } : undefined}
        />
      </DocPage>
    </TooltipProvider>
  );
}

export { ToastProvider, Callout };

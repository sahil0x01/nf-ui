import * as React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastProvider } from "@/components/ui/toast";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { Label } from "@/components/ui/typography";
import { NullfuseMark } from "./logo";
import { Header, DocsShell, Search } from "./layout";
import { Link, usePath } from "./router";
import { Home } from "./pages/home";
import { guidePages } from "./pages/guides";
import { ComponentPage, componentDocs } from "./pages/component-docs";

function NotFound() {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <PixelIcon name="cross" size={6} className="mx-auto text-danger" />
      <Heading level="h1" className="mt-6">404</Heading>
      <Text className="mt-2">That page doesn't exist.</Text>
      <Button className="mt-6" render={<Link href="/docs/introduction" />}>Back to the docs</Button>
    </div>
  );
}

function Routes() {
  const path = usePath();
  if (path === "/") return <Home />;

  if (path === "/docs") return <DocsShell>{React.createElement(guidePages.introduction)}</DocsShell>;
  const comp = path.match(/^\/docs\/components\/([\w-]+)$/);
  if (comp) {
    return componentDocs.some((c) => c.slug === comp[1])
      ? <DocsShell><ComponentPage slug={comp[1]} /></DocsShell>
      : <NotFound />;
  }
  if (path === "/docs/components") return <DocsShell><ComponentPage slug="accordion" /></DocsShell>;
  const guide = path.match(/^\/docs\/([\w-]+)$/);
  if (guide && guidePages[guide[1]]) return <DocsShell>{React.createElement(guidePages[guide[1]])}</DocsShell>;
  return <NotFound />;
}

export function App() {
  const path = usePath();
  const [searchOpen, setSearchOpen] = React.useState(false);

  // scroll to top on navigation, or to the #anchor if there is one
  React.useEffect(() => {
    const hash = window.location.hash.slice(1);
    requestAnimationFrame(() => {
      if (hash) document.getElementById(hash)?.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    document.title = path === "/" ? "nullfuse/ui" : `${path.split("/").pop()} · nullfuse/ui`;
  }, [path]);

  return (
    <TooltipProvider>
      <ToastProvider>
        <div className="min-h-screen">
          <Header onSearch={() => setSearchOpen(true)} />
          <Routes />
          <footer className="border-t-2 border-ink">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
              <span className="flex items-center gap-2 font-sans font-semibold">
                <NullfuseMark size={2} className="text-ink" /> nullfuse
              </span>
              <Label>built to be copied · v0.1</Label>
            </div>
          </footer>
          <Search open={searchOpen} setOpen={setSearchOpen} />
        </div>
      </ToastProvider>
    </TooltipProvider>
  );
}

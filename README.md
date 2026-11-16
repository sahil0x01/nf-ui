# nullfuse/ui

Design system for all Nullfuse products: tokens, typography, motion, components.
Pixel-art components with readable type, in two themes: **white** (default) and **black** (`class="dark"` on `<html>`). Notched pixel borders, bevels, sprite icons, frame-by-frame motion. shadcn-style distribution: components are **copied** into products.

```
packages/core    nullfuse-core  → styles.css (tokens, type scale, textures, keyframes) + motion.ts
packages/cli     nullfuse        → `init`, `add <name…>`, `list`
registry/        source of truth for every component (ui/*.tsx) + registry.json manifest
scripts/         build-registry.mjs → apps/docs/public/r/*.json (what the CLI fetches)
apps/docs        Docs site (Vite + React, path routing): home, Getting Started guides, one page per component
```

## Develop

```bash
pnpm install
pnpm dev              # docs at http://localhost:5174
pnpm build:registry   # regenerate registry JSON
pnpm typecheck
```

## Use in a product

```bash
npx nullfuse init
npx nullfuse add button card tabs
```
Then in your CSS: `@import "tailwindcss"; @import "nullfuse-core/styles.css";`
Set `@/*` → `./src/*` in tsconfig. Toggle the black theme with `class="dark"` on `<html>`.

## Docs site

Structured like shadcn's: a top bar with ⌘K search, a left sidebar (Getting started + alphabetical components), the page, and an "On this page" TOC.

- `src/pages/guides.tsx`: Introduction, Installation, CLI, Theming, Dark mode, Typography, Pixel system, Motion, Changelog.
- `src/pages/component-docs.tsx`: one entry per component (preview + code, usage, examples, API table). The page renderer adds the **Installation** block (CLI / Manual tabs, with the real source pulled from `registry/ui`).
- `src/parts.tsx`: shared building blocks (`Preview`, `Install`, `Steps`, `PropsTable`, `Pager`, anchored `H2`/`H3` that feed the TOC).
- `src/router.tsx`: tiny History-API router. Production hosting needs an SPA fallback (serve `index.html` for unknown paths).

## Deploy (Cloudflare)

The docs site and the component registry (`/r/*.json`) ship together as one Cloudflare Worker with static assets, deployed with Wrangler (config: `apps/docs/wrangler.jsonc`).

```bash
pnpm run deploy                          # build + upload (needs `wrangler login` once)
pnpm --filter docs run deploy:dry        # build + validate only
```

Use `pnpm run deploy` (not `pnpm deploy`, which is a different built-in pnpm command).

- Live at **https://ui.nullfuse.com** (custom domain on the `nullfuse.com` zone). The CLI's default registry is `https://ui.nullfuse.com/r`.
- The production build regenerates `public/r/*.json` automatically (Vite plugin in `apps/docs/vite.config.ts`), so the registry can't go stale.
- Unknown paths fall back to `index.html` (SPA), so deep links work. `public/_headers` sets CORS + caching for `/r/*`.
- Deploys go to whichever Cloudflare account `wrangler whoami` shows; the `nullfuse.com` zone must be on that account.

## Adding a component

0. Add the docs entry to `apps/docs/src/pages/component-docs.tsx`.

1. Create `registry/ui/<name>.tsx`. Import helpers as `@/lib/cn`, siblings as `@/components/ui/<x>`, motion as `nullfuse-core/motion`.
2. Add an entry to `registry/registry.json` (list npm `dependencies`).
3. Show it in `apps/docs/src/App.tsx`, run `pnpm build:registry && pnpm typecheck`.

## Rules (keep products consistent)

- **Colors**: only token utilities. The UI is black & white (`bg-background`, `bg-surface`, `text-muted`, `border-ink`; primary `bg-accent` = ink). Four restrained status colors only when they carry meaning: `bg-sun` highlight/warn, `bg-teal` info, `bg-sage` success, `bg-danger` error. No raw hex, no gradients (use `bg-dither`).
- **Pixels**: one pixel unit = `--nf-px` (2px — slim and crisp; raise it for a chunkier look). Surfaces use `nf-pixel` (notched ink border + bevel + optional `[--nf-drop:2–4px]` hard shadow), `nf-pixel-flat`, or `nf-pixel-inset`. **No border-radius, no blurred shadows, no rotation** (it anti-aliases).
- **Type**: Geist for everything (`nf-display`, `nf-h1–h3`, `nf-body`), Geist Mono for labels and code (`nf-label`). Never use a pixel font — pixel styling lives in the components, not the letterforms.
- **Icons**: `PixelIcon` sprites from ASCII grids. Draw new ones in `registry/ui/pixel-icon.tsx`.
- **Motion**: frame-by-frame. Use `steps()` easing (`ease.frames3/5/8` in JS, `steps(n)` in CSS) — never smooth curves. Press sinks one pixel unit; entrances are 4–5 frame pops; idle = `animate-bob`/`animate-blink`. Feedback ≤ 120ms, panels ≤ 240ms, entrances ≤ 400ms. Reduced motion is honored globally.
- **Primitives**: Base UI for anything interactive/accessible; style via `data-*` state attributes.

## Components (41)

- **Foundations**: typography (Heading, Text, Label, Code, Swash, Mark), pixel-icon, separator
- **Actions & inputs**: button, input, textarea, label, field, select, combobox, checkbox, radio-group, switch, slider, kbd, calendar, date-picker
- **Overlays**: dialog, sheet, popover, menu, tooltip, toast, command (⌘K palette)
- **Display**: card, badge, alert, avatar, skeleton, progress, table, tabs, accordion, window, code-block (syntax highlighted)
- **Navigation**: breadcrumb, pagination
- **Motion**: typewriter, reveal, hop, marquee

Notes: `CodeBlock` takes `language` (`ts tsx js jsx json css bash text`) and highlights with a built-in dependency-free tokenizer; colors come from the `--nf-code-*` tokens so they adapt to both themes. `Calendar` is single-date with full keyboard support (arrows, PageUp/PageDown, Home/End); `DatePicker` wraps it in a popover. `Combobox` takes `items` on the root and a render-function child on `ComboboxList`. Highlights: `Mark` and `Swash` draw a bottom band behind the text (never taller than the line). Portaled overlays use `z-50` (toast viewport `z-[60]`) — keep app chrome below that. `Command`: wrap in `CommandDialog`, call `useCommandHotkey(setOpen)`; filtering matches every typed word against the item text or `value`; arrows/Enter/Esc work. `Select` needs `items={{ value: "Label" }}` to show labels. Toasts need `<ToastProvider>` at the app root and `useToast()` to fire.
Base UI state attributes used for styling: `data-checked`, `data-active` (tabs), `data-highlighted`, `data-panel-open`, `data-starting-style` / `data-ending-style`.

## Not done yet

Date range selection, multi-select combobox (chips), dropdown with checkbox/radio items, data table (sorting), tree view; publishing `nullfuse-core`/`nullfuse` to npm and hosting `/r` (CLI defaults to `https://ui.nullfuse.com/r`, override with `NULLFUSE_REGISTRY`).

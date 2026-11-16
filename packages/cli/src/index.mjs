#!/usr/bin/env node
// nullfuse init | add <components...> | list
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { execSync } from "node:child_process";

const DEFAULT_REGISTRY = process.env.NULLFUSE_REGISTRY ?? "https://ui.nullfuse.com/r";
const CONFIG = "nullfuse.json";
const cwd = process.cwd();

const [cmd, ...args] = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("-")));
const positional = args.filter((a) => !a.startsWith("-"));

const log = (m) => console.log(m);
const die = (m) => { console.error(`\x1b[31m✗\x1b[0m ${m}`); process.exit(1); };

const loadConfig = () => {
  if (!existsSync(join(cwd, CONFIG))) die(`No ${CONFIG} found. Run \`nullfuse init\` first.`);
  const cfg = JSON.parse(readFileSync(join(cwd, CONFIG), "utf8"));
  if (process.env.NULLFUSE_REGISTRY) cfg.registry = process.env.NULLFUSE_REGISTRY; // env wins
  return cfg;
};

async function fetchItem(base, name) {
  const url = base.startsWith("http") ? `${base}/${name}.json` : null;
  let text;
  if (url) {
    const res = await fetch(url);
    if (!res.ok) die(`Component "${name}" not found (${res.status} ${url})`);
    text = await res.text();
  } else {
    const p = resolve(cwd, base, `${name}.json`);
    if (!existsSync(p)) die(`Component "${name}" not found at ${p}`);
    text = readFileSync(p, "utf8");
  }
  return JSON.parse(text);
}

function detectPm() {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm add";
  if (existsSync(join(cwd, "bun.lock")) || existsSync(join(cwd, "bun.lockb"))) return "bun add";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn add";
  return "npm install";
}

const write = (rel, content) => {
  const p = join(cwd, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
};

async function init() {
  const config = {
    registry: DEFAULT_REGISTRY,
    css: "src/index.css",
    aliases: { components: "src/components/ui", lib: "src/lib" },
  };
  write(CONFIG, JSON.stringify(config, null, 2) + "\n");
  write(
    join(config.aliases.lib, "cn.ts"),
    `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`,
  );
  const deps = ["@nullfuse/core", "clsx", "tailwind-merge", "motion", "@fontsource-variable/geist", "@fontsource-variable/geist-mono"];
  if (!flags.has("--no-install")) log(`→ installing ${deps.join(" ")}`);
  if (!flags.has("--no-install")) execSync(`${detectPm()} ${deps.join(" ")}`, { stdio: "inherit", cwd });
  log(`\n\x1b[32m✓\x1b[0m wrote ${CONFIG} and ${config.aliases.lib}/cn.ts`);
  log(`\nAdd to ${config.css}:\n\n  @import "tailwindcss";\n  @import "@nullfuse/core/styles.css";\n  @import "@fontsource-variable/geist";\n  @import "@fontsource-variable/geist-mono";\n`);
  log(`Then: nullfuse add button`);
}

async function add() {
  if (!positional.length) die("Usage: nullfuse add <component...>");
  const config = loadConfig();
  const seen = new Map();
  const queue = [...positional];
  while (queue.length) {
    const name = queue.shift();
    if (seen.has(name)) continue;
    const item = await fetchItem(config.registry, name);
    seen.set(name, item);
    queue.push(...(item.registryDependencies ?? []));
  }
  const npmDeps = new Set();
  for (const item of seen.values()) {
    for (const f of item.files) {
      const dest = join(config.aliases.components, f.path.replace(/^ui\//, ""));
      if (existsSync(join(cwd, dest)) && !flags.has("--overwrite")) {
        log(`  skip   ${dest} (exists, use --overwrite)`);
        continue;
      }
      write(dest, f.content); // "@/…" imports are kept; map "@/" to ./src in tsconfig
      log(`  \x1b[32madd\x1b[0m    ${dest}`);
    }
    item.dependencies.forEach((d) => npmDeps.add(d));
  }
  if (npmDeps.size && !flags.has("--no-install")) {
    log(`→ installing ${[...npmDeps].join(" ")}`);
    execSync(`${detectPm()} ${[...npmDeps].join(" ")}`, { stdio: "inherit", cwd });
  }
}

async function list() {
  const config = existsSync(join(cwd, CONFIG)) ? loadConfig() : { registry: DEFAULT_REGISTRY };
  const items = await fetchItem(config.registry, "index");
  for (const i of items) log(`  ${i.name.padEnd(14)} ${i.type}`);
}

const commands = { init, add, list };
if (!commands[cmd]) {
  log("nullfuse <init|add|list>\n\n  init               set up config, cn helper, install core\n  add <names...>     copy components into your project\n  list               show available components\n\nflags: --overwrite --no-install   env: NULLFUSE_REGISTRY");
  process.exit(cmd ? 1 : 0);
}
await commands[cmd]();

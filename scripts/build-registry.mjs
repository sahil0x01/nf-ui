// Builds registry/registry.json -> apps/docs/public/r/<name>.json (+ index.json)
// Each item inlines file contents so the CLI needs only one HTTP request per component.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const reg = JSON.parse(readFileSync(join(root, "registry/registry.json"), "utf8"));
const out = join(root, "apps/docs/public/r");
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const names = new Set(reg.items.map((i) => i.name));
const index = [];

for (const item of reg.items) {
  const files = item.files.map((p) => ({
    path: p,
    content: readFileSync(join(root, "registry", p), "utf8"),
  }));
  // infer registry deps from sibling imports like "@/components/ui/button"
  const registryDependencies = new Set(item.registryDependencies ?? []);
  for (const f of files) {
    for (const m of f.content.matchAll(/from\s+["']@\/components\/ui\/([\w-]+)["']/g)) {
      if (names.has(m[1]) && m[1] !== item.name) registryDependencies.add(m[1]);
    }
  }
  const built = {
    name: item.name,
    type: item.type,
    dependencies: item.dependencies ?? [],
    registryDependencies: [...registryDependencies],
    files,
  };
  writeFileSync(join(out, `${item.name}.json`), JSON.stringify(built, null, 2));
  index.push({ name: item.name, type: item.type, dependencies: built.dependencies, registryDependencies: built.registryDependencies });
}
writeFileSync(join(out, "index.json"), JSON.stringify(index, null, 2));
console.log(`registry: built ${index.length} items -> apps/docs/public/r`);

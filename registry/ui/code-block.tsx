"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

/* ── tiny dependency-free syntax highlighter ───────────────────────
 * Not a full parser — a fast tokenizer good enough for docs & snippets.
 * Languages: ts, tsx, js, jsx, json, css, bash, text.               */

export type CodeLanguage = "ts" | "tsx" | "js" | "jsx" | "json" | "css" | "bash" | "text";
type TokenType = "keyword" | "string" | "number" | "function" | "type" | "comment" | "punct" | "plain";
type Token = { text: string; type: TokenType };

const JS_KEYWORDS = new Set(
  "as async await break case catch class const continue default delete do else enum export extends false finally for from function if implements import in instanceof interface let new null of return satisfies static super switch this throw true try type typeof undefined var void while yield".split(" "),
);
const BASH_BUILTINS = new Set("cd ls echo export source alias if then fi for do done while case esac".split(" "));

const RE = {
  lineComment: /\/\/[^\n]*/y,
  blockComment: /\/\*[\s\S]*?(?:\*\/|$)/y,
  hashComment: /#[^\n]*/y,
  string: /"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?|`(?:\\.|[^`\\])*`?/y,
  number: /\b\d[\d_]*(?:\.\d+)?(?:px|rem|em|%|vh|vw|ms|s)?\b|#[0-9a-fA-F]{3,8}\b/y,
  word: /[A-Za-z_$][\w$-]*/y,
  jsxTag: /<\/?[A-Za-z][\w.]*/y,
  flag: /--?[A-Za-z][\w-]*/y,
  variable: /\$\{?[A-Za-z_]\w*\}?/y,
  ws: /\s+/y,
  cssAt: /@[A-Za-z-]+/y,
  cssVar: /--[A-Za-z][\w-]*/y,
  cssSelector: /[.#][A-Za-z_][\w-]*/y,
};

function match(re: RegExp, src: string, i: number) {
  re.lastIndex = i;
  const m = re.exec(src);
  return m ? m[0] : null;
}

export function tokenize(code: string, lang: CodeLanguage): Token[] {
  if (lang === "text") return [{ text: code, type: "plain" }];
  const out: Token[] = [];
  const push = (text: string, type: TokenType) => {
    const last = out[out.length - 1];
    if (last && last.type === type && (type === "plain" || type === "punct")) last.text += text;
    else out.push({ text, type });
  };
  const isJs = lang === "ts" || lang === "tsx" || lang === "js" || lang === "jsx";
  let i = 0;
  let lineStart = true; // for bash: first word of a command
  while (i < code.length) {
    let m: string | null;

    if (lang === "bash") {
      if ((m = match(RE.hashComment, code, i))) { push(m, "comment"); i += m.length; continue; }
    } else if (isJs || lang === "css") {
      if ((m = match(RE.blockComment, code, i))) { push(m, "comment"); i += m.length; continue; }
      if (lang !== "css" && (m = match(RE.lineComment, code, i))) { push(m, "comment"); i += m.length; continue; }
    }

    if (lang === "css") {
      if ((m = match(RE.cssAt, code, i)) || (m = match(RE.cssVar, code, i))) { push(m, "keyword"); i += m.length; continue; }
    }

    if ((m = match(RE.string, code, i))) {
      const after = code.slice(i + m.length).match(/^\s*:/);
      // JSON keys read as "properties"
      push(m, lang === "json" && after ? "type" : "string");
      i += m.length;
      lineStart = false;
      continue;
    }

    if (lang === "bash") {
      if ((m = match(RE.variable, code, i))) { push(m, "type"); i += m.length; continue; }
      if ((m = match(RE.flag, code, i)) && !lineStart) { push(m, "number"); i += m.length; continue; }
    }

    if ((lang === "tsx" || lang === "jsx") && (m = match(RE.jsxTag, code, i))) {
      push(m[0] === "<" && m[1] !== "/" ? "<" : "</", "punct");
      const name = m.replace(/^<\/?/, "");
      if (name) push(name, /^[A-Z]/.test(name) ? "type" : "keyword");
      i += m.length;
      continue;
    }

    if ((m = match(RE.number, code, i))) { push(m, "number"); i += m.length; continue; }
    if (lang === "css" && (m = match(RE.cssSelector, code, i))) { push(m, "type"); i += m.length; continue; }

    if ((m = match(RE.word, code, i))) {
      const next = code[i + m.length];
      let type: TokenType = "plain";
      if (lang === "bash") {
        if (lineStart || BASH_BUILTINS.has(m)) type = lineStart ? "function" : "keyword";
        else if (/^(?:install|add|init|run|dev|build|dlx|exec)$/.test(m)) type = "keyword";
      } else if (lang === "css") {
        if (next === ":" || /^\s*:/.test(code.slice(i + m.length, i + m.length + 3))) type = "keyword";
        else if (next === "(") type = "function";
      } else if (lang === "json") {
        if (m === "true" || m === "false" || m === "null") type = "keyword";
      } else if (JS_KEYWORDS.has(m)) type = "keyword";
      else if (next === "(" || (next === "<" && /^[a-z]/.test(m))) type = "function";
      else if (/^[A-Z]/.test(m)) type = "type";
      push(m, type);
      i += m.length;
      if (lang === "bash") lineStart = false;
      continue;
    }

    const ch = code[i];
    if (ch === "\n") lineStart = true;
    else if (lang === "bash" && (ch === "|" || ch === ";" || (ch === "&" && code[i + 1] === "&"))) lineStart = true;
    else if (!/\s/.test(ch)) lineStart = false;
    push(ch, /\s/.test(ch) ? "plain" : "punct");
    i++;
  }
  return out;
}

const TOKEN_CLASS: Record<TokenType, string> = {
  keyword: "text-code-keyword",
  string: "text-code-string",
  number: "text-code-number",
  function: "text-code-function",
  type: "text-code-type",
  comment: "text-code-comment",
  punct: "text-code-punct",
  plain: "",
};

/** Highlighted code, no chrome. Use inside your own container. */
export function HighlightedCode({ code, language = "text" }: { code: string; language?: CodeLanguage }) {
  const tokens = React.useMemo(() => tokenize(code, language), [code, language]);
  return (
    <code>
      {tokens.map((t, i) =>
        t.type === "plain" ? t.text : (
          <span key={i} className={TOKEN_CLASS[t.type]}>{t.text}</span>
        ),
      )}
    </code>
  );
}

/** Code block with filename bar, syntax highlighting and copy button. */
export function CodeBlock({
  code,
  filename,
  language = "text",
  className,
}: {
  code: string;
  filename?: string;
  language?: CodeLanguage;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };
  return (
    <figure className={cn("nf-pixel bg-surface-2 text-foreground [--nf-drop:2px]", className)}>
      <figcaption className="flex items-center justify-between border-b-2 border-border px-3 py-1.5">
        <span className="font-label text-[0.625rem] uppercase text-subtle">{filename ?? language}</span>
        <button
          onClick={copy}
          className="px-1.5 py-0.5 font-label text-[0.625rem] uppercase text-muted hover:bg-sun hover:text-sun-foreground"
          aria-label="Copy code"
        >
          {copied ? "copied!" : "[copy]"}
        </button>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-label text-xs leading-relaxed">
        <HighlightedCode code={code} language={language} />
      </pre>
    </figure>
  );
}

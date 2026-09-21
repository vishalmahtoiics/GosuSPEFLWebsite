#!/usr/bin/env node
// i18n coverage audit for the Hindi translation layer.
//
// Two jobs:
//   1. CODE KEYS  — every `t("…")` / `tr("…")` call in the app. These are
//      explicit translation points; any one missing from src/i18n/hi.ts is a
//      hard gap (this script exits non-zero so a pre-commit / CI hook can gate
//      on it).
//   2. CONTENT KEYS — prose string literals in the src/*Content.ts data files,
//      which are translated at render time by useLocalized(). Missing entries
//      here are reported as advisory candidates (they degrade gracefully to
//      English), and do NOT fail the run.
//
// Usage:  node scripts/i18n-audit.mjs
// Keeping the Hindi site complete when copy changes = run this, translate what
// it lists, add the pairs to src/i18n/hi.ts, re-run until CODE gaps are 0.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const DICT_FILE = join(SRC, "i18n", "hi.ts");

// Content data modules whose prose is localized at runtime.
const CONTENT_FILES = [
  "content.ts",
  "valorantContent.ts",
  "bgmiContent.ts",
  "coachingContent.ts",
  "tournamentContent.ts",
  "legalContent.ts",
].map((f) => join(SRC, f));

// ── helpers ────────────────────────────────────────────────────────────────

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(name)) out.push(p);
  }
  return out;
}

// Grab the body of every DOUBLE-quoted literal in a chunk. Content data files
// are authored with double quotes; matching single quotes too would span across
// apostrophes ("you're" … "India's") and capture the code in between.
function quotedLiterals(src) {
  const out = [];
  const re = /"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(src))) out.push(unescape(m[1]));
  return out;
}

function unescape(s) {
  return s
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\n/g, "\n")
    .replace(/\\\\/g, "\\");
}

// Keys already present in the Hindi dictionary (the LHS of each `"key":` pair).
function dictKeys() {
  let src;
  try {
    src = readFileSync(DICT_FILE, "utf8");
  } catch {
    return new Set();
  }
  const keys = new Set();
  const re = /^\s*"((?:[^"\\]|\\.)*)"\s*:/gm;
  let m;
  while ((m = re.exec(src))) keys.add(unescape(m[1]));
  return keys;
}

// Every t("…") / tr("…") argument literal across the app.
function codeKeys(files) {
  const keys = new Map(); // key -> [files]
  const re = /\b(?:tr|t)\(\s*"((?:[^"\\]|\\.)*)"/g;
  for (const f of files) {
    const src = readFileSync(f, "utf8");
    let m;
    while ((m = re.exec(src))) {
      const k = unescape(m[1]);
      if (!keys.has(k)) keys.set(k, []);
      keys.get(k).push(relative(ROOT, f));
    }
  }
  return keys;
}

// Heuristic: does this content literal look like translatable prose (vs. a
// path, colour, css value, code, or number)?
const CSS_WORDS = new Set([
  "center", "left", "right", "top", "bottom", "cover", "contain", "none",
  "auto", "center 30%", "center 20%", "right center", "center center",
]);
function looksTranslatable(s) {
  const t = s.trim();
  if (t.length < 2) return false;
  if (!/[A-Za-z]/.test(t)) return false;         // must have latin letters
  if (/[ऀ-ॿ]/.test(t)) return false;    // already Devanagari (source Hindi)
  if (t.startsWith("/") || t.startsWith("#") || t.startsWith("http")) return false;
  if (/\.(png|jpg|jpeg|webp|mp4|svg|gif|css|ts|tsx|woff2?)$/i.test(t)) return false;
  if (/^#[0-9a-fA-F]{3,8}$/.test(t)) return false;      // hex colour
  if (CSS_WORDS.has(t.toLowerCase())) return false;
  if (/^[A-Za-z]+([-_][A-Za-z0-9]+)*$/.test(t) && t.length <= 3) return false; // short tokens/ids
  return true;
}

// Drop /* … */ blocks and whole-line // comments before scanning string
// literals in the content files.
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((l) => !l.trimStart().startsWith("//"))
    .join("\n");
}

function contentKeys(files) {
  const keys = new Set();
  for (const f of files) {
    for (const lit of quotedLiterals(stripComments(readFileSync(f, "utf8")))) {
      if (looksTranslatable(lit)) keys.add(lit);
    }
  }
  return keys;
}

// ── run ──────────────────────────────────────────────────────────────────

const dict = dictKeys();
const code = codeKeys(walk(SRC));
const content = contentKeys(CONTENT_FILES);

const missingCode = [...code.keys()].filter((k) => !dict.has(k)).sort();
const missingContent = [...content].filter((k) => !dict.has(k)).sort();

const line = "─".repeat(64);
console.log(line);
console.log(`i18n audit · dictionary has ${dict.size} entries`);
console.log(line);

console.log(`\nCODE keys — t()/tr() calls: ${code.size} total, ${missingCode.length} MISSING`);
for (const k of missingCode) {
  console.log(`  ✗ ${JSON.stringify(k)}   (${[...new Set(code.get(k))].join(", ")})`);
}

console.log(`\nCONTENT keys — *Content.ts prose: ${content.size} candidates, ${missingContent.length} missing`);
for (const k of missingContent) console.log(`  · ${JSON.stringify(k)}`);

console.log(`\n${line}`);
if (missingCode.length) {
  console.log(`FAIL: ${missingCode.length} code translation key(s) missing from src/i18n/hi.ts`);
  process.exit(1);
}
console.log(
  missingContent.length
    ? `OK on code keys. ${missingContent.length} content string(s) still English (advisory).`
    : `All code and content strings are covered. ✓`
);

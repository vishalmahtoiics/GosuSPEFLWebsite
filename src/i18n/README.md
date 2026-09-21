# i18n — Hindi / English

The site ships a Hindi (हिंदी) translation with an `EN / हिंदी` toggle. Default
is English (or Hindi if the browser's primary language is Hindi on first visit);
the choice is remembered in `localStorage`.

## How it works

- **`hi.ts`** — the dictionary, `Record<string, string>` keyed by the **exact
  English source string**. `t(s)` returns `hi[s] ?? s`, so any string not in the
  dictionary just renders in English. Only real prose is keyed; paths, hex
  colours, `₹` amounts, and brand/person names are deliberately absent.
- **`useLocalized(module)`** — deep-clones a content module and translates its
  string leaves. Pages do `import * as C from "../content"` then
  `const { ... } = useLocalized(C)` — no JSX changes needed.
- **`t()` / `tr()`** — wraps hardcoded JSX chrome (nav labels, buttons, form
  fields). `tr` is just `t` aliased where a `.map()` callback already binds `t`.
- **`<LangToggle />`** — in each page nav; `<LangToggle floating />` on pages
  with no nav (checkout return, legal, 404).
- Animated pages carry `key={lang}` so GSAP re-initialises on switch.

## Adding or changing copy

Whenever you touch user-facing text:

```
node scripts/i18n-audit.mjs
```

- **CODE keys** (every `t()`/`tr()` call) must exist in `hi.ts` — the script
  exits non-zero if any are missing, so it's safe to gate CI/pre-commit on it.
- **CONTENT keys** (prose in `src/*Content.ts`) are advisory — missing ones fall
  back to English.

Add the English→Hindi pairs it lists to `hi.ts`, re-run until clean.

Kept in English on purpose: brand/product names (Gosu Academy, SPEFL-SC, Bharat
Esports, Valorant, BGMI), person names, ranks, and the `aria-hidden` certificate
specimen.

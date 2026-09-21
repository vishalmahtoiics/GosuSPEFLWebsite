// Deep-localize a content value against a translate function.
//
// Walks any string / array / plain-object shape and replaces string *leaves*
// with their translation. The translate fn (`t`) returns the input unchanged
// when there's no dictionary entry, so anything that isn't real prose — image
// paths, hex colours, slugs, enum-like values, numbers — passes straight
// through untouched. That's the whole safety model: only strings we've put in
// the Hindi dictionary ever change; everything else is identity.
//
// New copy added to the content files therefore keeps working with zero edits
// here: it simply renders in English until someone adds a Hindi entry (see
// scripts/i18n-audit.mjs, which lists what's missing).

export type Translate = (s: string) => string;

export function localize<T>(value: T, t: Translate): T {
  if (typeof value === "string") {
    return t(value) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((v) => localize(v, t)) as unknown as T;
  }
  // Plain objects and ES module namespace objects. We read own enumerable
  // string keys and build a fresh plain object, so read-only module namespaces
  // are handled fine (we never mutate the source).
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>)) {
      out[key] = localize((value as Record<string, unknown>)[key], t);
    }
    return out as T;
  }
  // numbers, booleans, null, undefined, functions — identity
  return value;
}

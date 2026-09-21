import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { hi } from "./hi";
import { localize, type Translate } from "./localize";

export type Lang = "en" | "hi";

const STORAGE_KEY = "gosu-lang";

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** translate a single English string (falls back to the input) */
  t: Translate;
}

const I18nContext = createContext<I18nValue | null>(null);

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "hi" || saved === "en") return saved;
  } catch {
    /* storage blocked — fall through */
  }
  // First visit: honour a Hindi browser preference, otherwise English.
  const nav = window.navigator?.language?.toLowerCase() ?? "";
  if (nav.startsWith("hi")) return "hi";
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((l) => (l === "en" ? "hi" : "en")),
    []
  );

  // `t` only changes identity when the language changes, which is what keeps
  // useLocalized()'s memo from recomputing on every render.
  const t = useCallback<Translate>(
    (s) => (lang === "hi" ? hi[s] ?? s : s),
    [lang]
  );

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, toggle, t }),
    [lang, setLang, toggle, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

/** Convenience: just the translate function. */
export function useT(): Translate {
  return useI18n().t;
}

/**
 * Deep-localize a content object / module namespace against the current
 * language. Memoised on the namespace + language so identities stay stable
 * between renders at the same language.
 */
export function useLocalized<T>(value: T): T {
  const { t } = useI18n();
  return useMemo(() => localize(value, t), [value, t]);
}

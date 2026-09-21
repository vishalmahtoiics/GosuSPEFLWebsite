import { useI18n } from "./I18nContext";
import "./langToggle.css";

interface Props {
  /** fixed-position variant for pages without a nav bar to host it */
  floating?: boolean;
  className?: string;
}

/**
 * Language switch: a two-segment EN / हिंदी control. Lives in each page's nav;
 * the `floating` variant pins itself to the corner on pages that have no nav
 * (checkout return, legal, 404).
 */
export default function LangToggle({ floating = false, className = "" }: Props) {
  const { lang, setLang } = useI18n();
  return (
    <div
      className={`i18n-toggle${floating ? " i18n-toggle--floating" : ""}${
        className ? " " + className : ""
      }`}
      role="group"
      aria-label="Language / भाषा चुनें"
    >
      <button
        type="button"
        className={`i18n-toggle__opt${lang === "en" ? " is-active" : ""}`}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <span className="i18n-toggle__sep" aria-hidden>
        /
      </span>
      <button
        type="button"
        lang="hi"
        className={`i18n-toggle__opt${lang === "hi" ? " is-active" : ""}`}
        aria-pressed={lang === "hi"}
        onClick={() => setLang("hi")}
      >
        हिंदी
      </button>
    </div>
  );
}

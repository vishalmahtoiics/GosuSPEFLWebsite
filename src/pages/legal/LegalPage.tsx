import { Link } from "react-router-dom";
import { LEGAL_DOCS, SUPPORT_EMAIL } from "../../legalContent";
import { useT, useLocalized, LangToggle } from "../../i18n";
import "./legal.css";

export default function LegalPage({ slug }: { slug: string }) {
  const t = useT();
  const doc = useLocalized(LEGAL_DOCS.find((d) => d.slug === slug)!);
  return (
    <main className="lg">
      <LangToggle floating />
      <div className="lg-inner">
        <Link className="lg-back" to="/">← Gosu Academy</Link>
        <p className="lg-kicker">{t("Gosu Academy · India")}</p>
        <h1>{doc.title}</h1>
        <p className="lg-updated">{t("Last updated")} {doc.updated}</p>
        {doc.sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </section>
        ))}
        <p className="lg-mail">
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </p>
        <nav className="lg-nav">
          {LEGAL_DOCS.filter((d) => d.slug !== slug).map((d) => (
            <Link key={d.slug} to={`/${d.slug}`}>{t(d.title)}</Link>
          ))}
        </nav>
      </div>
    </main>
  );
}

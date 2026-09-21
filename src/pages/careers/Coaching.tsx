import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Logo from "../../components/Logo";
import Reticle from "../../components/fx/Reticle";
import ClickSpark from "../../components/fx/ClickSpark";
import Magnet from "../../components/fx/Magnet";
import SpotlightCard from "../../components/fx/SpotlightCard";
import TiltCard from "../../components/fx/TiltCard";
import ScrambleText from "../../components/fx/ScrambleText";
import Certificate from "../../components/Certificate";
import "../../components/fx/fx.css";
import * as CC from "../../coachingContent";
import { useI18n, useLocalized, LangToggle } from "../../i18n";
import "../../pages/valorant/shared.css";
import "../../pages/valorant/a.css";
import "./careers.css";
import "./coaching.css";

gsap.registerPlugin(ScrollTrigger);

export default function Coaching() {
  // key on language so GSAP re-inits cleanly against the translated DOM
  const { lang } = useI18n();
  return <CoachingInner key={lang} />;
}

function CoachingInner() {
  const { t: tr } = useI18n();
  const {
    cHero,
    cCred,
    cPain,
    cCurriculum,
    cCert,
    cHow,
    cMentor,
    cProof,
    cPrice,
    cLadder,
    cParent,
    cFaq,
    cFinal,
    cDisclaimer,
  } = useLocalized(CC);
  const root = useRef<HTMLDivElement>(null);
  // click-to-reveal state (same interaction set as the BGMI page)
  const [painOpen, setPainOpen] = useState(0); // expanded "why you're stuck" card (-1 = none)
  const [compActive, setCompActive] = useState(0); // selected competency
  const [faqActive, setFaqActive] = useState(0); // selected FAQ question
  const activeComp = cCurriculum.competencies[compActive];

  // Lenis smooth scroll wired to ScrollTrigger (same integration as the homepage)
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // hero intro
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(".va-hero__eyebrow", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
        .to(
          ".va-hero__line",
          { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.12 },
          "-=0.35"
        )
        .to(
          ".va-hero__sub, .va-hero__cta, .va-hero__lockup",
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 },
          "-=0.6"
        );

      // hero parallax on scroll out
      gsap.to(".va-hero__copy", {
        yPercent: -14,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: ".va-hero", start: "top top", end: "bottom top", scrub: true },
      });

      // generic reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 56,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, {
          y: 44,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.09,
          // strip the transform once revealed so a parked/stuck tween can
          // never leave a row translated over the content below it
          clearProps: "transform",
          scrollTrigger: { trigger: group, start: "top 82%" },
        });
      });

      // full-bleed band parallax
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // curriculum rail draw
      gsap.to(".va-curr__fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".va-curr__phases",
          start: "top 70%",
          end: "bottom 80%",
          scrub: true,
        },
      });

      // watermark drift
      gsap.utils.toArray<HTMLElement>(".va-mark").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: 6 },
          {
            xPercent: -6,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="vpage va coaching" ref={root}>
      <Reticle />
      <ClickSpark sparkColor="#ffb238" sparkCount={11} sparkRadius={26} />

      {/* ── NAV ── */}
      <header className="va-nav">
        <Link to="/" className="va-nav__brand">
          <Logo size={26} />
        </Link>
        <nav className="va-nav__links">
          <a href="#learn">{tr("Curriculum")}</a>
          <a href="#cert">{tr("Certificate")}</a>
          <a href="#how">{tr("How it works")}</a>
          <a href="#price">{tr("Pricing")}</a>
        </nav>
        <div className="va-nav__end">
          <LangToggle />
          <Magnet padding={44} strength={4}>
            <a className="vbtn vbtn--red vbtn--sm" href="#price">
              {tr("Enroll")}
            </a>
          </Magnet>
        </div>
      </header>

      {/* ── A. HERO ── */}
      <section className="va-hero">
        <div className="va-hero__bg" aria-hidden>
          <img src="/coaching/hero.webp" alt="" />
        </div>
        <div className="va-hero__glow" aria-hidden />
        <div className="va-hero__scan" aria-hidden />
        <div className="va-hero__copy">
          <p className="va-hero__eyebrow">
            <span className="va-hero__ping" /> {cHero.eyebrow}
          </p>
          <h1 className="va-hero__title">
            <span className="va-hero__line">{cHero.headlineTop}</span>
            <span className="va-hero__line va-hero__line--gold">{cHero.headlineGold}</span>
          </h1>
          <p className="va-hero__sub">{cHero.sub}</p>
          <div className="va-hero__cta">
            <Magnet padding={70} strength={3}>
              <a className="vbtn vbtn--red vbtn--lg" href="#price">
                {cHero.ctaPrimary}
              </a>
            </Magnet>
            <Magnet padding={60} strength={4}>
              <a className="vbtn vbtn--ghost vbtn--lg" href="/contact">
                {cHero.ctaSecondary}
              </a>
            </Magnet>
          </div>
          <div className="va-hero__lockup">
            <span className="vlockup">
              {tr("Certified by")} <b>{cHero.lockup[0]}</b> <i>×</i> <b>{cHero.lockup[1]}</b> <i>×</i>{" "}
              <b>{cHero.lockup[2]}</b>
            </span>
          </div>
        </div>
      </section>

      {/* ── B. CREDIBILITY STRIP ── */}
      <section className="va-cred" data-stagger>
        {cCred.map((c) => (
          <div className="va-cred__item" key={c.l}>
            <span className="va-cred__n">{c.n}</span>
            <span className="va-cred__l">{c.l}</span>
          </div>
        ))}
      </section>

      {/* ── C. WHY YOU'RE STUCK ── */}
      <section className="va-pain">
        <span className="va-mark" aria-hidden>
          RAW
        </span>
        <div className="va-pain__grid">
          <div className="va-pain__head" data-reveal>
            <p className="vk vk--red">
              <ScrambleText text={cPain.kicker} />
            </p>
            <h2 className="va-h2">{cPain.title}</h2>
            <p className="va-lead">{cPain.lead}</p>
          </div>
          <div className="va-pain__list" data-stagger>
            {cPain.items.map((p, i) => {
              const open = painOpen === i;
              return (
                <button
                  type="button"
                  className={`va-pain__row ${open ? "is-open" : ""}`}
                  key={p.title}
                  onClick={() => setPainOpen(open ? -1 : i)}
                  aria-expanded={open}
                >
                  <span className="va-pain__idx">{String(i + 1).padStart(2, "0")}</span>
                  <div className="va-pain__main">
                    <div className="va-pain__rowhead">
                      <h3>{p.title}</h3>
                      <span className="va-pain__toggle" aria-hidden />
                    </div>
                    <p className="va-pain__body">{p.body}</p>
                    <div className="va-pain__fix">
                      <div className="va-pain__fixinner">
                        <span className="va-pain__fixtag">{tr("How we fix it")}</span>
                        <p>{p.fix}</p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── D. CURRICULUM (vertical cinematic timeline) ── */}
      <section className="va-curr" id="learn">
        <div className="va-curr__head" data-reveal>
          <p className="vk">
            <ScrambleText text={cCurriculum.kicker} />
          </p>
          <h2 className="va-h2">{cCurriculum.title}</h2>
          <p className="va-lead">{cCurriculum.lead}</p>
        </div>

        <div className="va-curr__phases">
          <span className="va-curr__rail" aria-hidden>
            <span className="va-curr__fill" />
          </span>
          {cCurriculum.phases.map((ph, i) => (
            <article
              className={`va-phase ${i === cCurriculum.phases.length - 1 ? "is-final" : ""}`}
              key={ph.title}
              style={{ ["--accent" as string]: ph.accent }}
              data-reveal
            >
              <div className="va-phase__media">
                <div className="va-phase__panel">
                  <img className="va-phase__map" src={ph.art} alt="" aria-hidden />
                  <span className="va-phase__bignum" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="va-phase__body">
                <span className="va-phase__node" aria-hidden />
                <span className="va-phase__px">{ph.px}</span>
                <h3>{ph.title}</h3>
                <ul>
                  {ph.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="va-radar" data-reveal>
          <span className="va-radar__tag">{cCurriculum.radar.tag}</span>
          <p>{cCurriculum.radar.body}</p>
        </div>

        {/* the weekly coaching loop, as a strip of nodes */}
        <div className="crx-loop" data-reveal>
          <span className="crx-loop__label">{cCurriculum.loop.label}</span>
          <div className="crx-loop__track">
            {cCurriculum.loop.steps.map((s, i) => (
              <span className="crx-loop__step" key={s}>
                <i>{String(i + 1).padStart(2, "0")}</i>
                {s}
              </span>
            ))}
            <span className="crx-loop__again" aria-hidden>
              ↻
            </span>
          </div>
        </div>

        <div className="va-comp" data-reveal>
          <div className="va-comp__lead">
            <span>{cCurriculum.competenciesLead}</span>
            <span className="va-comp__hint">{tr("Click a competency")}</span>
          </div>
          <div className="va-comp__grid" data-stagger>
            {cCurriculum.competencies.map((it, i) => (
              <button
                type="button"
                className={`va-comp__chip ${it.c === "★" ? "is-star" : ""} ${
                  compActive === i ? "is-active" : ""
                }`}
                key={it.label}
                onClick={() => setCompActive(i)}
                aria-pressed={compActive === i}
              >
                <span className="va-comp__c">{it.c}</span>
                <span>{it.label}</span>
              </button>
            ))}
          </div>
          <div className={`va-comp__detail ${activeComp.c === "★" ? "is-star" : ""}`} key={compActive}>
            <span className="va-comp__detailc">{activeComp.c}</span>
            <div>
              <strong>{activeComp.label}</strong>
              <p>{activeComp.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── E. CERTIFIED OUTCOME ── */}
      <section className="va-cert" id="cert">
        <div className="va-cert__text" data-reveal>
          <p className="vk">
            <ScrambleText text={cCert.kicker} />
          </p>
          <h2 className="va-h2">{cCert.title}</h2>
          <p className="va-lead">{cCert.body1}</p>
          <p className="va-lead">{cCert.body2}</p>
        </div>
        <TiltCard className="va-cert__tilt" amplitude={11}>
          <Certificate doc={cCert.doc} />
        </TiltCard>
      </section>

      {/* ── F. HOW IT WORKS (facts over a graphic band) ── */}
      <section className="va-how" id="how">
        <img className="va-how__bg" data-parallax src="/coaching/floor.webp" alt="" />
        <span className="va-how__shade" aria-hidden />
        <div className="va-how__inner">
          <div className="va-how__head" data-reveal>
            <p className="vk">{cHow.kicker}</p>
            <h2 className="va-h2">{cHow.title}</h2>
          </div>
          <div className="va-how__facts" data-stagger>
            {cHow.facts.map((f) => (
              <div className="va-fact" key={f.l}>
                <span className="va-fact__n">{f.n}</span>
                <span className="va-fact__l">{f.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── G. THE MENTOR (large feature) ── */}
      <section className="va-coach">
        <div className="va-coach__frame" data-reveal>
          <img className="va-coach__art" src={cMentor.portrait} alt={cMentor.name} />
          <div className="va-coach__plate">
            <h4>{cMentor.name}</h4>
            <span className="va-coach__role">{cMentor.role}</span>
          </div>
        </div>
        <div className="va-coach__text" data-reveal>
          <p className="vk">
            <ScrambleText text={cMentor.kicker} />
          </p>
          <h2 className="va-h2">{cMentor.title}</h2>
          <p className="va-lead">{cMentor.body}</p>
          <p className="va-coach__note">{cMentor.note}</p>
        </div>
      </section>

      {/* ── H. PROOF ── */}
      <section className="va-proof">
        <div className="va-proof__head" data-reveal>
          <p className="vk vk--red">
            <ScrambleText text={cProof.kicker} />
          </p>
          <h2 className="va-h2">{cProof.title}</h2>
        </div>
        <div className="va-proof__grid" data-stagger>
          {cProof.stories.map((s) => (
            <article className="va-story" key={s.badge}>
              <div className="va-story__photo">
                <img src={s.art} alt="" aria-hidden />
                <span className="va-story__scrim" aria-hidden />
                <span className="va-story__badge">{s.badge}</span>
              </div>
              <div className="va-story__body">
                <p className="va-story__quote">{s.quote}</p>
                <figcaption>
                  <strong>{s.name}</strong>
                  <span>{s.meta}</span>
                </figcaption>
              </div>
            </article>
          ))}
        </div>
        <p className="va-note">{cProof.note}</p>
      </section>

      {/* ── I. PRICING (single dramatic card) ── */}
      <section className="va-price" id="price">
        <span className="va-mark va-mark--gold" aria-hidden>
          CERTIFIED
        </span>
        <div className="va-price__inner">
          <div className="va-price__text" data-reveal>
            <p className="vk">
              <ScrambleText text={cPrice.kicker} />
            </p>
            <h2 className="va-h2">{cPrice.title}</h2>
            <p className="va-lead">{cPrice.body}</p>
            <div className="va-price__cta">
              <Magnet padding={70} strength={3}>
                <a className="vbtn vbtn--red vbtn--lg" href="/contact">
                  {cPrice.ctaPrimary}
                </a>
              </Magnet>
              <Magnet padding={60} strength={4}>
                <a className="vbtn vbtn--ghost vbtn--lg" href="/contact">
                  {cPrice.ctaSecondary}
                </a>
              </Magnet>
            </div>
          </div>
          <TiltCard className="va-price__cardtilt" amplitude={7}>
            <div className="va-price__card">
              <span className="va-price__cardglow" aria-hidden />
              <h4>{cPrice.card.title}</h4>
              <div className="va-price__amt">
                {cPrice.card.amount}
                <small>{cPrice.card.unit}</small>
              </div>
              <div className="va-price__emi">{cPrice.card.emi}</div>
              <ul>
                {cPrice.card.includes.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </TiltCard>
        </div>
        <div className="crx-ladder" data-reveal>
          <span className="crx-ladder__tag">{cLadder.tag}</span>
          <div className="crx-ladder__main">
            <div className="crx-ladder__rungs">
              {cLadder.rungs.map((r, i) => (
                <span key={r} style={{ display: "contents" }}>
                  {i > 0 && (
                    <span className="crx-ladder__sep" aria-hidden>
                      →
                    </span>
                  )}
                  <span className={`crx-ladder__rung ${i === 0 ? "is-here" : ""}`}>{r}</span>
                </span>
              ))}
            </div>
            <p className="crx-ladder__line">{cLadder.line}</p>
          </div>
        </div>
      </section>

      {/* ── J. PARENT MINI-BRIDGE ── */}
      <section className="va-parent">
        <div className="va-parent__text" data-reveal>
          <p className="vk vk--cobalt">
            <ScrambleText text={cParent.kicker} />
          </p>
          <h2 className="va-h2">{cParent.title}</h2>
          <p className="va-lead">{cParent.body}</p>
          <ul className="va-parent__list">
            {cParent.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Magnet padding={70} strength={3}>
            <a className="vbtn vbtn--gold" href="/contact">
              {cParent.cta}
            </a>
          </Magnet>
        </div>
        <SpotlightCard className="va-parent__card" spotColor="rgba(51,79,180,0.22)">
          <div className="va-parent__seal">{cParent.card.seal}</div>
          <h4>{cParent.card.title}</h4>
          <p>{cParent.card.line}</p>
          <span className="va-parent__fine">{cParent.card.fine}</span>
        </SpotlightCard>
      </section>

      {/* ── K. FAQ ── */}
      <section className="va-faq">
        <div className="va-faq__head" data-reveal>
          <p className="vk">
            <ScrambleText text={tr("Questions")} />
          </p>
          <h2 className="va-h2">{tr("Coaching, answered.")}</h2>
        </div>
        <div className="va-faq__module" data-reveal>
          <div className="va-faq__list" role="tablist" aria-label={tr("Frequently asked questions")}>
            {cFaq.map((f, i) => (
              <button
                type="button"
                role="tab"
                aria-selected={faqActive === i}
                className={`va-faq__q ${faqActive === i ? "is-active" : ""}`}
                key={f.q}
                onClick={() => setFaqActive(i)}
              >
                <span className="va-faq__qn">{String(i + 1).padStart(2, "0")}</span>
                <span className="va-faq__qt">{f.q}</span>
                <span className="va-faq__qarrow" aria-hidden />
              </button>
            ))}
          </div>
          <div className="va-faq__answer" key={faqActive}>
            <span className="va-faq__an">
              {String(faqActive + 1).padStart(2, "0")} / {String(cFaq.length).padStart(2, "0")}
            </span>
            <p className="va-faq__aq">{cFaq[faqActive].q}</p>
            <p className="va-faq__aa">{cFaq[faqActive].a}</p>
          </div>
        </div>
      </section>

      {/* ── L. FINAL CTA ── */}
      <section className="va-final">
        <img className="va-final__bg" data-parallax src={cFinal.bg} alt="" />
        <span className="va-final__shade" aria-hidden />
        <span className="va-mark va-mark--big" aria-hidden>
          COACH
        </span>
        <div className="va-final__inner" data-reveal>
          <p className="vk vk--red">
            <ScrambleText text={cFinal.kicker} />
          </p>
          <h2 className="va-final__title">{cFinal.title}</h2>
          <p className="va-lead">{cFinal.body}</p>
          <div className="va-final__cta">
            <Magnet padding={80} strength={2.6}>
              <a className="vbtn vbtn--red vbtn--lg" href="/contact">
                {cFinal.ctaPrimary}
              </a>
            </Magnet>
            <Magnet padding={70} strength={3.4}>
              <a className="vbtn vbtn--ghost vbtn--lg" href="/contact">
                {cFinal.ctaSecondary}
              </a>
            </Magnet>
          </div>
          <p className="va-final__note">{cFinal.note}</p>
        </div>
      </section>

      <footer className="vfoot">
        <span className="vfoot__brand">
          <Logo size={22} showWord={false} /> GOSU INDIA
        </span>
        <span className="vfoot__disclaimer">{cDisclaimer}</span>
      </footer>
    </div>
  );
}

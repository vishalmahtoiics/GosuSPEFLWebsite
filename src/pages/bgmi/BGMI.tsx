import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Logo from "../../components/Logo";
import GosuSpeflLockup from "../../components/GosuSpeflLockup";
import SocialLinks from "../../components/SocialLinks";
import Reticle from "../../components/fx/Reticle";
import ClickSpark from "../../components/fx/ClickSpark";
import Magnet from "../../components/fx/Magnet";
import SpotlightCard from "../../components/fx/SpotlightCard";
import TiltCard from "../../components/fx/TiltCard";
import ScrambleText from "../../components/fx/ScrambleText";
import Certificate from "../../components/Certificate";
import "../../components/fx/fx.css";
import { CheckoutProvider, useCheckoutPanel } from "../../checkout/CheckoutContext";
import { DISCORD_URL, INSTAGRAM_URL } from "../../lib/links";
import * as BC from "../../bgmiContent";
import { useI18n, useLocalized, LangToggle } from "../../i18n";
import "../../pages/valorant/shared.css";
import "../../pages/valorant/a.css";
import "./bgmi.css";

gsap.registerPlugin(ScrollTrigger);

export default function BGMI() {
  const { lang } = useI18n();
  return (
    <CheckoutProvider>
      <BGMIContent key={lang} />
    </CheckoutProvider>
  );
}

function BGMIContent() {
  const root = useRef<HTMLDivElement>(null);
  const { open } = useCheckoutPanel();
  const { t: tr } = useI18n();
  const {
    bHero,
    bCred,
    bPain,
    bCurriculum,
    bCert,
    bHow,
    bCoach,
    bProof,
    bPrice,
    bParent,
    bFaq,
    bFinal,
    bDisclaimer,
  } = useLocalized(BC);
  // Click-to-reveal controls.
  const [painOpen, setPainOpen] = useState(0); // which "why you're stuck" card is expanded (-1 = none)
  const [compActive, setCompActive] = useState(0); // selected competency
  const [faqActive, setFaqActive] = useState(0); // selected FAQ question
  const activeComp = bCurriculum.competencies[compActive];

  // Lenis smooth scroll wired to ScrollTrigger (desktop fine-pointer only to ensure buttery smooth mobile)
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1025px) and (pointer: fine)").matches) {
      return;
    }
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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
        )
        .to(".va-hero__bleed", { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }, 0.2);

      // hero parallax on scroll out
      gsap.to(".va-hero__copy", {
        yPercent: -14,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: ".va-hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".va-hero__bleed", {
        yPercent: 10,
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
    <div className="vpage va bgmi" ref={root}>
      <Reticle />
      <ClickSpark sparkColor="#ff8a2a" sparkCount={11} sparkRadius={26} />

      {/* ── NAV ── */}
      <header className="va-nav">
        <Link to="/" className="va-nav__brand" style={{ textDecoration: "none" }}>
          <GosuSpeflLockup size={26} theme="pill" showLink={false} />
        </Link>
        <nav className="va-nav__links">
          <a href="#learn">{tr("Curriculum")}</a>
          <a href="#cert">{tr("Certificate")}</a>
          <a href="#how">{tr("How it works")}</a>
          <a href="#price">{tr("Pricing")}</a>
        </nav>
        <div className="va-nav__end">
          <SocialLinks variant="nav" />
          <LangToggle />
          <Magnet padding={44} strength={4}>
            <button
              type="button"
              className="vbtn vbtn--red vbtn--sm"
              onClick={() => open("bgmi")}
            >
              Join The Waitlist
            </button>
          </Magnet>
        </div>
      </header>

      {/* ── A. HERO ── */}
      <section className="va-hero">
        <div className="va-hero__bg" aria-hidden>
          <img src="/bgmi/art/squad.webp" alt="" />
        </div>
        <div className="va-hero__glow" aria-hidden />
        <div className="va-hero__scan" aria-hidden />
        <div className="va-hero__bleed" aria-hidden>
          <img
            className="va-hero__bleed-img"
            src="/games/bgmi.jpg"
            alt=""
          />
        </div>
        <div className="va-hero__copy">
          <p className="va-hero__eyebrow">
            <span className="va-hero__ping" /> {bHero.eyebrow}
          </p>
          <h1 className="va-hero__title">
            <span className="va-hero__line">{bHero.headlineTop}</span>
            <span className="va-hero__line va-hero__line--gold">{bHero.headlineGold}</span>
          </h1>
          <p className="va-hero__sub">{bHero.sub}</p>
          <div className="va-hero__cta">
            <Magnet padding={70} strength={3}>
              <button
                type="button"
                className="vbtn vbtn--red vbtn--lg"
                onClick={() => open("bgmi")}
              >
                {bHero.ctaPrimary}
              </button>
            </Magnet>
            <Magnet padding={60} strength={4}>
              <Link className="vbtn vbtn--ghost vbtn--lg" to="/#titles">
                {bHero.ctaSecondary}
              </Link>
            </Magnet>
          </div>
          <div className="va-hero__lockup">
            <span className="vlockup">
              {tr("Certified by")} <b>SPEFL-SC (Nationally Accredited)</b> <i>×</i> <b>Bharat Esports Federation</b> <i>×</i>{" "}
              <b>Gosu Academy</b>
            </span>
          </div>
        </div>
      </section>

      {/* ── B. CREDIBILITY STRIP ── */}
      <section className="va-cred" data-stagger>
        {bCred.map((c) => (
          <div className="va-cred__item" key={c.l}>
            <span className="va-cred__n">{c.n}</span>
            <span className="va-cred__l">{c.l}</span>
          </div>
        ))}
      </section>

      {/* ── C. WHY YOU'RE STUCK ── */}
      <section className="va-pain">
        <span className="va-mark" aria-hidden>
          GRIND
        </span>
        <div className="va-pain__grid">
          <div className="va-pain__head" data-reveal>
            <p className="vk vk--red">
              <ScrambleText text={bPain.kicker} />
            </p>
            <h2 className="va-h2">{bPain.title}</h2>
            <p className="va-lead">{bPain.lead}</p>
          </div>
          <div className="va-pain__list" data-stagger>
            {bPain.items.map((p, i) => {
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
            <ScrambleText text={bCurriculum.kicker} />
          </p>
          <h2 className="va-h2">{bCurriculum.title}</h2>
          <p className="va-lead">{bCurriculum.lead}</p>
        </div>

        <div className="va-curr__phases">
          <span className="va-curr__rail" aria-hidden>
            <span className="va-curr__fill" />
          </span>
          {bCurriculum.phases.map((ph, i) => (
            <article
              className={`va-phase ${i === bCurriculum.phases.length - 1 ? "is-final" : ""}`}
              key={ph.title}
              style={{ ["--accent" as string]: ph.accent }}
              data-reveal
            >
              <div className="va-phase__media">
                <div className="va-phase__panel">
                  <img className="va-phase__map" src={ph.map} alt="" aria-hidden />
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
          <span className="va-radar__tag">{bCurriculum.radar.tag}</span>
          <p>{bCurriculum.radar.body}</p>
        </div>

        <div className="va-comp" data-reveal>
          <div className="va-comp__lead">
            <span>{bCurriculum.competenciesLead}</span>
            <span className="va-comp__hint">{tr("Click a competency")}</span>
          </div>
          <div className="va-comp__grid" data-stagger>
            {bCurriculum.competencies.map((it, i) => (
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
            <ScrambleText text={bCert.kicker} />
          </p>
          <h2 className="va-h2">{bCert.title}</h2>
          <p className="va-lead">{bCert.body1}</p>
          <p className="va-lead">{bCert.body2}</p>
        </div>
        <TiltCard className="va-cert__tilt" amplitude={11}>
          <Certificate doc={bCert.doc} />
        </TiltCard>
      </section>

      {/* ── F. HOW IT WORKS (facts over a graphic band) ── */}
      <section className="va-how" id="how">
        <img className="va-how__bg" data-parallax src="/bgmi/art/forest.webp" alt="" />
        <span className="va-how__shade" aria-hidden />
        <div className="va-how__inner">
          <div className="va-how__head" data-reveal>
            <p className="vk">{bHow.kicker}</p>
            <h2 className="va-h2">{bHow.title}</h2>
          </div>
          <div className="va-how__facts" data-stagger>
            {bHow.facts.map((f) => (
              <div className="va-fact" key={f.l}>
                <span className="va-fact__n">{f.n}</span>
                <span className="va-fact__l">{f.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── G. THE COACH (large feature) ── */}
      <section className="va-coach">
        <div className="va-coach__frame" data-reveal>
          <img className="va-coach__art" src={bCoach.portrait} alt="" aria-hidden />
          <span className="va-coach__soon">{tr("Photo coming")}</span>
          <div className="va-coach__plate">
            <h4>{bCoach.name}</h4>
            <span className="va-coach__role">{bCoach.role}</span>
          </div>
        </div>
        <div className="va-coach__text" data-reveal>
          <p className="vk">
            <ScrambleText text={bCoach.kicker} />
          </p>
          <h2 className="va-h2">{bCoach.title}</h2>
          <p className="va-lead">{bCoach.body}</p>
          <p className="va-coach__note">{bCoach.note}</p>
        </div>
      </section>

      {/* ── H. PROOF ── */}
      <section className="va-proof">
        <div className="va-proof__head" data-reveal>
          <p className="vk vk--red">
            <ScrambleText text={bProof.kicker} />
          </p>
          <h2 className="va-h2">{bProof.title}</h2>
        </div>
        <div className="va-proof__grid" data-stagger>
          {bProof.stories.map((s) => (
            <article className="va-story" key={s.badge}>
              <div className="va-story__photo">
                <img src={s.art} alt="" aria-hidden />
                <span className="va-story__scrim" aria-hidden />
                <span className="va-story__badge">{s.badge}</span>
              </div>
              <div className="va-story__body">
                <p className="va-story__quote">“{s.quote}”</p>
                <figcaption>
                  <strong>{s.name}</strong>
                  <span>{s.meta}</span>
                </figcaption>
              </div>
            </article>
          ))}
        </div>
        <p className="va-note">{bProof.note}</p>
      </section>

      {/* ── I. PRICING (single dramatic card) ── */}
      <section className="va-price" id="price">
        <span className="va-mark va-mark--gold" aria-hidden>
          CONQUEROR
        </span>
        <div className="va-price__inner">
          <div className="va-price__text" data-reveal>
            <p className="vk">
              <ScrambleText text={bPrice.kicker} />
            </p>
            <h2 className="va-h2">{bPrice.title}</h2>
            <p className="va-lead">{bPrice.body}</p>
            <div className="va-price__cta">
              <Magnet padding={70} strength={3}>
                <button
                  type="button"
                  className="vbtn vbtn--red vbtn--lg"
                  onClick={() => open("bgmi")}
                >
                  {bPrice.ctaPrimary}
                </button>
              </Magnet>
              <Magnet padding={60} strength={4}>
                <a className="vbtn vbtn--ghost vbtn--lg" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                  {bPrice.ctaSecondary}
                </a>
              </Magnet>
            </div>
          </div>
          <TiltCard className="va-price__cardtilt" amplitude={7}>
            <div className="va-price__card">
              <span className="va-price__cardglow" aria-hidden />
              <h4>{bPrice.card.title}</h4>
              <div className="va-price__amt">
                <div className="va-price__badge-row">
                  <span className="va-price__badge">{bPrice.card.discount}</span>
                </div>
                <div className="va-price__compare">
                  <del className="va-price__mrp">{bPrice.card.mrp}</del>
                  <div className="va-price__current">
                    {bPrice.card.amount}
                    <small>{bPrice.card.unit}</small>
                  </div>
                </div>
              </div>
              <div className="va-price__emi">{bPrice.card.emi}</div>
              <ul>
                {bPrice.card.includes.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </TiltCard>
        </div>
        <div className="bg-squad" data-reveal>
          <span className="bg-squad__tag">{bPrice.squad.tag}</span>
          <div className="bg-squad__main">
            <strong>{bPrice.squad.title}</strong>
            <p>{bPrice.squad.line}</p>
          </div>
          <div className="bg-squad__pricing">
            <del className="bg-squad__mrp">{bPrice.squad.mrp}</del>
            <span className="bg-squad__amt">
              {bPrice.squad.amount}
              <small>{bPrice.squad.unit}</small>
            </span>
          </div>
          <button
            type="button"
            className="vbtn vbtn--ghost vbtn--sm bg-squad__cta"
            onClick={() => open("bgmi-squad")}
          >
            {tr("Enroll squad")}
          </button>
        </div>
      </section>

      {/* ── J. PARENT MINI-BRIDGE ── */}
      <section className="va-parent">
        <div className="va-parent__bleed" aria-hidden>
          <img
            className="va-parent__bleed-img"
            src="/bgmi/art/squad.webp"
            alt=""
          />
          <div className="va-parent__bleed-overlay" />
          <div className="va-parent__floating-badge">
            <span className="va-parent__floating-seal">{bParent.card.seal}</span>
            <div className="va-parent__floating-info">
              <strong>{bParent.card.title}</strong>
              <small>{bParent.card.line}</small>
            </div>
          </div>
        </div>
        <div className="va-parent__text" data-reveal>
          <p className="vk va-parent__kicker">
            <ScrambleText text={bParent.kicker} />
          </p>
          <h2 className="va-h2">{bParent.title}</h2>
          <p className="va-lead">{bParent.body}</p>
          <ul className="va-parent__list">
            {bParent.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Magnet padding={70} strength={3}>
            <a className="vbtn vbtn--gold" href="/contact">
              {bParent.cta}
            </a>
          </Magnet>
        </div>
      </section>

      {/* ── K. FAQ ── */}
      <section className="va-faq">
        <div className="va-faq__head" data-reveal>
          <p className="vk">
            <ScrambleText text={tr("Questions")} />
          </p>
          <h2 className="va-h2">{tr("BGMI, answered.")}</h2>
        </div>
        <div className="va-faq__module" data-reveal>
          <div className="va-faq__list" role="tablist" aria-label={tr("Frequently asked questions")}>
            {bFaq.map((f, i) => (
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
              {String(faqActive + 1).padStart(2, "0")} / {String(bFaq.length).padStart(2, "0")}
            </span>
            <p className="va-faq__aq">{bFaq[faqActive].q}</p>
            <p className="va-faq__aa">{bFaq[faqActive].a}</p>
          </div>
        </div>
      </section>

      {/* ── L. FINAL CTA ── */}
      <section className="va-final">
        <img className="va-final__bg" data-parallax src={bFinal.bg} alt="" />
        <span className="va-final__shade" aria-hidden />
        <span className="va-mark va-mark--big" aria-hidden>
          WWCD
        </span>
        <div className="va-final__inner" data-reveal>
          <p className="vk vk--red">
            <ScrambleText text={bFinal.kicker} />
          </p>
          <h2 className="va-final__title">{bFinal.title}</h2>
          <p className="va-lead">{bFinal.body}</p>
          <div className="va-final__cta">
            <Magnet padding={80} strength={2.6}>
              <button
                type="button"
                className="vbtn vbtn--red vbtn--lg"
                onClick={() => open("bgmi")}
              >
                {bFinal.ctaPrimary}
              </button>
            </Magnet>
            <Magnet padding={70} strength={3.4}>
              <Link className="vbtn vbtn--ghost vbtn--lg" to="/#titles">
                {bFinal.ctaSecondary}
              </Link>
            </Magnet>
          </div>
          <p className="va-final__note">{bFinal.note}</p>
        </div>
      </section>

      <footer className="vfoot">
        <div className="vfoot__brand" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <GosuSpeflLockup size={22} theme="pill" />
          <span>Gosu x SPEFL · Bharat Esports</span>
        </div>
        <div style={{ marginBlock: "8px" }}>
          <SocialLinks variant="footer" />
        </div>
        <span className="vfoot__disclaimer">{bDisclaimer}</span>
        <nav className="vfoot__legal">
          <a href="/terms">{tr("Terms")}</a>
          <a href="/privacy">{tr("Privacy")}</a>
          <a href="/refunds">{tr("Refunds")}</a>
          <a href="/contact">{tr("Contact")}</a>
        </nav>
      </footer>
    </div>
  );
}

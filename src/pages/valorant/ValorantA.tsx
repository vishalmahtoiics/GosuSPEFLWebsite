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
import { CheckoutProvider, useCheckoutPanel } from "../../checkout/CheckoutContext";
import { DISCORD_URL } from "../../lib/links";
import * as VC from "../../valorantContent";
import { useI18n, useLocalized, LangToggle } from "../../i18n";
import "./shared.css";
import "./a.css";

gsap.registerPlugin(ScrollTrigger);

export default function ValorantA() {
  // key on language so GSAP re-inits cleanly against the translated DOM
  const { lang } = useI18n();
  return (
    <CheckoutProvider>
      <ValorantAContent key={lang} />
    </CheckoutProvider>
  );
}

function ValorantAContent() {
  const root = useRef<HTMLDivElement>(null);
  const { open } = useCheckoutPanel();
  const { t: tr } = useI18n();
  const {
    vHero,
    vCred,
    vPain,
    vCurriculum,
    vCert,
    vHow,
    vCoach,
    vRoster,
    vProof,
    vPrice,
    vParent,
    vFaq,
    vFinal,
    vDisclaimer,
  } = useLocalized(VC);
  // Click-to-reveal controls.
  const [painOpen, setPainOpen] = useState(0); // which "why you're stuck" card is expanded (-1 = none)
  const [compActive, setCompActive] = useState(0); // selected competency
  const [faqActive, setFaqActive] = useState(0); // selected FAQ question
  const activeComp = vCurriculum.competencies[compActive];

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
        )
        .to(".va-hero__agent", { opacity: 1, x: 0, duration: 1.3, ease: "power3.out" }, 0.2);

      // hero parallax on scroll out
      gsap.to(".va-hero__agent", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: ".va-hero", start: "top top", end: "bottom top", scrub: true },
      });
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
    <div className="vpage va" ref={root}>
      <Reticle />
      <ClickSpark sparkColor="#ff4655" sparkCount={11} sparkRadius={26} />

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
          <img src="/valorant/maps/bind-splash.webp" alt="" />
        </div>
        <div className="va-hero__glow" aria-hidden />
        <div className="va-hero__scan" aria-hidden />
        <img
          className="va-hero__agent"
          src="/valorant/agents/reyna-portrait.webp"
          alt=""
          aria-hidden
        />
        <div className="va-hero__copy">
          <p className="va-hero__eyebrow">
            <span className="va-hero__ping" /> {vHero.eyebrow}
          </p>
          <h1 className="va-hero__title">
            <span className="va-hero__line">{vHero.headlineTop}</span>
            <span className="va-hero__line va-hero__line--gold">{vHero.headlineGold}</span>
          </h1>
          <p className="va-hero__sub">{vHero.sub}</p>
          <div className="va-hero__cta">
            <Magnet padding={70} strength={3}>
              <a className="vbtn vbtn--red vbtn--lg" href="#price">
                {vHero.ctaPrimary}
              </a>
            </Magnet>
            <Magnet padding={60} strength={4}>
              <a className="vbtn vbtn--ghost vbtn--lg" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                {vHero.ctaSecondary}
              </a>
            </Magnet>
          </div>
          <div className="va-hero__lockup">
            <span className="vlockup">
              {tr("Certified by")} <b>{vHero.lockup[0]}</b> <i>×</i> <b>{vHero.lockup[1]}</b> <i>×</i>{" "}
              <b>{vHero.lockup[2]}</b>
            </span>
          </div>
        </div>
      </section>

      {/* ── B. CREDIBILITY STRIP ── */}
      <section className="va-cred" data-stagger>
        {vCred.map((c) => (
          <div className="va-cred__item" key={c.l}>
            <span className="va-cred__n">{c.n}</span>
            <span className="va-cred__l">{c.l}</span>
          </div>
        ))}
      </section>

      {/* ── C. WHY YOU'RE STUCK ── */}
      <section className="va-pain">
        <span className="va-mark" aria-hidden>
          HARDSTUCK
        </span>
        <div className="va-pain__grid">
          <div className="va-pain__head" data-reveal>
            <p className="vk vk--red">
              <ScrambleText text={vPain.kicker} />
            </p>
            <h2 className="va-h2">{vPain.title}</h2>
            <p className="va-lead">{vPain.lead}</p>
          </div>
          <div className="va-pain__list" data-stagger>
            {vPain.items.map((p, i) => {
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
            <ScrambleText text={vCurriculum.kicker} />
          </p>
          <h2 className="va-h2">{vCurriculum.title}</h2>
          <p className="va-lead">{vCurriculum.lead}</p>
        </div>

        <div className="va-curr__phases">
          <span className="va-curr__rail" aria-hidden>
            <span className="va-curr__fill" />
          </span>
          {vCurriculum.phases.map((ph, i) => (
            <article
              className={`va-phase ${i === vCurriculum.phases.length - 1 ? "is-final" : ""}`}
              key={ph.title}
              style={{ ["--accent" as string]: ph.accent }}
              data-reveal
            >
              <div className="va-phase__media">
                <div className="va-phase__panel">
                  <img className="va-phase__map" src={ph.map} alt="" aria-hidden />
                  <img className="va-phase__agent" src={ph.img} alt="" aria-hidden />
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
          <span className="va-radar__tag">{vCurriculum.radar.tag}</span>
          <p>{vCurriculum.radar.body}</p>
        </div>

        <div className="va-comp" data-reveal>
          <div className="va-comp__lead">
            <span>{vCurriculum.competenciesLead}</span>
            <span className="va-comp__hint">{tr("Click a competency")}</span>
          </div>
          <div className="va-comp__grid" data-stagger>
            {vCurriculum.competencies.map((it, i) => (
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
            <ScrambleText text={vCert.kicker} />
          </p>
          <h2 className="va-h2">{vCert.title}</h2>
          <p className="va-lead">{vCert.body1}</p>
          <p className="va-lead">{vCert.body2}</p>
        </div>
        <TiltCard className="va-cert__tilt" amplitude={11}>
          <Certificate doc={vCert.doc} />
        </TiltCard>
      </section>

      {/* ── F. HOW IT WORKS (facts over a map band) ── */}
      <section className="va-how" id="how">
        <img className="va-how__bg" data-parallax src="/valorant/maps/ascent-splash.webp" alt="" />
        <span className="va-how__shade" aria-hidden />
        <div className="va-how__inner">
          <div className="va-how__head" data-reveal>
            <p className="vk">{vHow.kicker}</p>
            <h2 className="va-h2">{vHow.title}</h2>
          </div>
          <div className="va-how__facts" data-stagger>
            {vHow.facts.map((f) => (
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
          <img className="va-coach__art" src={vCoach.portrait} alt="" aria-hidden />
          <span className="va-coach__soon">{tr("Photo coming")}</span>
          <div className="va-coach__plate">
            <h4>{vCoach.name}</h4>
            <span className="va-coach__role">{vCoach.role}</span>
          </div>
        </div>
        <div className="va-coach__text" data-reveal>
          <p className="vk">
            <ScrambleText text={vCoach.kicker} />
          </p>
          <h2 className="va-h2">{vCoach.title}</h2>
          <p className="va-lead">{vCoach.body}</p>
          <p className="va-coach__note">{vCoach.note}</p>
        </div>
      </section>

      {/* ── G2. THE GLOBAL BENCH (pro coach roster) ── */}
      <section className="va-roster">
        <div className="va-roster__head" data-reveal>
          <p className="vk vk--red">
            <ScrambleText text={vRoster.kicker} />
          </p>
          <h2 className="va-h2">{vRoster.title}</h2>
          <p className="va-lead">{vRoster.lead}</p>
        </div>
        <div className="va-roster__grid" data-stagger>
          {vRoster.coaches.map((c) => (
            <article className="va-rcoach" key={c.name}>
              <div className="va-rcoach__photo">
                <img src={c.img} alt={c.name} loading="lazy" />
              </div>
              <h3 className="va-rcoach__name">{c.name}</h3>
              <span className="va-rcoach__role">{c.role}</span>
              <p className="va-rcoach__note">{c.note}</p>
            </article>
          ))}
        </div>
        <p className="va-roster__note">{vRoster.note}</p>
      </section>

      {/* ── H. PROOF ── */}
      <section className="va-proof">
        <div className="va-proof__head" data-reveal>
          <p className="vk vk--red">
            <ScrambleText text={vProof.kicker} />
          </p>
          <h2 className="va-h2">{vProof.title}</h2>
        </div>
        <div className="va-proof__grid" data-stagger>
          {vProof.stories.map((s) => (
            <article className="va-story" key={s.badge}>
              <div className="va-story__photo">
                <img src={s.photo} alt={s.name} loading="lazy" />
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
        <p className="va-note">{vProof.note}</p>
      </section>

      {/* ── I. PRICING (single dramatic card) ── */}
      <section className="va-price" id="price">
        <span className="va-mark va-mark--gold" aria-hidden>
          RADIANT
        </span>
        <div className="va-price__inner">
          <div className="va-price__text" data-reveal>
            <p className="vk">
              <ScrambleText text={vPrice.kicker} />
            </p>
            <h2 className="va-h2">{vPrice.title}</h2>
            <p className="va-lead">{vPrice.body}</p>
            <div className="va-price__cta">
              <Magnet padding={70} strength={3}>
                <button
                  type="button"
                  className="vbtn vbtn--red vbtn--lg"
                  onClick={() => open("valorant")}
                >
                  {vPrice.ctaPrimary}
                </button>
              </Magnet>
              <Magnet padding={60} strength={4}>
                <a className="vbtn vbtn--ghost vbtn--lg" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                  {vPrice.ctaSecondary}
                </a>
              </Magnet>
            </div>
          </div>
          <TiltCard className="va-price__cardtilt" amplitude={7}>
            <div className="va-price__card">
              <span className="va-price__cardglow" aria-hidden />
              <h4>{vPrice.card.title}</h4>
              <div className="va-price__amt">
                {vPrice.card.amount}
                <small>{vPrice.card.unit}</small>
              </div>
              <div className="va-price__emi">{vPrice.card.emi}</div>
              <ul>
                {vPrice.card.includes.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ── J. PARENT MINI-BRIDGE ── */}
      <section className="va-parent">
        <div className="va-parent__text" data-reveal>
          <p className="vk vk--cobalt">
            <ScrambleText text={vParent.kicker} />
          </p>
          <h2 className="va-h2">{vParent.title}</h2>
          <p className="va-lead">{vParent.body}</p>
          <ul className="va-parent__list">
            {vParent.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Magnet padding={70} strength={3}>
            <a className="vbtn vbtn--gold" href="/contact">
              {vParent.cta}
            </a>
          </Magnet>
        </div>
        <SpotlightCard className="va-parent__card" spotColor="rgba(51,79,180,0.22)">
          <div className="va-parent__seal">{vParent.card.seal}</div>
          <h4>{vParent.card.title}</h4>
          <p>{vParent.card.line}</p>
          <span className="va-parent__fine">{vParent.card.fine}</span>
        </SpotlightCard>
      </section>

      {/* ── K. FAQ ── */}
      <section className="va-faq">
        <div className="va-faq__head" data-reveal>
          <p className="vk">
            <ScrambleText text={tr("Questions")} />
          </p>
          <h2 className="va-h2">{tr("Valorant, answered.")}</h2>
        </div>
        <div className="va-faq__module" data-reveal>
          <div className="va-faq__list" role="tablist" aria-label={tr("Frequently asked questions")}>
            {vFaq.map((f, i) => (
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
              {String(faqActive + 1).padStart(2, "0")} / {String(vFaq.length).padStart(2, "0")}
            </span>
            <p className="va-faq__aq">{vFaq[faqActive].q}</p>
            <p className="va-faq__aa">{vFaq[faqActive].a}</p>
          </div>
        </div>
      </section>

      {/* ── L. FINAL CTA ── */}
      <section className="va-final">
        <img className="va-final__bg" data-parallax src={vFinal.bg} alt="" />
        <span className="va-final__shade" aria-hidden />
        <span className="va-mark va-mark--big" aria-hidden>
          GG
        </span>
        <div className="va-final__inner" data-reveal>
          <p className="vk vk--red">
            <ScrambleText text={vFinal.kicker} />
          </p>
          <h2 className="va-final__title">{vFinal.title}</h2>
          <p className="va-lead">{vFinal.body}</p>
          <div className="va-final__cta">
            <Magnet padding={80} strength={2.6}>
              <button
                type="button"
                className="vbtn vbtn--red vbtn--lg"
                onClick={() => open("valorant")}
              >
                {vFinal.ctaPrimary}
              </button>
            </Magnet>
            <Magnet padding={70} strength={3.4}>
              <a className="vbtn vbtn--ghost vbtn--lg" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                {vFinal.ctaSecondary}
              </a>
            </Magnet>
          </div>
          <p className="va-final__note">{vFinal.note}</p>
        </div>
      </section>

      <footer className="vfoot">
        <span className="vfoot__brand">
          <Logo size={22} showWord={false} /> GOSU INDIA
        </span>
        <span className="vfoot__disclaimer">{vDisclaimer}</span>
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

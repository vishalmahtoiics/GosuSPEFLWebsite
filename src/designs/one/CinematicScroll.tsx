import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Logo from "../../components/Logo";
import ClickSpark from "../../components/fx/ClickSpark";
import Reticle from "../../components/fx/Reticle";
import Magnet from "../../components/fx/Magnet";
import SpotlightCard from "../../components/fx/SpotlightCard";
import TiltCard from "../../components/fx/TiltCard";
import ScrambleText from "../../components/fx/ScrambleText";
import Certificate from "../../components/Certificate";
import "../../components/fx/fx.css";
import * as C from "../../content";
import { useI18n, useLocalized, LangToggle } from "../../i18n";
import "./one.css";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicScroll() {
  // Remount the whole cinematic page when the language changes so GSAP /
  // ScrollTrigger re-initialise cleanly against the translated DOM.
  const { lang } = useI18n();
  return <CinematicScrollInner key={lang} />;
}

function CinematicScrollInner() {
  // `tr` (translate) is aliased off `t` because several .map() callbacks below
  // already bind `t`/`p`/`f`/`s` to their item.
  const { t: tr, lang } = useI18n();
  const {
    hero,
    stats,
    twoDoors,
    titles,
    trackViewCta,
    partnership,
    method,
    showcaseBand,
    successStories,
    coaches,
    coachesIntro,
    parentBridge,
    certification,
    testimonials,
    programs,
    faq,
    finalCta,
  } = useLocalized(C);
  // Hero headline is rendered word-by-word with the last word accented. English
  // uses the pre-split array; Hindi splits the translated plain sentence so word
  // order stays correct (the trailing danda / period is trimmed off).
  const heroWords =
    lang === "hi"
      ? hero.headlinePlain.replace(/[।.]\s*$/, "").split(/\s+/)
      : hero.headline;
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const heroVideo = useRef<HTMLVideoElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);

  // arrow buttons nudge the success carousel by one card (the wrap handles infinity)
  const scrollStories = (dir: number) => {
    const el = storiesRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".c1-story");
    const amt = card ? card.offsetWidth + 22 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amt });
  };

  // infinite success carousel: cards are rendered 3x and we keep the scroll
  // position inside the middle copy, so drag / arrows / wheel loop forever.
  useEffect(() => {
    const el = storiesRef.current;
    if (!el) return;
    // exact width of one copy = offset between same-index cards one copy apart
    const perCopy = successStories.people.length;
    const setW = () => {
      const kids = el.children;
      return kids.length > perCopy
        ? (kids[perCopy] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft
        : el.scrollWidth / 3;
    };
    el.scrollLeft = setW();
    let down = false;
    let lastX = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      lastX = e.clientX;
      el.classList.add("is-grabbing");
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft -= e.clientX - lastX;
      lastX = e.clientX;
    };
    const onUp = () => {
      down = false;
      el.classList.remove("is-grabbing");
    };
    const onScroll = () => {
      const w = setW();
      if (el.scrollLeft >= 2 * w) el.scrollLeft -= w;
      else if (el.scrollLeft < w) el.scrollLeft += w;
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  // autoplay the arena loop unless the user prefers reduced motion (poster stays)
  useEffect(() => {
    const v = heroVideo.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.play().catch(() => {});
  }, []);

  // Lenis smooth scroll wired to ScrollTrigger (canonical integration)
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
      // ── HERO: masked word reveal + parallax exit ──────────────────
      const heroWords = gsap.utils.toArray<HTMLElement>(".c1-hero__word span");
      gsap.set(heroWords, { yPercent: 115 });
      const intro = gsap.timeline({ delay: 0.2 });
      intro
        .to(".c1-hero__eyebrow", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .to(
          heroWords,
          { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.08 },
          "-=0.4"
        )
        .to(
          ".c1-hero__sub, .c1-hero__cta, .c1-hero__scroll",
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 },
          "-=0.7"
        );

      // hero parallax + dim on scroll out
      gsap.to(".c1-hero__inner", {
        yPercent: -18,
        scale: 0.94,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: ".c1-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".c1-hero__glow", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: ".c1-hero", start: "top top", end: "bottom top", scrub: true },
      });

      // ── generic reveal for [data-reveal] blocks ───────────────────
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // staggered children
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: group, start: "top 80%" },
        });
      });

      // count-up stats
      gsap.utils.toArray<HTMLElement>(".c1-stat__num").forEach((el) => {
        const target = Number(el.dataset.to || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => {
            el.firstChild!.textContent = Math.round(obj.v).toLocaleString("en-IN");
          },
        });
      });

      // The horizontal title sweep (pinned scroll-hijack) lives in a
      // matchMedia block below so phones get a native swipe carousel instead.

      // ── METHOD: pinned progress rail ──────────────────────────────
      gsap.to(".c1-method__fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".c1-method",
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        },
      });

      // full-bleed band images drift within their frame
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -10 },
          {
            yPercent: 10,
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

      // big section labels drift
      gsap.utils.toArray<HTMLElement>(".c1-watermark").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: 8 },
          {
            xPercent: -8,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    }, root);

    // ── HORIZONTAL TITLE SWEEP (pinned) — desktop only (≥1025px) ──────
    // On phones and tablets the pin hijacks vertical scroll and clips the
    // cards against the section edge, which feels broken on touch; there the
    // CSS turns the track into a native swipe carousel instead. iPads report
    // ~768–1024px, so the cutoff has to clear them. matchMedia rebuilds /
    // reverts this across resizes and rotations.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1025px) and (pointer: fine)", () => {
      const track = trackRef.current;
      if (!track) return;
      const getScroll = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: ".c1-titles",
          start: "top top",
          end: () => `+=${getScroll() + window.innerHeight * 0.6}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <div className="c1" ref={root}>
      <Reticle />
      <ClickSpark sparkColor="#f4c63f" sparkCount={11} sparkRadius={26} />

      <header className="c1-nav">
        <Logo size={28} />
        <nav className="c1-nav__links">
          <a href="#titles">{tr("Tracks")}</a>
          <a href="#method">{tr("Method")}</a>
          <a href="#certified">{tr("Certification")}</a>
          <a href="#success">{tr("Success")}</a>
          <a href="#enroll">{tr("Enroll")}</a>
        </nav>
        <div className="c1-nav__end">
          <LangToggle />
          <Magnet padding={50} strength={4}>
            <a className="c1-nav__cta" href="#enroll">
              {hero.ctaSecondary}
            </a>
          </Magnet>
        </div>
      </header>

      {/* ───────── HERO ───────── */}
      <section className="c1-hero">
        <div className="c1-hero__video" aria-hidden>
          <video
            ref={heroVideo}
            className="c1-hero__vid"
            muted
            loop
            playsInline
            preload="auto"
            poster="/media/esports-arena-poster.jpg"
          >
            <source src="/media/esports-arena.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="c1-hero__glow" aria-hidden />
        <div className="c1-grid-lines" aria-hidden />
        <div className="c1-hero__inner">
          <p className="c1-hero__eyebrow">{hero.eyebrow}</p>
          <h1 className="c1-hero__title">
            {heroWords.map((w, i) => (
              <span className="c1-hero__word" key={i}>
                <span className={i === heroWords.length - 1 ? "is-gold" : ""}>
                  {w}
                </span>
              </span>
            ))}
          </h1>
          <p className="c1-hero__sub">{hero.sub}</p>
          <div className="c1-hero__cta">
            <Magnet padding={80} strength={3}>
              <a className="c1-btn c1-btn--gold" href="#titles">
                {hero.ctaPrimary}
              </a>
            </Magnet>
            <Magnet padding={70} strength={4}>
              <a className="c1-btn c1-btn--ghost" href="#enroll">
                {hero.ctaSecondary}
              </a>
            </Magnet>
          </div>
        </div>
        <div className="c1-hero__scroll">
          <span>{tr("Scroll")}</span>
          <i />
        </div>
      </section>

      {/* ───────── STATS (credibility bar) ───────── */}
      <section className="c1-stats" data-stagger>
        {stats.map((s) => (
          <div className="c1-stat" key={s.label}>
            <div className="c1-stat__num" data-to={s.value}>
              <span>0</span>
              {s.suffix}
            </div>
            <p className="c1-stat__label">{s.label}</p>
          </div>
        ))}
      </section>

      {/* ───────── TWO DOORS ───────── */}
      <section className="c1-doors" id="doors">
        <div className="c1-doors__head" data-reveal>
          <p className="c1-kicker">
            <ScrambleText text={twoDoors.kicker} />
          </p>
          <h2 className="c1-h2">{twoDoors.title}</h2>
          <p className="c1-lead">{twoDoors.body}</p>
        </div>
        <div className="c1-doors__split" data-stagger>
          {twoDoors.doors.map((d) => (
            <SpotlightCard className="c1-door" key={d.tag}>
              <span className="c1-door__tag">{d.tag}</span>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ───────── TITLES (horizontal pin) ───────── */}
      <section className="c1-titles" id="titles">
        <div className="c1-titles__track" ref={trackRef}>
          <div className="c1-titles__intro">
            <p className="c1-kicker">{tr("The Tracks")}</p>
            <h2 className="c1-h2">
              {tr("Four tracks.")}
              <br />
              {tr("Two ways to go pro.")}
            </h2>
            <p className="c1-titles__hint">{tr("Drag to explore →")}</p>
          </div>
          {titles.map((t, i) => (
            <article
              className="c1-title-card"
              key={t.name}
              style={{
                ["--accent" as string]: t.accent,
                ["--img-bright" as string]: t.bright,
              }}
            >
              <img
                className="c1-title-card__img"
                src={t.img}
                alt=""
                loading="lazy"
                style={{ objectPosition: t.focus }}
              />
              <span className="c1-title-card__shade" aria-hidden />
              <div className="c1-title-card__top">
                <span className="c1-title-card__idx">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="c1-title-card__kind">{t.kind}</span>
              </div>
              <div className="c1-title-card__body">
                <span className="c1-title-card__tag">{t.tag}</span>
                <h3>{t.name}</h3>
                <p className="c1-title-card__blurb">{t.blurb}</p>
                <div className="c1-title-card__cta">
                  {t.href ? (
                    <Link className="c1-btn c1-btn--gold c1-btn--sm" to={t.href}>
                      {tr("View course")}
                    </Link>
                  ) : (
                    <a className="c1-btn c1-btn--gold c1-btn--sm" href="#enroll">
                      {trackViewCta}
                    </a>
                  )}
                  <a className="c1-btn c1-btn--ghost c1-btn--sm" href="#enroll">
                    {t.altCta}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ───────── PARTNERSHIP (moat) ───────── */}
      <section className="c1-part" id="partnership">
        <span className="c1-watermark" aria-hidden>
          CERTIFIED
        </span>
        <div className="c1-part__head" data-reveal>
          <p className="c1-kicker">
            <ScrambleText text={partnership.kicker} />
          </p>
          <h2 className="c1-h2">{partnership.title}</h2>
          <p className="c1-lead">{partnership.body}</p>
        </div>
        <div className="c1-part__pillars" data-stagger>
          {partnership.pillars.map((p) => (
            <SpotlightCard className="c1-pillar" key={p.tag}>
              <span className="c1-pillar__tag">{p.tag}</span>
              <div className="c1-pillar__brand">
                {p.logo ? (
                  <img className="c1-pillar__logo" src={p.logo} alt={p.title} />
                ) : p.mark ? (
                  <span className="c1-pillar__lockup">
                    <img className="c1-pillar__mark" src={p.mark} alt="" />
                    <span className="c1-pillar__wordmark">{p.title}</span>
                  </span>
                ) : (
                  <h3>{p.title}</h3>
                )}
              </div>
              <p>{p.body}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ───────── METHOD (pinned rail + visual) ───────── */}
      <section className="c1-method" id="method">
        <div className="c1-method__grid">
          <div className="c1-method__main">
            <div className="c1-method__head" data-reveal>
              <p className="c1-kicker">
                <ScrambleText text={method.kicker} />
              </p>
              <h2 className="c1-h2">{method.title}</h2>
              <p className="c1-lead">{method.lead}</p>
            </div>
            <div className="c1-method__rail">
              <span className="c1-method__line" aria-hidden>
                <span className="c1-method__fill" />
              </span>
              <div className="c1-method__steps">
                {method.steps.map((s) => (
                  <article className="c1-step" key={s.n} data-reveal>
                    <span className="c1-step__n">{s.n}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <p className="c1-method__proof" data-reveal>
              {method.proof}
            </p>
          </div>
          <aside className="c1-method__visual" data-reveal>
            <figure className="c1-figure">
              <img src={method.visual.src} alt="" loading="lazy" />
              <span className="c1-figure__shade" aria-hidden />
              <figcaption className="c1-figure__cap">
                <span className="c1-figure__tag">{method.visual.tag}</span>
                <span className="c1-figure__title">{method.visual.caption}</span>
              </figcaption>
            </figure>
          </aside>
        </div>
      </section>

      {/* The credential ladder + full 7-competency grid moved to the course
          pages; the homepage keeps only the one-line rigor proof, inside the
          Method section above. */}

      {/* ───────── SHOWCASE BAND (full-bleed) ───────── */}
      <section className="c1-band">
        <img
          className="c1-band__img"
          data-parallax
          src={showcaseBand.src}
          alt=""
          loading="lazy"
        />
        <span className="c1-band__shade" aria-hidden />
        <div className="c1-band__inner" data-reveal>
          <p className="c1-kicker">{showcaseBand.eyebrow}</p>
          <p className="c1-band__line">{showcaseBand.line}</p>
        </div>
      </section>

      {/* ───────── SUCCESS STORIES (carousel) ───────── */}
      <section className="c1-stories" id="success">
        <div className="c1-stories__head" data-reveal>
          <div>
            <p className="c1-kicker">
              <ScrambleText text={successStories.kicker} />
            </p>
            <h2 className="c1-h2">{successStories.title}</h2>
          </div>
          <div className="c1-stories__nav">
            <span className="c1-stories__hint">{successStories.hint}</span>
            <button
              className="c1-arrow"
              type="button"
              aria-label="Previous"
              onClick={() => scrollStories(-1)}
            >
              ‹
            </button>
            <button
              className="c1-arrow"
              type="button"
              aria-label="Next"
              onClick={() => scrollStories(1)}
            >
              ›
            </button>
          </div>
        </div>
        <div className="c1-stories__scroller" ref={storiesRef} data-reveal>
          {[0, 1, 2].map((copy) =>
            successStories.people.map((s) => (
              <article
                className="c1-story"
                key={`${copy}-${s.badge}-${s.meta}`}
                aria-hidden={copy !== 0}
              >
                <div
                  className={`c1-story__photo c1-story__photo--${
                    s.kind === "Player" ? "player" : "career"
                  }`}
                >
                  {s.img ? (
                    <img
                      className="c1-story__img"
                      src={s.img}
                      alt={s.name}
                      loading="lazy"
                    />
                  ) : (
                    <span className="c1-story__mono" aria-hidden>
                      {s.name
                        .replace(/[^A-Za-z ]/g, "")
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  )}
                  <span
                    className={`c1-story__kind ${
                      s.kind === "Player" ? "is-player" : "is-career"
                    }`}
                  >
                    {s.kind}
                  </span>
                </div>
                <div className="c1-story__body">
                  <span className="c1-story__badge">{s.badge}</span>
                  <p className="c1-story__text">{s.story}</p>
                  <figcaption className="c1-story__by">
                    <strong>{s.name}</strong>
                    <span>{s.meta}</span>
                  </figcaption>
                </div>
              </article>
            ))
          )}
        </div>
        <p className="c1-ph-note">{successStories.note}</p>
      </section>

      {/* ───────── COACHES ───────── */}
      <section className="c1-coaches" id="coaches">
        <div className="c1-coaches__head" data-reveal>
          <p className="c1-kicker">
            <ScrambleText text={coachesIntro.kicker} />
          </p>
          <h2 className="c1-h2">{coachesIntro.title}</h2>
          <p className="c1-lead">{coachesIntro.lead}</p>
        </div>
        <div className="c1-coaches__grid" data-stagger>
          {coaches.map((c) => (
            <TiltCard className="c1-coach-tilt" key={`${c.name}-${c.role}`} amplitude={8}>
              <article className="c1-coach">
                <div className="c1-coach__photo">
                  {c.img ? (
                    <img
                      className="c1-coach__img"
                      src={c.img}
                      alt={c.name}
                      loading="lazy"
                    />
                  ) : (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        className="c1-coach__silhouette"
                        aria-hidden
                      >
                        <path d="M12 12.6a4.3 4.3 0 1 0 0-8.6 4.3 4.3 0 0 0 0 8.6ZM4 21a8 8 0 0 1 16 0Z" />
                      </svg>
                      <span className="c1-coach__soon">{tr("Photo coming")}</span>
                    </>
                  )}
                  {c.tag ? <span className="c1-coach__tag">{c.tag}</span> : null}
                </div>
                <h3>{c.name}</h3>
                <span className="c1-coach__role">{c.role}</span>
                <p className="c1-coach__note">{c.note}</p>
              </article>
            </TiltCard>
          ))}
        </div>
        <p className="c1-ph-note">{coachesIntro.note}</p>
      </section>

      {/* ───────── PARENT BRIDGE (+ cert card) ───────── */}
      <section className="c1-parent" id="certified" data-reveal>
        <div className="c1-parent__text">
          <p className="c1-kicker">
            <ScrambleText text={parentBridge.kicker} />
          </p>
          <h2 className="c1-h2">{parentBridge.title}</h2>
          <p className="c1-lead">{parentBridge.body}</p>
          <ul className="c1-parent__list">
            {parentBridge.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="c1-cert__badges">
            {certification.badges.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
          <Magnet padding={80} strength={3}>
            <a className="c1-btn c1-btn--gold" href="#enroll">
              {parentBridge.cta}
            </a>
          </Magnet>
        </div>
        <TiltCard className="c1-cert__tilt" amplitude={12}>
          <Certificate doc={certification.doc} />
        </TiltCard>
      </section>

      {/* ───────── TESTIMONIALS ───────── */}
      <section className="c1-quotes" data-stagger>
        {testimonials.map((t) => (
          <SpotlightCard className="c1-quote" key={t.name}>
            <blockquote>“{t.quote}”</blockquote>
            <figcaption>
              <strong>{t.name}</strong>
              <span>{t.detail}</span>
            </figcaption>
          </SpotlightCard>
        ))}
      </section>

      {/* ───────── PRICING ───────── */}
      <section className="c1-programs" id="pricing">
        <div className="c1-programs__head" data-reveal>
          <p className="c1-kicker">
            <ScrambleText text={tr("Pricing")} />
          </p>
          <h2 className="c1-h2">{tr("One national price. EMI on every track.")}</h2>
        </div>
        <div className="c1-programs__grid" data-stagger>
          {programs.map((p) => (
            <SpotlightCard className="c1-prog" key={p.code}>
              <div className="c1-prog__lead">
                <span className="c1-prog__code">{p.code}</span>
                <h3>{p.name}</h3>
                <p className="c1-prog__for">{p.forWho}</p>
              </div>
              <ul className="c1-prog__points">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="c1-prog__side">
                <span className="c1-prog__price">{p.price}</span>
                <div className="c1-prog__actions">
                  <Magnet padding={40} strength={4}>
                    <a className="c1-btn c1-btn--gold c1-btn--sm" href={p.href}>
                      {tr("Enroll")}
                    </a>
                  </Magnet>
                  {p.href ? (
                    <Link className="c1-prog__course" to={p.href}>
                      {tr("View course →")}
                    </Link>
                  ) : null}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="c1-faq" id="faq">
        <div className="c1-faq__head" data-reveal>
          <p className="c1-kicker">
            <ScrambleText text={tr("Questions")} />
          </p>
          <h2 className="c1-h2">{tr("The ones parents actually ask.")}</h2>
        </div>
        <div className="c1-faq__list" data-reveal>
          {faq.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>
                {f.q}
                <span className="c1-faq__mark" aria-hidden />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="c1-final" id="enroll">
        <img
          className="c1-final__bg"
          data-parallax
          src="/media/esports-arena-poster.jpg"
          alt=""
          loading="lazy"
        />
        <span className="c1-final__shade" aria-hidden />
        <span className="c1-watermark c1-watermark--big" aria-hidden>
          GG
        </span>
        <div className="c1-final__inner" data-reveal>
          <p className="c1-kicker">
            <ScrambleText text={finalCta.kicker} />
          </p>
          <h2 className="c1-final__title">{finalCta.title}</h2>
          <p className="c1-lead">{finalCta.body}</p>
          <Magnet padding={90} strength={2.6}>
            <a className="c1-btn c1-btn--gold c1-btn--lg" href="/contact">
              {finalCta.cta}
            </a>
          </Magnet>
          <p className="c1-final__note">{finalCta.note}</p>
        </div>
        <footer className="c1-foot">
          <Logo size={24} />
          <span>© {new Date().getFullYear()} Gosu Academy · Bharat Esports</span>
          <nav className="c1-foot__legal">
            <a href="/terms">{tr("Terms")}</a>
            <a href="/privacy">{tr("Privacy")}</a>
            <a href="/refunds">{tr("Refunds")}</a>
            <a href="/contact">{tr("Contact")}</a>
          </nav>
        </footer>
      </section>
    </div>
  );
}

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Logo from "../../components/Logo";
import GosuSpeflLockup from "../../components/GosuSpeflLockup";
import SocialLinks from "../../components/SocialLinks";
import { useRegisterModal } from "../../context/RegisterModalContext";
import ClickSpark from "../../components/fx/ClickSpark";
import Reticle from "../../components/fx/Reticle";
import Magnet from "../../components/fx/Magnet";
import SpotlightCard from "../../components/fx/SpotlightCard";
import TiltCard from "../../components/fx/TiltCard";
import ScrambleText from "../../components/fx/ScrambleText";
import Certificate from "../../components/Certificate";
import SeoFooter from "../../components/SeoFooter";
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

const courseShowcase = [
  {
    id: "valorant",
    num: "01",
    tag: "TACTICAL FPS ATHLETE",
    title: "Valorant Pro Athlete",
    pills: [
      "Micro-Aim Mechanics",
      "Agent Economy",
      "Site Executes",
      "VOD Review",
      "SPEFL-SC Certified",
      "Competitive Showcase",
    ],
    desc: "A nationally accredited competitive season engineered for athletes aiming for Radiant and Tier-2 rosters. Master agent synergy, default protocols, clutch economics, and LAN-proven team systems under official master coaches.",
    img: "/games/valorant.jpg",
    href: "/valorant",
  },
  {
    id: "bgmi",
    num: "02",
    tag: "BATTLE ROYALE DISCIPLINE",
    title: "BGMI Tactical Athlete",
    pills: [
      "Squad Rotations",
      "Zone Prediction",
      "IGL Shotcalling",
      "Clutch Comms",
      "SPEFL-SC Certified",
      "Custom Scrims",
    ],
    desc: "India's premier mobile esports title coached to a rigorous national standard. Master compound defense, high-ground priority, split-second vehicle rotation math, and high-pressure tournament communication.",
    img: "/games/bgmi.jpg",
    href: "/bgmi",
  },
  {
    id: "coaching",
    num: "03",
    tag: "CAREER VOCATIONAL TRACK",
    title: "Esports Team Coaching",
    pills: [
      "VOD Diagnostics",
      "Session Design",
      "Roster Management",
      "Draft Strategy",
      "SPEFL-SC Certified",
      "Academy Placement",
    ],
    desc: "Turn high-tier tactical intuition into a recognized national coaching credential. Master telemetry diagnostics, scrim review methodologies, and the pedagogical playbook deployed by professional teams.",
    img: "/home/track-coaching.webp",
    href: "/coaching",
  },
  {
    id: "tournament",
    num: "04",
    tag: "EVENT PRODUCTION TRACK",
    title: "Tournament Operations",
    pills: [
      "Live Admin",
      "Bracket Formats",
      "Lobby Automation",
      "Broadcast Run-of-Show",
      "SPEFL-SC Certified",
      "Capstone Event",
    ],
    desc: "Orchestrate the brackets, rulesets, and live broadcasts that fill arenas. Build real tournament artifacts, manage stage production, and graduate with a live tournament you actually produced in your portfolio.",
    img: "/tournament/arena.webp",
    href: "/tournament-ops",
  },
];

function TacticalAimGraphic() {
  return (
    <div className="c1-door-graphic c1-door-graphic--athlete" aria-hidden="true">
      <div className="c1-hud-radar">
        <svg viewBox="0 0 64 64" className="c1-hud-radar__svg">
          <circle cx="32" cy="32" r="28" className="c1-hud-radar__ring" />
          <circle cx="32" cy="32" r="18" className="c1-hud-radar__ring-inner" />
          <circle cx="32" cy="32" r="7" className="c1-hud-radar__center" />
          <line x1="32" y1="4" x2="32" y2="60" className="c1-hud-radar__axis" />
          <line x1="4" y1="32" x2="60" y2="32" className="c1-hud-radar__axis" />
          <line x1="32" y1="32" x2="32" y2="4" className="c1-hud-radar__sweep" />
          <circle cx="44" cy="20" r="2.5" className="c1-hud-radar__blip c1-hud-radar__blip--1" />
          <circle cx="22" cy="42" r="2" className="c1-hud-radar__blip c1-hud-radar__blip--2" />
        </svg>
      </div>
      <div className="c1-hud-info">
        <div className="c1-hud-info__top">
          <span className="c1-hud-tag">AIM PROTOCOL</span>
          <span className="c1-hud-val">340+ APM</span>
        </div>
        <svg viewBox="0 0 140 24" className="c1-hud-wave__svg" preserveAspectRatio="none">
          <path d="M 0 12 Q 17.5 2, 35 12 T 70 12 T 105 12 T 140 12" className="c1-hud-wave" />
          <path d="M 0 12 Q 17.5 22, 35 12 T 70 12 T 105 12 T 140 12" className="c1-hud-wave c1-hud-wave--alt" />
        </svg>
        <div className="c1-hud-info__bot">
          <span>LATENCY: 12ms</span>
          <span className="is-gold">● TARGET LOCK</span>
        </div>
      </div>
    </div>
  );
}

function BroadcastConsoleGraphic() {
  return (
    <div className="c1-door-graphic c1-door-graphic--industry" aria-hidden="true">
      <div className="c1-hud-cams">
        <div className="c1-hud-cam is-live">
          <span className="c1-hud-cam__tag">CAM 01</span>
          <span className="c1-hud-cam__status">● LIVE</span>
        </div>
        <div className="c1-hud-cam">
          <span className="c1-hud-cam__tag">CAM 02</span>
          <span className="c1-hud-cam__status">STAGE</span>
        </div>
      </div>
      <div className="c1-hud-info">
        <div className="c1-hud-info__top">
          <span className="c1-hud-tag">BROADCAST NDI</span>
          <span className="c1-hud-val">1080P60</span>
        </div>
        <div className="c1-hud-eq">
          <span className="c1-eq-bar b1" />
          <span className="c1-eq-bar b2" />
          <span className="c1-eq-bar b3" />
          <span className="c1-eq-bar b4" />
          <span className="c1-eq-bar b5" />
          <span className="c1-eq-bar b6" />
          <span className="c1-eq-bar b7" />
          <span className="c1-eq-bar b8" />
        </div>
        <div className="c1-hud-info__bot">
          <span>TOURNAMENT OPS</span>
          <span className="is-cyan">● ON AIR</span>
        </div>
      </div>
    </div>
  );
}

function CinematicScrollInner() {
  const { openRegisterModal } = useRegisterModal();
  const [activeCourse, setActiveCourse] = useState(0);
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
  const coursesSectionRef = useRef<HTMLDivElement>(null);
  const coursesWrapperRef = useRef<HTMLDivElement>(null);
  const courseTriggerRef = useRef<ScrollTrigger | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const lenisRef = useRef<Lenis | null>(null);

  const goToCourse = (idx: number) => {
    setActiveCourse(idx);
    const st = courseTriggerRef.current;
    if (st) {
      const targets = [0.02, 0.36, 0.69, 0.98];
      const targetP = targets[idx] ?? (idx / (courseShowcase.length - 1));
      const targetY = st.start + targetP * (st.end - st.start);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetY, { duration: 0.8 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    } else {
      const el = cardRefs.current[idx];
      if (el) {
        const rect = el.getBoundingClientRect();
        const targetY = window.pageYOffset + rect.top - 190;
        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetY, { duration: 0.8 });
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    }
  };

  // arrow buttons nudge the success carousel by one card (the wrap handles infinity)
  const scrollStories = (dir: number) => {
    const el = storiesRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".c1-story");
    const amt = card ? card.offsetWidth + 22 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amt, behavior: "smooth" });
  };

  // Truly endless infinite success carousel with fluid inertia dragging and seamless wrap
  useEffect(() => {
    const el = storiesRef.current;
    if (!el) return;
    const perCopy = successStories.people.length;

    const getSetWidth = () => {
      const kids = el.children;
      if (kids.length >= perCopy * 2) {
        const first = kids[0] as HTMLElement;
        const nextSet = kids[perCopy] as HTMLElement;
        const diff = nextSet.offsetLeft - first.offsetLeft;
        if (diff > 0) return diff;
      }
      return el.scrollWidth / 5;
    };

    const handleWrap = () => {
      const w = getSetWidth();
      if (!w || w <= 0) return;
      // Keep scroll position safely within middle copy range [2 * w, 3 * w)
      while (el.scrollLeft >= 3 * w) {
        el.scrollLeft -= w;
      }
      while (el.scrollLeft < 2 * w) {
        el.scrollLeft += w;
      }
    };

    // Position at middle copy on mount
    const initScroll = () => {
      const w = getSetWidth();
      if (w > 0) {
        el.scrollLeft = 2 * w;
      }
    };

    initScroll();
    const ro = new ResizeObserver(() => {
      handleWrap();
    });
    ro.observe(el);

    let isDown = false;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let rafId = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      if (e.button !== 0) return;
      cancelAnimationFrame(rafId);
      isDown = true;
      lastX = e.clientX;
      lastTime = performance.now();
      velocity = 0;
      el.classList.add("is-grabbing");
      try {
        el.setPointerCapture(e.pointerId);
      } catch {}
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dt = now - lastTime;
      el.scrollLeft -= dx;
      if (dt > 0) {
        velocity = 0.7 * (dx / dt) + 0.3 * velocity;
      }
      lastX = e.clientX;
      lastTime = now;
      handleWrap();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      el.classList.remove("is-grabbing");
      try {
        if (el.hasPointerCapture(e.pointerId)) {
          el.releasePointerCapture(e.pointerId);
        }
      } catch {}

      // Apply fluid momentum decay on drag release
      if (Math.abs(velocity) > 0.1) {
        let v = velocity * 14;
        const momentumStep = () => {
          if (Math.abs(v) < 0.5 || isDown) {
            handleWrap();
            return;
          }
          el.scrollLeft -= v;
          v *= 0.93;
          handleWrap();
          rafId = requestAnimationFrame(momentumStep);
        };
        rafId = requestAnimationFrame(momentumStep);
      } else {
        handleWrap();
      }
    };

    const onScroll = () => {
      handleWrap();
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Autoplay arena loop only when hero is visible in viewport; pause when scrolled away to save CPU/GPU
  useEffect(() => {
    const v = heroVideo.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Lenis smooth scroll wired to ScrollTrigger (desktop fine-pointer only to ensure 120Hz native mobile scroll)
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1025px) and (pointer: fine)").matches) {
      return;
    }
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── HERO: masked word reveal + parallax exit ──────────────────
      const heroWords = gsap.utils.toArray<HTMLElement>(".c1-hero__word span");
      gsap.set(heroWords, { yPercent: 115 });
      const intro = gsap.timeline({ delay: 0.1 });
      intro
        .from(".c1-hero__eyebrow", { opacity: 0, y: 14, duration: 0.6, ease: "power3.out" })
        .to(
          heroWords,
          { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.06 },
          "-=0.3"
        )
        .from(
          ".c1-hero__sub, .c1-hero__cta, .c1-hero__badges",
          { opacity: 0, y: 16, duration: 0.7, ease: "power3.out", stagger: 0.1, clearProps: "all" },
          "-=0.4"
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
          scrub: 0.5,
        },
      });
      gsap.to(".c1-hero__glow", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: ".c1-hero", start: "top top", end: "bottom top", scrub: 0.5 },
      });

      // ── generic reveal for [data-reveal] blocks ───────────────────
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          clearProps: "transform,opacity",
        });
      });

      // staggered children
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, {
          y: 36,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 84%" },
          clearProps: "transform,opacity",
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

      // ── METHOD: animated progress rail & sequential step reveal ──
      gsap.fromTo(
        ".c1-method__fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".c1-method__steps",
            start: "top 80%",
            end: "bottom 65%",
            scrub: 0.3,
          },
        }
      );

      const methodSteps = gsap.utils.toArray<HTMLElement>(".c1-step");
      methodSteps.forEach((step, i) => {
        const badge = step.querySelector<HTMLElement>(".c1-step__n");

        gsap.set(step, { opacity: 0, x: -28 });
        if (badge) gsap.set(badge, { scale: 0.6, opacity: 0 });

        gsap.to(step, {
          opacity: 1,
          x: 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: () => `top ${84 - i * 3.5}%`,
            toggleActions: "play none none reverse",
          },
        });

        if (badge) {
          gsap.to(badge, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: step,
              start: () => `top ${84 - i * 3.5}%`,
              toggleActions: "play none none reverse",
            },
          });
        }
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

      // ── COURSES SHOWCASE: Pinned when whole section is centered on screen ──
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      if (cards.length > 0 && coursesSectionRef.current && coursesWrapperRef.current) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 901px)", () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: coursesSectionRef.current,
              start: "center center",
              end: "+=2400",
              pin: coursesWrapperRef.current,
              scrub: 0.6,
              anticipatePin: 1,
              onUpdate: (self) => {
                const p = self.progress;
                let idx = 0;
                if (p >= 0.76) idx = 3;
                else if (p >= 0.50) idx = 2;
                else if (p >= 0.24) idx = 1;
                else idx = 0;
                setActiveCourse(idx);
              },
            },
          });

          courseTriggerRef.current = tl.scrollTrigger;
          tl.to({}, { duration: 1 });
        });

        mm.add("(max-width: 900px)", () => {
          cards.forEach((cardEl, idx) => {
            ScrollTrigger.create({
              trigger: cardEl,
              start: "top 60%",
              end: "bottom 60%",
              onEnter: () => setActiveCourse(idx),
              onEnterBack: () => setActiveCourse(idx),
            });
          });
        });
      }
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="c1" ref={root}>
      <Reticle />
      <ClickSpark sparkColor="#f4c63f" sparkCount={11} sparkRadius={26} />

      <header className="c1-nav">
        <div className="c1-nav__bar">
          <div className="c1-nav__brand-lockup">
            <GosuSpeflLockup size={28} theme="pill" />
          </div>
          <nav className="c1-nav__links">
            <a href="#titles">{tr("Curriculum")}</a>
            <a href="#partnership">{tr("Alliance")}</a>
            <a href="#method">{tr("Pedagogy")}</a>
            <a href="#certified">{tr("Accreditation")}</a>
          </nav>
          <div className="c1-nav__end">
            <LangToggle />
            <Magnet padding={50} strength={4}>
              <button
                type="button"
                className="c1-nav__cta"
                onClick={() => openRegisterModal()}
              >
                Join The Waitlist
              </button>
            </Magnet>
          </div>
        </div>
      </header>

      {/* ───────── HERO ───────── */}
      <section className="c1-hero">
        <div className="c1-hero__bg" aria-hidden>
          <img
            className="c1-hero__bg-img"
            src="/media/esports-arena-poster.jpg"
            alt=""
          />
        </div>
        <div className="c1-hero__video" aria-hidden>
          <video
            ref={heroVideo}
            className="c1-hero__vid"
            muted
            loop
            playsInline
            preload="metadata"
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
                Explore Our Courses
              </a>
            </Magnet>
            <Magnet padding={70} strength={4}>
              <button
                type="button"
                className="c1-btn c1-btn--ghost"
                onClick={() => openRegisterModal()}
              >
                Join The Waitlist
              </button>
            </Magnet>
          </div>
          {hero.badges && (
            <div className="c1-hero__badges">
              {hero.badges.map((b) => (
                <div className="c1-hero__badge" key={b.title}>
                  <span className="c1-hero__badge-dot" aria-hidden />
                  <div className="c1-hero__badge-text">
                    <strong>{b.title}</strong>
                    <span>{b.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
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

      {/* ───────── LIVE TICKER (CleanPlan continuous motion, kills dead space) ───────── */}
      <div className="c1-ticker" aria-hidden>
        <div className="c1-ticker__track">
          <span className="c1-ticker__item"><span className="c1-ticker__dot" /> VALORANT PRO TRACK <span className="is-gold">★</span></span>
          <span className="c1-ticker__item"><span className="c1-ticker__dot" /> BHARAT ESPORTS FEDERATION ALLIANCE <span className="is-gold">★</span></span>
          <span className="c1-ticker__item"><span className="c1-ticker__dot" /> SPEFL-SC ACCREDITED COHORTS <span className="is-gold">★</span></span>
          <span className="c1-ticker__item"><span className="c1-ticker__dot" /> BGMI TACTICAL ATHLETE TRACK <span className="is-gold">★</span></span>
          <span className="c1-ticker__item"><span className="c1-ticker__dot" /> TOURNAMENT OPERATIONS CREDENTIAL <span className="is-gold">★</span></span>
          <span className="c1-ticker__item"><span className="c1-ticker__dot" /> VALORANT PRO TRACK <span className="is-gold">★</span></span>
          <span className="c1-ticker__item"><span className="c1-ticker__dot" /> BHARAT ESPORTS FEDERATION ALLIANCE <span className="is-gold">★</span></span>
          <span className="c1-ticker__item"><span className="c1-ticker__dot" /> SPEFL-SC ACCREDITED COHORTS <span className="is-gold">★</span></span>
          <span className="c1-ticker__item"><span className="c1-ticker__dot" /> BGMI TACTICAL ATHLETE TRACK <span className="is-gold">★</span></span>
          <span className="c1-ticker__item"><span className="c1-ticker__dot" /> TOURNAMENT OPERATIONS CREDENTIAL <span className="is-gold">★</span></span>
        </div>
      </div>

      {/* ───────── TWO DOORS ───────── */}
      <section className="c1-doors" id="doors">
        <div className="c1-doors__head" data-reveal>
          <div className="c1-doors__head-title">
            <p className="c1-kicker">
              <ScrambleText text={twoDoors.kicker} />
            </p>
            <h2 className="c1-h2">{twoDoors.title}</h2>
          </div>
          <p className="c1-doors__head-desc">{twoDoors.body}</p>
        </div>
        <div className="c1-doors__split" data-stagger>
          {twoDoors.doors.map((d, dIdx) => (
            <SpotlightCard className={`c1-door ${dIdx === 0 ? "c1-door--compete" : "c1-door--build"}`} key={d.tag}>
              <div className="c1-door__top">
                <span className="c1-door__tag">{d.tag}</span>
                <span className="c1-door__badge">{d.badge}</span>
              </div>
              <h3>{d.title}</h3>
              <p className="c1-door__desc">{d.body}</p>

              {/* Purposeful coded animated graphic for each path */}
              {dIdx === 0 ? <TacticalAimGraphic /> : <BroadcastConsoleGraphic />}

              <div className="c1-door__items-box">
                <div className="c1-door__items-label">{d.groupLabel}</div>
                <div className="c1-door__items-grid">
                  {d.items?.map((item) => (
                    <div className="c1-door__item-chip" key={item.name}>
                      <span className={`c1-door__item-dot ${dIdx === 0 ? "is-gold" : "is-cyan"}`} />
                      <span className="c1-door__item-name">{item.name}</span>
                      <span className="c1-door__item-tag">{item.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
        <div className="c1-action-bar" data-reveal>
          <div className="c1-action-bar__info">
            <div className="c1-action-bar__title">Direct Pro Scouting & Accredited Diplomas</div>
            <div className="c1-action-bar__sub">Choose Player Mastery or Esports Operations. Reserve priority admission for the upcoming inaugural batch.</div>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button type="button" className="c1-btn c1-btn--gold" onClick={() => openRegisterModal()}>
              Join The Waitlist
            </button>
            <a className="c1-btn c1-btn--ghost" href="#titles">
              Explore Our Courses
            </a>
          </div>
        </div>
      </section>

      {/* ───────── WHAT WE DO / ACADEMY TRACKS (Universally Speaking Reference) ───────── */}
      <section className="c1-courses-section" id="titles" ref={coursesSectionRef}>
        <div className="c1-courses-wrapper" ref={coursesWrapperRef}>
          <div className="c1-courses-head-bar">
            <div className="c1-courses-head">
              <span className="c1-courses-kicker">WHAT WE DO</span>
              <h2 className="c1-courses-title">Nationally Accredited Esports Tracks</h2>
            </div>

            {/* Tactical Course Switcher Tabs */}
            <div className="c1-courses-tabs">
              {courseShowcase.map((c, i) => {
                const shortNames = ["VALORANT", "BGMI", "COACHING", "TOURNAMENT OPS"];
                return (
                  <button
                    type="button"
                    key={c.id}
                    className={`c1-courses-tab ${activeCourse === i ? "is-active" : ""}`}
                    onClick={() => goToCourse(i)}
                  >
                    <span className="c1-courses-tab__num">{c.num} //</span>
                    <span className="c1-courses-tab__name">{shortNames[i]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stacked Vertical Cards with Right-Side Sticky Indicators */}
          <div className="c1-showcase-stage">
            <div className="c1-showcase-stack">
              {courseShowcase.map((cur, i) => (
                <article
                  ref={(el) => (cardRefs.current[i] = el)}
                  id={`card-${cur.id}`}
                  className={`c1-showcase-card c1-showcase-card--${cur.id} ${activeCourse === i ? "is-active" : ""}`}
                  key={cur.id}
                >
                  <div className="c1-showcase-card__content">
                    <span className="c1-showcase-card__kicker">{cur.tag}</span>
                    <h3 className="c1-showcase-card__title">{cur.title}</h3>
                    <div className="c1-showcase-card__pills">
                      {cur.pills.map((pill) => (
                        <span className="c1-showcase-pill" key={pill}>
                          {pill}
                        </span>
                      ))}
                    </div>
                    <p className="c1-showcase-card__desc">{cur.desc}</p>
                    <div className="c1-showcase-card__actions">
                      <Link className="c1-showcase-btn-outline" to={cur.href}>
                        Explore Our Courses
                      </Link>
                      <button
                        type="button"
                        className="c1-showcase-btn-primary"
                        onClick={() => openRegisterModal(cur.title)}
                      >
                        Join The Waitlist →
                      </button>
                    </div>
                  </div>
                  <div className="c1-showcase-card__visual">
                    <img
                      className="c1-showcase-card__img"
                      src={cur.img}
                      alt={cur.title}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    <div className="c1-showcase-card__overlay" aria-hidden />
                    <span className="c1-showcase-card__corner-tag">{cur.num} // SPEC</span>
                  </div>
                </article>
              ))}
            </div>

            {/* Right-Side Vertical Indicator Dots */}
            <div className="c1-showcase-indicators" aria-label="Course selection">
              {courseShowcase.map((c, i) => (
                <button
                  type="button"
                  key={c.id}
                  className={`c1-showcase-dot ${activeCourse === i ? "is-active" : ""}`}
                  onClick={() => goToCourse(i)}
                  aria-label={`Jump to ${c.title}`}
                >
                  <span className="c1-showcase-dot__num">{c.num}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── PARTNERSHIP (moat) ───────── */}
      <section className="c1-part" id="partnership">
        <span className="c1-watermark" aria-hidden>
          SOVEREIGN
        </span>
        <div className="c1-part__head" data-reveal>
          <div className="c1-part__head-title">
            <p className="c1-kicker">
              <ScrambleText text={partnership.kicker} />
            </p>
            <h2 className="c1-h2">{partnership.title}</h2>
          </div>
          <p className="c1-part__head-desc">{partnership.body}</p>
        </div>
        <div className="c1-part__pillars" data-stagger>
          {partnership.pillars.map((p) => (
            <SpotlightCard className="c1-pillar" key={p.tag}>
              <span className="c1-pillar__tag">{p.tag}</span>
              <div className="c1-pillar__brand">
                {p.logo ? (
                  <img className="c1-pillar__logo" src={p.logo} alt={p.title} loading="lazy" decoding="async" />
                ) : p.mark ? (
                  <span className="c1-pillar__lockup">
                    <img className="c1-pillar__mark" src={p.mark} alt="" loading="lazy" decoding="async" />
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

        {/* 4 Strategic Foundation Pillars from the Federation Prospectus */}
        {partnership.foundationPillars && (
          <div className="c1-foundation-pillars" data-stagger>
            <div className="c1-foundation-pillars__intro">
              <span className="c1-kicker">STRATEGIC FOUNDATIONS</span>
              <h3>Sovereign Pillars of the National Esports Framework</h3>
            </div>
            <div className="c1-foundation-pillars__grid">
              {partnership.foundationPillars.map((fp) => (
                <div className="c1-fp-card" key={fp.num}>
                  <div className="c1-fp-card__top">
                    <span className="c1-fp-card__num">{fp.num}</span>
                    <h4>{fp.title}</h4>
                  </div>
                  <p>{fp.desc}</p>
                </div>
              ))}
            </div>
            <div className="c1-prog-act-notice">
              <span className="c1-pan-badge">PROG ACT 2025 ALIGNED</span>
              <p>
                <strong>Pure Esports Decoupling:</strong> Bharat Esports Federation operates exclusively under statutory separation from online real-money gaming (RMG/gambling). 100% video-game sport purity, safe for collegiate and national youth athlete development.
              </p>
            </div>
          </div>
        )}
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
                  <article className="c1-step" key={s.n}>
                    <span className="c1-step__n">{s.n}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="c1-method__cta" data-reveal>
              <div className="c1-method__cta-info">
                <span className="c1-live-badge">ADMISSIONS OPEN</span>
                <div className="c1-method__cta-title">Ready to Begin Your Esports Trajectory?</div>
                <div className="c1-method__cta-sub">Join national cohorts or explore accredited syllabus modules.</div>
              </div>
              <div className="c1-method__cta-actions">
                <button
                  type="button"
                  className="c1-btn c1-btn--gold"
                  onClick={() => openRegisterModal()}
                >
                  Join The Waitlist
                </button>
                <a className="c1-btn c1-btn--ghost" href="#titles">
                  Explore Our Courses
                </a>
              </div>
            </div>
          </div>
          <aside className="c1-method__visual" data-reveal>
            <figure className="c1-figure">
              <img src={method.visual.src} alt="" loading="lazy" decoding="async" />
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
      <section className="c1-band" id="why-certification">
        <img
          className="c1-band__img"
          data-parallax
          src={showcaseBand.src}
          alt=""
          loading="lazy"
          decoding="async"
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
          {[0, 1, 2, 3, 4].map((copy) =>
            successStories.people.map((s) => (
              <article
                className="c1-story"
                key={`${copy}-${s.name}-${s.badge}`}
                aria-hidden={copy !== 2}
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
                      decoding="async"
                      draggable={false}
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
        <div className="c1-action-bar" style={{ marginTop: "28px" }} data-reveal>
          <div className="c1-action-bar__info">
            <div className="c1-action-bar__title">Ready to write your esports story?</div>
            <div className="c1-action-bar__sub">Join athletes training under India's official national esports framework.</div>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button type="button" className="c1-btn c1-btn--gold" onClick={() => openRegisterModal()}>
              Join The Waitlist
            </button>
            <a className="c1-btn c1-btn--ghost" href="#titles">
              Explore Our Courses
            </a>
          </div>
        </div>
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
                      decoding="async"
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
          <div style={{ display: "flex", gap: "14px", marginTop: "24px", flexWrap: "wrap" }}>
            <Magnet padding={80} strength={3}>
              <button
                type="button"
                className="c1-btn c1-btn--gold"
                onClick={() => openRegisterModal()}
              >
                Join The Waitlist
              </button>
            </Magnet>
            <a className="c1-btn c1-btn--ghost" href="#titles">
              Explore Our Courses
            </a>
          </div>
        </div>
        <TiltCard className="c1-cert__tilt" amplitude={12}>
          <Certificate doc={certification.doc} />
        </TiltCard>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="c1-faq" id="faq">
        <div className="c1-faq__head" data-reveal>
          <p className="c1-kicker">
            <ScrambleText text="What Parents Actually Ask" />
          </p>
          <h2 className="c1-h2">FAQ</h2>
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

      {/* ───────── COURSERA-STYLE RICH SEO FOOTER ───────── */}
      <SeoFooter />
    </div>
  );
}

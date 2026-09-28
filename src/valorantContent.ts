// Valorant course landing page content.
// Replace or license the placeholder Riot agent and map artwork before launch.

// Valorant brand red, used as the lead accent on the course pages alongside the
// house gold. Kept here so both versions reference the same value.
export const valRed = "#FF4655";

export const vHero = {
  eyebrow: "Valorant · India's road to the world stage",
  // rendered word-by-word; the gold span is applied to the second line
  headlineTop: "The certified road",
  headlineGold: "to Radiant.",
  sub: "India has the raw talent to compete with the world. What it's never had is a certified path to get there. Fifteen sessions of world-standard team tactics, graded against a national framework, with the federation's pipeline waiting at the top.",
  ctaPrimary: "Join The Waitlist",
  ctaSecondary: "Explore Our Courses",
  lockup: ["Gosu x SPEFL", "Bharat Esports"],
  priceShort: "₹10,000",
  mrpShort: "₹15,000",
};

// B. Credibility bar — five hard numbers.
export const vCred = [
  { n: "15", l: "Sessions · 30 hours" },
  { n: "50%+", l: "Practical play" },
  { n: "7", l: "Graded skills" },
  { n: "95%", l: "Hit their target rank" },
  { n: "1", l: "Final Showcase" },
];

// C. Why you're stuck.
export const vPain = {
  kicker: "Why you're hardstuck",
  title: "It's not your aim. It's your systems.",
  lead: "Past a certain point, most players already have the mechanics. What's missing is the structure that organised teams take for granted.",
  items: [
    {
      title: "You out-aim, then lose the round",
      body: "Good duels, no trades. Without spacing and timing, individual frags don't convert to round wins.",
      fix: "Phase 2 drills trading and spacing until your frags actually win rounds. You learn to duel with your team, not next to it.",
    },
    {
      title: "No plan past the buy",
      body: "You improvise every round. No defaults, no win conditions, no read on what the defence is doing.",
      fix: "You build defaults, win conditions, and mid-round reads, so every round runs on a plan instead of a coin flip.",
    },
    {
      title: "Comms are noise",
      body: "Five people talking, no hierarchy. The right call arrives too late to act on.",
      fix: "We install a comms hierarchy and callout structure, so the one call that matters lands in time to act on.",
    },
  ],
};

// D. What you'll learn — the curriculum. 15 sessions across 5 phases.
// `img` points at a Valorant asset that colours each phase.
export const vCurriculum = {
  kicker: "The world-class curriculum",
  title: "15 sessions. 5 phases. Zero filler.",
  lead: "Scenario-led, the way real teams train. Less lecture, more reps.",
  phases: [
    {
      px: "Phase 1 · Sessions 1–2",
      title: "Team Identity & Communication",
      points: [
        "Building a competitive team identity: playstyle, win conditions, roles",
        "Communication systems & information hierarchy",
      ],
      img: "/valorant/agents/sova-portrait.webp",
      map: "/valorant/maps/ascent-mini.webp",
      accent: "#355285",
    },
    {
      px: "Phase 2 · Sessions 3–6",
      title: "Tactical Fundamentals",
      points: [
        "Trading & spacing systems",
        "Defaulting & map control",
        "Mid-round decision making",
        "Attacking site executions",
      ],
      img: "/valorant/agents/jett-portrait.webp",
      map: "/valorant/maps/bind-mini.webp",
      accent: "#25607a",
    },
    {
      px: "Phase 3 · Sessions 7–9",
      title: "Advanced Systems",
      points: [
        "Defensive systems & space management",
        "Utility theory & resource management",
        "Retakes & post-plants",
      ],
      img: "/valorant/agents/cypher-portrait.webp",
      map: "/valorant/maps/haven-mini.webp",
      accent: "#2f5078",
    },
    {
      px: "Phase 4 · Sessions 10–12",
      title: "Adaptation & Performance",
      points: [
        "Anti-stratting & adaptation",
        "Clutch play & pressure situations",
        "Advanced team coordination",
      ],
      img: "/valorant/agents/reyna-portrait.webp",
      map: "/valorant/maps/lotus-mini.webp",
      accent: "#662d62",
    },
    {
      px: "Phase 5 · Sessions 13–15",
      title: "Assessment & Showcase",
      points: [
        "VOD review & tactical development · full team practice day",
        "Competitive Assessment & Showcase: a graded 5v5 against a comparable-rank opponent, with individual and team reporting that feeds the national federation's pipeline",
      ],
      img: "/valorant/agents/phoenix-portrait.webp",
      map: "/valorant/maps/split-mini.webp",
      accent: "#74321c",
    },
  ],
  radar: {
    tag: "On the radar",
    body: "Do well in the final Showcase and your graded report goes in front of Bharat Esports, India's national esports federation. That's real scouting and a route into the national pipeline: the bridge from ranked to represented.",
  },
  competenciesLead: "Every session is graded against seven competencies:",
  competencies: [
    {
      c: "C1",
      label: "Team identity & culture",
      desc: "Your team's playstyle, roles, and win conditions — the identity every default and execute is built on.",
    },
    {
      c: "C2",
      label: "Communication & information systems",
      desc: "A comms hierarchy and callout structure, so raw information turns into decisions fast enough to use.",
    },
    {
      c: "C3",
      label: "Trading, spacing & execution",
      desc: "The positioning and timing that turn individual frags into rounds actually won.",
    },
    {
      c: "C4",
      label: "Strategic & tactical thinking",
      desc: "Reading the round, picking your win condition, and adapting the plan mid-round instead of freezing.",
    },
    {
      c: "C5",
      label: "Defensive & retake systems",
      desc: "Holding sites, managing space, and taking sites back with coordinated utility, not hope.",
    },
    {
      c: "C6",
      label: "Competitive performance",
      desc: "Clutch play and clean decisions under real scoreboard pressure, when it's easiest to tilt.",
    },
    {
      c: "C7",
      label: "Professional team conduct",
      desc: "The habits and attitude that make a roster worth signing — reviewed and on the record.",
    },
    {
      c: "★",
      label: "Final Showcase: graded, on the record",
      desc: "A graded 5v5 against a comparable-rank opponent, with a report that feeds the national federation's pipeline.",
    },
  ],
};

// E. The certified outcome.
export const vCert = {
  kicker: "What you walk away with",
  title: "A credential, and the game to back it.",
  body1:
    "Clear the benchmarks and the final Showcase, and you earn the Gosu Academy × SPEFL-SC Valorant Advanced certificate, issued with SPEFL-SC, India's national skilling council and mapped toward the national skills framework. It's proof you trained and were assessed to a real standard, not a participation badge.",
  body2:
    "You also leave with a documented set of team executes, a self-analysis habit built on VOD review, and a graded performance report you can show an org.",
  card: {
    seal: "SPEFL",
    title: "Valorant Advanced · Certified",
    line: "Gosu Academy × SPEFL-SC. Skill Level 2 on the national ladder.",
    fine: "SPEFL-SC certified at launch. NSQF credit-alignment in progress.",
  },
  // Specimen document rendered by <Certificate/>.
  doc: {
    id: "GSA-VAL-26-0001",
    level: "Skill Level 2",
    title: "Valorant Advanced",
    body: "has completed the 15-session, 30-hour Valorant Advanced season and passed the graded Competitive Showcase, assessed against the SPEFL-SC seven-competency framework.",
  },
};

// F. How it works.
export const vHow = {
  kicker: "How it works",
  title: "Four weeks. Real coaching. Real reps.",
  facts: [
    { n: "15 × 2hr", l: "Live sessions" },
    { n: "~4 wks", l: "7–8 hrs / week" },
    { n: "50%+", l: "Scrims & drills" },
    { n: "India", l: "Region servers" },
    { n: "Hi / En", l: "Your choice" },
    { n: "5v5", l: "Team format" },
  ],
};

// G. The coach.
export const vCoach = {
  kicker: "Your coach",
  title: "Taught by someone who's been there.",
  body:
    "International standard, Indian on the floor. Sessions run in Hindi or English, with guest masterclasses from Gosu's global roster. You're not watching pre-recorded videos. This is live coaching with a coach who reviews your actual games.",
  name: "[Head Coach name]",
  role: "Valorant · Head Coach",
  note:
    "Your India head coach — a player who's competed in Valorant and Counter-Strike at the top of the region — is being announced soon. They run your weekly sessions and review your actual games, backed by Gosu's global bench below.",
  // agent art standing in for the coach portrait placeholder
  portrait: "/valorant/agents/omen-portrait.webp",
};

// G2. The global coaching bench — our live international Gosu roster.
// Real coaches from the Gosu Academy Valorant coaching page; headshots in public/coaches/.
// This is the international half of the India roster; the local half stays a placeholder.
export const vRoster = {
  kicker: "Gosu's global bench",
  title: "Masterclasses from the coaches behind the world's teams.",
  lead:
    "Beyond your head coach, your season includes guest masterclasses from Gosu's international staff — the coaches behind G2, fnatic, T1, Cloud9 and more.",
  coaches: [
    {
      name: "Neilzinho",
      role: "FPS Veteran",
      note: "Coached G2 Esports, FunPlus Phoenix and now Heretics.",
      img: "/coaches/neilzinho.png",
    },
    {
      name: "ANDERZZ",
      role: "Valorant Coach",
      note: "Known for his work with VersionX and fnatic.",
      img: "/coaches/anderzz.png",
    },
    {
      name: "Blue",
      role: "Valorant Coach",
      note: "Has coached 30+ teams across a five-year career.",
      img: "/coaches/blue.png",
    },
    {
      name: "Curry",
      role: "Ex-CS:GO Pro",
      note: "Valorant pro, with stints at T1 and Cloud9.",
      img: "/coaches/curry.png",
    },
    {
      name: "Fields",
      role: "Strategist",
      note: "Valorant strategist for individuals and pro teams.",
      img: "/coaches/fields.png",
    },
    {
      name: "Ibrahim Alshuwairekh",
      role: "Assistant Coach",
      note: "Top-200 EU, and a first-place, MVP run at a regional university championship. Preps MENA teams on comms and match readiness.",
      img: "/coaches/ibrahim.png",
    },
  ],
  note: "That's the international half of the bench. Your local India head coach and support staff are being announced soon.",
};

// H. Proof.
export const vProof = {
  kicker: "Proof",
  title: "Players we coached onto pro and national teams.",
  stories: [
    {
      badge: "Reached the pro scene",
      name: "Hamad T.",
      meta: "Valorant · Immortal 3",
      quote:
        "Finished top of his Academy cohort and became the only student to go on and compete in the professional scene, playing for The Spark.",
      photo: "/success/hamad.png",
    },
    {
      badge: "MVP & tournament winner",
      name: "Wael A.",
      meta: "Valorant · Immortal 3 · IGL",
      quote:
        "Ran the team as in-game leader, then took MVP and first place at the EWC Academy tournament off the back of it.",
      photo: "/success/wael.png",
    },
    {
      badge: "Podium + rank climb",
      name: "Zeyad A.",
      meta: "Valorant · Immortal",
      quote:
        "Climbed the ranked ladder fast and placed third at the EWC Academy tournament, while helping the players around him get better too.",
      photo: "/success/zeyad.png",
    },
  ],
  note: "Real Gosu Academy Valorant alumni. India's first cohorts start now.",
};

// I. Pricing.
export const vPrice = {
  kicker: "Enrol",
  title: "Invest in your competitive breakthrough.",
  mrp: "₹15,000",
  body:
    "Lock in inaugural cohort pricing with flexible bank-side EMI options available. Bring your full 5-player roster on the squad rate for maximum team savings. Less than 0.5% of Gosu students ever ask for a refund, and our inaugural cohorts are opening soon—join now to lock in priority access.",
  card: {
    title: "Valorant Advanced",
    mrp: "₹15,000",
    amount: "₹10,000",
    unit: "/ season",
    discount: "Save ₹5,000 (33% off)",
    emi: "Bank-side EMI available via partner cards",
    statusBadge: "Coming Soon",
    includes: [
      "15 live sessions · 30 hours",
      "50%+ scrims, drills & VOD review",
      "Player workbook & review logs",
      "Graded Competitive Showcase",
      "SPEFL-SC Valorant Advanced certificate",
    ],
  },
  squad: {
    tag: "Squad rate",
    title: "Enrol your 5-stack roster",
    mrp: "₹75,000",
    amount: "₹45,000",
    unit: "/ squad (5 players)",
    line: "Five players, one team price. Save ₹5,000 versus enrolling one by one (₹9,000/player).",
  },
  ctaPrimary: "Join The Waitlist",
  ctaSecondary: "Explore Our Courses",
};

// J. Parent mini-bridge.
export const vParent = {
  kicker: "Show your parents",
  title: "Fixed hours. Real coach. Nationally Accredited certificate.",
  body:
    "This is a fixed-schedule programme with a coach, weekly hours, and a nationally accredited certificate at the end, and Valorant skills sit inside a wider esports industry that hires coaches, analysts, and organisers, not only players.",
  cta: "Coming Soon",
  points: [
    "Nationally Accredited by SPEFL-SC, India's sports & fitness skills council",
    "Fixed weekly hours and a named coach who reports on progress",
    "Career paths beyond playing: coaching, analysis, and event operations",
    "Flexible zero-interest EMI options with instant bank approval. Hindi & English cohorts.",
  ],
  card: {
    seal: "SPEFL",
    title: "A credential, not a receipt",
    line: "Gosu Academy × SPEFL-SC, mapped toward India's national skills framework.",
    fine: "NSQF credit-alignment in progress.",
  },
};

// K. FAQ.
export const vFaq = [
  {
    q: "What rank is this for?",
    a: "We run separate cohorts by skill level, so you train with players around your rank instead of being dropped into a mismatch. Tell us where you're at on the free assessment and we'll place you in the right one. Newer to the game? Start in the free cup and Foundation resources first.",
  },
  {
    q: "Do I need a full team to join?",
    a: "No. You can enrol solo and we place you with a cohort, or bring your own five. The Showcase runs 5v5 against a comparable-rank opponent.",
  },
  {
    q: "What exactly is the certificate?",
    a: "The Gosu Academy × SPEFL-SC Valorant Advanced certificate, issued with India's apex esports skills council (SPEFL-SC), mapped toward the national skills framework. Full NSQF credit-alignment is in progress.",
  },
  {
    q: "Is it live or recorded?",
    a: "Live. 15 sessions of two hours each, more than half spent in scrims, drills, and review of your own VODs.",
  },
  {
    q: "Hindi or English?",
    a: "Both. Pick what you're most comfortable thinking in.",
  },
];

// L. Final CTA.
export const vFinal = {
  kicker: "The road to Radiant",
  title: "Stop grinding alone.",
  body:
    "Inaugural cohorts are opening soon. Join the waitlist to secure your priority assessment, or explore our curriculum.",
  ctaPrimary: "Join The Waitlist",
  ctaSecondary: "Explore Our Courses",
  note: "Bank-side EMI available · Hindi & English · India-region servers",
  bg: "/valorant/maps/sunset-splash.webp",
};

export const vDisclaimer =
  "Gosu Academy × SPEFL-SC × Bharat Esports. SPEFL-SC certified at launch; NSQF credit-alignment in progress. Curriculum from the Gosu Academy Valorant Advanced framework. Hindi & English · India-region servers. Agent and map art © Riot Games — placeholder for design.";

// BGMI course landing page content.
// Replace or license the placeholder game artwork and confirm final pricing,
// coach details, and alumni stories before launch.

// BGMI lead accent (battle-royale orange), used alongside the house gold.
export const bgmiAccent = "#ff8a2a";

export const bHero = {
  eyebrow: "BGMI · India's road to the world stage",
  // rendered line-by-line; the gold span is applied to the second line
  headlineTop: "Become a professional",
  headlineGold: "BGMI player.",
  sub: "India has one of the deepest BGMI talent pools on earth. What it's never had is a certified path from ranked lobbies to a real roster. Fifteen sessions of tournament-grade squad play, graded against a national framework, with the federation's pipeline waiting at the top.",
  ctaPrimary: "Join The Waitlist",
  ctaSecondary: "Explore Our Courses",
  lockup: ["Gosu x SPEFL", "Bharat Esports"],
  priceShort: "₹10,000",
  mrpShort: "₹15,000",
};

// B. Credibility bar — five hard numbers.
export const bCred = [
  { n: "15", l: "Sessions · 30 hours" },
  { n: "50%+", l: "Scrims & drills" },
  { n: "7", l: "Graded skills" },
  { n: "95%", l: "Hit their target tier" },
  { n: "1", l: "Tournament Assessment" },
];

// C. Why you're stuck.
export const bPain = {
  kicker: "Why you're stuck",
  title: "It's not your gunskill. It's your squad's systems.",
  lead: "Past a certain point most squads already have the mechanics. What's missing is the structure real tournament teams take for granted.",
  items: [
    {
      title: "You win fights, then die to the zone",
      body: "Great gunskill, bad timing. Without rotation plans and zone reads, won fights still end in a losing final circle.",
      fix: "Phase 3 drills zone prediction and rotation timing until you're the squad already holding position when the circle closes.",
    },
    {
      title: "No plan past the drop",
      body: "You land, loot, and improvise. No default rotations, no roles, no read on where the lobby is collapsing.",
      fix: "You build drop plans, rotation defaults, and mid-game reads, so every match runs on a plan instead of a scramble.",
    },
    {
      title: "Four people, four calls",
      body: "Everyone talks at once and nobody IGLs. The call that matters gets buried in the noise.",
      fix: "We install an IGL structure and a comms hierarchy, so the one call that wins the fight lands in time to act on.",
    },
  ],
};

// D. What you'll learn — 15 sessions across 5 phases. `accent` tints each
// phase's graphic panel (no image assets).
export const bCurriculum = {
  kicker: "The tournament curriculum",
  title: "15 sessions. 5 phases. Zero filler.",
  lead: "Scenario-led, the way real tournament teams train. Less lecture, more reps.",
  phases: [
    {
      px: "Phase 1 · Sessions 1–2",
      title: "Team Identity & Communication",
      points: [
        "Competitive roles — IGL, fragger, support, scout — and who calls what",
        "Comms hierarchy and information systems under fire",
      ],
      accent: "#355285",
      map: "/bgmi/maps/erangel.webp",
    },
    {
      px: "Phase 2 · Sessions 3–6",
      title: "The Early Game",
      points: [
        "Drop planning & landing spots",
        "Early-game survival and loot economy",
        "Reading the plane and the first rotations",
        "Winning the opening fights that set up your game",
      ],
      accent: "#a8571e",
      map: "/bgmi/maps/miramar.webp",
    },
    {
      px: "Phase 3 · Sessions 7–9",
      title: "Map & Movement",
      points: [
        "Zone prediction & map reading",
        "Rotation systems and holding position",
        "Vehicle play and safe repositioning",
        "Scouting and tracking the lobby",
      ],
      accent: "#25607a",
      map: "/bgmi/maps/sanhok.webp",
    },
    {
      px: "Phase 4 · Sessions 10–12",
      title: "Combat & Compounds",
      points: [
        "Team-fighting and trade discipline",
        "Compound control and holding buildings",
        "Breaches, nade line-ups, and offense",
        "Mid-game decision making",
      ],
      accent: "#662d62",
      map: "/bgmi/maps/vikendi.webp",
    },
    {
      px: "Phase 5 · Sessions 13–15",
      title: "End-game & Assessment",
      points: [
        "End-game execution in the final circles",
        "VOD review & tournament prep · full squad practice day",
        "Tournament Assessment: a graded tournament-style match with individual and squad reporting that feeds the national federation's pipeline",
      ],
      accent: "#74321c",
      map: "/bgmi/maps/erangel.webp",
    },
  ],
  radar: {
    tag: "On the radar",
    body: "Do well in the final Tournament Assessment and your graded report goes in front of Bharat Esports, India's national esports federation. That's real scouting and a route into the national pipeline: the bridge from ranked lobbies to a real roster.",
  },
  competenciesLead: "Every session is graded against seven competencies:",
  competencies: [
    {
      c: "C1",
      label: "Team identity & roles",
      desc: "Your squad's playstyle and the IGL / fragger / support / scout roles every rotation and fight is built on.",
    },
    {
      c: "C2",
      label: "Communication & information systems",
      desc: "A comms hierarchy and callout structure, so what you see turns into a decision fast enough to use.",
    },
    {
      c: "C3",
      label: "Positioning, rotations & zone play",
      desc: "Reading the circle and moving early, so you hold the position instead of fighting for it.",
    },
    {
      c: "C4",
      label: "Strategic & mid-game decisions",
      desc: "Picking your fights and your win condition, and adapting the plan when the lobby collapses.",
    },
    {
      c: "C5",
      label: "Combat & compound control",
      desc: "Team-fighting, breaching, and holding buildings with coordinated utility, not hope.",
    },
    {
      c: "C6",
      label: "Competitive performance",
      desc: "Clean execution in the final circles under real tournament pressure, when it's easiest to panic.",
    },
    {
      c: "C7",
      label: "Professional team conduct",
      desc: "The habits and attitude that make a squad worth signing — reviewed and on the record.",
    },
    {
      c: "★",
      label: "Final Tournament Assessment: graded, on the record",
      desc: "A graded tournament-style match with a report that feeds the national federation's pipeline.",
    },
  ],
};

// E. The certified outcome.
export const bCert = {
  kicker: "What you walk away with",
  title: "A credential, and the game to back it.",
  body1:
    "Clear the benchmarks and the final Tournament Assessment, and you earn the Gosu Academy × SPEFL-SC BGMI Advanced certificate, issued with SPEFL-SC, India's national skilling council and mapped toward the national skills framework. It's proof you trained and were assessed to a real standard, not a participation badge.",
  body2:
    "You also leave with a documented set of drop plans and rotations, a self-analysis habit built on VOD review, and a graded performance report you can show an org.",
  card: {
    seal: "SPEFL",
    title: "BGMI Advanced · Certified",
    line: "Gosu Academy × SPEFL-SC. Skill Level 2 on the national ladder.",
    fine: "SPEFL-SC certified at launch. NSQF credit-alignment in progress.",
  },
  // Specimen document rendered by <Certificate/>.
  doc: {
    id: "GSA-BGM-26-0001",
    level: "Skill Level 2",
    title: "BGMI Advanced",
    body: "has completed the 15-session, 30-hour BGMI Advanced season and passed the graded Tournament Assessment, assessed against the SPEFL-SC seven-competency framework.",
  },
};

// F. How it works.
export const bHow = {
  kicker: "How it works",
  title: "Four weeks. Real coaching. Real reps.",
  facts: [
    { n: "15 × 2hr", l: "Live sessions" },
    { n: "~4 wks", l: "7–8 hrs / week" },
    { n: "50%+", l: "Scrims & drills" },
    { n: "India", l: "Region servers" },
    { n: "Hi / En", l: "Your choice" },
    { n: "Squad", l: "4-player format" },
  ],
};

// G. The coach.
export const bCoach = {
  kicker: "Your coach",
  title: "Taught by someone who's been there.",
  body:
    "International standard, Indian on the floor. Sessions run in Hindi or English, with guest masterclasses from Gosu's global roster. You're not watching pre-recorded videos. This is live coaching with a coach who reviews your actual matches.",
  name: "[Head Coach name]",
  role: "BGMI · Head Coach",
  // official PUBG key art (soldier) as a placeholder coach portrait
  portrait: "/bgmi/art/squad.webp",
  note:
    "An Indian coach who's competed in BGMI at the top of the region and run tournament squads, and the one who breaks down the meta when a new map or update drops.",
};

// H. Proof.
export const bProof = {
  kicker: "Proof",
  title: "Squads we coached onto tournament and national rosters.",
  stories: [
    {
      badge: "Signed to a roster",
      name: "[Player name]",
      meta: "BGMI · Mumbai",
      quote:
        "Hardstuck in the same lobbies for a year until the rotations and IGL work clicked. Conqueror in a season, then a Tier-2 tryout off the Assessment report.",
      art: "/bgmi/art/interior.webp",
    },
    {
      badge: "National qualifier",
      name: "[Squad name]",
      meta: "BGMI · Delhi",
      quote:
        "The graded report fed straight into the federation pipeline. First time there was an actual bridge from ranked to the tournament scene.",
      art: "/bgmi/maps/miramar.webp",
    },
    {
      badge: "Conqueror in a season",
      name: "[Player name]",
      meta: "BGMI · Pune",
      quote:
        "पहली बार किसी ने मेरे अपने मैच खोलकर दिखाया कि रोटेशन कहाँ गलत था। वहीं से सब बदल गया।",
      art: "/bgmi/maps/vikendi.webp",
    },
  ],
  note: "Placeholder case studies. Real BGMI alumni who made tournament and national rosters go here at launch.",
};

// I. Pricing — individual price + a 4-player squad rate.
export const bPrice = {
  kicker: "Enrol",
  title: "Built for squads ready to dominate the lobby.",
  mrp: "₹15,000",
  body:
    "Lock in inaugural cohort pricing with flexible bank-side EMI options available. Bring your whole squad to train as a unit and unlock exclusive roster savings. Less than 0.5% of Gosu students ever ask for a refund, and our inaugural cohorts are opening soon—join now to lock in priority access.",
  card: {
    title: "BGMI Advanced",
    mrp: "₹15,000",
    amount: "₹10,000",
    unit: "/ season",
    discount: "Save ₹5,000 (33% off)",
    emi: "Bank-side EMI available via partner cards",
    includes: [
      "15 live sessions · 30 hours",
      "50%+ scrims, drills & VOD review",
      "Squad workbook & review logs",
      "Graded Tournament Assessment",
      "SPEFL-SC BGMI Advanced certificate",
    ],
  },
  squad: {
    tag: "Squad rate",
    title: "Enrol your four",
    mrp: "₹60,000",
    amount: "₹36,000",
    unit: "/ squad (4 players)",
    line: "Four players, one price. Save ₹4,000 versus enrolling one by one (₹9,000/player).",
  },
  ctaPrimary: "Join The Waitlist",
  ctaSecondary: "Explore Our Courses",
};

// J. Parent mini-bridge.
export const bParent = {
  kicker: "Show your parents",
  title: "Fixed hours. Real coach. Nationally Accredited certificate.",
  body:
    "This is a fixed-schedule programme with a coach, weekly hours, and a nationally accredited certificate at the end, and BGMI skills sit inside a wider esports industry that hires coaches, analysts, and organisers, not only players.",
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
export const bFaq = [
  {
    q: "What tier is this for?",
    a: "We run separate cohorts by skill level, so you train with squads around your tier instead of a mismatch. Tell us where you're at on the free assessment and we'll place you right. Newer to competitive? Start in the free scrims and Foundation resources first.",
  },
  {
    q: "Do I need a full squad to join?",
    a: "No. You can enrol solo and we place you with a squad, or bring your own four on the squad rate. The Tournament Assessment runs as a tournament-style match against comparable-tier opponents.",
  },
  {
    q: "What exactly is the certificate?",
    a: "The Gosu Academy × SPEFL-SC BGMI Advanced certificate, issued with India's apex esports skills council (SPEFL-SC), mapped toward the national skills framework. Full NSQF credit-alignment is in progress.",
  },
  {
    q: "Is it live or recorded?",
    a: "Live. 15 sessions of two hours each, more than half spent in scrims, drills, and review of your own matches.",
  },
  {
    q: "Hindi or English?",
    a: "Both. Pick what you're most comfortable thinking in.",
  },
];

// L. Final CTA.
export const bFinal = {
  kicker: "The road to Conqueror",
  title: "Stop grinding lobbies alone.",
  body:
    "Inaugural cohorts are opening soon. Join the waitlist to secure priority placement, or explore our curriculum.",
  ctaPrimary: "Join The Waitlist",
  ctaSecondary: "Explore Our Courses",
  note: "Bank-side EMI available · Hindi & English · India-region servers",
  bg: "/bgmi/art/deadwood.webp",
};

export const bDisclaimer =
  "Gosu Academy × SPEFL-SC × Bharat Esports. SPEFL-SC certified at launch; NSQF credit-alignment in progress. Curriculum from the Gosu Academy BGMI Advanced framework. Hindi & English · India-region servers. Map and key art © KRAFTON / PUBG — placeholder for design.";

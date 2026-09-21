// Certified Esports Tournament Organizer (Foundation) course content for
// /tournament-ops. Confirm the final curriculum claims, instructor, alumni
// stories, and pricing before launch.
//
// The images in public/tournament/ are AI-generated placeholder concepts.
// Replace them with approved event photography before launch.

// Tournament Ops lead accent (broadcast blue, from the homepage track card).
export const toAccent = "#4fb4ff";

export const tHero = {
  eyebrow: "Career track · Tournament operations",
  headlineTop: "Start your career as",
  headlineGold: "a tournament organizer.",
  sub: "India hosted 275+ large esports tournaments last year, and behind every one of them is someone holding the bracket, the rulebook, and the payout together. Fifteen sessions of real event craft, a capstone tournament you actually run, and a certificate from India's government skills council.",
  ctaPrimary: "Enroll for ₹5,000",
  ctaSecondary: "Book a free assessment call",
  lockup: ["Gosu Academy", "SPEFL-SC", "Bharat Esports"],
  priceShort: "₹5,000",
};

// B. Credibility bar — five hard numbers.
export const tCred = [
  { n: "15", l: "Sessions · 30 hours" },
  { n: "11", l: "Stages in the event lifecycle" },
  { n: "12", l: "Rulebook components" },
  { n: "1", l: "Real tournament you run" },
  { n: "8", l: "Portfolio artifacts" },
];

// C. Why events fall apart.
export const tPain = {
  kicker: "Why events fall apart",
  title: "Anyone can make a bracket. Almost nobody can run one.",
  lead: "Every online tournament that collapses, collapses the same way. The fixes are boring, procedural, and almost nobody teaches them.",
  items: [
    {
      title: "Round one never starts",
      body: "Half the bracket doesn't show, the lobby sits waiting, and the schedule is dead twenty minutes in. A bracket seeded with no-shows is already a broken event.",
      fix: "The check-in gate: a timed confirmation window, seed only the teams that checked in, two-tier check-in for the matches that matter. Drilled live in Session 7 until it's muscle memory.",
    },
    {
      title: "One dispute and it's chaos",
      body: "A team reports the wrong score, someone cries smurf, and suddenly you're adjudicating by whoever shouts loudest in your DMs.",
      fix: "You write a full twelve-component rulebook, map the real integrity threats to mitigations, and practise ruling on evidence, with a penalty ladder you published before the event instead of inventing during it.",
    },
    {
      title: "The passion doesn't pay",
      body: "You've run twenty Discord cups for free and have nothing to show for it. No records, no sponsor, nothing an agency can actually look at.",
      fix: "You build the sponsorship deck, the budget, and a compliant payout plan. Then you graduate with a real event on your record, plus an eight-piece portfolio agencies can flip through.",
    },
  ],
};

// D. What you'll learn — 15 sessions across 5 phases.
export const tCurriculum = {
  kicker: "The organizer curriculum",
  title: "15 sessions. 5 phases. One real event.",
  lead: "Every session builds an artifact for your portfolio. By Session 14 you're not studying tournaments, you're running one.",
  phases: [
    {
      px: "Phase 1 · Sessions 1–2",
      title: "Foundations & the Event Lifecycle",
      points: [
        "The organizer's job, staffing roles, and the 11-stage event lifecycle",
        "Concept, feasibility, and a realistic budget with a contingency buffer",
        "The honest market map: who actually pays organizers in India",
      ],
      accent: "#34608c",
      art: "/tournament/phase-lifecycle.webp",
    },
    {
      px: "Phase 2 · Sessions 3–5",
      title: "Formats & Rules",
      points: [
        "Format math: single & double elimination, round robin, Swiss, and when each is right",
        "Battle royale is different: points tables, seeding, and tiebreakers for BGMI",
        "The 12-component rulebook, integrity threats, and the admin protocols behind it",
      ],
      accent: "#7a4f9a",
      art: "/tournament/phase-formats.webp",
    },
    {
      px: "Phase 3 · Sessions 6–9",
      title: "Running the Event",
      points: [
        "The grassroots tooling stack: Discord, bracket platforms, per-title private lobbies",
        "Registration, the check-in gate, and lobby control: the two mechanics that carry online events",
        "Run of show, scheduling buffers, and admin protocols on the day",
        "Disputes, anti-cheat, and adjudicating on evidence, not pressure",
      ],
      accent: "#2e7f74",
      art: "/tournament/phase-ops.webp",
    },
    {
      px: "Phase 4 · Sessions 10–12",
      title: "Broadcast & Business",
      points: [
        "The streaming pipeline: OBS → RTMP → platform, observers, overlays, and the broadcast delay",
        "Revenue models, the sponsorship deck, and what a sponsor calls ROI",
        "Prize pools, payouts, KYC, GST/TDS basics, and India's legal bright line",
      ],
      accent: "#b0672a",
      art: "/tournament/phase-broadcast.webp",
    },
    {
      px: "Phase 5 · Sessions 13–15",
      title: "Safeguarding & Capstone",
      points: [
        "Safeguarding, minors, and the compliance gates a credible organizer clears",
        "The capstone: plan and run a real online tournament, end to end",
        "Assessment & showcase: event report, portfolio review, certification pathway",
      ],
      accent: "#3f8fc9",
      art: "/tournament/phase-capstone.webp",
    },
  ],
  radar: {
    tag: "The capstone",
    body: "Session 14 is a real online tournament, with a real bracket, real check-in, and real disputes, and your cohort runs it. Everyone owns a stage of the event and gets scored running it live: organizer, head admin, match admin, lobby host, moderator, observer. You leave with an event on your record and the report to prove it.",
  },
  // The operational-loop strip rendered under the capstone callout.
  loop: {
    label: "The operational loop, drilled until it's boring",
    steps: [
      "Register",
      "Check-in",
      "Seed",
      "Lobby",
      "Play",
      "Report",
      "Adjudicate",
      "Advance",
      "Pay out",
    ],
  },
  competenciesLead: "Every session is graded against seven competencies:",
  competencies: [
    {
      c: "C1",
      label: "Concept, planning & budget",
      desc: "Walk an event through the 11-stage lifecycle, from purpose to payout, with a budget that survives contact with reality.",
    },
    {
      c: "C2",
      label: "Formats & bracket design",
      desc: "The match-count math behind elimination, round robin, and Swiss, plus battle-royale points tables, seeding, and the correct tiebreakers.",
    },
    {
      c: "C3",
      label: "Rulebook & integrity",
      desc: "An enforceable twelve-component rulebook, integrity threats mapped to mitigations, and a consistent penalty ladder.",
    },
    {
      c: "C4",
      label: "Tooling & live operations",
      desc: "The nine-step operational loop end to end: check-in gates, private lobbies, run of show, and recovering when things break live.",
    },
    {
      c: "C5",
      label: "Broadcast coordination",
      desc: "The OBS → RTMP pipeline, observers, overlays, and why the broadcast delay exists. Enough to run a stream without running every desk.",
    },
    {
      c: "C6",
      label: "The business",
      desc: "Revenue models, a sponsorship proposal a brand would actually read, and a prize payout that clears KYC and tax.",
    },
    {
      c: "C7",
      label: "Safeguarding & compliance",
      desc: "Duty of care, handling minors correctly, India's legal bright line, and knowing when to call a professional.",
    },
    {
      c: "★",
      label: "Capstone + portfolio: a real event, on the record",
      desc: "You run a real tournament and submit an eight-piece event portfolio, scored across all seven competencies. That's the certificate, and the first line of your CV.",
    },
  ],
};

// E. The certified outcome.
export const tCert = {
  kicker: "What you walk away with",
  title: "A credential, and an event on your record.",
  body1:
    "Clear the benchmarks and the capstone, and you earn the Gosu Academy × SPEFL-SC Certified Esports Tournament Organizer (Foundation), issued with India's government skills council for a job no Indian qualification covers yet. Graded on running a real event, not on a written test.",
  body2:
    "You also leave with the portfolio the market actually hires on: an event plan and budget, a format decision with its math, a full rulebook, a run of show, a sponsorship deck, payout and safeguarding checklists, and your capstone event report.",
  card: {
    seal: "SPEFL",
    title: "Tournament Organizer · Foundation",
    lv: "Foundation",
    line: "Gosu Academy × SPEFL-SC. The first rung of India's event-operations ladder.",
    fine: "SPEFL-SC certified at launch. NSQF credit-alignment in progress.",
  },
  // Specimen document rendered by <Certificate/>.
  doc: {
    id: "GSA-TOF-26-0001",
    level: "Foundation",
    title: "Esports Tournament Organizer",
    body: "has completed the 15-session, 30-hour Certified Esports Tournament Organizer (Foundation) program and delivered the graded student-run capstone tournament, assessed against the SPEFL-SC competency framework.",
  },
};

// F. How it works.
export const tHow = {
  kicker: "How it works",
  title: "Two months. Real events. Real reps.",
  facts: [
    { n: "15 × 2hr", l: "Live sessions" },
    { n: "~8 wks", l: "2 sessions / week" },
    { n: "1", l: "Real event you run" },
    { n: "Online", l: "Discord + bracket stack" },
    { n: "Hi / En", l: "Your choice" },
    { n: "16+", l: "No degree needed" },
  ],
};

// G. The instructor.
export const tMentor = {
  kicker: "Your instructor",
  title: "Taught by someone who's shipped real events.",
  body:
    "Your cohort runs live with a working organizer, not a slideshow. You'll set up real check-ins, control real lobbies, and adjudicate injected disputes on live calls: the same failures that kill real events, rehearsed before your capstone instead of during it.",
  name: "Vagelis Patelis",
  role: "Tournament Ops · Lead Instructor",
  portrait: "/coaches/vagelis.png",
  note:
    "Eight years an ESL league operator and an on-site referee at majors, from the Six Invitational to the Esports World Cup. He runs the cohort's live check-ins and dispute drills.",
};

// H. Proof.
export const tProof = {
  kicker: "Proof",
  title: "Alumni who run the shows now.",
  stories: [
    {
      badge: "From student to live events",
      name: "Hamad A.",
      meta: "Live event operations",
      quote:
        "Finished the program and went straight into live-event work: hired into event management at a major entertainment destination, and a stage MC at the Esports World Cup.",
      art: "/success/career-stage.png",
    },
    {
      badge: "Officiates world events",
      name: "Dana A.",
      meta: "Officiating · Refereeing",
      quote:
        "Now referees official competitions, from the national league up to the IESF World Championship, the person keeping the ruling straight when the stakes are highest.",
      art: "/success/career-referee.png",
    },
    {
      badge: "Runs the tournaments now",
      name: "Ziad A.",
      meta: "Tournament operations",
      quote:
        "Organised two full tournaments across different titles, owning the format, the bracket, and the payout, and building events his community keeps turning up for.",
      art: "/success/career-events.png",
    },
  ],
  note: "Real Gosu Academy career-track alumni. India's first cohorts start now.",
};

// I. Pricing.
export const tPrice = {
  kicker: "Enrol",
  title: "₹5,000. Your first event included.",
  body:
    "One payment, everything included. You spend the course building the artifacts agencies actually ask for, and you graduate having run a real tournament. Most people pay for that experience in failed events. Under 0.5% of Gosu students ever ask for a refund, and the assessment call is free.",
  card: {
    title: "Tournament Organizer · Foundation",
    amount: "₹5,000",
    unit: "/ course",
    emi: "one-time · no hidden costs",
    includes: [
      "15 live sessions · 30 hours",
      "Format math, rulebook & run-of-show builds",
      "Operations logs & artifact templates",
      "Capstone: a real tournament you run",
      "Eight-piece event portfolio",
      "SPEFL-SC Certified Tournament Organizer (Foundation)",
    ],
  },
  ctaPrimary: "Enroll now",
  ctaSecondary: "Book the free call first",
};

// I2. Career-ladder band under pricing.
export const tLadder = {
  tag: "Where it leads",
  line: "Foundation is the first, stackable rung. A Level 2 track, LAN and large-event production, is the natural next step.",
  rungs: [
    "Foundation organizer · admin",
    "Ops coordinator · league admin",
    "Operations manager",
    "Head of operations · esports director",
  ],
};

// J. Parent mini-bridge.
export const tParent = {
  kicker: "Show your parents",
  title: "Event management, for a recognised sport.",
  body:
    "Esports is officially a recognised sport in India, and the 2025 online-gaming law explicitly protects tournaments: entry fees and performance prizes are legal, betting is not. This course trains the version of that job families can already name, with operations, budgets, rules, and broadcast, and a government-recognised certificate at the end.",
  cta: "Book a free assessment call",
  points: [
    "Certified with SPEFL-SC, India's government skills council",
    "Compliance, tax basics, and safeguarding are graded competencies",
    "A real, documented event on the student's record by graduation",
    "₹5,000 one-time. Hindi or English.",
  ],
  card: {
    seal: "SPEFL",
    title: "A credential, not a receipt",
    line: "Gosu Academy × SPEFL-SC, mapped toward India's national skills framework.",
    fine: "NSQF credit-alignment in progress.",
  },
};

// K. FAQ.
export const tFaq = [
  {
    q: "Do I need experience running events?",
    a: "No. Complete beginners build a small, clean bracket first and get a full dry run before anything is thrown at them. Already run Discord cups? You'll get the bigger fields and the disruptor scenarios: a late check-in, a missing room card, an unknown account at the lobby door.",
  },
  {
    q: "What will I actually run?",
    a: "A real online tournament in Session 14, either Valorant on a bracket or BGMI on a points table. The cohort co-runs it with rotating roles, and you own a defined stage of the event: check-in, lobbies, admin desk, broadcast, or the organizer seat itself. You're scored on how your stage runs live.",
  },
  {
    q: "Is running paid tournaments even legal in India?",
    a: "Yes, and the ground just shifted in the organizer's favour. Esports is a recognised sport, and the 2025 online-gaming law that banned real-money games explicitly carved esports out: participation fees and performance-based prizes are allowed, betting on outcomes is not. The course teaches that bright line, the GST and TDS basics, and when to hand it to a professional.",
  },
  {
    q: "What exactly is the certificate?",
    a: "The Gosu Academy × SPEFL-SC Certified Esports Tournament Organizer (Foundation), issued with India's government esports skills council. No national qualification for esports organizers exists anywhere yet; this program is built to align with India's first when it lands. NSQF credit-alignment is in progress.",
  },
  {
    q: "Will this get me a job?",
    a: "The honest version: this market hires on portfolios, not certificates, and salaried seats are competitive. That's exactly why the course is built around artifacts. You graduate with eight portfolio pieces and a real event on your record, which is what freelance work, admin gigs, and agency ops roles actually screen for.",
  },
];

// L. Final CTA.
export const tFinal = {
  kicker: "Your name on the run of show",
  title: "Someone has to run the show. Make it you.",
  body:
    "Enrol in the next cohort, or book the free assessment call and see if ops is your lane. India's tournament scene is growing either way. The only question is who's running it.",
  ctaPrimary: "Enroll for ₹5,000",
  ctaSecondary: "Book a free assessment call",
  note: "₹5,000 one-time · Hindi & English · Online, live",
  bg: "/tournament/final.webp",
};

export const tDisclaimer =
  "Gosu Academy × SPEFL-SC × Bharat Esports. SPEFL-SC certified at launch; NSQF credit-alignment in progress. Curriculum from the Gosu Academy Certified Esports Tournament Organizer (Foundation) framework. Nothing on this page is legal or tax advice. Hindi & English · Online, live. Imagery is AI-generated concept art — placeholder for launch photography.";

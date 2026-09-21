// Certified Esports Coach (Foundation) course content for /coaching.
// Confirm the final curriculum claims, facilitator, alumni stories, and pricing
// before launch.
//
// The images in public/coaching/ are AI-generated placeholder concepts. Replace
// them with approved academy photography before launch.

// Coaching lead accent (hot amber — reads gold, runs hotter than the house
// gold so the two stay distinguishable side by side).
export const coachAccent = "#ffb238";

export const cHero = {
  eyebrow: "Career track · Esports coaching",
  headlineTop: "Start your career as",
  headlineGold: "an esports coach.",
  sub: "Every server has one player who reads the game better than they play it. That read is a career skill. Fifteen sessions of real coaching craft: practice design, film review, and feedback that actually lands, closed out with a live coaching practicum and a certificate from India's government skills council.",
  ctaPrimary: "Enroll for ₹4,000",
  ctaSecondary: "Book a free assessment call",
  lockup: ["Gosu Academy", "SPEFL-SC", "Bharat Esports"],
  priceShort: "₹4,000",
};

// B. Credibility bar — five hard numbers.
export const cCred = [
  { n: "15", l: "Sessions · 30 hours" },
  { n: "7", l: "Graded competencies" },
  { n: "1", l: "Live coaching practicum" },
  { n: "6", l: "Portfolio artifacts" },
  { n: "2", l: "Titles · Valorant & BGMI" },
];

// C. Why you're stuck.
export const cPain = {
  kicker: "Why you're stuck",
  title: "Knowing the game doesn't make you a coach.",
  lead: "What's missing isn't game knowledge. It's the craft around it, the part nobody on your friends list can teach you.",
  items: [
    {
      title: "You see it, but you can't prove it",
      body: "Your reads are right, your calls land, and none of it exists on paper. No portfolio, no credential, no reason for a team to trust you over the next loud voice in Discord.",
      fix: "You finish with a six-piece coaching portfolio, a scored live practicum, and a government-recognised certificate. Evidence, instead of vibes.",
    },
    {
      title: "Your feedback doesn't change anything",
      body: "You tell a player what went wrong, and next scrim they do it again. In the largest review of the evidence, over a third of feedback made performance worse, because it pointed at the player instead of the decision.",
      fix: "Session 5 teaches feedback that sticks: aim at the task, not the ego. One high-impact correction, and a coach's read on when to pause a scrim versus save it for review.",
    },
    {
      title: "Your only practice plan is “grind more”",
      body: "Ten hours of scrims with no goal is just ten hours. Squads plateau because nobody designs the practice. They just book it.",
      fix: "You build practice blocks with one to three measurable goals, basic periodization, and load management. Practice quality beats raw hours, and you'll be able to show a team why.",
    },
  ],
};

// D. What you'll learn — 15 sessions across 5 phases. `accent` tints each
// phase's graphic panel; `art` is the panel's backdrop image.
export const cCurriculum = {
  kicker: "The coaching curriculum",
  title: "15 sessions. 5 phases. A live practicum at the end.",
  lead: "Scenario-led and practice-heavy, the way real coaches develop. Less lecture, more coaching reps.",
  phases: [
    {
      px: "Phase 1 · Sessions 1–2",
      title: "Coaching Foundations & Identity",
      points: [
        "What a coach is and isn't: role boundaries with the analyst, manager, and IGL",
        "The 4Cs model of coaching effectiveness, and your own coaching philosophy",
        "The honest career map: where coaching work actually exists in India",
      ],
      accent: "#8a6a2f",
      art: "/coaching/phase-identity.webp",
    },
    {
      px: "Phase 2 · Sessions 3–6",
      title: "The Core Coaching Loop",
      points: [
        "Designing practice: deliberate-practice principles, periodization, killing the grind myth",
        "The film / VOD review method: root cause, one correction, not a list of ten",
        "Feedback that works: task vs ego, concurrent vs terminal, retiring the sandwich",
        "Running the full loop with an analyst and the right review tools",
      ],
      accent: "#b5762a",
      art: "/coaching/phase-loop.webp",
    },
    {
      px: "Phase 3 · Sessions 7–9",
      title: "Coaching People",
      points: [
        "Team culture, accountability standards, and supporting the IGL",
        "Motivation and player development built on self-determination theory",
        "Mental performance: tilt, pressure, and coaching the reset routine",
      ],
      accent: "#2f6f6a",
      art: "/coaching/phase-people.webp",
    },
    {
      px: "Phase 4 · Sessions 10–12",
      title: "Duty of Care & Applied Coaching",
      points: [
        "Player welfare: sleep, load, burnout, and what changes when you coach minors",
        "Integrity and conduct: the ESIC Anti-Corruption Code, the coaching-bug lesson",
        "Applied coaching by title: Valorant (tactical FPS) and BGMI (battle royale)",
      ],
      accent: "#6e4a8c",
      art: "/coaching/phase-care.webp",
    },
    {
      px: "Phase 5 · Sessions 13–15",
      title: "Practicum & Assessment",
      points: [
        "Assemble your coaching plan and case portfolio",
        "The practicum: coach a live scrim, from goals to intervention to reset to debrief",
        "Assessment & showcase: scored demonstration, portfolio review, certification pathway",
      ],
      accent: "#a03e32",
      art: "/coaching/phase-practicum.webp",
    },
  ],
  radar: {
    tag: "The practicum",
    body: "Session 14 isn't a quiz. You coach a live scrim while a facilitator scores you on the same rubric working coaches are held to: set the goals, observe, deliver one concurrent intervention, call a structured reset, run the debrief. Pass it, and the scored report goes into your portfolio as proof you've actually coached, not just studied coaching.",
  },
  // The weekly loop strip rendered under the radar callout.
  loop: {
    label: "The loop you'll run every single week",
    steps: ["Set goals", "Scrim", "Root-cause review", "One correction", "Next session"],
  },
  competenciesLead: "Every session is graded against seven competencies:",
  competencies: [
    {
      c: "C1",
      label: "Coaching identity & role",
      desc: "What an esports coach does and doesn't do, clear boundaries with the analyst, manager, and IGL, and a coaching philosophy you can defend.",
    },
    {
      c: "C2",
      label: "Practice & session design",
      desc: "Practice blocks with one to three measurable goals, basic periodization, and load management. Structure, instead of the grind myth.",
    },
    {
      c: "C3",
      label: "Film & VOD review",
      desc: "Root-cause reviews: what happened, why it happened, and the one correction the player can act on next map.",
    },
    {
      c: "C4",
      label: "Communication & feedback",
      desc: "Feedback aimed at the decision, not the player's character, and the judgement of when to say it live versus in review.",
    },
    {
      c: "C5",
      label: "Culture & player development",
      desc: "Culture standards, role clarity, supporting the IGL, and development plans built on motivation science that holds up.",
    },
    {
      c: "C6",
      label: "Mental performance & welfare",
      desc: "Reset routines for tilt and pressure, the seven duty-of-care pillars, and what changes when a player is under 18.",
    },
    {
      c: "C7",
      label: "Integrity & conduct",
      desc: "The ESIC Anti-Corruption Code, safeguarding basics, and professional conduct. Assessed, not assumed.",
    },
    {
      c: "★",
      label: "Live practicum + portfolio: scored, on the record",
      desc: "You coach a live scrim and submit a six-piece coaching portfolio, scored across all seven competencies. That's the certificate, and the job application.",
    },
  ],
};

// E. The certified outcome.
export const cCert = {
  kicker: "What you walk away with",
  title: "A credential, and the receipts to back it.",
  body1:
    "Clear the benchmarks and the live practicum, and you earn the Gosu Academy × SPEFL-SC Certified Esports Coach (Foundation), issued with India's government skills council and mapped to the ICCE framework real sport coaching runs on. It's the first credential of its kind in India, and it's graded, not attended.",
  body2:
    "You also leave with the portfolio that does the talking: a one-page coaching philosophy, a practice-block plan, a film-review write-up, a player-development plan, a welfare and safeguarding checklist, and your scored practicum report.",
  card: {
    seal: "SPEFL",
    title: "Esports Coach · Foundation",
    lv: "Foundation",
    line: "Gosu Academy × SPEFL-SC. The first rung on India's coaching ladder.",
    fine: "SPEFL-SC certified at launch. NSQF credit-alignment in progress.",
  },
  // Specimen document rendered by <Certificate/>.
  doc: {
    id: "GSA-CEC-26-0001",
    level: "Foundation",
    title: "Certified Esports Coach",
    body: "has completed the 15-session, 30-hour Certified Esports Coach (Foundation) program and passed the scored live coaching practicum, assessed against the SPEFL-SC competency framework.",
  },
};

// F. How it works.
export const cHow = {
  kicker: "How it works",
  title: "Two months. Real coaching reps. Scored.",
  facts: [
    { n: "15 × 2hr", l: "Live sessions" },
    { n: "~8 wks", l: "2 sessions / week" },
    { n: "50%+", l: "Coaching reps & film" },
    { n: "Online", l: "Discord + screen share" },
    { n: "Hi / En", l: "Your choice" },
    { n: "16+", l: "No degree needed" },
  ],
};

// G. The mentor.
export const cMentor = {
  kicker: "Your mentor",
  title: "Learn the craft from people paid to coach.",
  body:
    "Your cohort runs live with a working coach, not a slide deck. You'll deliver feedback, run reviews, and get your coaching reps scored on the spot, with guest masterclasses from Gosu's international roster: the same coaches who've staffed teams like G2 Esports, FunPlus Phoenix, and Heretics.",
  name: "Blue",
  role: "Coaching · Lead Facilitator",
  portrait: "/coaches/blue.png",
  note: "Has coached 30+ teams across a five-year career.",
};

// H. Proof.
export const cProof = {
  kicker: "Proof",
  title: "We know how to launch esports careers.",
  stories: [
    {
      badge: "On the broadcast desk",
      name: "Abdulaziz A.",
      meta: "Broadcast · Caster",
      quote:
        "Came through our programs and now casts national league playoffs on the main broadcast.",
      art: "/success/career-broadcast.png",
    },
    {
      badge: "Behind the biggest channels",
      name: "Abdulmalik A.",
      meta: "Content · Production",
      quote:
        "Learned the production craft with us and now runs content for creators with millions of subscribers.",
      art: "/success/career-content.png",
    },
    {
      badge: "Runs live tournaments",
      name: "Ziad A.",
      meta: "Tournament operations",
      quote:
        "Turned game knowledge into organising his own tournaments across multiple titles.",
      art: "/success/career-events.png",
    },
  ],
  note: "These alumni didn't all become coaches. They're people who came to us wanting a career in esports and got one, from the broadcast desk to the production booth. Getting you started is the whole point.",
};

// I. Pricing.
export const cPrice = {
  kicker: "Enrol",
  title: "₹4,000. The cheapest seat in the industry.",
  body:
    "One payment, everything included. Less than a season of skins, for a government-certified credential and a portfolio you can put in front of an academy. Under 0.5% of Gosu students ever ask for a refund, and the assessment call is free, so you can find out if coaching is your lane before you spend a rupee.",
  card: {
    title: "Esports Coach · Foundation",
    amount: "₹4,000",
    unit: "/ course",
    emi: "one-time · no hidden costs",
    includes: [
      "15 live sessions · 30 hours",
      "Coaching reps, film review & scenario work",
      "Participant workbook & film-review logs",
      "Live coaching practicum, scored",
      "Six-piece coaching case portfolio",
      "SPEFL-SC Certified Esports Coach (Foundation)",
    ],
  },
  ctaPrimary: "Enroll now",
  ctaSecondary: "Book the free call first",
};

// I2. Career-ladder band under pricing (the honest "where it leads" rung map).
export const cLadder = {
  tag: "Where it leads",
  line: "Foundation is the first, stackable rung. Game-specific Level 2 coach tracks build on top of it.",
  rungs: [
    "Foundation coach",
    "Level 2 · Valorant / BGMI coach",
    "Assistant coach",
    "Head coach · performance lead",
  ],
};

// J. Parent mini-bridge.
export const cParent = {
  kicker: "Show your parents",
  title: "It's a teaching job. With a certificate.",
  body:
    "Coaching is the esports career families already understand: fixed hours, a written framework, and a credential issued with a government skills council. The industry hires coaches, analysts, and mentors. That's steady work that doesn't depend on winning the pro lottery.",
  cta: "Book a free assessment call",
  points: [
    "Certified with SPEFL-SC, India's government skills council",
    "Assessed against a written framework mapped to real sport coaching (ICCE)",
    "Player welfare and safeguarding are graded competencies, not footnotes",
    "₹4,000 one-time. Hindi or English.",
  ],
  card: {
    seal: "SPEFL",
    title: "A credential, not a receipt",
    line: "Gosu Academy × SPEFL-SC, mapped toward India's national skills framework.",
    fine: "NSQF credit-alignment in progress.",
  },
};

// K. FAQ.
export const cFaq = [
  {
    q: "Do I need to have been a pro?",
    a: "No. This is a foundation-level course for anyone 16 or older with real game knowledge in Valorant or BGMI. Ex-players usually arrive with sharp instincts and blunt delivery; newcomers arrive with neither. The course is built to handle both, and the free assessment call places you honestly.",
  },
  {
    q: "Which game will I coach?",
    a: "The coaching craft is title-agnostic: the loop, feedback, and welfare work the same everywhere. Applied sessions run in Valorant and BGMI, and you pick one of the two as your title for the live practicum.",
  },
  {
    q: "What exactly is the certificate?",
    a: "The Gosu Academy × SPEFL-SC Certified Esports Coach (Foundation), issued with India's government esports skills council and mapped to the ICCE International Sport Coaching Framework. Full NSQF credit-alignment is in progress.",
  },
  {
    q: "Will this get me a job?",
    a: "Here's the honest version: nobody in esports hires on a certificate alone; they hire on proof. Salaried seats at pro orgs are scarce and we won't pretend otherwise. The real, growing demand is grassroots, academy, scholastic, and freelance coaching, and this course is built to make you employable exactly there: a credential plus a portfolio plus a scored practicum.",
  },
  {
    q: "Is it live? In which language?",
    a: "Live, always. 15 sessions of two hours each, over half spent doing coaching reps, film review, and scenario work. Sessions run in Hindi or English, whichever you think in.",
  },
];

// L. Final CTA.
export const cFinal = {
  kicker: "From player to coach",
  title: "Stop coaching for free in Discord calls.",
  body:
    "Enrol in the next cohort, or book the free assessment call and find out if coaching is your lane. Either way, your game sense deserves more than spectator mode.",
  ctaPrimary: "Enroll for ₹4,000",
  ctaSecondary: "Book a free assessment call",
  note: "₹4,000 one-time · Hindi & English · Online, live",
  bg: "/coaching/final.webp",
};

export const cDisclaimer =
  "Gosu Academy × SPEFL-SC × Bharat Esports. SPEFL-SC certified at launch; NSQF credit-alignment in progress. Curriculum from the Gosu Academy Certified Esports Coach (Foundation) framework, mapped to the ICCE International Sport Coaching Framework. Hindi & English · Online, live. Imagery is AI-generated concept art — placeholder for launch photography.";

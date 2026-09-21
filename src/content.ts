// Shared homepage content for Gosu Academy India.

export const brand = {
  name: "Gosu Academy",
  partner: "Bharat Esports",
  council: "SPEFL-SC",
  region: "India",
  domain: "gosuacademy.in",
};

export const hero = {
  eyebrow: "India's first government-certified esports academy",
  // Headline rendered word-by-word; the last word gets the gold accent.
  headline: ["Make", "esports", "your", "career"],
  headlinePlain: "Make esports your career.",
  sub: "World-class esports training, now certified by SPEFL-SC, India's government skills council. We turn esports passion and skill into recognised, paid professionals, and put India on the map of world esports.",
  ctaPrimary: "Find your path",
  ctaSecondary: "Book a free assessment",
};

// Animated count-up strip. Values must stay numeric for the CountUp / data-to targets.
export const stats = [
  { value: 28000, suffix: "+", label: "Gamers trained worldwide" },
  { value: 12, suffix: "+", label: "Countries" },
  { value: 28, suffix: "+", label: "Esports careers trained" },
  { value: 95, suffix: "%", label: "Hit their target rank" },
];

export const partnership = {
  kicker: "Why this is different",
  title: "The only academy backed by all three.",
  body: "Anyone can post coaching clips. Nobody else can put a global academy, a government skills council, and the national esports federation on the same certificate.",
  pillars: [
    {
      tag: "01",
      title: "Gosu Academy",
      logo: "/logos/gosu.png",
      mark: "",
      body: "The world-class coaching. 28,000+ players trained across 12+ countries, the same coaches behind ranked players and pro rosters worldwide, now teaching in India.",
    },
    {
      tag: "02",
      title: "SPEFL-SC",
      logo: "/logos/spefl.png",
      mark: "",
      body: "The government credential. India's sports & esports skills council. Your training maps to a recognised national skills standard, not just a course-completion badge.",
    },
    {
      // Bharat Esports has no clean logo asset online, so we pair the emblem
      // (extracted from a screenshot) with a live-text wordmark in the site font.
      tag: "03",
      title: "Bharat Esports",
      logo: "",
      mark: "/logos/bharat-mark.png",
      body: "The pathway. A direct line to national qualifiers, selection camps, and the circuits where careers actually start.",
    },
  ],
};

// Two competitive titles to master, two esports careers to build.
export const titles = [
  {
    name: "Valorant",
    tag: "Tactical FPS",
    kind: "Compete",
    accent: "#FF4655",
    img: "/games/valorant.jpg",
    focus: "center",
    bright: 1.12,
    blurb: "Agent economy, site executes, and the team systems that hold up on LAN. Finish with a graded Competitive Showcase.",
    altCta: "Free Valorant cup",
    href: "/valorant",
  },
  {
    name: "BGMI",
    tag: "Battle Royale",
    kind: "Compete",
    accent: "#F2A900",
    img: "/games/bgmi.jpg",
    focus: "right center",
    bright: 1,
    blurb: "Squad rotations, zone reads, and clutch IGL calls under fire. Closes with a tournament-style assessment.",
    altCta: "Free BGMI scrims",
    href: "/bgmi",
  },
  {
    name: "Coaching",
    tag: "Career Track",
    kind: "Build",
    accent: "#D9AB4D",
    img: "/home/track-coaching.webp",
    focus: "center 30%",
    bright: 1,
    blurb: "Turn game sense into a certified coaching career: VOD review, session design, and the system Gosu coaches use every day.",
    altCta: "Book assessment",
    href: "/coaching",
  },
  {
    name: "Tournament Ops",
    tag: "Career Track",
    kind: "Build",
    accent: "#4FB4FF",
    img: "/home/track-tournament.webp",
    focus: "center 30%",
    bright: 1,
    blurb: "Run the brackets, broadcasts, and live events that fill arenas. Graduate with a real event in your portfolio.",
    altCta: "Book assessment",
    href: "/tournament-ops",
  },
];

export const trackViewCta = "View the course";

// Pricing and program details shown in the homepage paths section.
export const programs = [
  {
    code: "TRACK 01",
    name: "Valorant",
    price: "₹15,000 · EMI",
    forWho: "A certified competitive season, the road to Radiant.",
    points: [
      "15 live sessions · 30 hours",
      "Graded Competitive Showcase",
      "SPEFL-SC certificate",
    ],
    href: "/valorant",
  },
  {
    code: "TRACK 02",
    name: "BGMI",
    price: "Squad rate available",
    forWho: "India's most-played title, coached to a national standard.",
    points: [
      "15 sessions · 30 hours",
      "Tournament-style assessment",
      "SPEFL-SC certificate",
    ],
    href: "/bgmi",
  },
  {
    code: "TRACK 03",
    name: "Coaching",
    price: "₹4,000 · one-time",
    forWho: "Turn game sense into a certified coaching career.",
    points: [
      "15 live sessions · 30 hours",
      "Live coaching practicum, scored",
      "SPEFL-SC certificate",
    ],
    href: "/coaching",
  },
  {
    code: "TRACK 04",
    name: "Tournament Ops",
    price: "₹5,000 · one-time",
    forWho: "Run the events that fill arenas.",
    points: [
      "Run a real event during the course",
      "A portfolio piece to show",
      "SPEFL-SC certificate",
    ],
    href: "/tournament-ops",
  },
];

export const method = {
  kicker: "The Gosu Method",
  title: "A national standard, taught the right way.",
  lead: "Every track runs the same four steps, whether you're training to compete or to build a career around the game. The coaching and the benchmark don't change.",
  steps: [
    {
      n: "01",
      title: "Diagnose",
      body: "We measure where you stand against a real benchmark and pinpoint exactly what to work on first.",
    },
    {
      n: "02",
      title: "Train",
      body: "A weekly plan of theory and hands-on practice, every session measured against the standard instead of guesswork.",
    },
    {
      n: "03",
      title: "Review",
      body: "Your coach breaks down your real work week by week, so each session fixes what the last one exposed.",
    },
    {
      n: "04",
      title: "Certify",
      body: "Clear the benchmarks and earn an SPEFL-SC credential, proof you trained to a national standard.",
    },
  ],
  // One-line rigor proof, folded in under the four steps (the full credential
  // ladder and seven-competency grid now live on the course pages).
  proof:
    "Every track is graded against a written framework and a final Showcase, not attendance.",
  visual: {
    src: "/home/method.webp",
    tag: "The training floor",
    caption: "Every session is measured against the standard.",
  },
};

// Full-bleed image band that breaks up the text-heavy middle of the page.
export const showcaseBand = {
  eyebrow: "The whole point",
  line: "A national standard is what turns practice into proof a team or an employer can trust.",
  src: "/home/band.webp",
};

// Coach profiles shown on the homepage. Confirm bios and photo usage rights
// before launch.
export const coaches = [
  {
    name: "Neilzinho",
    role: "Valorant · Head Coach",
    note: "FPS veteran who's coached G2 Esports, FunPlus Phoenix and now Heretics.",
    img: "/coaches/neilzinho.png",
    tag: "International",
  },
  {
    name: "ANDERZZ",
    role: "Valorant · Coach",
    note: "Pro Valorant coach, known for his work with VersionX and fnatic.",
    img: "/coaches/anderzz.png",
    tag: "International",
  },
  {
    name: "Curry",
    role: "Valorant · Coach",
    note: "Ex-CS:GO pro turned Valorant, with stints at T1 and Cloud9.",
    img: "/coaches/curry.png",
    tag: "International",
  },
  {
    name: "Blue",
    role: "Valorant · Coach",
    note: "Has coached 30+ teams across a five-year career.",
    img: "/coaches/blue.png",
    tag: "International",
  },
  {
    name: "David “Nomy” Ramirez",
    role: "Coaching · Head Coach",
    note: "Overwatch League pro turned coach, and Head Coach of Team Mexico at the 2023 World Cup. Leads the coaching-craft curriculum.",
    img: "/coaches/nomy.png",
    tag: "International",
  },
  {
    name: "Vagelis Patelis",
    role: "Tournament Ops · Lead",
    note: "Eight years running ESL leagues and refereeing majors, from the Six Invitational to the Esports World Cup.",
    img: "/coaches/vagelis.png",
    tag: "International",
  },
  {
    name: "Eduardo Castellano",
    role: "Performance Analyst",
    note: "Performance analyst for City Football Group (Manchester City, NYCFC) and Team Heretics. Turns match data into a plan.",
    img: "/coaches/eduardo.png",
    tag: "International",
  },
];

export const testimonials = [
  {
    quote:
      "I'd wasted months on YouTube guides. Two weeks of structured review did more than a year of grinding alone.",
    name: "Kabir R.",
    detail: "Valorant · Mumbai",
  },
  {
    quote:
      "हिंदी में कोचिंग मिलने से सब कुछ बदल गया। पहली बार लगा कि कोई असल में सिखा रहा है।",
    name: "Vivaan T.",
    detail: "BGMI · Delhi",
  },
  {
    quote:
      "The certificate is what made my family take it seriously. That mattered more than I expected.",
    name: "Ananya S.",
    detail: "Coaching · Bengaluru",
  },
];

export const certification = {
  kicker: "Certification",
  title: "A credential, not a receipt",
  body: "Finish a track and earn a co-branded Gosu Academy × SPEFL-SC certificate, mapped toward India's national skills framework. It's structured training toward a credential the country recognises, not screen time.",
  badges: ["SPEFL-SC certified", "NSQF alignment in progress", "Bharat Esports backed"],
  // Specimen document rendered by <Certificate/>. The homepage shows the
  // flagship Valorant credential; course pages carry their own variant.
  doc: {
    id: "GSA-VAL-26-0001",
    level: "Skill Level 2",
    title: "Valorant Advanced",
    body: "has completed the 15-session, 30-hour Valorant Advanced season and passed the graded Competitive Showcase, assessed against the SPEFL-SC seven-competency framework.",
  },
};

export const finalCta = {
  kicker: "Tryouts are open",
  title: "Start where you are. Leave with a credential.",
  body: "Book a free 20-minute assessment, or jump into the free weekly cup and see how we coach before you pay a rupee.",
  cta: "Book a free assessment",
  note: "No card required · Hindi & English · India-region servers",
};

// Additional homepage sections.

export const twoDoors = {
  kicker: "Two doors, one career",
  title: "There's more than one way to go pro.",
  body: "Some people make their career as players. Others build the ecosystem: coaching teams, running events, and calling the shots. We certify both players and career professionals.",
  doors: [
    {
      tag: "Compete",
      title: "Go pro as a player",
      body: "Valorant and BGMI, coached to a competitive standard and graded on the record.",
    },
    {
      tag: "Build",
      title: "Work in the industry",
      body: "Coaching and tournament operations, the certified careers behind the players.",
    },
  ],
};

// Credential ladder + competency framework. These moved off the homepage
// (it was making the "national standard" argument too many times in a row);
// they belong on the individual course pages where the levels and competencies
// attach to real modules, hours, and outcomes.
export const ladder = {
  kicker: "The credential ladder",
  title: "Three levels. One national standard.",
  rungs: [
    { lv: "Level 1", title: "Foundation", body: "Core systems and your first certified benchmark." },
    { lv: "Level 2", title: "Advanced", body: "Team play, tactical depth, and a graded showcase." },
    { lv: "Level 3", title: "Mastery", body: "Pro-track standard, recognised at any Gosu academy in the world." },
  ],
};

export const competencies = {
  kicker: "The rigor",
  title: "Graded on seven competencies, not attendance.",
  lead: "Every track is measured against a written framework and a final Showcase, so \"certified\" means something an employer or a team can actually trust.",
  items: [
    { c: "C1", label: "Core knowledge & fundamentals" },
    { c: "C2", label: "Communication & teamwork" },
    { c: "C3", label: "Strategy & decision-making" },
    { c: "C4", label: "Execution & delivery" },
    { c: "C5", label: "Performance under pressure" },
    { c: "C6", label: "Analysis & self-review" },
    { c: "C7", label: "Professional conduct" },
    { c: "★", label: "Final Showcase: graded, on the record" },
  ],
};

export const successStories = {
  kicker: "They started where you are",
  title: "Turn your passion into a real career like them.",
  hint: "Drag to explore",
  // Real Gosu Academy alumni, drawn from our programs worldwide. Game-specific
  // wins (Valorant) live on the Valorant page; here they're framed by discipline
  // so the point lands: we build pros and professionals across esports.
  // Photos for the clean studio headshots; the rest use an initials monogram.
  people: [
    {
      kind: "Player",
      badge: "Esports World Cup · Top 8",
      name: "Hisham A.",
      meta: "Competitive esports",
      img: "/success/hisham.png",
      story:
        "Came up through the academy and broke into the top 8 of his division at the Esports World Cup, then qualified for the pro playoffs. It's what structured coaching does that grinding alone can't: turn a good player into one who shows up on the big stage.",
    },
    {
      kind: "Player",
      badge: "National champion",
      name: "Abdullah H.",
      meta: "Competitive esports",
      img: "/success/abdullah-haji.png",
      story:
        "Went from academy student to winning a major university championship, taking the title out of a stacked bracket. He points to the coaches who talked him into entering in the first place. Talent was never his problem; a plan built around it was what he'd been missing.",
    },
    {
      kind: "Player",
      badge: "World-tour · Top 16",
      name: "Mohammed A.",
      meta: "Fighting games",
      img: "/success/mohammed.png",
      story:
        "Reached the top 16 at a world-tour major and stacked regional podiums on the way to the top rank in his title. A mid-table player before the program, a real contender after it, from studying the game the right way with a coach who'd been there.",
    },
    {
      kind: "Player",
      badge: "National team",
      name: "Huda",
      meta: "Fighting games",
      img: "/success/huda.png",
      story:
        "Earned a place on her country's national team and finished second in the regional league, one of the few women competing at that level. The academy gave her the structure to turn raw talent into a national selection.",
    },
    {
      kind: "Career expert",
      badge: "Runs live tournaments",
      name: "Ziad A.",
      meta: "Tournament operations",
      img: "/success/career-events.png",
      story:
        "Turned the way he reads a game into a job behind the scenes. He's organised two full tournaments across different titles, owning the format, the bracket, and the players, and building events his community keeps turning up for.",
    },
    {
      kind: "Career expert",
      badge: "On the broadcast desk",
      name: "Abdulaziz A.",
      meta: "Broadcast · Caster",
      img: "/success/career-broadcast.png",
      story:
        "Went from student to casting a national league playoff on the main broadcast. He found his lane on the desk instead of the server, calling matches for one of the region's biggest events.",
    },
  ],
  note: "Real Gosu Academy alumni, across the games and the careers we coach. India's first cohorts start now.",
};

export const coachesIntro = {
  kicker: "World-class, taught local",
  title: "The best esports instructors.",
  lead: "We combine the greatest esports talent, globally and locally, to set a new standard for esports training in India.",
  note: "Our international coaching bench, teaching in India. Indian head coaches join the roster as each cohort opens.",
};

export const parentBridge = {
  kicker: "For parents",
  title: "Is this a real future?",
  body: "Fair question. Here's the honest answer: esports in India now has a government skills council, national qualifiers, and an industry that hires for far more than just players. This isn't screen time. It's structured training toward a credential the country recognises.",
  points: [
    "Certified by SPEFL-SC, India's government skills council",
    "Fixed weekly hours and a coach who reports on progress",
    "Career paths beyond playing: 28+ esports careers in coaching, analysis, event operations, and more",
    "Pay in monthly instalments (EMI). Hindi or English.",
  ],
  cta: "Book a free assessment call",
};

export const faq = [
  {
    q: "Is esports really a career?",
    a: "For a small few, as a pro player, and for far more, in the industry around it: coaching, analysis, broadcast, and event operations. We certify both paths, and we're honest that going pro is hard. The credential holds value either way.",
  },
  {
    q: "What is the certificate actually worth?",
    a: "It's issued by SPEFL-SC, India's government sports & esports skills council, and maps toward the national skills framework. It's proof you trained and were assessed to a recognised standard. Full NSQF credit-alignment is in progress.",
  },
  {
    q: "Is it safe and structured?",
    a: "Fixed weekly hours, a named coach, India-region servers, and progress reports. You always know what your time is going toward.",
  },
  {
    q: "Hindi or English?",
    a: "Both. Pick what you're comfortable with. Most concepts land better in your first language, and we coach accordingly.",
  },
  {
    q: "Can we pay monthly?",
    a: "Yes. EMI is available on every track, and there's a free weekly cup and free resources before you commit.",
  },
];

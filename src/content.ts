// Shared homepage content for Gosu Academy India.

export const brand = {
  name: "Gosu Academy",
  partner: "Bharat Esports Federation",
  council: "SPEFL-SC",
  region: "India",
  domain: "gosuacademy.in",
};

export const hero = {
  authorityRibbon: "Nationally Accredited Esports Education · SPEFL-SC · Bharat Esports Federation",
  eyebrow: "India's first government-certified esports academy",
  // Headline rendered word-by-word; the last word gets the gold accent.
  headline: ["Make", "esports", "your", "career"],
  headlinePlain: "Make esports your career.",
  sub: "World-class esports training, now certified by SPEFL-SC, India's government skills council. We turn esports passion and skill into recognised, paid professionals, and put India on the map of world esports.",
  ctaPrimary: "Explore Our Courses",
  ctaSecondary: "Join The Waitlist",
  badges: [
    { title: "Nationally Accredited", subtitle: "SPEFL-SC Awarding Body" },
    { title: "Bharat Esports Federation", subtitle: "24 State Chapters" },
    { title: "Asian Games & Olympics", subtitle: "National Talent Pipeline" },
    { title: "NEP 2020 Higher Ed", subtitle: "DigiLocker ABC Credits" },
  ],
};

// Animated count-up strip. Values must stay numeric for the CountUp / data-to targets.
export const stats = [
  { value: 28000, suffix: "+", label: "Gamers trained worldwide" },
  { value: 24, suffix: "", label: "Recognized State Associations" },
  { value: 85, suffix: "+", label: "SPEFL-SC Training Partners" },
  { value: 95, suffix: "%", label: "Hit their target tier" },
];

export const partnership = {
  kicker: "National Sovereign Alliance",
  title: "Government Accreditation Meets World-Class Coaching.",
  body: "Turning grassroots passion into professional careers. A direct alliance uniting international champion coaches, national government skilling standards, and India's official democratic governing federation.",
  pillars: [
    {
      tag: "01 · SKILLING & ACCREDITATION",
      title: "SPEFL-SC",
      logo: "/logos/SPEFL_White.png",
      mark: "",
      body: "Government Accreditation Body. Founded under NSDC, SPEFL-SC deploys National Occupational Standards (NOS) and official NSQF qualifications for esports education across India.",
    },
    {
      tag: "02 · NATIONAL GOVERNANCE",
      title: "Bharat Esports Federation",
      logo: "",
      mark: "/logos/bharat-mark.png",
      body: "Official National Federation. India's premier democratic esports body with 24 state chapters, creating official pathways to the Asian Games 2026 and Olympic Esports Games.",
    },
    {
      tag: "03 · VOCATIONAL IMPLEMENTATION",
      title: "Gosu Academy",
      logo: "/logos/GOSU_Wordmark_White.png",
      mark: "",
      body: "World-Class Pro Coaching. Exclusive training partner delivering tournament-proven curriculum, pro faculty, and the coaching systems that have built 28,000+ winners across 12 countries.",
    },
  ],
  foundationPillars: [
    {
      num: "01",
      title: "Sovereign Governance",
      desc: "Anchored by SPEFL-SC; democratic federation of 24 registered state associations; official gateway to Asian Games 2026 & IOC Olympic Esports Games.",
    },
    {
      num: "02",
      title: "Vocational Skilling",
      desc: "Tripartite Gosu × SPEFL-SC venture; NSQF qualification packs professionalizing Coaches, Referees, Analysts, and Broadcast Engineers with accredited diplomas.",
    },
    {
      num: "03",
      title: "Athlete Welfare & Integrity",
      desc: "100% subsidized air travel & luxury stays for national finalists; WADA/NADA anti-doping testing; mental health & biomechanical sports psychology counseling.",
    },
    {
      num: "04",
      title: "Collegiate & School Outreach",
      desc: "Leveraging SPEFL-SC's nationwide ecosystem of affiliated academic institutions, schools, and 85+ training partners; NEP 2020 vocational credit integration and grassroots scouting combines.",
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
    altCta: "Coming Soon",
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
    altCta: "Coming Soon",
    href: "/tournament-ops",
  },
];

export const trackViewCta = "Explore Course";

// Pricing and program details shown in the homepage paths section.
export const programs = [
  {
    code: "TRACK 01",
    name: "Valorant",
    mrp: "₹15,000",
    price: "₹10,000",
    squadRate: "Squad (5 players): ₹45,000",
    forWho: "A certified competitive season, the road to Radiant.",
    points: [
      "15 live sessions · 30 hours",
      "Graded Competitive Showcase",
      "SPEFL-SC certificate",
      "Squad rate available (5 players)",
    ],
    href: "/valorant",
  },
  {
    code: "TRACK 02",
    name: "BGMI",
    mrp: "₹15,000",
    price: "₹10,000",
    squadRate: "Squad (4 players): ₹36,000",
    forWho: "India's most-played title, coached to a national standard.",
    points: [
      "15 sessions · 30 hours",
      "Tournament-style assessment",
      "SPEFL-SC certificate",
      "Squad rate available (4 players)",
    ],
    href: "/bgmi",
  },
  {
    code: "TRACK 03",
    name: "Coaching",
    mrp: "₹15,000",
    price: "₹10,000",
    forWho: "Turn game sense into a certified coaching career.",
    points: [
      "15 live sessions · 30 hours",
      "Live coaching practicum, scored",
      "SPEFL-SC certificate",
      "Portfolio & NSQF alignment",
    ],
    href: "/coaching",
  },
  {
    code: "TRACK 04",
    name: "Tournament Ops",
    mrp: "₹15,000",
    price: "₹10,000",
    forWho: "Run the events that fill arenas.",
    points: [
      "Run a real event during the course",
      "A portfolio piece to show",
      "SPEFL-SC certificate",
      "LAN ops & rulebook adjudication",
    ],
    href: "/tournament-ops",
  },
];

export const method = {
  kicker: "The Gosu Method",
  title: "Pro Training That Actually Works.",
  lead: "No guessing. Every session follows a proven four-step system used by top tier teams worldwide.",
  steps: [
    {
      n: "01",
      title: "Diagnose",
      body: "We benchmark your current skill level, aim, and game sense to find your real weaknesses.",
    },
    {
      n: "02",
      title: "Train",
      body: "A structured weekly curriculum of live scrims, mechanics drills, and tactical executes.",
    },
    {
      n: "03",
      title: "Review",
      body: "Pro coaches review your actual match VODs, correcting mistakes and building winning habits.",
    },
    {
      n: "04",
      title: "Certify",
      body: "Clear the national assessment to earn your official government-recognized certificate.",
    },
  ],
  proof:
    "Every track is assessed against official national competency standards, not just attendance.",
  visual: {
    src: "/home/method.webp",
    tag: "The Training Floor",
    caption: "Every session is measured against official competitive standards.",
  },
};

// Full-bleed image band that breaks up the text-heavy middle of the page.
export const showcaseBand = {
  eyebrow: "Why Certification Matters",
  line: "A national certification turns your daily grind into official proof that teams, colleges, and employers respect.",
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
  kicker: "Official Certification",
  title: "A Real Credential, Not Just Screen Time",
  body: "Complete your training and earn an official co-branded Gosu Academy × SPEFL-SC certificate mapped to India's national skills framework. Concrete proof of skill for pro rosters, universities, and esports employers.",
  badges: ["SPEFL-SC Certified", "NSQF Framework", "Bharat Esports Backed"],
  // Specimen document rendered by <Certificate/>. The homepage shows the
  // flagship Valorant credential; course pages carry their own variant.
  doc: {
    id: "GSA-VAL-26-0001",
    level: "Skill Level 2",
    title: "Valorant Advanced",
    body: "has completed the 15-session, 30-hour Valorant Advanced season and passed the graded Competitive Showcase, assessed against the official SPEFL-SC competency framework.",
  },
};

export const finalCta = {
  kicker: "Admissions Open",
  title: "Start Your Esports Career Today.",
  body: "Inaugural batches are filling fast. Join the waitlist for free to secure your trial spot and get full curriculum access.",
  cta: "Join The Waitlist",
  note: "Bank EMI available · Government accredited · Hindi & English batches",
};

// Additional homepage sections.

export const twoDoors = {
  kicker: "Choose Your Path",
  title: "Play on Stage or Run the Industry.",
  body: "Master tactical gameplay as a signed pro player, or build an enduring career behind the scenes in coaching, analytics, and tournament operations.",
  doors: [
    {
      tag: "Compete",
      title: "Go Pro as a Player",
      body: "Master tactical gameplay, agent mechanics, and squad synergy coached by international champions, leading to official federation trials.",
      badge: "01 // ATHLETE PATH",
      groupLabel: "POPULAR ESPORTS DISCIPLINES",
      items: [
        { name: "Valorant", tag: "Tactical FPS" },
        { name: "BGMI", tag: "Battle Royale" },
        { name: "Counter-Strike 2", tag: "Precision FPS" },
        { name: "Free Fire Max", tag: "Mobile BR" },
        { name: "Dota 2", tag: "Strategy MOBA" },
        { name: "Tekken 8", tag: "FGC Fighter" },
      ],
      note: "Structured pathways for high-tier ranked athletes targeting national teams and professional contracts.",
    },
    {
      tag: "Build",
      title: "Work in the Industry",
      body: "Accredited diplomas and practical credentials for the high-demand professional careers running live esports leagues and organizations.",
      badge: "02 // INDUSTRY PATH",
      groupLabel: "ESPORTS INDUSTRY CAREER ROLES",
      items: [
        { name: "Head Coach", tag: "Tactical Strategy" },
        { name: "Tournament Director", tag: "League Operations" },
        { name: "Broadcast Producer", tag: "Live Production" },
        { name: "Esports Team Manager", tag: "Roster Management" },
        { name: "Match Referee", tag: "Rules & Staging" },
        { name: "VOD / Data Analyst", tag: "Performance Analytics" },
      ],
      note: "SPEFL-SC accredited credentials recognized by tournament organizers, colleges, and national federations.",
    },
  ],
};

// Credential ladder + competency framework. These moved off the homepage
// (it was making the "national standard" argument too many times in a row);
// they belong on the individual course pages where the levels and competencies
// attach to real modules, hours, and outcomes.
export const ladder = {
  kicker: "The Credential Ladder",
  title: "Three Levels. One National Standard.",
  rungs: [
    { lv: "Level 1", title: "Foundation", body: "Core systems and your first certified benchmark." },
    { lv: "Level 2", title: "Advanced", body: "Team play, tactical depth, and a graded showcase." },
    { lv: "Level 3", title: "Mastery", body: "Pro-track standard, recognised at any Gosu academy in the world." },
  ],
};

export const competencies = {
  kicker: "Official Standards",
  title: "Graded on Seven Real Competencies.",
  lead: "Every track is measured against a written framework and a final Showcase, so \"certified\" means something an employer or team can truly trust.",
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
  kicker: "Real Student Results",
  title: "Turn Your Passion Into a Real Career.",
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
  kicker: "Top-Tier Mentors",
  title: "Learn from World-Class Champions.",
  lead: "International champions and pro coaches who have led teams at the Esports World Cup, VCT, and global majors.",
  note: "Our international coaching bench, teaching in India. Indian head coaches join the roster as each cohort opens.",
};

export const parentBridge = {
  kicker: "For Parents & Families",
  title: "Is Esports a Real Career in India?",
  body: "Yes. Esports in India is now an officially recognized sporting and skilling sector. The industry is hiring certified coaches, analysts, referees, and tournament managers across the country.",
  points: [
    "Government-recognized by SPEFL-SC, India's sports & fitness skills council",
    "Fixed weekly hours and certified coaches who report on student progress",
    "28+ real career paths in coaching, broadcasting, event production, and analytics",
    "Scholarships & bank EMI available. Taught in Hindi and English.",
  ],
  cta: "Join The Waitlist",
};

export const faq = [
  {
    q: "Is esports really a career?",
    a: "For a small few, as a pro player, and for far more, in the industry around it: coaching, analysis, broadcast, and event operations. We certify both paths, and we're honest that going pro is hard. The credential holds value either way.",
  },
  {
    q: "What is the certificate actually worth?",
    a: "It's issued by SPEFL-SC, India's apex sports & esports skills council, and maps toward the national skills framework. It's proof you trained and were assessed to a nationally accredited standard. Full NSQF credit-alignment is in progress.",
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
    a: "Yes. Flexible EMI options are strictly bank-side via eligible credit and debit card partner banks. Our inaugural cohorts are opening soon—join now to lock in priority placement.",
  },
];

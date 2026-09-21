// Hindi (हिंदी) translation dictionary.
//
// Keyed by the EXACT English source string. `t()` looks a string up here and
// falls back to the English key when there's no entry, so:
//   • adding new copy never breaks — it just shows English until translated;
//   • only real prose lives here — image paths, hex colours, slugs, brand and
//     person names are never keys, so they always pass through untouched.
//
// KEEP-IN-LATIN policy (intentionally NOT keyed here, so they render as-is):
// brand & product names (Gosu Academy, SPEFL-SC, Bharat Esports, Valorant,
// BGMI, NSQF, ICCE, ESIC), all person/org names, ₹ amounts and numbers, gaming
// ranks (Radiant, Immortal, Conqueror).
// Register: natural conversational Hindi with common English gaming/tech terms
// as Devanagari loanwords (कोचिंग, टूर्नामेंट, सेशन, सर्टिफिकेट…), matching how a
// young Indian esports audience actually reads. "esports" stays lowercase-Latin.
//
// ⚠️ When you add or change user-facing copy, run:  node scripts/i18n-audit.mjs
// and add any strings it lists here. See src/i18n/README.md.

export const hi: Record<string, string> = {
  // ── Nav / footer / shared chrome ──────────────────────────────────────
  "Tracks": "ट्रैक्स",
  "Method": "मेथड",
  "Certification": "सर्टिफिकेशन",
  "Success": "सक्सेस",
  "Enroll": "एनरोल करें",
  "Enroll squad": "स्क्वाड एनरोल करें",
  "Curriculum": "करिकुलम",
  "Certificate": "सर्टिफिकेट",
  "How it works": "यह कैसे काम करता है",
  "Pricing": "प्राइसिंग",
  "Scroll": "स्क्रॉल करें",
  "Terms": "टर्म्स",
  "Privacy": "प्राइवेसी",
  "Refunds": "रिफंड",
  "Contact": "कॉन्टैक्ट",
  "Photo coming": "फ़ोटो जल्द आ रही है",
  "Certified by": "सर्टिफ़ाइड बाय",
  "How we fix it": "हम इसे कैसे ठीक करते हैं",
  "Click a competency": "किसी कॉम्पिटेंसी पर क्लिक करें",
  "Questions": "सवाल",
  "Frequently asked questions": "अक्सर पूछे जाने वाले सवाल",
  "Valorant, answered.": "Valorant, हर सवाल का जवाब।",
  "BGMI, answered.": "BGMI, हर सवाल का जवाब।",
  "Coaching, answered.": "कोचिंग, हर सवाल का जवाब।",
  "Tournament ops, answered.": "टूर्नामेंट ऑप्स, हर सवाल का जवाब।",
  "View course": "कोर्स देखें",
  "View course →": "कोर्स देखें →",
  "View the course": "कोर्स देखें",

  // ── Homepage: hero + nav + titles intro ───────────────────────────────
  "India's first government-certified esports academy":
    "भारत की पहली सरकार-प्रमाणित esports अकादमी",
  "Make esports your career.": "esports को बनाओ अपना करियर।",
  "World-class esports training, now certified by SPEFL-SC, India's government skills council. We turn esports passion and skill into recognised, paid professionals, and put India on the map of world esports.":
    "वर्ल्ड-क्लास esports ट्रेनिंग, अब SPEFL-SC — भारत की सरकारी स्किल्स काउंसिल — से प्रमाणित। हम esports के जुनून और स्किल को मान्यता-प्राप्त, सैलरी पाने वाले प्रोफेशनल्स में बदलते हैं, और भारत को वर्ल्ड esports के नक्शे पर लाते हैं।",
  "Find your path": "अपना रास्ता चुनें",
  "Book a free assessment": "फ्री असेसमेंट बुक करें",
  "The Tracks": "द ट्रैक्स",
  "Four tracks.": "चार ट्रैक।",
  "Two ways to go pro.": "प्रो बनने के दो रास्ते।",
  "Drag to explore →": "एक्सप्लोर करने के लिए ड्रैग करें →",

  // ── Homepage: stats ───────────────────────────────────────────────────
  "Gamers trained worldwide": "दुनिया भर में ट्रेन किए गए गेमर्स",
  "Countries": "देश",
  "Esports careers trained": "esports करियर के लिए ट्रेन किए गए",
  "Hit their target rank": "अपनी टारगेट रैंक तक पहुँचे",

  // ── Homepage: two doors ───────────────────────────────────────────────
  "Two doors, one career": "दो रास्ते, एक करियर",
  "There's more than one way to go pro.": "प्रो बनने का सिर्फ़ एक रास्ता नहीं होता।",
  "Some people make their career as players. Others build the ecosystem: coaching teams, running events, and calling the shots. We certify both players and career professionals.":
    "कुछ लोग प्लेयर के तौर पर करियर बनाते हैं। कुछ पूरा ईकोसिस्टम खड़ा करते हैं: टीमों को कोच करना, इवेंट्स चलाना और फ़ैसले लेना। हम प्लेयर्स और करियर प्रोफेशनल्स — दोनों को सर्टिफ़ाई करते हैं।",
  "Compete": "कॉम्पीट",
  "Build": "बिल्ड",
  "Go pro as a player": "प्लेयर के तौर पर प्रो बनें",
  "Valorant and BGMI, coached to a competitive standard and graded on the record.":
    "Valorant और BGMI, कॉम्पिटिटिव स्टैंडर्ड तक कोच किए गए और रिकॉर्ड पर ग्रेड किए गए।",
  "Work in the industry": "इंडस्ट्री में काम करें",
  "Coaching and tournament operations, the certified careers behind the players.":
    "कोचिंग और टूर्नामेंट ऑपरेशंस — प्लेयर्स के पीछे के सर्टिफ़ाइड करियर।",

  // ── Homepage: titles (track cards) ────────────────────────────────────
  "Tactical FPS": "टैक्टिकल FPS",
  "Battle Royale": "बैटल रॉयल",
  "Career Track": "करियर ट्रैक",
  "Agent economy, site executes, and the team systems that hold up on LAN. Finish with a graded Competitive Showcase.":
    "एजेंट इकॉनमी, साइट एग्ज़ीक्यूट्स और वो टीम सिस्टम जो LAN पर भी टिके रहें। आख़िर में एक ग्रेडेड Competitive Showcase।",
  "Free Valorant cup": "फ्री Valorant कप",
  "Squad rotations, zone reads, and clutch IGL calls under fire. Closes with a tournament-style assessment.":
    "स्क्वाड रोटेशन्स, ज़ोन रीड्स और प्रेशर में क्लच IGL कॉल्स। आख़िर में टूर्नामेंट-स्टाइल असेसमेंट।",
  "Free BGMI scrims": "फ्री BGMI स्क्रिम्स",
  "Turn game sense into a certified coaching career: VOD review, session design, and the system Gosu coaches use every day.":
    "अपने गेम सेंस को एक सर्टिफ़ाइड कोचिंग करियर में बदलें: VOD रिव्यू, सेशन डिज़ाइन और वो सिस्टम जो Gosu के कोच रोज़ इस्तेमाल करते हैं।",
  "Book assessment": "असेसमेंट बुक करें",
  "Run the brackets, broadcasts, and live events that fill arenas. Graduate with a real event in your portfolio.":
    "वो ब्रैकेट्स, ब्रॉडकास्ट और लाइव इवेंट्स चलाएँ जो अरीना भर देते हैं। अपने पोर्टफोलियो में एक असली इवेंट के साथ ग्रेजुएट करें।",

  // ── Homepage: partnership ─────────────────────────────────────────────
  "Why this is different": "यह अलग क्यों है",
  "The only academy backed by all three.": "इकलौती अकादमी, जिसके पीछे तीनों का साथ है।",
  "Anyone can post coaching clips. Nobody else can put a global academy, a government skills council, and the national esports federation on the same certificate.":
    "कोचिंग क्लिप्स कोई भी पोस्ट कर सकता है। लेकिन एक ग्लोबल अकादमी, एक सरकारी स्किल्स काउंसिल और नेशनल esports फेडरेशन — तीनों को एक ही सर्टिफिकेट पर और कोई नहीं ला सकता।",
  "The world-class coaching. 28,000+ players trained across 12+ countries, the same coaches behind ranked players and pro rosters worldwide, now teaching in India.":
    "वर्ल्ड-क्लास कोचिंग। 12+ देशों में 28,000+ प्लेयर्स को ट्रेन किया — दुनिया भर के रैंक्ड प्लेयर्स और प्रो रोस्टर्स के पीछे रहे वही कोच, अब भारत में सिखा रहे हैं।",
  "The government credential. India's sports & esports skills council. Your training maps to a recognised national skills standard, not just a course-completion badge.":
    "सरकारी क्रेडेंशियल। भारत की स्पोर्ट्स और esports स्किल्स काउंसिल। आपकी ट्रेनिंग एक मान्यता-प्राप्त नेशनल स्किल्स स्टैंडर्ड से जुड़ती है — सिर्फ़ कोर्स-कंप्लीशन बैज नहीं।",
  "The pathway. A direct line to national qualifiers, selection camps, and the circuits where careers actually start.":
    "आपका रास्ता। नेशनल क्वालिफ़ायर्स, सिलेक्शन कैंप्स और उन सर्किट्स तक सीधी पहुँच, जहाँ से करियर असल में शुरू होते हैं।",

  // ── Homepage: method ──────────────────────────────────────────────────
  "The Gosu Method": "द Gosu मेथड",
  "A national standard, taught the right way.": "एक नेशनल स्टैंडर्ड, सही तरीके से सिखाया गया।",
  "Every track runs the same four steps, whether you're training to compete or to build a career around the game. The coaching and the benchmark don't change.":
    "हर ट्रैक इन्हीं चार स्टेप्स पर चलता है — चाहे आप कॉम्पीट करने की ट्रेनिंग ले रहे हों या गेम के इर्द-गिर्द करियर बनाने की। कोचिंग और बेंचमार्क नहीं बदलते।",
  "Diagnose": "पहचानें",
  "We measure where you stand against a real benchmark and pinpoint exactly what to work on first.":
    "हम एक असली बेंचमार्क के मुक़ाबले आपकी पोज़िशन नापते हैं और ठीक-ठीक बताते हैं कि सबसे पहले किस पर काम करना है।",
  "Train": "ट्रेन करें",
  "A weekly plan of theory and hands-on practice, every session measured against the standard instead of guesswork.":
    "थ्योरी और हैंड्स-ऑन प्रैक्टिस का वीकली प्लान — हर सेशन अंदाज़े से नहीं, स्टैंडर्ड के हिसाब से नापा जाता है।",
  "Review": "रिव्यू करें",
  "Your coach breaks down your real work week by week, so each session fixes what the last one exposed.":
    "आपका कोच हर हफ़्ते आपका असली गेमप्ले तोड़कर दिखाता है, ताकि हर सेशन पिछली बार सामने आई कमी को ठीक करे।",
  "Certify": "सर्टिफ़ाई करें",
  "Clear the benchmarks and earn an SPEFL-SC credential, proof you trained to a national standard.":
    "बेंचमार्क क्लियर करें और एक SPEFL-SC क्रेडेंशियल पाएँ — इस बात का सबूत कि आपने नेशनल स्टैंडर्ड तक ट्रेनिंग ली।",
  "Every track is graded against a written framework and a final Showcase, not attendance.":
    "हर ट्रैक को एक लिखित फ्रेमवर्क और फ़ाइनल Showcase पर ग्रेड किया जाता है — हाज़िरी पर नहीं।",
  "The training floor": "ट्रेनिंग फ्लोर",
  "Every session is measured against the standard.": "हर सेशन स्टैंडर्ड के हिसाब से नापा जाता है।",

  // ── Homepage: showcase band ───────────────────────────────────────────
  "The whole point": "पूरी बात यही है",
  "A national standard is what turns practice into proof a team or an employer can trust.":
    "एक नेशनल स्टैंडर्ड ही प्रैक्टिस को ऐसे सबूत में बदलता है जिस पर कोई टीम या एम्प्लॉयर भरोसा कर सके।",

  // ── Homepage: success stories ─────────────────────────────────────────
  "They started where you are": "उन्होंने वहीं से शुरू किया, जहाँ आप हैं",
  "Turn your passion into a real career like them.": "उनकी तरह अपने जुनून को एक असली करियर में बदलें।",
  "Drag to explore": "एक्सप्लोर करने के लिए ड्रैग करें",
  "Player": "प्लेयर",
  "Career expert": "करियर एक्सपर्ट",
  "Competitive esports": "कॉम्पिटिटिव esports",
  "Fighting games": "फ़ाइटिंग गेम्स",
  "Tournament operations": "टूर्नामेंट ऑपरेशंस",
  "Broadcast · Caster": "ब्रॉडकास्ट · कास्टर",
  "Esports World Cup · Top 8": "Esports World Cup · टॉप 8",
  "National champion": "नेशनल चैंपियन",
  "World-tour · Top 16": "वर्ल्ड-टूर · टॉप 16",
  "National team": "नेशनल टीम",
  "Runs live tournaments": "लाइव टूर्नामेंट्स चलाते हैं",
  "On the broadcast desk": "ब्रॉडकास्ट डेस्क पर",
  "Came up through the academy and broke into the top 8 of his division at the Esports World Cup, then qualified for the pro playoffs. It's what structured coaching does that grinding alone can't: turn a good player into one who shows up on the big stage.":
    "अकादमी से आगे बढ़े और Esports World Cup में अपने डिवीज़न के टॉप 8 में पहुँचे, फिर प्रो प्लेऑफ़्स के लिए क्वालिफ़ाई किया। यही तो स्ट्रक्चर्ड कोचिंग करती है जो अकेले ग्राइंडिंग से नहीं होता: एक अच्छे प्लेयर को उस प्लेयर में बदल देती है जो बड़े स्टेज पर परफ़ॉर्म करता है।",
  "Went from academy student to winning a major university championship, taking the title out of a stacked bracket. He points to the coaches who talked him into entering in the first place. Talent was never his problem; a plan built around it was what he'd been missing.":
    "अकादमी स्टूडेंट से एक बड़ी यूनिवर्सिटी चैंपियनशिप जीतने तक पहुँचे, एक मज़बूत ब्रैकेट से टाइटल छीना। इसका श्रेय वे उन कोचों को देते हैं जिन्होंने उन्हें पहली बार इसमें उतरने के लिए मनाया। टैलेंट कभी उनकी दिक्कत नहीं थी; कमी थी तो उसके इर्द-गिर्द बने एक प्लान की।",
  "Reached the top 16 at a world-tour major and stacked regional podiums on the way to the top rank in his title. A mid-table player before the program, a real contender after it, from studying the game the right way with a coach who'd been there.":
    "एक वर्ल्ड-टूर मेजर में टॉप 16 तक पहुँचे और अपने टाइटल की टॉप रैंक तक के सफ़र में कई रीजनल पोडियम बटोरे। प्रोग्राम से पहले एक मिड-टेबल प्लेयर, उसके बाद एक असली दावेदार — गेम को सही तरीके से, उस कोच के साथ पढ़कर जो ख़ुद वहाँ रह चुका था।",
  "Earned a place on her country's national team and finished second in the regional league, one of the few women competing at that level. The academy gave her the structure to turn raw talent into a national selection.":
    "अपने देश की नेशनल टीम में जगह बनाई और रीजनल लीग में दूसरे नंबर पर रहीं — उस लेवल पर खेलने वाली गिनी-चुनी महिलाओं में से एक। अकादमी ने उन्हें वो स्ट्रक्चर दिया जिससे कच्चा टैलेंट एक नेशनल सिलेक्शन में बदल गया।",
  "Turned the way he reads a game into a job behind the scenes. He's organised two full tournaments across different titles, owning the format, the bracket, and the players, and building events his community keeps turning up for.":
    "गेम पढ़ने के अपने हुनर को पर्दे के पीछे की एक जॉब में बदल दिया। उन्होंने अलग-अलग टाइटल्स में दो पूरे टूर्नामेंट ऑर्गनाइज़ किए — फ़ॉर्मेट, ब्रैकेट और प्लेयर्स सब संभाला, और ऐसे इवेंट्स बनाए जिनमें उनकी कम्युनिटी बार-बार आती है।",
  "Went from student to casting a national league playoff on the main broadcast. He found his lane on the desk instead of the server, calling matches for one of the region's biggest events.":
    "स्टूडेंट से मेन ब्रॉडकास्ट पर एक नेशनल लीग प्लेऑफ़ कास्ट करने तक पहुँचे। उन्हें अपनी जगह सर्वर पर नहीं, डेस्क पर मिली — रीजन के सबसे बड़े इवेंट्स में से एक के मैच कॉल करते हुए।",
  "Real Gosu Academy alumni, across the games and the careers we coach. India's first cohorts start now.":
    "असली Gosu Academy एलुमनाई — उन सभी गेम्स और करियर में जिन्हें हम कोच करते हैं। भारत के पहले कोहॉर्ट अभी शुरू हो रहे हैं।",

  // ── Homepage: coaches intro + roster roles/notes ──────────────────────
  "World-class, taught local": "वर्ल्ड-क्लास, लोकल अंदाज़ में",
  "The best esports instructors.": "सबसे बेहतरीन esports इंस्ट्रक्टर्स।",
  "We combine the greatest esports talent, globally and locally, to set a new standard for esports training in India.":
    "हम ग्लोबल और लोकल — दोनों का सबसे बड़ा esports टैलेंट मिलाकर भारत में esports ट्रेनिंग का एक नया स्टैंडर्ड सेट करते हैं।",
  "Our international coaching bench, teaching in India. Indian head coaches join the roster as each cohort opens.":
    "हमारी इंटरनेशनल कोचिंग बेंच, भारत में सिखाती हुई। हर कोहॉर्ट खुलने के साथ भारतीय हेड कोच रोस्टर में जुड़ते हैं।",
  "Valorant · Head Coach": "Valorant · हेड कोच",
  "Valorant · Coach": "Valorant · कोच",
  "Coaching · Head Coach": "कोचिंग · हेड कोच",
  "Tournament Ops · Lead": "टूर्नामेंट ऑप्स · लीड",
  "Performance Analyst": "परफ़ॉर्मेंस एनालिस्ट",
  "International": "इंटरनेशनल",
  "FPS veteran who's coached G2 Esports, FunPlus Phoenix and now Heretics.":
    "FPS वेटरन, जिन्होंने G2 Esports, FunPlus Phoenix और अब Heretics को कोच किया।",
  "Pro Valorant coach, known for his work with VersionX and fnatic.":
    "प्रो Valorant कोच, VersionX और fnatic के साथ अपने काम के लिए जाने जाते हैं।",
  "Ex-CS:GO pro turned Valorant, with stints at T1 and Cloud9.":
    "पूर्व CS:GO प्रो, अब Valorant में — T1 और Cloud9 के साथ काम कर चुके हैं।",
  "Has coached 30+ teams across a five-year career.":
    "पाँच साल के करियर में 30+ टीमों को कोच किया है।",
  "Overwatch League pro turned coach, and Head Coach of Team Mexico at the 2023 World Cup. Leads the coaching-craft curriculum.":
    "Overwatch League प्रो से कोच बने, और 2023 वर्ल्ड कप में Team Mexico के हेड कोच। कोचिंग-क्राफ्ट करिकुलम लीड करते हैं।",
  "Eight years running ESL leagues and refereeing majors, from the Six Invitational to the Esports World Cup.":
    "आठ साल ESL लीग्स चलाने और मेजर्स में रेफ़री का काम — Six Invitational से लेकर Esports World Cup तक।",
  "Performance analyst for City Football Group (Manchester City, NYCFC) and Team Heretics. Turns match data into a plan.":
    "City Football Group (Manchester City, NYCFC) और Team Heretics के परफ़ॉर्मेंस एनालिस्ट। मैच डेटा को एक प्लान में बदलते हैं।",

  // ── Homepage: testimonials ────────────────────────────────────────────
  "I'd wasted months on YouTube guides. Two weeks of structured review did more than a year of grinding alone.":
    "मैंने महीनों YouTube गाइड्स पर बर्बाद कर दिए थे। दो हफ़्ते के स्ट्रक्चर्ड रिव्यू ने अकेले साल भर की ग्राइंडिंग से ज़्यादा असर किया।",
  "Valorant · Mumbai": "Valorant · मुंबई",
  "BGMI · Delhi": "BGMI · दिल्ली",
  "The certificate is what made my family take it seriously. That mattered more than I expected.":
    "सर्टिफिकेट की वजह से मेरे परिवार ने इसे सीरियसली लिया। यह मेरी उम्मीद से ज़्यादा मायने रखा।",
  "Coaching · Bengaluru": "कोचिंग · बेंगलुरु",

  // ── Homepage: certification ───────────────────────────────────────────
  "A credential, not a receipt": "एक क्रेडेंशियल, रसीद नहीं",
  "Finish a track and earn a co-branded Gosu Academy × SPEFL-SC certificate, mapped toward India's national skills framework. It's structured training toward a credential the country recognises, not screen time.":
    "कोई ट्रैक पूरा करें और एक को-ब्रांडेड Gosu Academy × SPEFL-SC सर्टिफिकेट पाएँ, जो भारत के नेशनल स्किल्स फ्रेमवर्क से जुड़ा है। यह देश की मान्यता वाले क्रेडेंशियल की तरफ़ स्ट्रक्चर्ड ट्रेनिंग है — बस स्क्रीन टाइम नहीं।",
  "SPEFL-SC certified": "SPEFL-SC सर्टिफ़ाइड",
  "NSQF alignment in progress": "NSQF अलाइनमेंट जारी है",
  "Bharat Esports backed": "Bharat Esports का समर्थन",

  // ── Homepage: final CTA ───────────────────────────────────────────────
  "Tryouts are open": "ट्रायआउट्स खुले हैं",
  "Start where you are. Leave with a credential.": "जहाँ हैं वहीं से शुरू करें। एक क्रेडेंशियल के साथ निकलें।",
  "Book a free 20-minute assessment, or jump into the free weekly cup and see how we coach before you pay a rupee.":
    "एक फ्री 20-मिनट का असेसमेंट बुक करें, या फ्री वीकली कप में कूदें और एक रुपया देने से पहले देखें कि हम कैसे कोच करते हैं।",
  "No card required · Hindi & English · India-region servers":
    "कार्ड की ज़रूरत नहीं · हिंदी और अंग्रेज़ी · भारत-रीजन सर्वर",

  // ── Homepage: parent bridge ───────────────────────────────────────────
  "For parents": "पेरेंट्स के लिए",
  "Is this a real future?": "क्या यह एक असली भविष्य है?",
  "Fair question. Here's the honest answer: esports in India now has a government skills council, national qualifiers, and an industry that hires for far more than just players. This isn't screen time. It's structured training toward a credential the country recognises.":
    "वाजिब सवाल है। सीधा जवाब यह है: भारत में esports के पास अब एक सरकारी स्किल्स काउंसिल, नेशनल क्वालिफ़ायर्स और एक ऐसी इंडस्ट्री है जो सिर्फ़ प्लेयर्स से कहीं ज़्यादा के लिए हायर करती है। यह स्क्रीन टाइम नहीं है। यह देश की मान्यता वाले क्रेडेंशियल की तरफ़ स्ट्रक्चर्ड ट्रेनिंग है।",
  "Certified by SPEFL-SC, India's government skills council":
    "SPEFL-SC — भारत की सरकारी स्किल्स काउंसिल — से सर्टिफ़ाइड",
  "Fixed weekly hours and a coach who reports on progress":
    "तय वीकली घंटे और एक कोच जो प्रोग्रेस की रिपोर्ट देता है",
  "Career paths beyond playing: 28+ esports careers in coaching, analysis, event operations, and more":
    "खेलने से आगे के करियर रास्ते: कोचिंग, एनालिसिस, इवेंट ऑपरेशंस और बहुत कुछ में 28+ esports करियर",
  "Pay in monthly instalments (EMI). Hindi or English.":
    "मंथली किस्तों (EMI) में पेमेंट करें। हिंदी या अंग्रेज़ी।",
  "Book a free assessment call": "फ्री असेसमेंट कॉल बुक करें",

  // ── Homepage: pricing section chrome + programs ───────────────────────
  "One national price. EMI on every track.": "एक नेशनल प्राइस। हर ट्रैक पर EMI।",
  "The ones parents actually ask.": "वो सवाल जो पेरेंट्स असल में पूछते हैं।",
  "A certified competitive season, the road to Radiant.":
    "एक सर्टिफ़ाइड कॉम्पिटिटिव सीज़न — Radiant तक का रास्ता।",
  "India's most-played title, coached to a national standard.":
    "भारत का सबसे ज़्यादा खेला जाने वाला टाइटल, नेशनल स्टैंडर्ड तक कोच किया गया।",
  "Turn game sense into a certified coaching career.":
    "गेम सेंस को एक सर्टिफ़ाइड कोचिंग करियर में बदलें।",
  "Run the events that fill arenas.": "वो इवेंट्स चलाएँ जो अरीना भर देते हैं।",
  "15 live sessions · 30 hours": "15 लाइव सेशन · 30 घंटे",
  "Graded Competitive Showcase": "ग्रेडेड Competitive Showcase",
  "SPEFL-SC certificate": "SPEFL-SC सर्टिफिकेट",
  "15 sessions · 30 hours": "15 सेशन · 30 घंटे",
  "Tournament-style assessment": "टूर्नामेंट-स्टाइल असेसमेंट",
  "Live coaching practicum, scored": "लाइव कोचिंग प्रैक्टिकम, स्कोर किया गया",
  "Run a real event during the course": "कोर्स के दौरान एक असली इवेंट चलाएँ",
  "A portfolio piece to show": "दिखाने के लिए एक पोर्टफोलियो पीस",
  "₹15,000 · EMI": "₹15,000 · EMI",
  "Squad rate available": "स्क्वाड रेट उपलब्ध",
  "₹4,000 · one-time": "₹4,000 · एक बार",
  "₹5,000 · one-time": "₹5,000 · एक बार",

  // ── Homepage: FAQ ─────────────────────────────────────────────────────
  "Is esports really a career?": "क्या esports सच में एक करियर है?",
  "For a small few, as a pro player, and for far more, in the industry around it: coaching, analysis, broadcast, and event operations. We certify both paths, and we're honest that going pro is hard. The credential holds value either way.":
    "कुछ गिने-चुने लोगों के लिए, प्रो प्लेयर के तौर पर; और कहीं ज़्यादा लोगों के लिए, इसके आस-पास की इंडस्ट्री में: कोचिंग, एनालिसिस, ब्रॉडकास्ट और इवेंट ऑपरेशंस। हम दोनों रास्तों को सर्टिफ़ाई करते हैं, और साफ़ कहते हैं कि प्रो बनना मुश्किल है। क्रेडेंशियल की वैल्यू दोनों ही सूरत में बनी रहती है।",
  "What is the certificate actually worth?": "सर्टिफिकेट की असल में क्या वैल्यू है?",
  "It's issued by SPEFL-SC, India's government sports & esports skills council, and maps toward the national skills framework. It's proof you trained and were assessed to a recognised standard. Full NSQF credit-alignment is in progress.":
    "यह SPEFL-SC — भारत की सरकारी स्पोर्ट्स और esports स्किल्स काउंसिल — जारी करती है, और यह नेशनल स्किल्स फ्रेमवर्क से जुड़ता है। यह इस बात का सबूत है कि आपने एक मान्यता-प्राप्त स्टैंडर्ड तक ट्रेनिंग ली और असेस हुए। पूरा NSQF क्रेडिट-अलाइनमेंट जारी है।",
  "Is it safe and structured?": "क्या यह सुरक्षित और स्ट्रक्चर्ड है?",
  "Fixed weekly hours, a named coach, India-region servers, and progress reports. You always know what your time is going toward.":
    "तय वीकली घंटे, एक नामित कोच, भारत-रीजन सर्वर और प्रोग्रेस रिपोर्ट्स। आपको हमेशा पता रहता है कि आपका समय किस काम आ रहा है।",
  "Hindi or English?": "हिंदी या अंग्रेज़ी?",
  "Both. Pick what you're comfortable with. Most concepts land better in your first language, and we coach accordingly.":
    "दोनों। जिसमें आप कम्फ़र्टेबल हों वो चुनें। ज़्यादातर कॉन्सेप्ट आपकी पहली भाषा में बेहतर समझ आते हैं, और हम उसी हिसाब से कोच करते हैं।",
  "Can we pay monthly?": "क्या हम मंथली पे कर सकते हैं?",
  "Yes. EMI is available on every track, and there's a free weekly cup and free resources before you commit.":
    "हाँ। हर ट्रैक पर EMI उपलब्ध है, और कमिट करने से पहले एक फ्री वीकली कप और फ्री रिसोर्सेज़ भी हैं।",

  // ── Shared across course pages (chrome, how-it-works, cards, CTAs) ─────
  "What you walk away with": "आप क्या लेकर जाते हैं",
  "Your coach": "आपका कोच",
  "Your mentor": "आपका मेंटर",
  "Your instructor": "आपका इंस्ट्रक्टर",
  "Taught by someone who's been there.": "किसी ऐसे इंसान से सीखें जो ख़ुद वहाँ रहा है।",
  "Four weeks. Real coaching. Real reps.": "चार हफ़्ते। असली कोचिंग। असली रेप्स।",
  "On the radar": "रडार पर",
  "The practicum": "प्रैक्टिकम",
  "The capstone": "कैपस्टोन",
  "Every session is graded against seven competencies:": "हर सेशन को सात कॉम्पिटेंसीज़ पर ग्रेड किया जाता है:",
  "Proof": "सबूत",
  "Enrol": "एनरोल करें",
  "Enroll now": "अभी एनरोल करें",
  "Show your parents": "अपने पेरेंट्स को दिखाएँ",
  "Fixed hours. Real coach. Govt certificate.": "तय घंटे। असली कोच। सरकारी सर्टिफिकेट।",
  "Fixed weekly hours and a named coach who reports on progress":
    "तय वीकली घंटे और एक नामित कोच जो प्रोग्रेस की रिपोर्ट देता है",
  "Career paths beyond playing: coaching, analysis, and event operations":
    "खेलने से आगे के करियर रास्ते: कोचिंग, एनालिसिस और इवेंट ऑपरेशंस",
  "Pay monthly on EMI. Hindi or English.": "EMI पर मंथली पेमेंट। हिंदी या अंग्रेज़ी।",
  "Gosu Academy × SPEFL-SC, mapped toward India's national skills framework.":
    "Gosu Academy × SPEFL-SC, भारत के नेशनल स्किल्स फ्रेमवर्क से जुड़ा।",
  "NSQF credit-alignment in progress.": "NSQF क्रेडिट-अलाइनमेंट जारी है।",
  "SPEFL-SC certified at launch. NSQF credit-alignment in progress.":
    "लॉन्च पर SPEFL-SC सर्टिफ़ाइड। NSQF क्रेडिट-अलाइनमेंट जारी है।",
  "Gosu Academy × SPEFL-SC. Skill Level 2 on the national ladder.":
    "Gosu Academy × SPEFL-SC. नेशनल लैडर पर स्किल लेवल 2।",
  "Book the free call first": "पहले फ्री कॉल बुक करें",
  "one-time · no hidden costs": "एक बार · कोई छिपी लागत नहीं",
  "Both. Pick what you're most comfortable thinking in.":
    "दोनों। जिसमें सोचना आपको सबसे कम्फ़र्टेबल लगे, वही चुनें।",
  // how-it-works fact labels (numbers stay as-is; only the labels translate)
  "Live sessions": "लाइव सेशन",
  "Region servers": "रीजन सर्वर",
  "Your choice": "आपकी मर्ज़ी",
  "Team format": "टीम फ़ॉर्मेट",
  "Scrims & drills": "स्क्रिम्स और ड्रिल्स",
  "~4 wks": "~4 हफ़्ते",
  "~8 wks": "~8 हफ़्ते",
  "7–8 hrs / week": "7–8 घंटे / हफ़्ता",
  "2 sessions / week": "2 सेशन / हफ़्ता",
  "India": "भारत",
  "Squad": "स्क्वाड",
  "Online": "ऑनलाइन",
  "Sessions · 30 hours": "सेशन · 30 घंटे",
  "Practical play": "प्रैक्टिकल प्ले",
  "Graded skills": "ग्रेडेड स्किल्स",
  "Final Showcase": "फ़ाइनल Showcase",
  "Hit their target tier": "अपने टारगेट टियर तक पहुँचे",
  "Tournament Assessment": "टूर्नामेंट असेसमेंट",
  "4-player format": "4-प्लेयर फ़ॉर्मेट",
  "No degree needed": "डिग्री की ज़रूरत नहीं",
  "Coaching reps & film": "कोचिंग रेप्स और फ़िल्म",
  "Discord + screen share": "Discord + स्क्रीन शेयर",
  "Discord + bracket stack": "Discord + ब्रैकेट स्टैक",
  "Real event you run": "एक असली इवेंट जो आप चलाते हैं",
  "Real tournament you run": "एक असली टूर्नामेंट जो आप चलाते हैं",
  "Graded competencies": "ग्रेडेड कॉम्पिटेंसीज़",
  "Live coaching practicum": "लाइव कोचिंग प्रैक्टिकम",
  "Portfolio artifacts": "पोर्टफोलियो आर्टिफैक्ट्स",
  "Titles · Valorant & BGMI": "टाइटल्स · Valorant और BGMI",
  "Stages in the event lifecycle": "इवेंट लाइफ़साइकल के स्टेज",
  "Rulebook components": "रूलबुक कंपोनेंट्स",
  // shared competency labels/descs (identical text across game pages)
  "Communication & information systems": "कम्युनिकेशन और इन्फ़ॉर्मेशन सिस्टम्स",
  "Competitive performance": "कॉम्पिटिटिव परफ़ॉर्मेंस",
  "Professional team conduct": "प्रोफेशनल टीम कंडक्ट",
  "Team Identity & Communication": "टीम आइडेंटिटी और कम्युनिकेशन",
  "15 sessions. 5 phases. Zero filler.": "15 सेशन। 5 फ़ेज़। ज़ीरो फ़िलर।",
  "Phase 1 · Sessions 1–2": "फ़ेज़ 1 · सेशन 1–2",
  "Phase 2 · Sessions 3–6": "फ़ेज़ 2 · सेशन 3–6",
  "Phase 3 · Sessions 7–9": "फ़ेज़ 3 · सेशन 7–9",
  "Phase 4 · Sessions 10–12": "फ़ेज़ 4 · सेशन 10–12",
  "Phase 5 · Sessions 13–15": "फ़ेज़ 5 · सेशन 13–15",
  "Phase 2 · Sessions 3–5": "फ़ेज़ 2 · सेशन 3–5",
  "Phase 3 · Sessions 6–9": "फ़ेज़ 3 · सेशन 6–9",

  // ── Valorant page ─────────────────────────────────────────────────────
  "Valorant · India's road to the world stage": "Valorant · भारत का वर्ल्ड स्टेज तक का रास्ता",
  "The certified road": "सर्टिफ़ाइड रास्ता",
  "to Radiant.": "Radiant तक।",
  "India has the raw talent to compete with the world. What it's never had is a certified path to get there. Fifteen sessions of world-standard team tactics, graded against a national framework, with the federation's pipeline waiting at the top.":
    "भारत में दुनिया से टक्कर लेने का कच्चा टैलेंट है। जो कभी नहीं रहा, वो है वहाँ तक पहुँचने का एक सर्टिफ़ाइड रास्ता। वर्ल्ड-स्टैंडर्ड टीम टैक्टिक्स के पंद्रह सेशन, एक नेशनल फ्रेमवर्क पर ग्रेडेड, और ऊपर फेडरेशन की पाइपलाइन इंतज़ार करती हुई।",
  "Enroll for ₹15,000": "₹15,000 में एनरोल करें",
  "Join the free Valorant cup": "फ्री Valorant कप जॉइन करें",
  "Why you're hardstuck": "आप हार्डस्टक क्यों हैं",
  "It's not your aim. It's your systems.": "बात एम की नहीं है। बात आपके सिस्टम्स की है।",
  "Past a certain point, most players already have the mechanics. What's missing is the structure that organised teams take for granted.":
    "एक हद के बाद ज़्यादातर प्लेयर्स के पास मैकेनिक्स तो होते ही हैं। जो नहीं होता वो है वो स्ट्रक्चर जिसे ऑर्गनाइज़्ड टीमें मामूली मान लेती हैं।",
  "You out-aim, then lose the round": "आप एम में जीतते हैं, फिर राउंड हार जाते हैं",
  "Good duels, no trades. Without spacing and timing, individual frags don't convert to round wins.":
    "अच्छे ड्यूल्स, पर कोई ट्रेड नहीं। स्पेसिंग और टाइमिंग के बिना, इंडिविजुअल फ्रैग्स राउंड जीत में नहीं बदलते।",
  "Phase 2 drills trading and spacing until your frags actually win rounds. You learn to duel with your team, not next to it.":
    "फ़ेज़ 2 में ट्रेडिंग और स्पेसिंग की ड्रिल तब तक चलती है जब तक आपके फ्रैग्स सच में राउंड जिताने न लगें। आप अपनी टीम के साथ ड्यूल करना सीखते हैं, टीम के बगल में नहीं।",
  "No plan past the buy": "बाय के बाद कोई प्लान नहीं",
  "You improvise every round. No defaults, no win conditions, no read on what the defence is doing.":
    "आप हर राउंड बस इम्प्रोवाइज़ करते हैं। कोई डिफ़ॉल्ट नहीं, कोई विन कंडीशन नहीं, डिफ़ेंस क्या कर रहा है इसका कोई अंदाज़ा नहीं।",
  "You build defaults, win conditions, and mid-round reads, so every round runs on a plan instead of a coin flip.":
    "आप डिफ़ॉल्ट्स, विन कंडीशन्स और मिड-राउंड रीड्स बनाते हैं, ताकि हर राउंड सिक्के के उछाल पर नहीं, एक प्लान पर चले।",
  "Comms are noise": "कॉम्स सिर्फ़ शोर हैं",
  "Five people talking, no hierarchy. The right call arrives too late to act on.":
    "पाँच लोग बोल रहे हैं, कोई हायरार्की नहीं। सही कॉल इतनी देर से आती है कि उस पर एक्ट नहीं हो पाता।",
  "We install a comms hierarchy and callout structure, so the one call that matters lands in time to act on.":
    "हम एक कॉम्स हायरार्की और कॉलआउट स्ट्रक्चर सेट करते हैं, ताकि जो एक कॉल मायने रखती है वो वक़्त पर पहुँचे।",
  "The world-class curriculum": "वर्ल्ड-क्लास करिकुलम",
  "Scenario-led, the way real teams train. Less lecture, more reps.":
    "सिनारियो-लेड, जैसे असली टीमें ट्रेन करती हैं। कम लेक्चर, ज़्यादा रेप्स।",
  "Building a competitive team identity: playstyle, win conditions, roles":
    "एक कॉम्पिटिटिव टीम आइडेंटिटी बनाना: प्लेस्टाइल, विन कंडीशन्स, रोल्स",
  "Communication systems & information hierarchy": "कम्युनिकेशन सिस्टम्स और इन्फ़ॉर्मेशन हायरार्की",
  "Tactical Fundamentals": "टैक्टिकल फ़ंडामेंटल्स",
  "Trading & spacing systems": "ट्रेडिंग और स्पेसिंग सिस्टम्स",
  "Defaulting & map control": "डिफ़ॉल्टिंग और मैप कंट्रोल",
  "Mid-round decision making": "मिड-राउंड डिसीज़न मेकिंग",
  "Attacking site executions": "अटैकिंग साइट एग्ज़ीक्यूशंस",
  "Advanced Systems": "एडवांस्ड सिस्टम्स",
  "Defensive systems & space management": "डिफ़ेंसिव सिस्टम्स और स्पेस मैनेजमेंट",
  "Utility theory & resource management": "यूटिलिटी थ्योरी और रिसोर्स मैनेजमेंट",
  "Retakes & post-plants": "रीटेक्स और पोस्ट-प्लांट्स",
  "Adaptation & Performance": "अडैप्टेशन और परफ़ॉर्मेंस",
  "Anti-stratting & adaptation": "एंटी-स्ट्रैटिंग और अडैप्टेशन",
  "Clutch play & pressure situations": "क्लच प्ले और प्रेशर सिचुएशंस",
  "Advanced team coordination": "एडवांस्ड टीम कोऑर्डिनेशन",
  "Assessment & Showcase": "असेसमेंट और Showcase",
  "VOD review & tactical development · full team practice day":
    "VOD रिव्यू और टैक्टिकल डेवलपमेंट · पूरे दिन टीम प्रैक्टिस",
  "Competitive Assessment & Showcase: a graded 5v5 against a comparable-rank opponent, with individual and team reporting that feeds the national federation's pipeline":
    "Competitive असेसमेंट और Showcase: बराबर रैंक के विरोधी के ख़िलाफ़ एक ग्रेडेड 5v5, जिसमें इंडिविजुअल और टीम रिपोर्टिंग नेशनल फेडरेशन की पाइपलाइन में जाती है",
  "Do well in the final Showcase and your graded report goes in front of Bharat Esports, India's national esports federation. That's real scouting and a route into the national pipeline: the bridge from ranked to represented.":
    "फ़ाइनल Showcase में अच्छा करें और आपकी ग्रेडेड रिपोर्ट Bharat Esports — भारत की नेशनल esports फेडरेशन — के सामने जाती है। यह असली स्काउटिंग है और नेशनल पाइपलाइन में जाने का रास्ता: रैंक्ड से रिप्रेज़ेंटेड तक का पुल।",
  "Team identity & culture": "टीम आइडेंटिटी और कल्चर",
  "Your team's playstyle, roles, and win conditions — the identity every default and execute is built on.":
    "आपकी टीम की प्लेस्टाइल, रोल्स और विन कंडीशन्स — वो आइडेंटिटी जिस पर हर डिफ़ॉल्ट और एग्ज़ीक्यूट टिका होता है।",
  "A comms hierarchy and callout structure, so raw information turns into decisions fast enough to use.":
    "एक कॉम्स हायरार्की और कॉलआउट स्ट्रक्चर, ताकि कच्ची जानकारी इतनी जल्दी फ़ैसलों में बदले कि काम आ सके।",
  "Trading, spacing & execution": "ट्रेडिंग, स्पेसिंग और एग्ज़ीक्यूशन",
  "The positioning and timing that turn individual frags into rounds actually won.":
    "वो पोज़िशनिंग और टाइमिंग जो इंडिविजुअल फ्रैग्स को सच में जीते हुए राउंड में बदलती है।",
  "Strategic & tactical thinking": "स्ट्रैटेजिक और टैक्टिकल थिंकिंग",
  "Reading the round, picking your win condition, and adapting the plan mid-round instead of freezing.":
    "राउंड पढ़ना, अपनी विन कंडीशन चुनना, और फ़्रीज़ होने की बजाय मिड-राउंड प्लान बदलना।",
  "Defensive & retake systems": "डिफ़ेंसिव और रीटेक सिस्टम्स",
  "Holding sites, managing space, and taking sites back with coordinated utility, not hope.":
    "साइट्स होल्ड करना, स्पेस मैनेज करना, और उम्मीद से नहीं — कोऑर्डिनेटेड यूटिलिटी से साइट्स वापस लेना।",
  "Clutch play and clean decisions under real scoreboard pressure, when it's easiest to tilt.":
    "असली स्कोरबोर्ड प्रेशर में क्लच प्ले और साफ़ फ़ैसले — जब टिल्ट होना सबसे आसान होता है।",
  "The habits and attitude that make a roster worth signing — reviewed and on the record.":
    "वो आदतें और एटीट्यूड जो किसी रोस्टर को साइन करने लायक बनाती हैं — रिव्यूड और रिकॉर्ड पर।",
  "Final Showcase: graded, on the record": "फ़ाइनल Showcase: ग्रेडेड, रिकॉर्ड पर",
  "A graded 5v5 against a comparable-rank opponent, with a report that feeds the national federation's pipeline.":
    "बराबर रैंक के विरोधी के ख़िलाफ़ एक ग्रेडेड 5v5, जिसकी रिपोर्ट नेशनल फेडरेशन की पाइपलाइन में जाती है।",
  "A credential, and the game to back it.": "एक क्रेडेंशियल, और उसे साबित करने वाला गेम।",
  "Clear the benchmarks and the final Showcase, and you earn the Gosu Academy × SPEFL-SC Valorant Advanced certificate, issued by India's government skills council and mapped toward the national skills framework. It's proof you trained and were assessed to a real standard, not a participation badge.":
    "बेंचमार्क और फ़ाइनल Showcase क्लियर करें, और आप Gosu Academy × SPEFL-SC Valorant Advanced सर्टिफिकेट पाते हैं — भारत की सरकारी स्किल्स काउंसिल से जारी और नेशनल स्किल्स फ्रेमवर्क से जुड़ा। यह इस बात का सबूत है कि आपने एक असली स्टैंडर्ड तक ट्रेनिंग ली और असेस हुए — कोई पार्टिसिपेशन बैज नहीं।",
  "You also leave with a documented set of team executes, a self-analysis habit built on VOD review, and a graded performance report you can show an org.":
    "साथ ही आप टीम एग्ज़ीक्यूट्स का एक डॉक्युमेंटेड सेट, VOD रिव्यू पर बनी सेल्फ़-एनालिसिस की आदत, और एक ग्रेडेड परफ़ॉर्मेंस रिपोर्ट लेकर जाते हैं जिसे आप किसी ऑर्ग को दिखा सकते हैं।",
  "Valorant Advanced · Certified": "Valorant Advanced · सर्टिफ़ाइड",
  "Sessions · 30 hours ": "सेशन · 30 घंटे ",
  "50%+ scrims, drills & VOD review": "50%+ स्क्रिम्स, ड्रिल्स और VOD रिव्यू",
  "Player workbook & review logs": "प्लेयर वर्कबुक और रिव्यू लॉग्स",
  "SPEFL-SC Valorant Advanced certificate": "SPEFL-SC Valorant Advanced सर्टिफिकेट",
  "/ season": "/ सीज़न",
  "or ₹2,500/mo · EMI available": "या ₹2,500/माह · EMI उपलब्ध",
  "₹15,000 for the full season.": "पूरे सीज़न के लिए ₹15,000।",
  "Or ₹2,500/month on EMI. One national price, no regional mark-ups. Less than 0.5% of Gosu students ever ask for a refund, and there's a free weekly cup so you can see how we coach before you commit.":
    "या EMI पर ₹2,500/महीना। एक नेशनल प्राइस, कोई रीजनल मार्क-अप नहीं। Gosu के 0.5% से भी कम स्टूडेंट्स कभी रिफंड माँगते हैं, और एक फ्री वीकली कप है ताकि कमिट करने से पहले आप देख सकें कि हम कैसे कोच करते हैं।",
  "Join the free cup first": "पहले फ्री कप जॉइन करें",
  "Your coach breaks down your real work week by week, so each session fixes what the last one exposed. ":
    "आपका कोच हर हफ़्ते आपका असली गेमप्ले तोड़कर दिखाता है। ",
  "International standard, Indian on the floor. Sessions run in Hindi or English, with guest masterclasses from Gosu's global roster. You're not watching pre-recorded videos. This is live coaching with a coach who reviews your actual games.":
    "इंटरनेशनल स्टैंडर्ड, फ्लोर पर भारतीय। सेशन हिंदी या अंग्रेज़ी में चलते हैं, साथ में Gosu के ग्लोबल रोस्टर की गेस्ट मास्टरक्लास। आप कोई प्री-रिकॉर्डेड वीडियो नहीं देख रहे। यह लाइव कोचिंग है, एक ऐसे कोच के साथ जो आपके असली गेम्स रिव्यू करता है।",
  "[Head Coach name]": "[हेड कोच — जल्द घोषित]",
  "Your India head coach — a player who's competed in Valorant and Counter-Strike at the top of the region — is being announced soon. They run your weekly sessions and review your actual games, backed by Gosu's global bench below.":
    "आपका भारत हेड कोच — एक ऐसा प्लेयर जो रीजन के टॉप पर Valorant और Counter-Strike खेल चुका है — जल्द घोषित होगा। वो आपके वीकली सेशन चलाते हैं और आपके असली गेम्स रिव्यू करते हैं, नीचे दी Gosu की ग्लोबल बेंच के साथ।",
  "Gosu's global bench": "Gosu की ग्लोबल बेंच",
  "Masterclasses from the coaches behind the world's teams.": "दुनिया की टीमों के पीछे रहे कोचों की मास्टरक्लास।",
  "Beyond your head coach, your season includes guest masterclasses from Gosu's international staff — the coaches behind G2, fnatic, T1, Cloud9 and more.":
    "अपने हेड कोच के अलावा, आपके सीज़न में Gosu के इंटरनेशनल स्टाफ़ की गेस्ट मास्टरक्लास शामिल हैं — G2, fnatic, T1, Cloud9 और कई और टीमों के पीछे रहे कोच।",
  "FPS Veteran": "FPS वेटरन",
  "Coached G2 Esports, FunPlus Phoenix and now Heretics.": "G2 Esports, FunPlus Phoenix और अब Heretics को कोच किया।",
  "Valorant Coach": "Valorant कोच",
  "Known for his work with VersionX and fnatic.": "VersionX और fnatic के साथ अपने काम के लिए जाने जाते हैं।",
  "Ex-CS:GO Pro": "पूर्व CS:GO प्रो",
  "Valorant pro, with stints at T1 and Cloud9.": "Valorant प्रो, T1 और Cloud9 के साथ काम कर चुके।",
  "Strategist": "स्ट्रैटेजिस्ट",
  "Valorant strategist for individuals and pro teams.": "इंडिविजुअल्स और प्रो टीमों के लिए Valorant स्ट्रैटेजिस्ट।",
  "Assistant Coach": "असिस्टेंट कोच",
  "Top-200 EU, and a first-place, MVP run at a regional university championship. Preps MENA teams on comms and match readiness.":
    "Top-200 EU, और एक रीजनल यूनिवर्सिटी चैंपियनशिप में पहला स्थान और MVP। MENA टीमों को कॉम्स और मैच रेडीनेस पर तैयार करते हैं।",
  "That's the international half of the bench. Your local India head coach and support staff are being announced soon.":
    "यह बेंच का इंटरनेशनल हिस्सा है। आपका लोकल भारत हेड कोच और सपोर्ट स्टाफ़ जल्द घोषित होंगे।",
  "Players we coached onto pro and national teams.": "वो प्लेयर्स जिन्हें हमने प्रो और नेशनल टीमों तक कोच किया।",
  "Reached the pro scene": "प्रो सीन तक पहुँचे",
  "Finished top of his Academy cohort and became the only student to go on and compete in the professional scene, playing for The Spark.":
    "अपने Academy कोहॉर्ट में टॉप किया और इकलौते ऐसे स्टूडेंट बने जो आगे प्रोफेशनल सीन में खेले — The Spark के लिए।",
  "MVP & tournament winner": "MVP और टूर्नामेंट विनर",
  "Ran the team as in-game leader, then took MVP and first place at the EWC Academy tournament off the back of it.":
    "टीम को इन-गेम लीडर के तौर पर चलाया, फिर उसी दम पर EWC Academy टूर्नामेंट में MVP और पहला स्थान लिया।",
  "Podium + rank climb": "पोडियम + रैंक चढ़ाई",
  "Climbed the ranked ladder fast and placed third at the EWC Academy tournament, while helping the players around him get better too.":
    "रैंक्ड लैडर तेज़ी से चढ़े और EWC Academy टूर्नामेंट में तीसरा स्थान पाया, साथ ही अपने आस-पास के प्लेयर्स को भी बेहतर बनाया।",
  "Real Gosu Academy Valorant alumni. India's first cohorts start now.":
    "असली Gosu Academy Valorant एलुमनाई। भारत के पहले कोहॉर्ट अभी शुरू हो रहे हैं।",
  "This is a fixed-schedule programme with a coach, weekly hours, and a government-recognised certificate at the end, and Valorant skills sit inside a wider esports industry that hires coaches, analysts, and organisers, not only players.":
    "यह एक तय-शेड्यूल प्रोग्राम है जिसमें एक कोच, वीकली घंटे और आख़िर में एक सरकार-मान्यता प्राप्त सर्टिफिकेट है, और Valorant स्किल्स एक बड़ी esports इंडस्ट्री का हिस्सा हैं जो सिर्फ़ प्लेयर्स नहीं — कोच, एनालिस्ट और ऑर्गनाइज़र भी हायर करती है।",
  "What rank is this for?": "यह किस रैंक के लिए है?",
  "We run separate cohorts by skill level, so you train with players around your rank instead of being dropped into a mismatch. Tell us where you're at on the free assessment and we'll place you in the right one. Newer to the game? Start in the free cup and Foundation resources first.":
    "हम स्किल लेवल के हिसाब से अलग-अलग कोहॉर्ट चलाते हैं, ताकि आप अपनी रैंक के आस-पास के प्लेयर्स के साथ ट्रेन करें, किसी मिसमैच में न फँसें। फ्री असेसमेंट पर हमें बताएँ कि आप कहाँ हैं और हम आपको सही कोहॉर्ट में रखेंगे। गेम में नए हैं? पहले फ्री कप और Foundation रिसोर्सेज़ से शुरू करें।",
  "Do I need a full team to join?": "क्या जॉइन करने के लिए पूरी टीम चाहिए?",
  "No. You can enrol solo and we place you with a cohort, or bring your own five. The Showcase runs 5v5 against a comparable-rank opponent.":
    "नहीं। आप अकेले एनरोल कर सकते हैं और हम आपको एक कोहॉर्ट के साथ रखते हैं, या अपने पाँच लाएँ। Showcase बराबर रैंक के विरोधी के ख़िलाफ़ 5v5 चलता है।",
  "What exactly is the certificate?": "सर्टिफिकेट असल में है क्या?",
  "The Gosu Academy × SPEFL-SC Valorant Advanced certificate, issued by India's government esports skills council, mapped toward the national skills framework. Full NSQF credit-alignment is in progress.":
    "Gosu Academy × SPEFL-SC Valorant Advanced सर्टिफिकेट, भारत की सरकारी esports स्किल्स काउंसिल से जारी, नेशनल स्किल्स फ्रेमवर्क से जुड़ा। पूरा NSQF क्रेडिट-अलाइनमेंट जारी है।",
  "Is it live or recorded?": "यह लाइव है या रिकॉर्डेड?",
  "Live. 15 sessions of two hours each, more than half spent in scrims, drills, and review of your own VODs.":
    "लाइव। दो-दो घंटे के 15 सेशन, जिनका आधे से ज़्यादा हिस्सा स्क्रिम्स, ड्रिल्स और आपके अपने VODs के रिव्यू में जाता है।",
  "The road to Radiant": "Radiant तक का रास्ता",
  "Stop grinding alone.": "अकेले ग्राइंड करना बंद करें।",
  "Enrol in the next cohort, or test the waters in the free weekly Valorant cup. Either way, see what coached actually feels like.":
    "अगले कोहॉर्ट में एनरोल करें, या फ्री वीकली Valorant कप में हाथ आज़माएँ। किसी भी तरह, महसूस करें कि कोच होकर खेलना कैसा लगता है।",
  "EMI available · Hindi & English · India-region servers":
    "EMI उपलब्ध · हिंदी और अंग्रेज़ी · भारत-रीजन सर्वर",
  "Gosu Academy × SPEFL-SC × Bharat Esports. SPEFL-SC certified at launch; NSQF credit-alignment in progress. Curriculum from the Gosu Academy Valorant Advanced framework. Hindi & English · India-region servers. Agent and map art © Riot Games — placeholder for design.":
    "Gosu Academy × SPEFL-SC × Bharat Esports. लॉन्च पर SPEFL-SC सर्टिफ़ाइड; NSQF क्रेडिट-अलाइनमेंट जारी है। करिकुलम Gosu Academy Valorant Advanced फ्रेमवर्क से। हिंदी और अंग्रेज़ी · भारत-रीजन सर्वर। एजेंट और मैप आर्ट © Riot Games — डिज़ाइन के लिए प्लेसहोल्डर।",

  // ── Checkout return (Thanks) ──────────────────────────────────────────
  "One moment": "एक पल",
  "Confirming your payment…": "आपका पेमेंट कन्फ़र्म किया जा रहा है…",
  "This usually takes a few seconds. Keep this tab open.": "इसमें आम तौर पर कुछ ही सेकंड लगते हैं। यह टैब खुला रखें।",
  "Enrollment confirmed": "एनरोलमेंट कन्फ़र्म हुआ",
  "Welcome to": "आपका स्वागत है:",
  "A receipt is on its way to your email. Two things to do right now:": "आपकी ईमेल पर रसीद आ रही है। अभी दो काम करने हैं:",
  "Join the Academy Discord": "अकादमी का Discord जॉइन करें",
  "Join the WhatsApp group": "WhatsApp ग्रुप जॉइन करें",
  "A coach will welcome you and confirm your batch within 24 hours.": "एक कोच 24 घंटे के अंदर आपका स्वागत करेगा और आपका बैच कन्फ़र्म करेगा।",
  "Payment didn't go through": "पेमेंट पूरा नहीं हुआ",
  "No money left your account for this order.": "इस ऑर्डर के लिए आपके अकाउंट से कोई पैसा नहीं कटा।",
  "Head back and try again — UPI, cards, and netbanking are all supported.": "वापस जाकर दोबारा कोशिश करें — UPI, कार्ड और नेटबैंकिंग सब सपोर्टेड हैं।",
  "Valorant course": "Valorant कोर्स",
  "BGMI course": "BGMI कोर्स",
  "Still processing": "अभी प्रोसेस हो रहा है",
  "We couldn't confirm this order yet.": "हम इस ऑर्डर को अभी कन्फ़र्म नहीं कर पाए।",
  "If you completed payment, your confirmation email will arrive shortly — check your inbox. Otherwise": "अगर आपने पेमेंट पूरा कर लिया है, तो आपकी कन्फ़र्मेशन ईमेल जल्द आ जाएगी — अपना इनबॉक्स देखें। वरना",
  "contact us": "हमसे संपर्क करें",
  "with your payment reference.": "अपने पेमेंट रेफ़रेंस के साथ।",

  // ── Checkout modal (EnrollPanel) ──────────────────────────────────────
  "Enrollment": "एनरोलमेंट",
  "Enroll in": "इसमें एनरोल करें:",
  "Close": "बंद करें",
  "Payment plan": "पेमेंट प्लान",
  "one payment": "एक बार का पेमेंट",
  "monthly payments": "मंथली पेमेंट",
  "month": "माह",
  "Full name": "पूरा नाम",
  "Email": "ईमेल",
  "Mobile (WhatsApp)": "मोबाइल (WhatsApp)",
  "Send my onboarding and batch updates on WhatsApp": "मेरी ऑनबोर्डिंग और बैच अपडेट WhatsApp पर भेजें",
  "I agree to the": "मैं सहमत हूँ",
  "terms": "टर्म्स",
  "and": "और",
  "refund policy": "रिफंड पॉलिसी से",
  "Pay": "पे करें",
  "Opening secure checkout…": "सिक्योर चेकआउट खुल रहा है…",
  "Payments processed by Paddle. UPI, cards, and netbanking supported.": "पेमेंट Paddle से प्रोसेस होते हैं। UPI, कार्ड और नेटबैंकिंग सपोर्टेड।",
  "Please accept the terms and refund policy to continue.": "आगे बढ़ने के लिए टर्म्स और रिफंड पॉलिसी स्वीकार करें।",
  "Check the form and try again.": "फ़ॉर्म जाँचें और दोबारा कोशिश करें।",
  "Couldn't start the payment. Please try again in a moment.": "पेमेंट शुरू नहीं हो सका। कृपया थोड़ी देर में दोबारा कोशिश करें।",

  // ── 404 ───────────────────────────────────────────────────────────────
  "This page isn't on the roster.": "यह पेज रोस्टर में नहीं है।",
  "The page you're after moved or never existed. Head back to the academy.": "जो पेज आप ढूँढ रहे हैं वो हट गया या कभी था ही नहीं। अकादमी पर वापस चलें।",
  "Back to Gosu Academy": "Gosu Academy पर वापस",

  // ── Legal chrome + doc titles ─────────────────────────────────────────
  "Gosu Academy · India": "Gosu Academy · भारत",
  "Last updated": "आख़िरी अपडेट",
  "Terms of Service": "सेवा की शर्तें",
  "Privacy Policy": "प्राइवेसी पॉलिसी",
  "Refund Policy": "रिफंड पॉलिसी",

  // ═══════════════════════════════════════════════════════════════
  // BGMI page — src/bgmiContent.ts
  // ═══════════════════════════════════════════════════════════════
  "BGMI · India's road to the world stage": "BGMI · भारत का वर्ल्ड स्टेज तक का रास्ता",
  "Become a professional": "एक प्रोफेशनल बनो",
  "BGMI player.": "BGMI प्लेयर।",
  "India has one of the deepest BGMI talent pools on earth. What it's never had is a certified path from ranked lobbies to a real roster. Fifteen sessions of tournament-grade squad play, graded against a national framework, with the federation's pipeline waiting at the top.":
    "भारत में धरती के सबसे गहरे BGMI टैलेंट पूल्स में से एक है। जो कभी नहीं रहा, वो है रैंक्ड लॉबीज़ से एक असली रोस्टर तक का सर्टिफ़ाइड रास्ता। टूर्नामेंट-ग्रेड स्क्वाड प्ले के पंद्रह सेशन, एक नेशनल फ्रेमवर्क पर ग्रेडेड, और ऊपर फेडरेशन की पाइपलाइन इंतज़ार करती हुई।",
  "Enroll for ₹12,000": "₹12,000 में एनरोल करें",
  "Join the free BGMI scrims": "फ्री BGMI स्क्रिम्स जॉइन करें",
  "Why you're stuck": "आप क्यों अटके हैं",
  "It's not your gunskill. It's your squad's systems.": "बात आपकी गनस्किल की नहीं है। बात आपके स्क्वाड के सिस्टम्स की है।",
  "Past a certain point most squads already have the mechanics. What's missing is the structure real tournament teams take for granted.":
    "एक हद के बाद ज़्यादातर स्क्वाड के पास मैकेनिक्स तो होते ही हैं। जो नहीं होता वो है वो स्ट्रक्चर जिसे असली टूर्नामेंट टीमें मामूली मान लेती हैं।",
  "You win fights, then die to the zone": "आप फ़ाइट जीतते हैं, फिर ज़ोन में मर जाते हैं",
  "Great gunskill, bad timing. Without rotation plans and zone reads, won fights still end in a losing final circle.":
    "बढ़िया गनस्किल, पर ख़राब टाइमिंग। रोटेशन प्लान और ज़ोन रीड्स के बिना, जीती हुई फ़ाइट भी हारते फ़ाइनल सर्कल में ख़त्म होती है।",
  "Phase 3 drills zone prediction and rotation timing until you're the squad already holding position when the circle closes.":
    "फ़ेज़ 3 में ज़ोन प्रिडिक्शन और रोटेशन टाइमिंग की ड्रिल तब तक चलती है जब तक सर्कल बंद होते वक़्त पोज़िशन पहले से आपके पास न हो।",
  "No plan past the drop": "ड्रॉप के बाद कोई प्लान नहीं",
  "You land, loot, and improvise. No default rotations, no roles, no read on where the lobby is collapsing.":
    "आप लैंड करते हैं, लूट करते हैं, और बस इम्प्रोवाइज़ करते हैं। कोई डिफ़ॉल्ट रोटेशन नहीं, कोई रोल नहीं, लॉबी कहाँ सिमट रही है इसका कोई अंदाज़ा नहीं।",
  "You build drop plans, rotation defaults, and mid-game reads, so every match runs on a plan instead of a scramble.":
    "आप ड्रॉप प्लान, रोटेशन डिफ़ॉल्ट्स और मिड-गेम रीड्स बनाते हैं, ताकि हर मैच अफ़रा-तफ़री की बजाय एक प्लान पर चले।",
  "Four people, four calls": "चार लोग, चार कॉल्स",
  "Everyone talks at once and nobody IGLs. The call that matters gets buried in the noise.":
    "सब एक साथ बोलते हैं और कोई IGL नहीं करता। जो कॉल मायने रखती है वो शोर में दब जाती है।",
  "We install an IGL structure and a comms hierarchy, so the one call that wins the fight lands in time to act on.":
    "हम एक IGL स्ट्रक्चर और कॉम्स हायरार्की सेट करते हैं, ताकि जो एक कॉल फ़ाइट जिताती है वो वक़्त पर पहुँचे।",
  "The tournament curriculum": "टूर्नामेंट करिकुलम",
  "Scenario-led, the way real tournament teams train. Less lecture, more reps.":
    "सिनारियो-लेड, जैसे असली टूर्नामेंट टीमें ट्रेन करती हैं। कम लेक्चर, ज़्यादा रेप्स।",
  "Competitive roles — IGL, fragger, support, scout — and who calls what":
    "कॉम्पिटिटिव रोल्स — IGL, फ्रैगर, सपोर्ट, स्काउट — और कौन क्या कॉल करता है",
  "Comms hierarchy and information systems under fire": "प्रेशर में कॉम्स हायरार्की और इन्फ़ॉर्मेशन सिस्टम्स",
  "The Early Game": "अर्ली गेम",
  "Drop planning & landing spots": "ड्रॉप प्लानिंग और लैंडिंग स्पॉट्स",
  "Early-game survival and loot economy": "अर्ली-गेम सर्वाइवल और लूट इकॉनमी",
  "Reading the plane and the first rotations": "प्लेन पढ़ना और पहली रोटेशन्स",
  "Winning the opening fights that set up your game": "वो शुरुआती फ़ाइट जीतना जो आपका गेम सेट करती हैं",
  "Map & Movement": "मैप और मूवमेंट",
  "Zone prediction & map reading": "ज़ोन प्रिडिक्शन और मैप रीडिंग",
  "Rotation systems and holding position": "रोटेशन सिस्टम्स और पोज़िशन होल्ड करना",
  "Vehicle play and safe repositioning": "व्हीकल प्ले और सेफ़ रिपोज़िशनिंग",
  "Scouting and tracking the lobby": "स्काउटिंग और लॉबी को ट्रैक करना",
  "Combat & Compounds": "कॉम्बैट और कंपाउंड्स",
  "Team-fighting and trade discipline": "टीम-फ़ाइटिंग और ट्रेड डिसिप्लिन",
  "Compound control and holding buildings": "कंपाउंड कंट्रोल और बिल्डिंग्स होल्ड करना",
  "Breaches, nade line-ups, and offense": "ब्रीच, नेड लाइन-अप्स और ऑफ़ेंस",
  "Mid-game decision making": "मिड-गेम डिसीज़न मेकिंग",
  "End-game & Assessment": "एंड-गेम और असेसमेंट",
  "End-game execution in the final circles": "फ़ाइनल सर्कल्स में एंड-गेम एग्ज़ीक्यूशन",
  "VOD review & tournament prep · full squad practice day": "VOD रिव्यू और टूर्नामेंट प्रेप · पूरे दिन स्क्वाड प्रैक्टिस",
  "Tournament Assessment: a graded tournament-style match with individual and squad reporting that feeds the national federation's pipeline":
    "टूर्नामेंट असेसमेंट: इंडिविजुअल और स्क्वाड रिपोर्टिंग के साथ एक ग्रेडेड टूर्नामेंट-स्टाइल मैच, जो नेशनल फेडरेशन की पाइपलाइन में जाता है",
  "Do well in the final Tournament Assessment and your graded report goes in front of Bharat Esports, India's national esports federation. That's real scouting and a route into the national pipeline: the bridge from ranked lobbies to a real roster.":
    "फ़ाइनल टूर्नामेंट असेसमेंट में अच्छा करें और आपकी ग्रेडेड रिपोर्ट Bharat Esports — भारत की नेशनल esports फेडरेशन — के सामने जाती है। यह असली स्काउटिंग है और नेशनल पाइपलाइन में जाने का रास्ता: रैंक्ड लॉबीज़ से एक असली रोस्टर तक का पुल।",
  "Team identity & roles": "टीम आइडेंटिटी और रोल्स",
  "Your squad's playstyle and the IGL / fragger / support / scout roles every rotation and fight is built on.":
    "आपके स्क्वाड की प्लेस्टाइल और IGL / फ्रैगर / सपोर्ट / स्काउट रोल्स, जिन पर हर रोटेशन और फ़ाइट टिकी होती है।",
  "A comms hierarchy and callout structure, so what you see turns into a decision fast enough to use.":
    "एक कॉम्स हायरार्की और कॉलआउट स्ट्रक्चर, ताकि जो आप देखते हैं वो इतनी जल्दी फ़ैसले में बदले कि काम आ सके।",
  "Positioning, rotations & zone play": "पोज़िशनिंग, रोटेशन्स और ज़ोन प्ले",
  "Reading the circle and moving early, so you hold the position instead of fighting for it.":
    "सर्कल पढ़ना और जल्दी मूव करना, ताकि आप पोज़िशन के लिए लड़ने की बजाय उसे पहले से होल्ड करें।",
  "Strategic & mid-game decisions": "स्ट्रैटेजिक और मिड-गेम फ़ैसले",
  "Picking your fights and your win condition, and adapting the plan when the lobby collapses.":
    "अपनी फ़ाइट और विन कंडीशन चुनना, और जब लॉबी सिमटे तो प्लान बदलना।",
  "Combat & compound control": "कॉम्बैट और कंपाउंड कंट्रोल",
  "Team-fighting, breaching, and holding buildings with coordinated utility, not hope.":
    "टीम-फ़ाइटिंग, ब्रीचिंग, और उम्मीद से नहीं — कोऑर्डिनेटेड यूटिलिटी से बिल्डिंग्स होल्ड करना।",
  "Clean execution in the final circles under real tournament pressure, when it's easiest to panic.":
    "असली टूर्नामेंट प्रेशर में फ़ाइनल सर्कल्स में साफ़ एग्ज़ीक्यूशन — जब घबराना सबसे आसान होता है।",
  "The habits and attitude that make a squad worth signing — reviewed and on the record.":
    "वो आदतें और एटीट्यूड जो किसी स्क्वाड को साइन करने लायक बनाती हैं — रिव्यूड और रिकॉर्ड पर।",
  "Final Tournament Assessment: graded, on the record": "फ़ाइनल टूर्नामेंट असेसमेंट: ग्रेडेड, रिकॉर्ड पर",
  "A graded tournament-style match with a report that feeds the national federation's pipeline.":
    "एक ग्रेडेड टूर्नामेंट-स्टाइल मैच, जिसकी रिपोर्ट नेशनल फेडरेशन की पाइपलाइन में जाती है।",
  "Clear the benchmarks and the final Tournament Assessment, and you earn the Gosu Academy × SPEFL-SC BGMI Advanced certificate, issued by India's government skills council and mapped toward the national skills framework. It's proof you trained and were assessed to a real standard, not a participation badge.":
    "बेंचमार्क और फ़ाइनल टूर्नामेंट असेसमेंट क्लियर करें, और आप Gosu Academy × SPEFL-SC BGMI Advanced सर्टिफिकेट पाते हैं — भारत की सरकारी स्किल्स काउंसिल से जारी और नेशनल स्किल्स फ्रेमवर्क से जुड़ा। यह इस बात का सबूत है कि आपने एक असली स्टैंडर्ड तक ट्रेनिंग ली और असेस हुए — कोई पार्टिसिपेशन बैज नहीं।",
  "You also leave with a documented set of drop plans and rotations, a self-analysis habit built on VOD review, and a graded performance report you can show an org.":
    "साथ ही आप ड्रॉप प्लान और रोटेशन्स का एक डॉक्युमेंटेड सेट, VOD रिव्यू पर बनी सेल्फ़-एनालिसिस की आदत, और एक ग्रेडेड परफ़ॉर्मेंस रिपोर्ट लेकर जाते हैं जिसे किसी ऑर्ग को दिखा सकते हैं।",
  "BGMI Advanced · Certified": "BGMI Advanced · सर्टिफ़ाइड",
  "International standard, Indian on the floor. Sessions run in Hindi or English, with guest masterclasses from Gosu's global roster. You're not watching pre-recorded videos. This is live coaching with a coach who reviews your actual matches.":
    "इंटरनेशनल स्टैंडर्ड, फ्लोर पर भारतीय। सेशन हिंदी या अंग्रेज़ी में चलते हैं, साथ में Gosu के ग्लोबल रोस्टर की गेस्ट मास्टरक्लास। आप कोई प्री-रिकॉर्डेड वीडियो नहीं देख रहे। यह लाइव कोचिंग है, एक ऐसे कोच के साथ जो आपके असली मैच रिव्यू करता है।",
  "BGMI · Head Coach": "BGMI · हेड कोच",
  "An Indian coach who's competed in BGMI at the top of the region and run tournament squads, and the one who breaks down the meta when a new map or update drops.":
    "एक भारतीय कोच जो रीजन के टॉप पर BGMI खेल चुके हैं और टूर्नामेंट स्क्वाड चला चुके हैं, और वही जो नया मैप या अपडेट आते ही मेटा को तोड़कर समझाते हैं।",
  "Squads we coached onto tournament and national rosters.": "वो स्क्वाड जिन्हें हमने टूर्नामेंट और नेशनल रोस्टर्स तक कोच किया।",
  "[Player name]": "[प्लेयर का नाम]",
  "[Squad name]": "[स्क्वाड का नाम]",
  "Signed to a roster": "एक रोस्टर में साइन हुए",
  "National qualifier": "नेशनल क्वालिफ़ायर",
  "Conqueror in a season": "एक सीज़न में Conqueror",
  "BGMI · Mumbai": "BGMI · मुंबई",
  "BGMI · Pune": "BGMI · पुणे",
  "Hardstuck in the same lobbies for a year until the rotations and IGL work clicked. Conqueror in a season, then a Tier-2 tryout off the Assessment report.":
    "साल भर उन्हीं लॉबीज़ में हार्डस्टक रहे, जब तक रोटेशन्स और IGL का काम क्लिक न कर गया। एक सीज़न में Conqueror, फिर Assessment रिपोर्ट के दम पर एक Tier-2 ट्रायआउट।",
  "The graded report fed straight into the federation pipeline. First time there was an actual bridge from ranked to the tournament scene.":
    "ग्रेडेड रिपोर्ट सीधे फेडरेशन पाइपलाइन में गई। पहली बार रैंक्ड से टूर्नामेंट सीन तक एक असली पुल बना।",
  "Placeholder case studies. Real BGMI alumni who made tournament and national rosters go here at launch.":
    "प्लेसहोल्डर केस स्टडीज़। लॉन्च पर यहाँ असली BGMI एलुमनाई आएँगे जो टूर्नामेंट और नेशनल रोस्टर्स में पहुँचे।",
  "₹12,000 for the full season.": "पूरे सीज़न के लिए ₹12,000।",
  "Or ₹2,000/month on EMI. One national price, no regional mark-ups. Bring your whole squad and the four-player rate saves you ₹8,000. Less than 0.5% of Gosu students ever ask for a refund, and there's a free weekly scrim so you can see how we coach before you commit.":
    "या EMI पर ₹2,000/महीना। एक नेशनल प्राइस, कोई रीजनल मार्क-अप नहीं। पूरा स्क्वाड लाएँ और फोर-प्लेयर रेट पर ₹8,000 बचाएँ। Gosu के 0.5% से भी कम स्टूडेंट्स कभी रिफंड माँगते हैं, और एक फ्री वीकली स्क्रिम है ताकि कमिट करने से पहले देख सकें कि हम कैसे कोच करते हैं।",
  "or ₹2,000/mo · EMI available": "या ₹2,000/माह · EMI उपलब्ध",
  "Squad workbook & review logs": "स्क्वाड वर्कबुक और रिव्यू लॉग्स",
  "Graded Tournament Assessment": "ग्रेडेड टूर्नामेंट असेसमेंट",
  "SPEFL-SC BGMI Advanced certificate": "SPEFL-SC BGMI Advanced सर्टिफिकेट",
  "Squad rate": "स्क्वाड रेट",
  "Enrol your four": "अपने चारों को एनरोल करें",
  "/ squad": "/ स्क्वाड",
  "Four players, one price. Save ₹8,000 versus enrolling one by one.": "चार प्लेयर, एक क़ीमत। एक-एक करके एनरोल करने के मुक़ाबले ₹8,000 बचाएँ।",
  "Join the free scrims first": "पहले फ्री स्क्रिम्स जॉइन करें",
  "This is a fixed-schedule programme with a coach, weekly hours, and a government-recognised certificate at the end, and BGMI skills sit inside a wider esports industry that hires coaches, analysts, and organisers, not only players.":
    "यह एक तय-शेड्यूल प्रोग्राम है जिसमें एक कोच, वीकली घंटे और आख़िर में एक सरकार-मान्यता प्राप्त सर्टिफिकेट है, और BGMI स्किल्स एक बड़ी esports इंडस्ट्री का हिस्सा हैं जो सिर्फ़ प्लेयर्स नहीं — कोच, एनालिस्ट और ऑर्गनाइज़र भी हायर करती है।",
  "What tier is this for?": "यह किस टियर के लिए है?",
  "We run separate cohorts by skill level, so you train with squads around your tier instead of a mismatch. Tell us where you're at on the free assessment and we'll place you right. Newer to competitive? Start in the free scrims and Foundation resources first.":
    "हम स्किल लेवल के हिसाब से अलग-अलग कोहॉर्ट चलाते हैं, ताकि आप अपने टियर के आस-पास के स्क्वाड के साथ ट्रेन करें, किसी मिसमैच में नहीं। फ्री असेसमेंट पर बताएँ कि आप कहाँ हैं और हम आपको सही जगह रखेंगे। कॉम्पिटिटिव में नए हैं? पहले फ्री स्क्रिम्स और Foundation रिसोर्सेज़ से शुरू करें।",
  "Do I need a full squad to join?": "क्या जॉइन करने के लिए पूरा स्क्वाड चाहिए?",
  "No. You can enrol solo and we place you with a squad, or bring your own four on the squad rate. The Tournament Assessment runs as a tournament-style match against comparable-tier opponents.":
    "नहीं। आप अकेले एनरोल कर सकते हैं और हम आपको एक स्क्वाड के साथ रखते हैं, या स्क्वाड रेट पर अपने चार लाएँ। Tournament Assessment बराबर टियर के विरोधियों के ख़िलाफ़ एक टूर्नामेंट-स्टाइल मैच के तौर पर चलता है।",
  "The Gosu Academy × SPEFL-SC BGMI Advanced certificate, issued by India's government esports skills council, mapped toward the national skills framework. Full NSQF credit-alignment is in progress.":
    "Gosu Academy × SPEFL-SC BGMI Advanced सर्टिफिकेट, भारत की सरकारी esports स्किल्स काउंसिल से जारी, नेशनल स्किल्स फ्रेमवर्क से जुड़ा। पूरा NSQF क्रेडिट-अलाइनमेंट जारी है।",
  "Live. 15 sessions of two hours each, more than half spent in scrims, drills, and review of your own matches.":
    "लाइव। दो-दो घंटे के 15 सेशन, जिनका आधे से ज़्यादा हिस्सा स्क्रिम्स, ड्रिल्स और आपके अपने मैचों के रिव्यू में जाता है।",
  "The road to Conqueror": "Conqueror तक का रास्ता",
  "Stop grinding lobbies alone.": "अकेले लॉबीज़ ग्राइंड करना बंद करें।",
  "Enrol your squad in the next cohort, or test the waters in the free weekly BGMI scrims. Either way, see what coached actually feels like.":
    "अपने स्क्वाड को अगले कोहॉर्ट में एनरोल करें, या फ्री वीकली BGMI स्क्रिम्स में हाथ आज़माएँ। किसी भी तरह, महसूस करें कि कोच होकर खेलना कैसा लगता है।",
  "Gosu Academy × SPEFL-SC × Bharat Esports. SPEFL-SC certified at launch; NSQF credit-alignment in progress. Curriculum from the Gosu Academy BGMI Advanced framework. Hindi & English · India-region servers. Map and key art © KRAFTON / PUBG — placeholder for design.":
    "Gosu Academy × SPEFL-SC × Bharat Esports. लॉन्च पर SPEFL-SC सर्टिफ़ाइड; NSQF क्रेडिट-अलाइनमेंट जारी है। करिकुलम Gosu Academy BGMI Advanced फ्रेमवर्क से। हिंदी और अंग्रेज़ी · भारत-रीजन सर्वर। मैप और की-आर्ट © KRAFTON / PUBG — डिज़ाइन के लिए प्लेसहोल्डर।",

  // ═══════════════════════════════════════════════════════════════
  // Coaching page — src/coachingContent.ts
  // ═══════════════════════════════════════════════════════════════
  "Career track · Esports coaching": "करियर ट्रैक · esports कोचिंग",
  "Start your career as": "अपना करियर शुरू करें",
  "an esports coach.": "एक esports कोच के तौर पर।",
  "Every server has one player who reads the game better than they play it. That read is a career skill. Fifteen sessions of real coaching craft: practice design, film review, and feedback that actually lands, closed out with a live coaching practicum and a certificate from India's government skills council.":
    "हर सर्वर में एक प्लेयर ऐसा होता है जो गेम खेलने से बेहतर उसे पढ़ता है। वो समझ एक करियर स्किल है। असली कोचिंग क्राफ्ट के पंद्रह सेशन: प्रैक्टिस डिज़ाइन, फ़िल्म रिव्यू और ऐसा फ़ीडबैक जो सच में असर करे — आख़िर में एक लाइव कोचिंग प्रैक्टिकम और भारत की सरकारी स्किल्स काउंसिल से एक सर्टिफिकेट।",
  "Enroll for ₹4,000": "₹4,000 में एनरोल करें",
  "Knowing the game doesn't make you a coach.": "गेम जानने भर से आप कोच नहीं बन जाते।",
  "What's missing isn't game knowledge. It's the craft around it, the part nobody on your friends list can teach you.":
    "कमी गेम की जानकारी की नहीं है। कमी है उसके इर्द-गिर्द के क्राफ्ट की — वो हिस्सा जो आपकी फ्रेंड-लिस्ट में कोई नहीं सिखा सकता।",
  "You see it, but you can't prove it": "आप देख लेते हैं, पर साबित नहीं कर पाते",
  "Your reads are right, your calls land, and none of it exists on paper. No portfolio, no credential, no reason for a team to trust you over the next loud voice in Discord.":
    "आपकी रीड्स सही होती हैं, कॉल्स सटीक होती हैं, पर काग़ज़ पर कुछ नहीं। कोई पोर्टफोलियो नहीं, कोई क्रेडेंशियल नहीं, किसी टीम के पास आप पर Discord की अगली ऊँची आवाज़ से ज़्यादा भरोसा करने की कोई वजह नहीं।",
  "You finish with a six-piece coaching portfolio, a scored live practicum, and a government-recognised certificate. Evidence, instead of vibes.":
    "आप एक छह-हिस्सों वाले कोचिंग पोर्टफोलियो, एक स्कोर किए गए लाइव प्रैक्टिकम और एक सरकार-मान्यता प्राप्त सर्टिफिकेट के साथ ख़त्म करते हैं। वाइब्स नहीं, सबूत।",
  "Your feedback doesn't change anything": "आपके फ़ीडबैक से कुछ नहीं बदलता",
  "You tell a player what went wrong, and next scrim they do it again. In the largest review of the evidence, over a third of feedback made performance worse, because it pointed at the player instead of the decision.":
    "आप एक प्लेयर को बताते हैं कि क्या ग़लत हुआ, और अगले स्क्रिम में वो फिर वही करता है। सबूतों की सबसे बड़ी समीक्षा में, एक-तिहाई से ज़्यादा फ़ीडबैक ने परफ़ॉर्मेंस बिगाड़ी — क्योंकि वो फ़ैसले की बजाय प्लेयर पर उँगली उठा रहा था।",
  "Session 5 teaches feedback that sticks: aim at the task, not the ego. One high-impact correction, and a coach's read on when to pause a scrim versus save it for review.":
    "सेशन 5 ऐसा फ़ीडबैक सिखाता है जो टिकता है: निशाना टास्क पर हो, ईगो पर नहीं। एक हाई-इम्पैक्ट करेक्शन, और यह समझ कि कब स्क्रिम रोकना है और कब उसे रिव्यू के लिए बचाना है।",
  "Your only practice plan is “grind more”": "आपका इकलौता प्रैक्टिस प्लान है “और ग्राइंड करो”",
  "Ten hours of scrims with no goal is just ten hours. Squads plateau because nobody designs the practice. They just book it.":
    "बिना किसी गोल के दस घंटे के स्क्रिम बस दस घंटे हैं। स्क्वाड इसलिए अटक जाते हैं क्योंकि प्रैक्टिस को कोई डिज़ाइन नहीं करता। बस बुक कर देते हैं।",
  "You build practice blocks with one to three measurable goals, basic periodization, and load management. Practice quality beats raw hours, and you'll be able to show a team why.":
    "आप एक से तीन नाप सकने वाले गोल्स, बेसिक पीरियडाइज़ेशन और लोड मैनेजमेंट के साथ प्रैक्टिस ब्लॉक बनाते हैं। प्रैक्टिस की क्वालिटी घंटों की गिनती से ज़्यादा मायने रखती है, और आप किसी टीम को बता पाएँगे क्यों।",
  "The coaching curriculum": "कोचिंग करिकुलम",
  "15 sessions. 5 phases. A live practicum at the end.": "15 सेशन। 5 फ़ेज़। आख़िर में एक लाइव प्रैक्टिकम।",
  "Scenario-led and practice-heavy, the way real coaches develop. Less lecture, more coaching reps.":
    "सिनारियो-लेड और प्रैक्टिस-हेवी, जैसे असली कोच बनते हैं। कम लेक्चर, ज़्यादा कोचिंग रेप्स।",
  "Coaching Foundations & Identity": "कोचिंग फ़ाउंडेशन्स और आइडेंटिटी",
  "What a coach is and isn't: role boundaries with the analyst, manager, and IGL":
    "कोच क्या होता है और क्या नहीं: एनालिस्ट, मैनेजर और IGL के साथ रोल की सीमाएँ",
  "The 4Cs model of coaching effectiveness, and your own coaching philosophy":
    "कोचिंग इफ़ेक्टिवनेस का 4Cs मॉडल, और आपकी अपनी कोचिंग फ़िलॉसफ़ी",
  "The honest career map: where coaching work actually exists in India":
    "ईमानदार करियर मैप: भारत में कोचिंग का काम असल में कहाँ है",
  "The Core Coaching Loop": "कोर कोचिंग लूप",
  "Designing practice: deliberate-practice principles, periodization, killing the grind myth":
    "प्रैक्टिस डिज़ाइन करना: डेलिबरेट-प्रैक्टिस के सिद्धांत, पीरियडाइज़ेशन, ग्राइंड मिथक को ख़त्म करना",
  "The film / VOD review method: root cause, one correction, not a list of ten":
    "फ़िल्म / VOD रिव्यू का तरीका: रूट कॉज़, एक करेक्शन — दस की लिस्ट नहीं",
  "Feedback that works: task vs ego, concurrent vs terminal, retiring the sandwich":
    "ऐसा फ़ीडबैक जो काम करे: टास्क बनाम ईगो, कॉनकरेंट बनाम टर्मिनल, सैंडविच को अलविदा",
  "Running the full loop with an analyst and the right review tools":
    "एक एनालिस्ट और सही रिव्यू टूल्स के साथ पूरा लूप चलाना",
  "Coaching People": "लोगों को कोच करना",
  "Team culture, accountability standards, and supporting the IGL":
    "टीम कल्चर, जवाबदेही के स्टैंडर्ड, और IGL को सपोर्ट करना",
  "Motivation and player development built on self-determination theory":
    "सेल्फ़-डिटरमिनेशन थ्योरी पर बना मोटिवेशन और प्लेयर डेवलपमेंट",
  "Mental performance: tilt, pressure, and coaching the reset routine":
    "मेंटल परफ़ॉर्मेंस: टिल्ट, प्रेशर, और रीसेट रूटीन को कोच करना",
  "Duty of Care & Applied Coaching": "ड्यूटी ऑफ़ केयर और अप्लाइड कोचिंग",
  "Player welfare: sleep, load, burnout, and what changes when you coach minors":
    "प्लेयर वेलफ़ेयर: नींद, लोड, बर्नआउट, और नाबालिगों को कोच करते वक़्त क्या बदलता है",
  "Integrity and conduct: the ESIC Anti-Corruption Code, the coaching-bug lesson":
    "इंटीग्रिटी और कंडक्ट: ESIC Anti-Corruption Code, कोचिंग-बग वाला सबक",
  "Applied coaching by title: Valorant (tactical FPS) and BGMI (battle royale)":
    "टाइटल के हिसाब से अप्लाइड कोचिंग: Valorant (टैक्टिकल FPS) और BGMI (बैटल रॉयल)",
  "Practicum & Assessment": "प्रैक्टिकम और असेसमेंट",
  "Assemble your coaching plan and case portfolio": "अपना कोचिंग प्लान और केस पोर्टफोलियो तैयार करें",
  "The practicum: coach a live scrim, from goals to intervention to reset to debrief":
    "प्रैक्टिकम: एक लाइव स्क्रिम कोच करें — गोल्स से इंटरवेंशन, रीसेट और डीब्रीफ़ तक",
  "Assessment & showcase: scored demonstration, portfolio review, certification pathway":
    "असेसमेंट और शोकेस: स्कोर किया गया डेमॉन्स्ट्रेशन, पोर्टफोलियो रिव्यू, सर्टिफिकेशन पाथवे",
  "Session 14 isn't a quiz. You coach a live scrim while a facilitator scores you on the same rubric working coaches are held to: set the goals, observe, deliver one concurrent intervention, call a structured reset, run the debrief. Pass it, and the scored report goes into your portfolio as proof you've actually coached, not just studied coaching.":
    "सेशन 14 कोई क्विज़ नहीं है। आप एक लाइव स्क्रिम कोच करते हैं जबकि एक फ़ैसिलिटेटर आपको उसी रूब्रिक पर स्कोर करता है जिस पर काम करने वाले कोच परखे जाते हैं: गोल्स सेट करें, ऑब्ज़र्व करें, एक कॉनकरेंट इंटरवेंशन दें, एक स्ट्रक्चर्ड रीसेट कॉल करें, डीब्रीफ़ चलाएँ। इसे पास करें, और स्कोर की गई रिपोर्ट आपके पोर्टफोलियो में इस सबूत के तौर पर जाती है कि आपने सच में कोच किया है, सिर्फ़ कोचिंग पढ़ी नहीं।",
  "The loop you'll run every single week": "वो लूप जो आप हर एक हफ़्ते चलाएँगे",
  "Set goals": "गोल्स सेट करें",
  "Scrim": "स्क्रिम",
  "Root-cause review": "रूट-कॉज़ रिव्यू",
  "One correction": "एक करेक्शन",
  "Next session": "अगला सेशन",
  "Coaching identity & role": "कोचिंग आइडेंटिटी और रोल",
  "What an esports coach does and doesn't do, clear boundaries with the analyst, manager, and IGL, and a coaching philosophy you can defend.":
    "एक esports कोच क्या करता है और क्या नहीं, एनालिस्ट, मैनेजर और IGL के साथ साफ़ सीमाएँ, और एक ऐसी कोचिंग फ़िलॉसफ़ी जिसका आप बचाव कर सकें।",
  "Practice & session design": "प्रैक्टिस और सेशन डिज़ाइन",
  "Practice blocks with one to three measurable goals, basic periodization, and load management. Structure, instead of the grind myth.":
    "एक से तीन नाप सकने वाले गोल्स, बेसिक पीरियडाइज़ेशन और लोड मैनेजमेंट के साथ प्रैक्टिस ब्लॉक। ग्राइंड मिथक की जगह स्ट्रक्चर।",
  "Film & VOD review": "फ़िल्म और VOD रिव्यू",
  "Root-cause reviews: what happened, why it happened, and the one correction the player can act on next map.":
    "रूट-कॉज़ रिव्यू: क्या हुआ, क्यों हुआ, और वो एक करेक्शन जिस पर प्लेयर अगले मैप में एक्ट कर सके।",
  "Communication & feedback": "कम्युनिकेशन और फ़ीडबैक",
  "Feedback aimed at the decision, not the player's character, and the judgement of when to say it live versus in review.":
    "फ़ीडबैक जो फ़ैसले पर निशाना लगाए, प्लेयर के चरित्र पर नहीं, और यह समझ कि उसे कब लाइव कहना है और कब रिव्यू में।",
  "Culture & player development": "कल्चर और प्लेयर डेवलपमेंट",
  "Culture standards, role clarity, supporting the IGL, and development plans built on motivation science that holds up.":
    "कल्चर के स्टैंडर्ड, रोल की स्पष्टता, IGL को सपोर्ट करना, और ऐसे डेवलपमेंट प्लान जो टिकने वाली मोटिवेशन साइंस पर बने हों।",
  "Mental performance & welfare": "मेंटल परफ़ॉर्मेंस और वेलफ़ेयर",
  "Reset routines for tilt and pressure, the seven duty-of-care pillars, and what changes when a player is under 18.":
    "टिल्ट और प्रेशर के लिए रीसेट रूटीन, ड्यूटी-ऑफ़-केयर के सात स्तंभ, और जब कोई प्लेयर 18 से कम का हो तो क्या बदलता है।",
  "Integrity & conduct": "इंटीग्रिटी और कंडक्ट",
  "The ESIC Anti-Corruption Code, safeguarding basics, and professional conduct. Assessed, not assumed.":
    "ESIC Anti-Corruption Code, सेफ़गार्डिंग की बुनियाद, और प्रोफेशनल कंडक्ट। मान लिया नहीं — परखा गया।",
  "Live practicum + portfolio: scored, on the record": "लाइव प्रैक्टिकम + पोर्टफोलियो: स्कोर किया गया, रिकॉर्ड पर",
  "You coach a live scrim and submit a six-piece coaching portfolio, scored across all seven competencies. That's the certificate, and the job application.":
    "आप एक लाइव स्क्रिम कोच करते हैं और एक छह-हिस्सों वाला कोचिंग पोर्टफोलियो जमा करते हैं, जो सातों कॉम्पिटेंसीज़ पर स्कोर होता है। यही सर्टिफिकेट है, और यही जॉब ऐप्लिकेशन।",
  "A credential, and the receipts to back it.": "एक क्रेडेंशियल, और उसे साबित करने वाली रसीदें।",
  "Clear the benchmarks and the live practicum, and you earn the Gosu Academy × SPEFL-SC Certified Esports Coach (Foundation), issued with India's government skills council and mapped to the ICCE framework real sport coaching runs on. It's the first credential of its kind in India, and it's graded, not attended.":
    "बेंचमार्क और लाइव प्रैक्टिकम क्लियर करें, और आप Gosu Academy × SPEFL-SC Certified Esports Coach (Foundation) पाते हैं — भारत की सरकारी स्किल्स काउंसिल के साथ जारी और ICCE फ्रेमवर्क से जुड़ा, जिस पर असली स्पोर्ट कोचिंग चलती है। यह भारत में अपनी तरह का पहला क्रेडेंशियल है, और यह ग्रेडेड है — हाज़िरी वाला नहीं।",
  "You also leave with the portfolio that does the talking: a one-page coaching philosophy, a practice-block plan, a film-review write-up, a player-development plan, a welfare and safeguarding checklist, and your scored practicum report.":
    "साथ ही आप वो पोर्टफोलियो लेकर जाते हैं जो ख़ुद बोलता है: एक-पेज की कोचिंग फ़िलॉसफ़ी, एक प्रैक्टिस-ब्लॉक प्लान, एक फ़िल्म-रिव्यू राइट-अप, एक प्लेयर-डेवलपमेंट प्लान, एक वेलफ़ेयर और सेफ़गार्डिंग चेकलिस्ट, और आपकी स्कोर की गई प्रैक्टिकम रिपोर्ट।",
  "Esports Coach · Foundation": "Esports Coach · Foundation",
  "Gosu Academy × SPEFL-SC. The first rung on India's coaching ladder.":
    "Gosu Academy × SPEFL-SC. भारत की कोचिंग लैडर की पहली सीढ़ी।",
  "Two months. Real coaching reps. Scored.": "दो महीने। असली कोचिंग रेप्स। स्कोर किए गए।",
  "Learn the craft from people paid to coach.": "उन लोगों से क्राफ्ट सीखें जिन्हें कोच करने के पैसे मिलते हैं।",
  "Your cohort runs live with a working coach, not a slide deck. You'll deliver feedback, run reviews, and get your coaching reps scored on the spot, with guest masterclasses from Gosu's international roster: the same coaches who've staffed teams like G2 Esports, FunPlus Phoenix, and Heretics.":
    "आपका कोहॉर्ट एक काम करने वाले कोच के साथ लाइव चलता है, किसी स्लाइड डेक के साथ नहीं। आप फ़ीडबैक देंगे, रिव्यू चलाएँगे, और अपने कोचिंग रेप्स मौक़े पर स्कोर करवाएँगे — साथ में Gosu के इंटरनेशनल रोस्टर की गेस्ट मास्टरक्लास: वही कोच जिन्होंने G2 Esports, FunPlus Phoenix और Heretics जैसी टीमों में काम किया है।",
  "Coaching · Lead Facilitator": "कोचिंग · लीड फ़ैसिलिटेटर",
  "We know how to launch esports careers.": "हमें पता है esports करियर कैसे लॉन्च किए जाते हैं।",
  "Behind the biggest channels": "सबसे बड़े चैनलों के पीछे",
  "Content · Production": "कंटेंट · प्रोडक्शन",
  "Came through our programs and now casts national league playoffs on the main broadcast.":
    "हमारे प्रोग्राम्स से निकले और अब मेन ब्रॉडकास्ट पर नेशनल लीग प्लेऑफ़्स कास्ट करते हैं।",
  "Learned the production craft with us and now runs content for creators with millions of subscribers.":
    "हमारे साथ प्रोडक्शन क्राफ्ट सीखा और अब लाखों सब्सक्राइबर वाले क्रिएटर्स के लिए कंटेंट चलाते हैं।",
  "Turned game knowledge into organising his own tournaments across multiple titles.":
    "गेम की जानकारी को कई टाइटल्स में अपने ख़ुद के टूर्नामेंट ऑर्गनाइज़ करने में बदल दिया।",
  "These alumni didn't all become coaches. They're people who came to us wanting a career in esports and got one, from the broadcast desk to the production booth. Getting you started is the whole point.":
    "ये सभी एलुमनाई कोच नहीं बने। ये वो लोग हैं जो esports में करियर चाहते हुए हमारे पास आए और उन्हें एक करियर मिला — ब्रॉडकास्ट डेस्क से लेकर प्रोडक्शन बूथ तक। आपको शुरू करवाना ही पूरी बात है।",
  "₹4,000. The cheapest seat in the industry.": "₹4,000। इंडस्ट्री की सबसे सस्ती सीट।",
  "One payment, everything included. Less than a season of skins, for a government-certified credential and a portfolio you can put in front of an academy. Under 0.5% of Gosu students ever ask for a refund, and the assessment call is free, so you can find out if coaching is your lane before you spend a rupee.":
    "एक पेमेंट, सब कुछ शामिल। एक सीज़न की स्किन्स से भी कम में — एक सरकार-सर्टिफ़ाइड क्रेडेंशियल और एक पोर्टफोलियो जिसे आप किसी अकादमी के सामने रख सकें। Gosu के 0.5% से भी कम स्टूडेंट्स कभी रिफंड माँगते हैं, और असेसमेंट कॉल फ्री है, ताकि एक रुपया ख़र्च करने से पहले आप जान लें कि कोचिंग आपकी लेन है या नहीं।",
  "/ course": "/ कोर्स",
  "Coaching reps, film review & scenario work": "कोचिंग रेप्स, फ़िल्म रिव्यू और सिनारियो वर्क",
  "Participant workbook & film-review logs": "पार्टिसिपेंट वर्कबुक और फ़िल्म-रिव्यू लॉग्स",
  "Six-piece coaching case portfolio": "छह-हिस्सों वाला कोचिंग केस पोर्टफोलियो",
  "SPEFL-SC Certified Esports Coach (Foundation)": "SPEFL-SC Certified Esports Coach (Foundation)",
  "Where it leads": "यह कहाँ ले जाता है",
  "Foundation is the first, stackable rung. Game-specific Level 2 coach tracks build on top of it.":
    "Foundation पहली, एक-के-ऊपर-एक जुड़ने वाली सीढ़ी है। गेम-स्पेसिफ़िक Level 2 कोच ट्रैक इसी के ऊपर बनते हैं।",
  "Foundation coach": "Foundation कोच",
  "Level 2 · Valorant / BGMI coach": "Level 2 · Valorant / BGMI कोच",
  "Assistant coach": "असिस्टेंट कोच",
  "Head coach · performance lead": "हेड कोच · परफ़ॉर्मेंस लीड",
  "It's a teaching job. With a certificate.": "यह एक टीचिंग जॉब है। सर्टिफिकेट के साथ।",
  "Coaching is the esports career families already understand: fixed hours, a written framework, and a credential issued with a government skills council. The industry hires coaches, analysts, and mentors. That's steady work that doesn't depend on winning the pro lottery.":
    "कोचिंग वो esports करियर है जिसे परिवार पहले से समझते हैं: तय घंटे, एक लिखित फ्रेमवर्क, और एक सरकारी स्किल्स काउंसिल के साथ जारी एक क्रेडेंशियल। इंडस्ट्री कोच, एनालिस्ट और मेंटर हायर करती है। यह ऐसा टिकाऊ काम है जो प्रो-लॉटरी जीतने पर निर्भर नहीं करता।",
  "Certified with SPEFL-SC, India's government skills council": "SPEFL-SC — भारत की सरकारी स्किल्स काउंसिल — के साथ सर्टिफ़ाइड",
  "Assessed against a written framework mapped to real sport coaching (ICCE)":
    "एक लिखित फ्रेमवर्क पर परखा गया, जो असली स्पोर्ट कोचिंग (ICCE) से जुड़ा है",
  "Player welfare and safeguarding are graded competencies, not footnotes":
    "प्लेयर वेलफ़ेयर और सेफ़गार्डिंग ग्रेडेड कॉम्पिटेंसीज़ हैं, फ़ुटनोट नहीं",
  "₹4,000 one-time. Hindi or English.": "₹4,000 एक बार। हिंदी या अंग्रेज़ी।",
  "Do I need to have been a pro?": "क्या मेरा प्रो रहना ज़रूरी है?",
  "No. This is a foundation-level course for anyone 16 or older with real game knowledge in Valorant or BGMI. Ex-players usually arrive with sharp instincts and blunt delivery; newcomers arrive with neither. The course is built to handle both, and the free assessment call places you honestly.":
    "नहीं। यह एक फ़ाउंडेशन-लेवल कोर्स है, किसी भी 16 साल या उससे बड़े इंसान के लिए जिसे Valorant या BGMI की असली जानकारी हो। पूर्व-प्लेयर्स अक्सर तेज़ इंस्टिंक्ट और कड़वी डिलीवरी के साथ आते हैं; नए लोग दोनों के बिना। कोर्स दोनों को संभालने के लिए बना है, और फ्री असेसमेंट कॉल आपको ईमानदारी से सही जगह रखती है।",
  "Which game will I coach?": "मैं कौन-सा गेम कोच करूँगा?",
  "The coaching craft is title-agnostic: the loop, feedback, and welfare work the same everywhere. Applied sessions run in Valorant and BGMI, and you pick one of the two as your title for the live practicum.":
    "कोचिंग क्राफ्ट टाइटल से बंधा नहीं है: लूप, फ़ीडबैक और वेलफ़ेयर हर जगह एक जैसे काम करते हैं। अप्लाइड सेशन Valorant और BGMI में चलते हैं, और लाइव प्रैक्टिकम के लिए आप इन दोनों में से एक टाइटल चुनते हैं।",
  "The Gosu Academy × SPEFL-SC Certified Esports Coach (Foundation), issued with India's government esports skills council and mapped to the ICCE International Sport Coaching Framework. Full NSQF credit-alignment is in progress.":
    "Gosu Academy × SPEFL-SC Certified Esports Coach (Foundation), भारत की सरकारी esports स्किल्स काउंसिल के साथ जारी और ICCE International Sport Coaching Framework से जुड़ा। पूरा NSQF क्रेडिट-अलाइनमेंट जारी है।",
  "Will this get me a job?": "क्या इससे मुझे जॉब मिलेगी?",
  "Here's the honest version: nobody in esports hires on a certificate alone; they hire on proof. Salaried seats at pro orgs are scarce and we won't pretend otherwise. The real, growing demand is grassroots, academy, scholastic, and freelance coaching, and this course is built to make you employable exactly there: a credential plus a portfolio plus a scored practicum.":
    "ईमानदार जवाब यह है: esports में कोई सिर्फ़ सर्टिफिकेट पर हायर नहीं करता; लोग सबूत पर हायर करते हैं। प्रो ऑर्ग्स में सैलरी वाली सीटें कम हैं और हम इसे छिपाएँगे नहीं। असली, बढ़ती हुई माँग ग्रासरूट, अकादमी, स्कोलैस्टिक और फ्रीलांस कोचिंग में है, और यह कोर्स आपको ठीक वहीं के लिए एम्प्लॉयेबल बनाने के लिए बना है: एक क्रेडेंशियल + एक पोर्टफोलियो + एक स्कोर किया गया प्रैक्टिकम।",
  "Is it live? In which language?": "क्या यह लाइव है? किस भाषा में?",
  "Live, always. 15 sessions of two hours each, over half spent doing coaching reps, film review, and scenario work. Sessions run in Hindi or English, whichever you think in.":
    "हमेशा लाइव। दो-दो घंटे के 15 सेशन, जिनका आधे से ज़्यादा हिस्सा कोचिंग रेप्स, फ़िल्म रिव्यू और सिनारियो वर्क में जाता है। सेशन हिंदी या अंग्रेज़ी में चलते हैं — जिसमें आप सोचते हों।",
  "From player to coach": "प्लेयर से कोच तक",
  "Stop coaching for free in Discord calls.": "Discord कॉल्स में फ्री में कोचिंग करना बंद करें।",
  "Enrol in the next cohort, or book the free assessment call and find out if coaching is your lane. Either way, your game sense deserves more than spectator mode.":
    "अगले कोहॉर्ट में एनरोल करें, या फ्री असेसमेंट कॉल बुक करें और जानें कि कोचिंग आपकी लेन है या नहीं। किसी भी तरह, आपका गेम सेंस स्पेक्टेटर मोड से ज़्यादा का हक़दार है।",
  "₹4,000 one-time · Hindi & English · Online, live": "₹4,000 एक बार · हिंदी और अंग्रेज़ी · ऑनलाइन, लाइव",
  "Gosu Academy × SPEFL-SC × Bharat Esports. SPEFL-SC certified at launch; NSQF credit-alignment in progress. Curriculum from the Gosu Academy Certified Esports Coach (Foundation) framework, mapped to the ICCE International Sport Coaching Framework. Hindi & English · Online, live. Imagery is AI-generated concept art — placeholder for launch photography.":
    "Gosu Academy × SPEFL-SC × Bharat Esports. लॉन्च पर SPEFL-SC सर्टिफ़ाइड; NSQF क्रेडिट-अलाइनमेंट जारी है। करिकुलम Gosu Academy Certified Esports Coach (Foundation) फ्रेमवर्क से, ICCE International Sport Coaching Framework से जुड़ा। हिंदी और अंग्रेज़ी · ऑनलाइन, लाइव। इमेजरी AI-जनरेटेड कॉन्सेप्ट आर्ट है — लॉन्च फ़ोटोग्राफ़ी के लिए प्लेसहोल्डर।",

  // Legal — the "Last updated" date, shared across all four legal docs.
  "3 July 2026": "3 जुलाई 2026",

  // ═══════════════════════════════════════════════════════════════
  // Tournament Ops page — src/tournamentContent.ts
  // ═══════════════════════════════════════════════════════════════
  "Career track · Tournament operations": "करियर ट्रैक · टूर्नामेंट ऑपरेशंस",
  "a tournament organizer.": "एक टूर्नामेंट ऑर्गनाइज़र के तौर पर।",
  "India hosted 275+ large esports tournaments last year, and behind every one of them is someone holding the bracket, the rulebook, and the payout together. Fifteen sessions of real event craft, a capstone tournament you actually run, and a certificate from India's government skills council.":
    "भारत ने पिछले साल 275+ बड़े esports टूर्नामेंट होस्ट किए, और उनमें से हर एक के पीछे कोई है जो ब्रैकेट, रूलबुक और पेआउट — सब एक साथ संभालता है। असली इवेंट क्राफ्ट के पंद्रह सेशन, एक कैपस्टोन टूर्नामेंट जिसे आप सच में चलाते हैं, और भारत की सरकारी स्किल्स काउंसिल से एक सर्टिफिकेट।",
  "Enroll for ₹5,000": "₹5,000 में एनरोल करें",
  "Why events fall apart": "इवेंट क्यों बिखर जाते हैं",
  "Anyone can make a bracket. Almost nobody can run one.": "ब्रैकेट कोई भी बना सकता है। चलाना क़रीब-क़रीब कोई नहीं जानता।",
  "Every online tournament that collapses, collapses the same way. The fixes are boring, procedural, and almost nobody teaches them.":
    "जो भी ऑनलाइन टूर्नामेंट बिगड़ता है, एक ही तरह से बिगड़ता है। इसके फ़िक्स उबाऊ और प्रोसीजरल हैं, और इन्हें क़रीब-क़रीब कोई नहीं सिखाता।",
  "Round one never starts": "राउंड वन कभी शुरू ही नहीं होता",
  "Half the bracket doesn't show, the lobby sits waiting, and the schedule is dead twenty minutes in. A bracket seeded with no-shows is already a broken event.":
    "आधा ब्रैकेट आता ही नहीं, लॉबी इंतज़ार करती रहती है, और बीस मिनट में शेड्यूल दम तोड़ देता है। नो-शो से सीड किया ब्रैकेट पहले से ही एक टूटा हुआ इवेंट है।",
  "The check-in gate: a timed confirmation window, seed only the teams that checked in, two-tier check-in for the matches that matter. Drilled live in Session 7 until it's muscle memory.":
    "चेक-इन गेट: एक टाइम्ड कन्फ़र्मेशन विंडो, सिर्फ़ उन्हीं टीमों को सीड करें जिन्होंने चेक-इन किया, और अहम मैचों के लिए टू-टियर चेक-इन। सेशन 7 में इसे तब तक लाइव ड्रिल किया जाता है जब तक यह मसल-मेमोरी न बन जाए।",
  "One dispute and it's chaos": "एक डिस्प्यूट और सब अफ़रा-तफ़री",
  "A team reports the wrong score, someone cries smurf, and suddenly you're adjudicating by whoever shouts loudest in your DMs.":
    "एक टीम ग़लत स्कोर रिपोर्ट करती है, कोई smurf का शोर मचाता है, और अचानक आप उसी के हिसाब से फ़ैसला कर रहे होते हैं जो आपके DMs में सबसे ज़ोर से चिल्लाता है।",
  "You write a full twelve-component rulebook, map the real integrity threats to mitigations, and practise ruling on evidence, with a penalty ladder you published before the event instead of inventing during it.":
    "आप एक पूरा बारह-कंपोनेंट रूलबुक लिखते हैं, असली इंटीग्रिटी ख़तरों को उनके उपायों से जोड़ते हैं, और सबूत पर फ़ैसला देना प्रैक्टिस करते हैं — एक पेनल्टी लैडर के साथ जिसे आपने इवेंट के दौरान गढ़ने की बजाय पहले पब्लिश किया।",
  "The passion doesn't pay": "जुनून से पेट नहीं भरता",
  "You've run twenty Discord cups for free and have nothing to show for it. No records, no sponsor, nothing an agency can actually look at.":
    "आपने बीस Discord कप फ्री में चलाए हैं और दिखाने को कुछ नहीं। कोई रिकॉर्ड नहीं, कोई स्पॉन्सर नहीं, ऐसा कुछ नहीं जिसे कोई एजेंसी सच में देख सके।",
  "You build the sponsorship deck, the budget, and a compliant payout plan. Then you graduate with a real event on your record, plus an eight-piece portfolio agencies can flip through.":
    "आप स्पॉन्सरशिप डेक, बजट और एक कॉम्प्लायंट पेआउट प्लान बनाते हैं। फिर आप अपने रिकॉर्ड में एक असली इवेंट के साथ ग्रेजुएट करते हैं, साथ में एक आठ-हिस्सों वाला पोर्टफोलियो जिसे एजेंसियाँ पलटकर देख सकें।",
  "The organizer curriculum": "ऑर्गनाइज़र करिकुलम",
  "15 sessions. 5 phases. One real event.": "15 सेशन। 5 फ़ेज़। एक असली इवेंट।",
  "Every session builds an artifact for your portfolio. By Session 14 you're not studying tournaments, you're running one.":
    "हर सेशन आपके पोर्टफोलियो के लिए एक आर्टिफैक्ट बनाता है। सेशन 14 तक आप टूर्नामेंट पढ़ नहीं रहे होते — चला रहे होते हैं।",
  "Foundations & the Event Lifecycle": "फ़ाउंडेशन्स और इवेंट लाइफ़साइकल",
  "The organizer's job, staffing roles, and the 11-stage event lifecycle":
    "ऑर्गनाइज़र का काम, स्टाफ़िंग रोल्स, और 11-स्टेज इवेंट लाइफ़साइकल",
  "Concept, feasibility, and a realistic budget with a contingency buffer":
    "कॉन्सेप्ट, फ़ीज़िबिलिटी, और एक कॉन्टिंजेंसी बफ़र के साथ एक रियलिस्टिक बजट",
  "The honest market map: who actually pays organizers in India":
    "ईमानदार मार्केट मैप: भारत में ऑर्गनाइज़र्स को असल में पैसा कौन देता है",
  "Formats & Rules": "फ़ॉर्मेट्स और रूल्स",
  "Format math: single & double elimination, round robin, Swiss, and when each is right":
    "फ़ॉर्मेट मैथ: सिंगल और डबल एलिमिनेशन, राउंड रॉबिन, Swiss — और कौन-सा कब सही है",
  "Battle royale is different: points tables, seeding, and tiebreakers for BGMI":
    "बैटल रॉयल अलग है: BGMI के लिए पॉइंट्स टेबल, सीडिंग और टाईब्रेकर्स",
  "The 12-component rulebook, integrity threats, and the admin protocols behind it":
    "12-कंपोनेंट रूलबुक, इंटीग्रिटी ख़तरे, और उसके पीछे के एडमिन प्रोटोकॉल",
  "Running the Event": "इवेंट चलाना",
  "The grassroots tooling stack: Discord, bracket platforms, per-title private lobbies":
    "ग्रासरूट टूलिंग स्टैक: Discord, ब्रैकेट प्लेटफ़ॉर्म, हर टाइटल के लिए प्राइवेट लॉबीज़",
  "Registration, the check-in gate, and lobby control: the two mechanics that carry online events":
    "रजिस्ट्रेशन, चेक-इन गेट, और लॉबी कंट्रोल: वो दो मैकेनिक्स जो ऑनलाइन इवेंट्स को टिकाते हैं",
  "Run of show, scheduling buffers, and admin protocols on the day":
    "रन ऑफ़ शो, शेड्यूलिंग बफ़र्स, और उस दिन के एडमिन प्रोटोकॉल",
  "Disputes, anti-cheat, and adjudicating on evidence, not pressure":
    "डिस्प्यूट्स, एंटी-चीट, और प्रेशर पर नहीं — सबूत पर फ़ैसला देना",
  "Broadcast & Business": "ब्रॉडकास्ट और बिज़नेस",
  "The streaming pipeline: OBS → RTMP → platform, observers, overlays, and the broadcast delay":
    "स्ट्रीमिंग पाइपलाइन: OBS → RTMP → प्लेटफ़ॉर्म, ऑब्ज़र्वर्स, ओवरले, और ब्रॉडकास्ट डिले",
  "Revenue models, the sponsorship deck, and what a sponsor calls ROI":
    "रेवेन्यू मॉडल, स्पॉन्सरशिप डेक, और स्पॉन्सर जिसे ROI कहता है",
  "Prize pools, payouts, KYC, GST/TDS basics, and India's legal bright line":
    "प्राइज़ पूल, पेआउट, KYC, GST/TDS की बुनियाद, और भारत की क़ानूनी साफ़ लकीर",
  "Safeguarding & Capstone": "सेफ़गार्डिंग और कैपस्टोन",
  "Safeguarding, minors, and the compliance gates a credible organizer clears":
    "सेफ़गार्डिंग, नाबालिग, और वो कॉम्प्लायंस गेट जो एक भरोसेमंद ऑर्गनाइज़र क्लियर करता है",
  "The capstone: plan and run a real online tournament, end to end":
    "कैपस्टोन: एक असली ऑनलाइन टूर्नामेंट प्लान करें और शुरू से आख़िर तक चलाएँ",
  "Assessment & showcase: event report, portfolio review, certification pathway":
    "असेसमेंट और शोकेस: इवेंट रिपोर्ट, पोर्टफोलियो रिव्यू, सर्टिफिकेशन पाथवे",
  "Session 14 is a real online tournament, with a real bracket, real check-in, and real disputes, and your cohort runs it. Everyone owns a stage of the event and gets scored running it live: organizer, head admin, match admin, lobby host, moderator, observer. You leave with an event on your record and the report to prove it.":
    "सेशन 14 एक असली ऑनलाइन टूर्नामेंट है — असली ब्रैकेट, असली चेक-इन और असली डिस्प्यूट्स के साथ — और आपका कोहॉर्ट इसे चलाता है। हर कोई इवेंट का एक स्टेज संभालता है और उसे लाइव चलाते हुए स्कोर होता है: ऑर्गनाइज़र, हेड एडमिन, मैच एडमिन, लॉबी होस्ट, मॉडरेटर, ऑब्ज़र्वर। आप अपने रिकॉर्ड में एक इवेंट और उसे साबित करने वाली रिपोर्ट के साथ निकलते हैं।",
  "The operational loop, drilled until it's boring": "ऑपरेशनल लूप, इतना ड्रिल किया कि उबाऊ लगने लगे",
  "Register": "रजिस्टर",
  "Check-in": "चेक-इन",
  "Seed": "सीड",
  "Lobby": "लॉबी",
  "Play": "प्ले",
  "Report": "रिपोर्ट",
  "Adjudicate": "फ़ैसला",
  "Advance": "आगे बढ़ाएँ",
  "Pay out": "पेआउट",
  "Concept, planning & budget": "कॉन्सेप्ट, प्लानिंग और बजट",
  "Walk an event through the 11-stage lifecycle, from purpose to payout, with a budget that survives contact with reality.":
    "एक इवेंट को 11-स्टेज लाइफ़साइकल से गुज़ारें — मक़सद से पेआउट तक — एक ऐसे बजट के साथ जो हक़ीक़त से टकराकर भी टिका रहे।",
  "Formats & bracket design": "फ़ॉर्मेट्स और ब्रैकेट डिज़ाइन",
  "The match-count math behind elimination, round robin, and Swiss, plus battle-royale points tables, seeding, and the correct tiebreakers.":
    "एलिमिनेशन, राउंड रॉबिन और Swiss के पीछे का मैच-काउंट मैथ, साथ ही बैटल-रॉयल पॉइंट्स टेबल, सीडिंग और सही टाईब्रेकर्स।",
  "Rulebook & integrity": "रूलबुक और इंटीग्रिटी",
  "An enforceable twelve-component rulebook, integrity threats mapped to mitigations, and a consistent penalty ladder.":
    "एक लागू करने लायक बारह-कंपोनेंट रूलबुक, इंटीग्रिटी ख़तरे उनके उपायों से जुड़े, और एक कंसिस्टेंट पेनल्टी लैडर।",
  "Tooling & live operations": "टूलिंग और लाइव ऑपरेशंस",
  "The nine-step operational loop end to end: check-in gates, private lobbies, run of show, and recovering when things break live.":
    "नौ-स्टेप ऑपरेशनल लूप शुरू से आख़िर तक: चेक-इन गेट्स, प्राइवेट लॉबीज़, रन ऑफ़ शो, और लाइव में चीज़ें बिगड़ने पर उन्हें संभालना।",
  "Broadcast coordination": "ब्रॉडकास्ट कोऑर्डिनेशन",
  "The OBS → RTMP pipeline, observers, overlays, and why the broadcast delay exists. Enough to run a stream without running every desk.":
    "OBS → RTMP पाइपलाइन, ऑब्ज़र्वर्स, ओवरले, और ब्रॉडकास्ट डिले क्यों होता है। इतना कि हर डेस्क ख़ुद चलाए बिना एक स्ट्रीम चला सकें।",
  "The business": "बिज़नेस",
  "Revenue models, a sponsorship proposal a brand would actually read, and a prize payout that clears KYC and tax.":
    "रेवेन्यू मॉडल, एक स्पॉन्सरशिप प्रपोज़ल जिसे कोई ब्रांड सच में पढ़े, और एक प्राइज़ पेआउट जो KYC और टैक्स क्लियर करे।",
  "Safeguarding & compliance": "सेफ़गार्डिंग और कॉम्प्लायंस",
  "Duty of care, handling minors correctly, India's legal bright line, and knowing when to call a professional.":
    "ड्यूटी ऑफ़ केयर, नाबालिगों को सही तरीके से संभालना, भारत की क़ानूनी साफ़ लकीर, और यह जानना कि कब किसी प्रोफेशनल को बुलाना है।",
  "Capstone + portfolio: a real event, on the record": "कैपस्टोन + पोर्टफोलियो: एक असली इवेंट, रिकॉर्ड पर",
  "You run a real tournament and submit an eight-piece event portfolio, scored across all seven competencies. That's the certificate, and the first line of your CV.":
    "आप एक असली टूर्नामेंट चलाते हैं और एक आठ-हिस्सों वाला इवेंट पोर्टफोलियो जमा करते हैं, जो सातों कॉम्पिटेंसीज़ पर स्कोर होता है। यही सर्टिफिकेट है, और आपके CV की पहली लाइन।",
  "A credential, and an event on your record.": "एक क्रेडेंशियल, और आपके रिकॉर्ड पर एक इवेंट।",
  "Clear the benchmarks and the capstone, and you earn the Gosu Academy × SPEFL-SC Certified Esports Tournament Organizer (Foundation), issued with India's government skills council for a job no Indian qualification covers yet. Graded on running a real event, not on a written test.":
    "बेंचमार्क और कैपस्टोन क्लियर करें, और आप Gosu Academy × SPEFL-SC Certified Esports Tournament Organizer (Foundation) पाते हैं — भारत की सरकारी स्किल्स काउंसिल के साथ जारी, एक ऐसी जॉब के लिए जिसे अभी कोई भारतीय क्वालिफ़िकेशन कवर नहीं करता। किसी लिखित टेस्ट पर नहीं, एक असली इवेंट चलाने पर ग्रेड किया गया।",
  "You also leave with the portfolio the market actually hires on: an event plan and budget, a format decision with its math, a full rulebook, a run of show, a sponsorship deck, payout and safeguarding checklists, and your capstone event report.":
    "साथ ही आप वो पोर्टफोलियो लेकर जाते हैं जिस पर मार्केट सच में हायर करता है: एक इवेंट प्लान और बजट, अपने मैथ के साथ एक फ़ॉर्मेट फ़ैसला, एक पूरा रूलबुक, एक रन ऑफ़ शो, एक स्पॉन्सरशिप डेक, पेआउट और सेफ़गार्डिंग चेकलिस्ट, और आपकी कैपस्टोन इवेंट रिपोर्ट।",
  "Tournament Organizer · Foundation": "Tournament Organizer · Foundation",
  "Gosu Academy × SPEFL-SC. The first rung of India's event-operations ladder.":
    "Gosu Academy × SPEFL-SC. भारत की इवेंट-ऑपरेशंस लैडर की पहली सीढ़ी।",
  "Two months. Real events. Real reps.": "दो महीने। असली इवेंट्स। असली रेप्स।",
  "Taught by someone who's shipped real events.": "किसी ऐसे इंसान से सीखें जिसने असली इवेंट्स शिप किए हैं।",
  "Your cohort runs live with a working organizer, not a slideshow. You'll set up real check-ins, control real lobbies, and adjudicate injected disputes on live calls: the same failures that kill real events, rehearsed before your capstone instead of during it.":
    "आपका कोहॉर्ट एक काम करने वाले ऑर्गनाइज़र के साथ लाइव चलता है, किसी स्लाइडशो के साथ नहीं। आप असली चेक-इन सेट करेंगे, असली लॉबीज़ कंट्रोल करेंगे, और लाइव कॉल्स पर डाले गए डिस्प्यूट्स पर फ़ैसला देंगे: वही नाकामियाँ जो असली इवेंट्स को मार देती हैं, आपके कैपस्टोन के दौरान नहीं — उससे पहले रिहर्स की हुईं।",
  "Tournament Ops · Lead Instructor": "टूर्नामेंट ऑप्स · लीड इंस्ट्रक्टर",
  "Eight years an ESL league operator and an on-site referee at majors, from the Six Invitational to the Esports World Cup. He runs the cohort's live check-ins and dispute drills.":
    "आठ साल ESL लीग ऑपरेटर और मेजर्स में ऑन-साइट रेफ़री — Six Invitational से लेकर Esports World Cup तक। वो कोहॉर्ट के लाइव चेक-इन और डिस्प्यूट ड्रिल चलाते हैं।",
  "Alumni who run the shows now.": "वो एलुमनाई जो अब शो चलाते हैं।",
  "From student to live events": "स्टूडेंट से लाइव इवेंट्स तक",
  "Live event operations": "लाइव इवेंट ऑपरेशंस",
  "Finished the program and went straight into live-event work: hired into event management at a major entertainment destination, and a stage MC at the Esports World Cup.":
    "प्रोग्राम पूरा किया और सीधे लाइव-इवेंट के काम में गए: एक बड़े एंटरटेनमेंट डेस्टिनेशन पर इवेंट मैनेजमेंट में हायर हुए, और Esports World Cup पर एक स्टेज MC।",
  "Officiates world events": "वर्ल्ड इवेंट्स में अंपायरिंग",
  "Officiating · Refereeing": "ऑफ़िशिएटिंग · रेफ़रीइंग",
  "Now referees official competitions, from the national league up to the IESF World Championship, the person keeping the ruling straight when the stakes are highest.":
    "अब आधिकारिक प्रतियोगिताओं में रेफ़री करती हैं — नेशनल लीग से लेकर IESF World Championship तक — वो इंसान जो सबसे बड़े दाँव पर फ़ैसले सीधे रखती हैं।",
  "Runs the tournaments now": "अब टूर्नामेंट चलाते हैं",
  "Organised two full tournaments across different titles, owning the format, the bracket, and the payout, and building events his community keeps turning up for.":
    "अलग-अलग टाइटल्स में दो पूरे टूर्नामेंट ऑर्गनाइज़ किए — फ़ॉर्मेट, ब्रैकेट और पेआउट सब संभाला — और ऐसे इवेंट्स बनाए जिनमें उनकी कम्युनिटी बार-बार आती है।",
  "Real Gosu Academy career-track alumni. India's first cohorts start now.":
    "असली Gosu Academy करियर-ट्रैक एलुमनाई। भारत के पहले कोहॉर्ट अभी शुरू हो रहे हैं।",
  "₹5,000. Your first event included.": "₹5,000। आपका पहला इवेंट शामिल।",
  "One payment, everything included. You spend the course building the artifacts agencies actually ask for, and you graduate having run a real tournament. Most people pay for that experience in failed events. Under 0.5% of Gosu students ever ask for a refund, and the assessment call is free.":
    "एक पेमेंट, सब कुछ शामिल। पूरे कोर्स में आप वो आर्टिफैक्ट्स बनाते हैं जो एजेंसियाँ सच में माँगती हैं, और एक असली टूर्नामेंट चलाकर ग्रेजुएट करते हैं। ज़्यादातर लोग यह तजुर्बा नाकाम इवेंट्स में क़ीमत चुकाकर पाते हैं। Gosu के 0.5% से भी कम स्टूडेंट्स कभी रिफंड माँगते हैं, और असेसमेंट कॉल फ्री है।",
  "Format math, rulebook & run-of-show builds": "फ़ॉर्मेट मैथ, रूलबुक और रन-ऑफ़-शो बिल्ड्स",
  "Operations logs & artifact templates": "ऑपरेशंस लॉग्स और आर्टिफैक्ट टेम्पलेट्स",
  "Capstone: a real tournament you run": "कैपस्टोन: एक असली टूर्नामेंट जो आप चलाते हैं",
  "Eight-piece event portfolio": "आठ-हिस्सों वाला इवेंट पोर्टफोलियो",
  "SPEFL-SC Certified Tournament Organizer (Foundation)": "SPEFL-SC Certified Tournament Organizer (Foundation)",
  "Foundation is the first, stackable rung. A Level 2 track, LAN and large-event production, is the natural next step.":
    "Foundation पहली, एक-के-ऊपर-एक जुड़ने वाली सीढ़ी है। एक Level 2 ट्रैक — LAN और बड़े-इवेंट प्रोडक्शन — अगला स्वाभाविक क़दम है।",
  "Foundation organizer · admin": "Foundation ऑर्गनाइज़र · एडमिन",
  "Ops coordinator · league admin": "ऑप्स कोऑर्डिनेटर · लीग एडमिन",
  "Operations manager": "ऑपरेशंस मैनेजर",
  "Head of operations · esports director": "हेड ऑफ़ ऑपरेशंस · esports डायरेक्टर",
  "Event management, for a recognised sport.": "इवेंट मैनेजमेंट, एक मान्यता-प्राप्त खेल के लिए।",
  "Esports is officially a recognised sport in India, and the 2025 online-gaming law explicitly protects tournaments: entry fees and performance prizes are legal, betting is not. This course trains the version of that job families can already name, with operations, budgets, rules, and broadcast, and a government-recognised certificate at the end.":
    "भारत में esports आधिकारिक तौर पर एक मान्यता-प्राप्त खेल है, और 2025 के ऑनलाइन-गेमिंग क़ानून ने साफ़-साफ़ टूर्नामेंट्स को सुरक्षा दी है: एंट्री फ़ीस और परफ़ॉर्मेंस प्राइज़ क़ानूनी हैं, बेटिंग नहीं। यह कोर्स उस जॉब का वो रूप सिखाता है जिसे परिवार पहले से जानते हैं — ऑपरेशंस, बजट, रूल्स और ब्रॉडकास्ट के साथ, और आख़िर में एक सरकार-मान्यता प्राप्त सर्टिफिकेट।",
  "Compliance, tax basics, and safeguarding are graded competencies":
    "कॉम्प्लायंस, टैक्स की बुनियाद और सेफ़गार्डिंग ग्रेडेड कॉम्पिटेंसीज़ हैं",
  "A real, documented event on the student's record by graduation":
    "ग्रेजुएशन तक स्टूडेंट के रिकॉर्ड पर एक असली, डॉक्युमेंटेड इवेंट",
  "₹5,000 one-time. Hindi or English.": "₹5,000 एक बार। हिंदी या अंग्रेज़ी।",
  "Do I need experience running events?": "क्या मुझे इवेंट चलाने का तजुर्बा चाहिए?",
  "No. Complete beginners build a small, clean bracket first and get a full dry run before anything is thrown at them. Already run Discord cups? You'll get the bigger fields and the disruptor scenarios: a late check-in, a missing room card, an unknown account at the lobby door.":
    "नहीं। बिल्कुल नए लोग पहले एक छोटा, साफ़ ब्रैकेट बनाते हैं और कुछ भी सामने आने से पहले एक पूरा ड्राई रन पाते हैं। पहले से Discord कप चला चुके हैं? आपको बड़े फ़ील्ड और डिसरप्टर सिनारियो मिलेंगे: एक लेट चेक-इन, एक ग़ायब रूम कार्ड, लॉबी के दरवाज़े पर एक अनजान अकाउंट।",
  "What will I actually run?": "मैं असल में क्या चलाऊँगा?",
  "A real online tournament in Session 14, either Valorant on a bracket or BGMI on a points table. The cohort co-runs it with rotating roles, and you own a defined stage of the event: check-in, lobbies, admin desk, broadcast, or the organizer seat itself. You're scored on how your stage runs live.":
    "सेशन 14 में एक असली ऑनलाइन टूर्नामेंट — या तो ब्रैकेट पर Valorant या पॉइंट्स टेबल पर BGMI। कोहॉर्ट इसे घूमती हुई भूमिकाओं के साथ मिलकर चलाता है, और आप इवेंट का एक तय स्टेज संभालते हैं: चेक-इन, लॉबीज़, एडमिन डेस्क, ब्रॉडकास्ट, या ख़ुद ऑर्गनाइज़र की सीट। आपका स्कोर इस पर होता है कि आपका स्टेज लाइव कैसे चलता है।",
  "Is running paid tournaments even legal in India?": "क्या भारत में पेड टूर्नामेंट चलाना क़ानूनी भी है?",
  "Yes, and the ground just shifted in the organizer's favour. Esports is a recognised sport, and the 2025 online-gaming law that banned real-money games explicitly carved esports out: participation fees and performance-based prizes are allowed, betting on outcomes is not. The course teaches that bright line, the GST and TDS basics, and when to hand it to a professional.":
    "हाँ, और ज़मीन अभी-अभी ऑर्गनाइज़र के हक़ में खिसकी है। esports एक मान्यता-प्राप्त खेल है, और 2025 के जिस ऑनलाइन-गेमिंग क़ानून ने रियल-मनी गेम्स पर रोक लगाई, उसने साफ़-साफ़ esports को अलग रखा: पार्टिसिपेशन फ़ीस और परफ़ॉर्मेंस-बेस्ड प्राइज़ की इजाज़त है, नतीजों पर बेटिंग की नहीं। कोर्स वही साफ़ लकीर सिखाता है, GST और TDS की बुनियाद, और यह कि कब इसे किसी प्रोफेशनल के हवाले करना है।",
  "The Gosu Academy × SPEFL-SC Certified Esports Tournament Organizer (Foundation), issued with India's government esports skills council. No national qualification for esports organizers exists anywhere yet; this program is built to align with India's first when it lands. NSQF credit-alignment is in progress.":
    "Gosu Academy × SPEFL-SC Certified Esports Tournament Organizer (Foundation), भारत की सरकारी esports स्किल्स काउंसिल के साथ जारी। esports ऑर्गनाइज़र्स के लिए अभी कहीं कोई नेशनल क्वालिफ़िकेशन नहीं है; यह प्रोग्राम भारत के पहले क्वालिफ़िकेशन के आने पर उससे अलाइन होने के लिए बना है। NSQF क्रेडिट-अलाइनमेंट जारी है।",
  "The honest version: this market hires on portfolios, not certificates, and salaried seats are competitive. That's exactly why the course is built around artifacts. You graduate with eight portfolio pieces and a real event on your record, which is what freelance work, admin gigs, and agency ops roles actually screen for.":
    "ईमानदार जवाब: यह मार्केट सर्टिफिकेट पर नहीं, पोर्टफोलियो पर हायर करता है, और सैलरी वाली सीटें कॉम्पिटिटिव हैं। इसीलिए तो कोर्स आर्टिफैक्ट्स के इर्द-गिर्द बना है। आप आठ पोर्टफोलियो पीस और अपने रिकॉर्ड पर एक असली इवेंट के साथ ग्रेजुएट करते हैं — यही तो फ्रीलांस काम, एडमिन गिग्स और एजेंसी ऑप्स रोल्स असल में देखते हैं।",
  "Your name on the run of show": "रन ऑफ़ शो पर आपका नाम",
  "Someone has to run the show. Make it you.": "शो किसी को तो चलाना है। वो आप बनें।",
  "Enrol in the next cohort, or book the free assessment call and see if ops is your lane. India's tournament scene is growing either way. The only question is who's running it.":
    "अगले कोहॉर्ट में एनरोल करें, या फ्री असेसमेंट कॉल बुक करें और देखें कि ऑप्स आपकी लेन है या नहीं। भारत का टूर्नामेंट सीन वैसे भी बढ़ रहा है। सवाल बस इतना है कि इसे चला कौन रहा है।",
  "₹5,000 one-time · Hindi & English · Online, live": "₹5,000 एक बार · हिंदी और अंग्रेज़ी · ऑनलाइन, लाइव",
  "Gosu Academy × SPEFL-SC × Bharat Esports. SPEFL-SC certified at launch; NSQF credit-alignment in progress. Curriculum from the Gosu Academy Certified Esports Tournament Organizer (Foundation) framework. Nothing on this page is legal or tax advice. Hindi & English · Online, live. Imagery is AI-generated concept art — placeholder for launch photography.":
    "Gosu Academy × SPEFL-SC × Bharat Esports. लॉन्च पर SPEFL-SC सर्टिफ़ाइड; NSQF क्रेडिट-अलाइनमेंट जारी है। करिकुलम Gosu Academy Certified Esports Tournament Organizer (Foundation) फ्रेमवर्क से। इस पेज पर कुछ भी क़ानूनी या टैक्स सलाह नहीं है। हिंदी और अंग्रेज़ी · ऑनलाइन, लाइव। इमेजरी AI-जनरेटेड कॉन्सेप्ट आर्ट है — लॉन्च फ़ोटोग्राफ़ी के लिए प्लेसहोल्डर।",

  // ═══════════════════════════════════════════════════════════════
  // Legal pages — src/legalContent.ts
  // ═══════════════════════════════════════════════════════════════
  "What you're buying": "आप क्या ख़रीद रहे हैं",
  "Gosu Academy courses are live, coach-led online training programs. A season enrollment covers the listed number of live sessions, assessments, and community access for that course. Seats are personal to the enrolled student and can't be shared or resold.":
    "Gosu Academy के कोर्स लाइव, कोच-लेड ऑनलाइन ट्रेनिंग प्रोग्राम हैं। एक सीज़न एनरोलमेंट उस कोर्स के लिए बताए गए लाइव सेशन, असेसमेंट और कम्युनिटी एक्सेस को कवर करता है। सीटें एनरोल किए गए स्टूडेंट के लिए पर्सनल हैं और शेयर या रीसेल नहीं की जा सकतीं।",
  "Course schedules are published before each batch starts. If we reschedule a session, you'll be notified on WhatsApp and Discord and offered the recording or a make-up slot.":
    "हर बैच शुरू होने से पहले कोर्स शेड्यूल पब्लिश किए जाते हैं। अगर हम कोई सेशन रीशेड्यूल करते हैं, तो आपको WhatsApp और Discord पर सूचना दी जाएगी और रिकॉर्डिंग या एक मेक-अप स्लॉट ऑफ़र किया जाएगा।",
  "Payments": "पेमेंट",
  "Prices are in Indian Rupees. Payments are processed by Paddle.com, our merchant of record — the charge on your statement will read Paddle. Instalment plans bill monthly for the number of payments shown at checkout; missing an instalment may pause your access until the payment is retried successfully.":
    "क़ीमतें भारतीय रुपयों में हैं। पेमेंट Paddle.com — हमारे मर्चेंट ऑफ़ रिकॉर्ड — से प्रोसेस होते हैं, और आपके स्टेटमेंट पर चार्ज Paddle दिखेगा। इंस्टॉलमेंट प्लान चेकआउट पर दिखाई गई किस्तों की संख्या के हिसाब से मंथली बिल करते हैं; कोई किस्त छूटने पर आपका एक्सेस तब तक रुक सकता है जब तक पेमेंट दोबारा सफलतापूर्वक न हो जाए।",
  "Conduct": "आचरण",
  "Coaching spaces are for students. Harassment, cheating tools, and account sharing get you removed without refund. Students under 18 need a parent or guardian's consent to enroll.":
    "कोचिंग स्पेस स्टूडेंट्स के लिए हैं। हैरेसमेंट, चीटिंग टूल्स और अकाउंट शेयरिंग पर आपको बिना रिफंड हटा दिया जाएगा। 18 साल से कम के स्टूडेंट्स को एनरोल करने के लिए माता-पिता या अभिभावक की सहमति चाहिए।",
  "Liability": "देनदारी",
  "We coach esports skills; we don't guarantee ranks, wins, or professional contracts. To the extent permitted by law, our liability for any claim is limited to the amount you paid for the course.":
    "हम esports स्किल्स कोच करते हैं; हम रैंक, जीत या प्रोफेशनल कॉन्ट्रैक्ट की गारंटी नहीं देते। क़ानून जितनी इजाज़त देता है, उस हद तक, किसी भी क्लेम के लिए हमारी देनदारी उतनी ही रक़म तक सीमित है जितनी आपने कोर्स के लिए चुकाई।",
  "What we collect": "हम क्या इकट्ठा करते हैं",
  "When you enroll we collect your name, email, and mobile number, plus your course and payment status. Payment details (card, UPI) go directly to our payment processor, Paddle — we never see or store them.":
    "जब आप एनरोल करते हैं तो हम आपका नाम, ईमेल और मोबाइल नंबर, साथ ही आपके कोर्स और पेमेंट का स्टेटस इकट्ठा करते हैं। पेमेंट डिटेल्स (कार्ड, UPI) सीधे हमारे पेमेंट प्रोसेसर Paddle के पास जाती हैं — हम उन्हें कभी देखते या स्टोर नहीं करते।",
  "How we use it": "हम इसे कैसे इस्तेमाल करते हैं",
  "To run your course: receipts and onboarding by email, batch updates on WhatsApp (only if you opted in), and coaching inside Discord. We don't sell your data, and we don't send marketing you didn't ask for.":
    "आपका कोर्स चलाने के लिए: ईमेल से रसीदें और ऑनबोर्डिंग, WhatsApp पर बैच अपडेट (सिर्फ़ अगर आपने ऑप्ट-इन किया हो), और Discord के अंदर कोचिंग। हम आपका डेटा बेचते नहीं, और ऐसी मार्केटिंग नहीं भेजते जो आपने माँगी न हो।",
  "Where it lives": "यह कहाँ रहता है",
  "Order records are stored with our database provider (Neon) and email provider (Resend). Paddle processes payments as merchant of record under its own privacy policy.":
    "ऑर्डर रिकॉर्ड हमारे डेटाबेस प्रोवाइडर (Neon) और ईमेल प्रोवाइडर (Resend) के पास स्टोर होते हैं। Paddle अपनी प्राइवेसी पॉलिसी के तहत मर्चेंट ऑफ़ रिकॉर्ड के तौर पर पेमेंट प्रोसेस करता है।",
  "Your choices": "आपके विकल्प",
  "Email us to see, correct, or delete the data we hold about you. Deleting your data ends course access tied to it.":
    "आपके बारे में हमारे पास मौजूद डेटा देखने, ठीक करने या डिलीट करने के लिए हमें ईमेल करें। अपना डेटा डिलीट करने पर उससे जुड़ा कोर्स एक्सेस ख़त्म हो जाता है।",
  "Try before you pay": "पैसे देने से पहले आज़माएँ",
  "Every course has a free weekly cup or scrim — see how we coach before you spend a rupee.":
    "हर कोर्स में एक फ्री वीकली कप या स्क्रिम है — एक रुपया ख़र्च करने से पहले देखें कि हम कैसे कोच करते हैं।",
  "Full refund window": "फुल रिफंड विंडो",
  "If the course isn't right for you, tell us within 7 days of your batch's first live session and we'll refund your payment in full. After that window, fees for the running season aren't refundable, but you can transfer your seat to the next batch once, free.":
    "अगर कोर्स आपके लिए सही नहीं है, तो अपने बैच के पहले लाइव सेशन के 7 दिनों के अंदर हमें बताएँ और हम आपका पूरा पेमेंट रिफंड कर देंगे। उस विंडो के बाद, चल रहे सीज़न की फ़ीस रिफंडेबल नहीं है, पर आप अपनी सीट एक बार, मुफ़्त में अगले बैच में ट्रांसफ़र कर सकते हैं।",
  "Instalment plans": "इंस्टॉलमेंट प्लान",
  "Cancelling an instalment plan inside the 7-day window refunds what you've paid. After the window, already-billed instalments aren't refunded; remaining instalments stop and course access ends with the paid period.":
    "7-दिन की विंडो के अंदर इंस्टॉलमेंट प्लान कैंसिल करने पर जो आपने चुकाया है वो रिफंड हो जाता है। विंडो के बाद, पहले से बिल हुई किस्तें रिफंड नहीं होतीं; बाक़ी किस्तें रुक जाती हैं और कोर्स एक्सेस चुकाई हुई अवधि के साथ ख़त्म हो जाता है।",
  "How to ask": "कैसे माँगें",
  "Email us with your order ID (it's in your confirmation email). Refunds are processed by Paddle back to your original payment method, typically within 5–10 business days.":
    "अपने ऑर्डर ID के साथ हमें ईमेल करें (यह आपकी कन्फ़र्मेशन ईमेल में है)। रिफंड Paddle के ज़रिए आपके ओरिजिनल पेमेंट मेथड में वापस प्रोसेस होते हैं, आम तौर पर 5–10 बिज़नेस दिनों में।",
  "Support": "सपोर्ट",
  "Fastest: reply to any email we've sent you, or write to the support inbox below. We answer within one business day, in English or Hindi.":
    "सबसे तेज़: हमारी भेजी किसी भी ईमेल का जवाब दें, या नीचे दिए सपोर्ट इनबॉक्स पर लिखें। हम एक बिज़नेस दिन के अंदर, अंग्रेज़ी या हिंदी में जवाब देते हैं।",
  "Company": "कंपनी",
  "Gosu Academy, in partnership with Bharat Esports. Courses are certified by SPEFL-SC.":
    "Gosu Academy, Bharat Esports की साझेदारी में। कोर्स SPEFL-SC से सर्टिफ़ाइड हैं।",
};

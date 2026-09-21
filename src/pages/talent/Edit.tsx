import { useEffect, useState, type FormEvent } from "react";
import { useNoIndex } from "../../lib/useNoIndex";
import "./edit.css";

interface MyProfile {
  handle: string;
  type: "player" | "coach";
  displayName: string;
  certifiedName: string;
  photoUrl: string | null;
  headline: string | null;
  bio: string | null;
  region: string | null;
  languages: string[];
  games: string[];
  primaryGame: string | null;
  roles: string[];
  ranks: Record<string, string>;
  achievements: { title: string; detail?: string; date?: string }[];
  socials: Record<string, string>;
  vodEmbeds: { title: string; url: string }[];
  available: boolean;
  coachDetails: {
    specialties: string[];
    experienceYears: number;
    workedWith: string[];
    testimonials: { author: string; quote: string }[];
  } | null;
  status: "draft" | "published" | "hidden";
}

type Load =
  | { state: "loading" }
  | { state: "error" }
  | { state: "anon" }
  | { state: "ready"; p: MyProfile };

export default function Edit() {
  useNoIndex();
  const [load, setLoad] = useState<Load>({ state: "loading" });

  useEffect(() => {
    let alive = true;
    fetch("/api/profile")
      .then(async (r) => {
        if (r.status === 401) return { state: "anon" as const };
        if (!r.ok) return { state: "error" as const };
        const p = (await r.json()) as MyProfile;
        return { state: "ready" as const, p };
      })
      .then((next) => alive && setLoad(next))
      .catch(() => alive && setLoad({ state: "error" }));
    return () => {
      alive = false;
    };
  }, []);

  if (load.state === "loading")
    return <main className="pe"><p className="pe__state">Loading…</p></main>;
  if (load.state === "error")
    return <main className="pe"><p className="pe__state">Could not load your profile. Try again.</p></main>;
  if (load.state === "anon") return <LoginRequest />;
  return <EditForm initial={load.p} />;
}

function LoginRequest() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/auth/request", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {});
    setSent(true); // always the same message — the API is enumeration-safe
  }

  return (
    <main className="pe">
      <div className="pe__login">
        <p className="pe__eyebrow">Gosu Academy</p>
        <h1 className="pe__title">Edit your profile</h1>
        {sent ? (
          <p className="pe__lede">
            If that email matches a profile, a sign-in link is on its way. Check your inbox.
          </p>
        ) : (
          <form onSubmit={submit} className="pe__loginform">
            <p className="pe__lede">Enter your email to get a one-time sign-in link.</p>
            <input
              className="pe__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoFocus
            />
            <button className="pe__btn" type="submit">Send link</button>
          </form>
        )}
      </div>
    </main>
  );
}

function EditForm({ initial }: { initial: MyProfile }) {
  const [displayName, setDisplayName] = useState(initial.displayName);
  const [photoUrl, setPhotoUrl] = useState(initial.photoUrl ?? "");
  const [headline, setHeadline] = useState(initial.headline ?? "");
  const [bio, setBio] = useState(initial.bio ?? "");
  const [region, setRegion] = useState(initial.region ?? "");
  const [primaryGame, setPrimaryGame] = useState(initial.primaryGame ?? "");
  const [languages, setLanguages] = useState(initial.languages.join(", "));
  const [games, setGames] = useState(initial.games.join(", "));
  const [roles, setRoles] = useState(initial.roles.join(", "));
  const [rankRows, setRankRows] = useState<{ game: string; tier: string }[]>(
    Object.entries(initial.ranks).map(([game, tier]) => ({ game, tier })),
  );
  const [achievements, setAchievements] = useState(
    initial.achievements.map((a) => ({ title: a.title, detail: a.detail ?? "", date: a.date ?? "" })),
  );
  const [vodEmbeds, setVodEmbeds] = useState(initial.vodEmbeds.map((v) => ({ ...v })));
  const [socials, setSocials] = useState({
    twitter: initial.socials.twitter ?? "",
    twitch: initial.socials.twitch ?? "",
    youtube: initial.socials.youtube ?? "",
    instagram: initial.socials.instagram ?? "",
    discord: initial.socials.discord ?? "",
  });
  const [available, setAvailable] = useState(initial.available);
  const [publish, setPublish] = useState(initial.status === "published");
  const [specialties, setSpecialties] = useState((initial.coachDetails?.specialties ?? []).join(", "));
  const [experienceYears, setExperienceYears] = useState(
    String(initial.coachDetails?.experienceYears ?? 0),
  );
  const [workedWith, setWorkedWith] = useState((initial.coachDetails?.workedWith ?? []).join(", "));
  const [testimonials, setTestimonials] = useState(
    (initial.coachDetails?.testimonials ?? []).map((t) => ({ ...t })),
  );
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const splitCsv = (s: string) => s.split(",").map((x) => x.trim()).filter((x) => x !== "");

  async function save(e: FormEvent) {
    e.preventDefault();
    setSaveState("saving");
    const ranks: Record<string, string> = {};
    for (const row of rankRows) {
      if (row.game.trim() && row.tier.trim()) ranks[row.game.trim()] = row.tier.trim();
    }
    const body = {
      displayName,
      photoUrl,
      headline,
      bio,
      region,
      languages: splitCsv(languages),
      games: splitCsv(games),
      primaryGame,
      roles: splitCsv(roles),
      ranks,
      achievements: achievements
        .filter((a) => a.title.trim())
        .map((a) => ({
          title: a.title.trim(),
          ...(a.detail.trim() ? { detail: a.detail.trim() } : {}),
          ...(a.date.trim() ? { date: a.date.trim() } : {}),
        })),
      socials,
      vodEmbeds: vodEmbeds.filter((v) => v.title.trim() && v.url.trim()),
      available,
      coachDetails:
        initial.type === "coach"
          ? {
              specialties: splitCsv(specialties),
              experienceYears: Number(experienceYears) || 0,
              workedWith: splitCsv(workedWith),
              testimonials: testimonials.filter((t) => t.author.trim() && t.quote.trim()),
            }
          : null,
      publish,
    };
    try {
      const r = await fetch("/api/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      setSaveState(r.ok ? "saved" : "error");
    } catch {
      setSaveState("error");
    }
  }

  return (
    <main className="pe">
      <form className="pe__form" onSubmit={save}>
        <header className="pe__top">
          <div>
            <p className="pe__eyebrow">Editing profile</p>
            <h1 className="pe__title">{initial.displayName}</h1>
          </div>
          <span className={`pe__status pe__status--${initial.status}`}>{initial.status}</span>
        </header>

        <section className="pe__locked">
          <p className="pe__lockednote">Locked by the academy — contact staff to change these.</p>
          <div className="pe__lockedgrid">
            <div><span className="pe__lockedlabel">Handle</span><span className="pe__lockedval">{initial.handle}</span></div>
            <div><span className="pe__lockedlabel">Certified name</span><span className="pe__lockedval">{initial.certifiedName}</span></div>
            <div><span className="pe__lockedlabel">Type</span><span className="pe__lockedval">{initial.type}</span></div>
          </div>
        </section>

        <label className="pe__field">
          <span className="pe__label">Display name</span>
          <input className="pe__input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={80} />
        </label>
        <label className="pe__field">
          <span className="pe__label">Headline</span>
          <input className="pe__input" value={headline} onChange={(e) => setHeadline(e.target.value)} maxLength={120} />
        </label>
        <label className="pe__field">
          <span className="pe__label">Photo URL</span>
          <input className="pe__input" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} maxLength={500} placeholder="https://…" />
        </label>
        <label className="pe__field">
          <span className="pe__label">Bio</span>
          <textarea className="pe__textarea" value={bio} onChange={(e) => setBio(e.target.value)} maxLength={2000} rows={4} />
        </label>

        <div className="pe__row">
          <label className="pe__field">
            <span className="pe__label">Region</span>
            <input className="pe__input" value={region} onChange={(e) => setRegion(e.target.value)} maxLength={60} />
          </label>
          <label className="pe__field">
            <span className="pe__label">Primary game</span>
            <input className="pe__input" value={primaryGame} onChange={(e) => setPrimaryGame(e.target.value)} maxLength={40} />
          </label>
        </div>

        <label className="pe__field">
          <span className="pe__label">Languages (comma-separated)</span>
          <input className="pe__input" value={languages} onChange={(e) => setLanguages(e.target.value)} />
        </label>
        <div className="pe__row">
          <label className="pe__field">
            <span className="pe__label">Games (comma-separated)</span>
            <input className="pe__input" value={games} onChange={(e) => setGames(e.target.value)} />
          </label>
          <label className="pe__field">
            <span className="pe__label">Roles (comma-separated)</span>
            <input className="pe__input" value={roles} onChange={(e) => setRoles(e.target.value)} />
          </label>
        </div>

        <fieldset className="pe__group">
          <legend className="pe__legend">Ranks</legend>
          {rankRows.map((row, i) => (
            <div className="pe__rankrow" key={i}>
              <input className="pe__input" placeholder="game" value={row.game}
                onChange={(e) => setRankRows(rankRows.map((r, j) => (j === i ? { ...r, game: e.target.value } : r)))} />
              <input className="pe__input" placeholder="tier" value={row.tier}
                onChange={(e) => setRankRows(rankRows.map((r, j) => (j === i ? { ...r, tier: e.target.value } : r)))} />
              <button type="button" className="pe__remove" onClick={() => setRankRows(rankRows.filter((_, j) => j !== i))}>Remove</button>
            </div>
          ))}
          <button type="button" className="pe__add" onClick={() => setRankRows([...rankRows, { game: "", tier: "" }])}>+ Add rank</button>
        </fieldset>

        <fieldset className="pe__group">
          <legend className="pe__legend">Achievements</legend>
          {achievements.map((a, i) => (
            <div className="pe__achrow" key={i}>
              <input className="pe__input" placeholder="title" value={a.title}
                onChange={(e) => setAchievements(achievements.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
              <input className="pe__input" placeholder="detail" value={a.detail}
                onChange={(e) => setAchievements(achievements.map((x, j) => (j === i ? { ...x, detail: e.target.value } : x)))} />
              <input className="pe__input" placeholder="date" value={a.date}
                onChange={(e) => setAchievements(achievements.map((x, j) => (j === i ? { ...x, date: e.target.value } : x)))} />
              <button type="button" className="pe__remove" onClick={() => setAchievements(achievements.filter((_, j) => j !== i))}>Remove</button>
            </div>
          ))}
          <button type="button" className="pe__add" onClick={() => setAchievements([...achievements, { title: "", detail: "", date: "" }])}>+ Add achievement</button>
        </fieldset>

        <fieldset className="pe__group">
          <legend className="pe__legend">Clips &amp; VODs</legend>
          {vodEmbeds.map((v, i) => (
            <div className="pe__vodrow" key={i}>
              <input className="pe__input" placeholder="title" value={v.title}
                onChange={(e) => setVodEmbeds(vodEmbeds.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
              <input className="pe__input" placeholder="https://…" value={v.url}
                onChange={(e) => setVodEmbeds(vodEmbeds.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))} />
              <button type="button" className="pe__remove" onClick={() => setVodEmbeds(vodEmbeds.filter((_, j) => j !== i))}>Remove</button>
            </div>
          ))}
          <button type="button" className="pe__add" onClick={() => setVodEmbeds([...vodEmbeds, { title: "", url: "" }])}>+ Add VOD</button>
        </fieldset>

        <fieldset className="pe__group">
          <legend className="pe__legend">Social links</legend>
          {(["twitter", "twitch", "youtube", "instagram", "discord"] as const).map((k) => (
            <label className="pe__field" key={k}>
              <span className="pe__label">{k}</span>
              <input className="pe__input" value={socials[k]} placeholder="https://…"
                onChange={(e) => setSocials({ ...socials, [k]: e.target.value })} />
            </label>
          ))}
        </fieldset>

        {initial.type === "coach" && (
          <fieldset className="pe__group">
            <legend className="pe__legend">Coaching</legend>
            <label className="pe__field">
              <span className="pe__label">Specialties (comma-separated)</span>
              <input className="pe__input" value={specialties} onChange={(e) => setSpecialties(e.target.value)} />
            </label>
            <label className="pe__field">
              <span className="pe__label">Years of experience</span>
              <input className="pe__input" type="number" min={0} max={60} value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)} />
            </label>
            <label className="pe__field">
              <span className="pe__label">Worked with (comma-separated)</span>
              <input className="pe__input" value={workedWith} onChange={(e) => setWorkedWith(e.target.value)} />
            </label>
            <div className="pe__group">
              <span className="pe__label">Testimonials</span>
              {testimonials.map((t, i) => (
                <div className="pe__testrow" key={i}>
                  <input className="pe__input" placeholder="author" value={t.author}
                    onChange={(e) => setTestimonials(testimonials.map((x, j) => (j === i ? { ...x, author: e.target.value } : x)))} />
                  <input className="pe__input" placeholder="quote" value={t.quote}
                    onChange={(e) => setTestimonials(testimonials.map((x, j) => (j === i ? { ...x, quote: e.target.value } : x)))} />
                  <button type="button" className="pe__remove" onClick={() => setTestimonials(testimonials.filter((_, j) => j !== i))}>Remove</button>
                </div>
              ))}
              <button type="button" className="pe__add" onClick={() => setTestimonials([...testimonials, { author: "", quote: "" }])}>+ Add testimonial</button>
            </div>
          </fieldset>
        )}

        <label className="pe__toggle">
          <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
          Available now
        </label>
        <label className="pe__toggle">
          <input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} />
          Published (visible in the directory)
        </label>

        <div className="pe__actions">
          <button className="pe__save" type="submit" disabled={saveState === "saving"}>
            {saveState === "saving" ? "Saving…" : "Save profile"}
          </button>
          {saveState === "saved" && <span className="pe__ok">Saved.</span>}
          {saveState === "error" && <span className="pe__err">Could not save. Check your inputs and try again.</span>}
        </div>
      </form>
    </main>
  );
}

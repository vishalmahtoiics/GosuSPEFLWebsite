import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { useNoIndex } from "../../lib/useNoIndex";
import "./profile.css";

interface PublicCredential {
  id: string;
  holderName: string;
  course: string;
  cohort: string;
  issuedDate: string;
  issuer: string;
  status: "valid" | "revoked";
  revokeReason: string | null;
}
interface CoachDetails {
  specialties: string[];
  experienceYears: number;
  workedWith: string[];
  testimonials: { author: string; quote: string }[];
}
interface Profile {
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
  coachDetails: CoachDetails | null;
  credentials: PublicCredential[];
}
type Load =
  | { state: "loading" }
  | { state: "notfound" }
  | { state: "error" }
  | { state: "ok"; p: Profile };

const COURSE_LABEL: Record<string, string> = {
  valorant: "Valorant Season",
  bgmi: "BGMI Season",
  "bgmi-squad": "BGMI Squad",
};

export default function Profile() {
  useNoIndex();
  const { handle } = useParams();
  const [load, setLoad] = useState<Load>({ state: "loading" });

  useEffect(() => {
    let alive = true;
    setLoad({ state: "loading" });
    fetch(`/api/talent/${encodeURIComponent(handle ?? "")}`)
      .then(async (r) => {
        if (r.status === 404) return { state: "notfound" as const };
        if (!r.ok) return { state: "error" as const };
        const p = (await r.json()) as Profile;
        return { state: "ok" as const, p };
      })
      .then((next) => alive && setLoad(next))
      .catch(() => alive && setLoad({ state: "error" }));
    return () => {
      alive = false;
    };
  }, [handle]);

  if (load.state === "loading")
    return <main className="pf"><p className="pf__state">Loading…</p></main>;
  if (load.state === "notfound")
    return (
      <main className="pf">
        <div className="pf__notfound">
          <h1>Profile not found</h1>
          <p>No published profile at this address.</p>
          <Link to="/talent" className="pf__back">← Back to directory</Link>
        </div>
      </main>
    );
  if (load.state === "error")
    return <main className="pf"><p className="pf__state">Could not load this profile. Try again.</p></main>;

  const p = load.p;
  const socials = Object.entries(p.socials).filter(([, v]) => v);

  return (
    <main className="pf">
      <Link to="/talent" className="pf__back">← Directory</Link>

      <header className="pf__hero">
        <div className="pf__avatar" aria-hidden>
          {p.photoUrl ? <img src={p.photoUrl} alt="" /> : <span>{initials(p.displayName)}</span>}
        </div>
        <div className="pf__heroinfo">
          <div className="pf__tags">
            <span className="pf__type">{p.type === "coach" ? "Coach" : "Player"}</span>
            {p.available && <span className="pf__avail">Available now</span>}
          </div>
          <h1 className="pf__name">{p.displayName}</h1>
          {p.headline && <p className="pf__headline">{p.headline}</p>}
          <p className="pf__verified">✓ Verified as {p.certifiedName}</p>
          <div className="pf__facts">
            {p.primaryGame && <span>{p.primaryGame}</span>}
            {p.region && <span>{p.region}</span>}
            {p.languages.length > 0 && <span>{p.languages.join(", ")}</span>}
          </div>
        </div>
      </header>

      {p.bio && (
        <section className="pf__block"><p className="pf__bio">{p.bio}</p></section>
      )}

      {Object.keys(p.ranks).length > 0 && (
        <section className="pf__block">
          <h2 className="pf__h2">Ranks</h2>
          <div className="pf__chips">
            {Object.entries(p.ranks).map(([g, tier]) => (
              <span key={g} className="pf__chip"><b>{g}</b> {tier}</span>
            ))}
          </div>
        </section>
      )}

      {p.roles.length > 0 && (
        <section className="pf__block">
          <h2 className="pf__h2">Role</h2>
          <div className="pf__chips">
            {p.roles.map((r) => <span key={r} className="pf__chip">{r}</span>)}
          </div>
        </section>
      )}

      {p.type === "coach" && p.coachDetails && <CoachBlock c={p.coachDetails} />}

      {p.achievements.length > 0 && (
        <section className="pf__block">
          <h2 className="pf__h2">Achievements</h2>
          <ul className="pf__list">
            {p.achievements.map((a, i) => (
              <li key={i}>
                <b>{a.title}</b>
                {a.detail ? ` — ${a.detail}` : ""}
                {a.date ? ` (${a.date})` : ""}
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.vodEmbeds.length > 0 && (
        <section className="pf__block">
          <h2 className="pf__h2">Clips &amp; VODs</h2>
          <ul className="pf__list">
            {p.vodEmbeds.map((v, i) => (
              <li key={i}><a href={v.url} target="_blank" rel="noreferrer">{v.title}</a></li>
            ))}
          </ul>
        </section>
      )}

      <section className="pf__block">
        <h2 className="pf__h2">Credentials</h2>
        {p.credentials.length === 0 ? (
          <p className="pf__muted">No credentials on file yet.</p>
        ) : (
          <div className="pf__creds">
            {p.credentials.map((c) => (
              <div key={c.id} className={`pf__cred pf__cred--${c.status}`}>
                <div>
                  <p className="pf__credcourse">{COURSE_LABEL[c.course] ?? c.course}</p>
                  <p className="pf__credmeta">
                    {c.cohort} · Issued {c.issuedDate} · {c.issuer}
                  </p>
                  {c.status === "revoked" && (
                    <p className="pf__credrevoked">
                      Revoked{c.revokeReason ? `: ${c.revokeReason}` : ""}
                    </p>
                  )}
                </div>
                <Link to={`/verify/${c.id}`} className="pf__verify">Verify →</Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {socials.length > 0 && (
        <section className="pf__block">
          <h2 className="pf__h2">Links</h2>
          <div className="pf__socials">
            {socials.map(([k, v]) => (
              <a key={k} href={v} target="_blank" rel="noreferrer" className="pf__social">{k}</a>
            ))}
          </div>
        </section>
      )}

      <ContactForm handle={p.handle} displayName={p.displayName} />
    </main>
  );
}

function CoachBlock({ c }: { c: CoachDetails }) {
  return (
    <section className="pf__block">
      <h2 className="pf__h2">Coaching</h2>
      <p className="pf__muted">{c.experienceYears}+ years experience</p>
      {c.specialties.length > 0 && (
        <div className="pf__chips">
          {c.specialties.map((s) => <span key={s} className="pf__chip">{s}</span>)}
        </div>
      )}
      {c.workedWith.length > 0 && (
        <p className="pf__muted">Worked with: {c.workedWith.join(", ")}</p>
      )}
      {c.testimonials.length > 0 && (
        <div className="pf__quotes">
          {c.testimonials.map((t, i) => (
            <blockquote key={i} className="pf__quote">
              &ldquo;{t.quote}&rdquo; <cite>— {t.author}</cite>
            </blockquote>
          ))}
        </div>
      )}
    </section>
  );
}

function initials(name: string): string {
  const clean = name.replace(/"[^"]*"/g, " ").trim();
  const parts = clean.split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

type ContactIntent = "hire-coach" | "recruit-player" | "general";

function ContactForm({ handle, displayName }: { handle: string; displayName: string }) {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderOrg, setSenderOrg] = useState("");
  const [intent, setIntent] = useState<ContactIntent>("general");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — must stay empty
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          profileHandle: handle,
          senderName,
          senderEmail,
          senderOrg,
          intent,
          message,
          website,
        }),
      });
      if (r.ok) {
        setStatus("sent");
        setSenderName("");
        setSenderEmail("");
        setSenderOrg("");
        setIntent("general");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="pf__block">
      <h2 className="pf__h2">Contact {displayName}</h2>
      <form className="pf__contact" onSubmit={submit}>
        <div className="pf__contactrow">
          <label className="pf__contactfield">
            <span className="pf__contactlabel">Your name</span>
            <input className="pf__contactinput" value={senderName} maxLength={120} required
              onChange={(e) => setSenderName(e.target.value)} />
          </label>
          <label className="pf__contactfield">
            <span className="pf__contactlabel">Your email</span>
            <input className="pf__contactinput" type="email" value={senderEmail} maxLength={200} required
              onChange={(e) => setSenderEmail(e.target.value)} />
          </label>
        </div>
        <div className="pf__contactrow">
          <label className="pf__contactfield">
            <span className="pf__contactlabel">Organization (optional)</span>
            <input className="pf__contactinput" value={senderOrg} maxLength={120}
              onChange={(e) => setSenderOrg(e.target.value)} />
          </label>
          <label className="pf__contactfield">
            <span className="pf__contactlabel">Intent</span>
            <select className="pf__contactinput" value={intent}
              onChange={(e) => setIntent(e.target.value as ContactIntent)}>
              <option value="hire-coach">Hire a coach</option>
              <option value="recruit-player">Recruit a player</option>
              <option value="general">General</option>
            </select>
          </label>
        </div>
        <label className="pf__contactfield">
          <span className="pf__contactlabel">Message</span>
          <textarea className="pf__contacttextarea" value={message} maxLength={2000} rows={4} required
            onChange={(e) => setMessage(e.target.value)} />
        </label>
        <input
          className="pf__hp"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <button className="pf__contactbtn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "sent" && <p className="pf__contactok">Message sent. The team will be in touch.</p>}
        {status === "error" && (
          <p className="pf__contacterr">Could not send. Check your details and try again.</p>
        )}
      </form>
      <p className="pf__muted">Your message is relayed privately. Personal emails are never shown.</p>
    </section>
  );
}

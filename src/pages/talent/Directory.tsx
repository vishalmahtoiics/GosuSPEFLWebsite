import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useNoIndex } from "../../lib/useNoIndex";
import "./directory.css";

interface Summary {
  handle: string;
  type: "player" | "coach";
  displayName: string;
  photoUrl: string | null;
  headline: string | null;
  region: string | null;
  primaryGame: string | null;
  games: string[];
  roles: string[];
  ranks: Record<string, string>;
  available: boolean;
}

type Load =
  | { state: "loading" }
  | { state: "error" }
  | { state: "ok"; profiles: Summary[] };

const GAMES = [
  { value: "", label: "All games" },
  { value: "valorant", label: "Valorant" },
  { value: "bgmi", label: "BGMI" },
];

export default function Directory() {
  useNoIndex();
  const [game, setGame] = useState("");
  const [type, setType] = useState("");
  const [available, setAvailable] = useState(false);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("recent");
  const [load, setLoad] = useState<Load>({ state: "loading" });

  const qs = useMemo(() => {
    const p = new URLSearchParams();
    if (game) p.set("game", game);
    if (type) p.set("type", type);
    if (available) p.set("available", "true");
    if (q.trim()) p.set("q", q.trim());
    if (sort) p.set("sort", sort);
    return p.toString();
  }, [game, type, available, q, sort]);

  useEffect(() => {
    let alive = true;
    setLoad({ state: "loading" });
    fetch(`/api/talent?${qs}`)
      .then(async (r) => {
        if (!r.ok) return { state: "error" as const };
        const data = (await r.json()) as { profiles: Summary[] };
        return { state: "ok" as const, profiles: data.profiles };
      })
      .then((next) => alive && setLoad(next))
      .catch(() => alive && setLoad({ state: "error" }));
    return () => {
      alive = false;
    };
  }, [qs]);

  const profiles = load.state === "ok" ? load.profiles : [];
  const showFeatured = !q.trim() && !game && !type && !available;
  const featured = profiles.filter((p) => p.available).slice(0, 3);

  return (
    <main className="td">
      <header className="td__head">
        <p className="td__eyebrow">Gosu Academy — India</p>
        <h1 className="td__title">Talent directory</h1>
        <p className="td__lede">
          Verified graduates and coaches. Every profile carries an academy credential you can
          check yourself.
        </p>
      </header>

      <div className="td__filters">
        <input
          className="td__search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or handle"
          maxLength={80}
        />
        <select className="td__select" value={game} onChange={(e) => setGame(e.target.value)}>
          {GAMES.map((g) => (
            <option key={g.value} value={g.value}>{g.label}</option>
          ))}
        </select>
        <select className="td__select" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Players &amp; coaches</option>
          <option value="player">Players</option>
          <option value="coach">Coaches</option>
        </select>
        <select className="td__select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="recent">Newest</option>
          <option value="name">A–Z</option>
        </select>
        <label className="td__toggle">
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          Available now
        </label>
      </div>

      {load.state === "loading" && <p className="td__state">Loading…</p>}
      {load.state === "error" && (
        <p className="td__state">Could not load the directory. Try again.</p>
      )}

      {load.state === "ok" && (
        <>
          {showFeatured && featured.length > 0 && (
            <section className="td__featured">
              <h2 className="td__section">Available now</h2>
              <div className="td__row">
                {featured.map((p) => (
                  <ProfileCard key={p.handle} p={p} featured />
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="td__section">
              {profiles.length} {profiles.length === 1 ? "profile" : "profiles"}
            </h2>
            {profiles.length === 0 ? (
              <p className="td__state">No profiles match those filters.</p>
            ) : (
              <div className="td__grid">
                {profiles.map((p) => (
                  <ProfileCard key={p.handle} p={p} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

function ProfileCard({ p, featured }: { p: Summary; featured?: boolean }) {
  const rank = p.primaryGame ? p.ranks[p.primaryGame] : undefined;
  return (
    <Link to={`/talent/${p.handle}`} className={`tc${featured ? " tc--featured" : ""}`}>
      <div className="tc__photo" aria-hidden>
        {p.photoUrl ? <img src={p.photoUrl} alt="" /> : <span>{initials(p.displayName)}</span>}
      </div>
      <div className="tc__body">
        <div className="tc__toprow">
          <span className="tc__type">{p.type === "coach" ? "Coach" : "Player"}</span>
          {p.available && <span className="tc__avail">Available</span>}
        </div>
        <h3 className="tc__name">{p.displayName}</h3>
        {p.headline && <p className="tc__headline">{p.headline}</p>}
        <div className="tc__meta">
          {p.primaryGame && <span className="tc__game">{p.primaryGame}</span>}
          {rank && <span className="tc__rank">{rank}</span>}
          {p.region && <span className="tc__region">{p.region}</span>}
        </div>
        <div className="tc__roles">
          {p.roles.slice(0, 3).map((r) => (
            <span key={r} className="tc__role">{r}</span>
          ))}
        </div>
        <span className="tc__verified">✓ Verified graduate</span>
      </div>
    </Link>
  );
}

function initials(name: string): string {
  const clean = name.replace(/"[^"]*"/g, " ").trim();
  const parts = clean.split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

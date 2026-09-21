import { useEffect, useState, type FormEvent } from "react";
import { useNoIndex } from "../../lib/useNoIndex";
import "./admin.css";

interface AdminProfile {
  id: string;
  handle: string;
  type: "player" | "coach";
  displayName: string;
  certifiedName: string;
  status: "draft" | "published" | "hidden";
  isDemo: boolean;
  ownerEmail: string | null;
  claimedAt: string | null;
}

interface AdminMessage {
  id: string;
  profileId: string;
  senderName: string;
  senderEmail: string;
  senderOrg: string | null;
  intent: "hire-coach" | "recruit-player" | "general";
  message: string;
  status: "new" | "read" | "routed";
  createdAt: string;
}

type Auth = "loading" | "anon" | "ready";
type Tab = "profiles" | "messages";

export default function Admin() {
  useNoIndex();
  const [auth, setAuth] = useState<Auth>("loading");
  const [tab, setTab] = useState<Tab>("profiles");
  const [profiles, setProfiles] = useState<AdminProfile[]>([]);
  const [messages, setMessages] = useState<AdminMessage[]>([]);

  async function loadProfiles() {
    const r = await fetch("/api/admin/profiles");
    if (r.status === 401) {
      setAuth("anon");
      return;
    }
    if (r.ok) {
      const data = (await r.json()) as { profiles: AdminProfile[] };
      setProfiles(data.profiles);
      setAuth("ready");
    }
  }

  async function loadMessages() {
    const r = await fetch("/api/admin/messages");
    if (r.ok) {
      const data = (await r.json()) as { messages: AdminMessage[] };
      setMessages(data.messages);
    }
  }

  useEffect(() => {
    let alive = true;
    fetch("/api/admin/profiles")
      .then(async (r) => {
        if (!alive) return;
        if (r.status === 401) {
          setAuth("anon");
          return;
        }
        if (!r.ok) {
          setAuth("anon");
          return;
        }
        const data = (await r.json()) as { profiles: AdminProfile[] };
        setProfiles(data.profiles);
        setAuth("ready");
        void loadMessages();
      })
      .catch(() => alive && setAuth("anon"));
    return () => {
      alive = false;
    };
  }, []);

  if (auth === "loading")
    return <main className="ad"><p className="ad__state">Loading…</p></main>;
  if (auth === "anon") return <SignIn />;

  return (
    <main className="ad">
      <header className="ad__top">
        <h1 className="ad__title">Staff admin</h1>
        <nav className="ad__tabs">
          <button
            className={`ad__tab${tab === "profiles" ? " ad__tab--on" : ""}`}
            onClick={() => setTab("profiles")}
          >
            Profiles
          </button>
          <button
            className={`ad__tab${tab === "messages" ? " ad__tab--on" : ""}`}
            onClick={() => {
              setTab("messages");
              void loadMessages();
            }}
          >
            Messages
          </button>
        </nav>
      </header>
      {tab === "profiles" ? (
        <ProfilesPanel profiles={profiles} reload={loadProfiles} />
      ) : (
        <MessagesPanel messages={messages} reload={loadMessages} />
      )}
    </main>
  );
}

function SignIn() {
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
    <main className="ad">
      <div className="ad__signin">
        <p className="ad__eyebrow">Gosu Academy</p>
        <h1 className="ad__title">Staff sign-in</h1>
        {sent ? (
          <p className="ad__lede">
            If that email is on the staff list, a sign-in link is on its way. Check your inbox.
          </p>
        ) : (
          <form onSubmit={submit} className="ad__signinform">
            <p className="ad__lede">Enter your staff email to get a one-time sign-in link.</p>
            <input
              className="ad__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gosuacademy.com"
              autoFocus
            />
            <button className="ad__btn" type="submit">Send link</button>
          </form>
        )}
      </div>
    </main>
  );
}

function ProfilesPanel({
  profiles,
  reload,
}: {
  profiles: AdminProfile[];
  reload: () => void | Promise<void>;
}) {
  const [np, setNp] = useState({ handle: "", type: "player", displayName: "", certifiedName: "", ownerEmail: "" });
  const [ic, setIc] = useState({ profileId: "", holderName: "", course: "valorant", cohort: "", issuedDate: "" });
  const [inv, setInv] = useState({ profileId: "", email: "" });
  const [rev, setRev] = useState({ id: "", reason: "" });
  const [note, setNote] = useState("");

  async function post(url: string, body: object) {
    setNote("");
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      setNote(r.ok ? "Done." : "That didn't work — check the fields.");
      if (r.ok) await reload();
    } catch {
      setNote("Network error — try again.");
    }
  }

  return (
    <section className="ad__panel">
      <div className="ad__tablewrap">
        <table className="ad__table">
          <thead>
            <tr><th>Handle</th><th>Name</th><th>Type</th><th>Status</th><th>Owner</th></tr>
          </thead>
          <tbody>
            {profiles.map((p) => (
              <tr key={p.id}>
                <td>{p.handle}</td>
                <td>{p.displayName}{p.isDemo ? " (demo)" : ""}</td>
                <td>{p.type}</td>
                <td><span className={`ad__badge ad__badge--${p.status}`}>{p.status}</span></td>
                <td>{p.claimedAt ? `${p.ownerEmail} · claimed` : p.ownerEmail ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="ad__note">{note}</p>}

      <div className="ad__forms">
        <form
          className="ad__form"
          onSubmit={(e) => {
            e.preventDefault();
            void post("/api/admin/profiles", {
              handle: np.handle,
              type: np.type,
              displayName: np.displayName,
              certifiedName: np.certifiedName,
              ownerEmail: np.ownerEmail,
            });
          }}
        >
          <h3 className="ad__formh">New profile</h3>
          <input className="ad__input" placeholder="handle" value={np.handle}
            onChange={(e) => setNp({ ...np, handle: e.target.value })} />
          <select className="ad__input" value={np.type}
            onChange={(e) => setNp({ ...np, type: e.target.value })}>
            <option value="player">player</option>
            <option value="coach">coach</option>
          </select>
          <input className="ad__input" placeholder="display name" value={np.displayName}
            onChange={(e) => setNp({ ...np, displayName: e.target.value })} />
          <input className="ad__input" placeholder="certified (real) name" value={np.certifiedName}
            onChange={(e) => setNp({ ...np, certifiedName: e.target.value })} />
          <input className="ad__input" placeholder="owner email (optional)" value={np.ownerEmail}
            onChange={(e) => setNp({ ...np, ownerEmail: e.target.value })} />
          <button className="ad__btn" type="submit">Create</button>
        </form>

        <form
          className="ad__form"
          onSubmit={(e) => {
            e.preventDefault();
            void post("/api/admin/credential", {
              profileId: ic.profileId,
              holderName: ic.holderName,
              course: ic.course,
              cohort: ic.cohort,
              issuedDate: ic.issuedDate,
            });
          }}
        >
          <h3 className="ad__formh">Issue credential</h3>
          <select className="ad__input" value={ic.profileId}
            onChange={(e) => setIc({ ...ic, profileId: e.target.value })}>
            <option value="">Select profile…</option>
            {profiles.map((p) => <option key={p.id} value={p.id}>{p.handle}</option>)}
          </select>
          <input className="ad__input" placeholder="holder (certified) name" value={ic.holderName}
            onChange={(e) => setIc({ ...ic, holderName: e.target.value })} />
          <input className="ad__input" placeholder="course (e.g. valorant)" value={ic.course}
            onChange={(e) => setIc({ ...ic, course: e.target.value })} />
          <input className="ad__input" placeholder="cohort (e.g. 2026 Season 1)" value={ic.cohort}
            onChange={(e) => setIc({ ...ic, cohort: e.target.value })} />
          <input className="ad__input" placeholder="issued date (YYYY-MM-DD)" value={ic.issuedDate}
            onChange={(e) => setIc({ ...ic, issuedDate: e.target.value })} />
          <button className="ad__btn" type="submit">Issue</button>
        </form>

        <form
          className="ad__form"
          onSubmit={(e) => {
            e.preventDefault();
            void post("/api/admin/invite", { profileId: inv.profileId, email: inv.email });
          }}
        >
          <h3 className="ad__formh">Invite grad</h3>
          <select className="ad__input" value={inv.profileId}
            onChange={(e) => setInv({ ...inv, profileId: e.target.value })}>
            <option value="">Select profile…</option>
            {profiles.map((p) => <option key={p.id} value={p.id}>{p.handle}</option>)}
          </select>
          <input className="ad__input" placeholder="grad email" value={inv.email}
            onChange={(e) => setInv({ ...inv, email: e.target.value })} />
          <button className="ad__btn" type="submit">Invite</button>
        </form>

        <form
          className="ad__form"
          onSubmit={(e) => {
            e.preventDefault();
            void post(`/api/admin/credential/${encodeURIComponent(rev.id)}/revoke`, { reason: rev.reason });
          }}
        >
          <h3 className="ad__formh">Revoke credential</h3>
          <input className="ad__input" placeholder="credential id" value={rev.id}
            onChange={(e) => setRev({ ...rev, id: e.target.value })} />
          <input className="ad__input" placeholder="reason" value={rev.reason}
            onChange={(e) => setRev({ ...rev, reason: e.target.value })} />
          <button className="ad__btn" type="submit">Revoke</button>
        </form>
      </div>
    </section>
  );
}

function MessagesPanel({
  messages,
  reload,
}: {
  messages: AdminMessage[];
  reload: () => void | Promise<void>;
}) {
  async function setStatus(id: string, status: "read" | "routed") {
    await fetch("/api/admin/messages", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, status }),
    }).catch(() => {});
    await reload();
  }

  if (messages.length === 0)
    return <section className="ad__panel"><p className="ad__state">No messages yet.</p></section>;

  return (
    <section className="ad__panel">
      <ul className="ad__msgs">
        {messages.map((m) => (
          <li key={m.id} className="ad__msg">
            <div className="ad__msghead">
              <span className="ad__msgfrom">{m.senderName} &lt;{m.senderEmail}&gt;</span>
              <span className={`ad__badge ad__badge--${m.status}`}>{m.status}</span>
            </div>
            <p className="ad__msgmeta">
              {m.intent}{m.senderOrg ? ` · ${m.senderOrg}` : ""} · {m.createdAt.slice(0, 10)}
            </p>
            <p className="ad__msgbody">{m.message}</p>
            <div className="ad__msgactions">
              <button className="ad__mini" onClick={() => void setStatus(m.id, "read")}>Mark read</button>
              <button className="ad__mini" onClick={() => void setStatus(m.id, "routed")}>Mark routed</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

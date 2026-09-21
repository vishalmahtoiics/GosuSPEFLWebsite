import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useNoIndex } from "../../lib/useNoIndex";
import "./talent-gate.css";

type State = "loading" | "granted" | "locked";

export default function TalentGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    let alive = true;
    fetch("/api/talent-gate")
      .then((r) => r.json())
      .then((d: { gated: boolean; granted: boolean }) => {
        if (alive) setState(d.granted ? "granted" : "locked");
      })
      .catch(() => alive && setState("locked"));
    return () => {
      alive = false;
    };
  }, []);

  if (state === "loading") return null;
  if (state === "granted") return <>{children}</>;
  return <AccessSplash onGranted={() => setState("granted")} />;
}

function AccessSplash({ onGranted }: { onGranted: () => void }) {
  useNoIndex();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(false);
    const r = await fetch("/api/talent-gate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code }),
    });
    if (r.ok) onGranted();
    else setError(true);
  }

  return (
    <main className="tg">
      <form className="tg__card" onSubmit={submit}>
        <p className="tg__eyebrow">Gosu Academy</p>
        <h1 className="tg__title">Preview access</h1>
        <p className="tg__lede">This section is not public yet. Enter the access code to continue.</p>
        <input
          className="tg__input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Access code"
          autoFocus
        />
        <button className="tg__btn" type="submit">Enter</button>
        <p className="tg__error">{error ? "That code didn't work." : ""}</p>
      </form>
    </main>
  );
}

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNoIndex } from "../../lib/useNoIndex";
import "./claim.css";

type State =
  | { step: "idle" }
  | { step: "exchanging" }
  | { step: "error"; message: string };

export default function Claim() {
  useNoIndex();
  const { token } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<State>({ step: "idle" });

  async function activate() {
    setState({ step: "exchanging" });
    try {
      const r = await fetch("/api/auth/callback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: token ?? "" }),
      });
      if (!r.ok) {
        setState({
          step: "error",
          message: "This link is invalid or has expired. Ask for a fresh one.",
        });
        return;
      }
      const data = (await r.json()) as { next?: string };
      navigate(data.next ?? "/talent/edit");
    } catch {
      setState({ step: "error", message: "Something went wrong. Please try again." });
    }
  }

  return (
    <main className="cl">
      <div className="cl__card">
        <p className="cl__eyebrow">Gosu Academy</p>
        <h1 className="cl__title">Claim your profile</h1>
        <p className="cl__lede">
          Confirm below to verify this link and open your talent profile for editing.
        </p>
        {state.step === "error" && <p className="cl__error">{state.message}</p>}
        <button className="cl__btn" onClick={activate} disabled={state.step === "exchanging"}>
          {state.step === "exchanging" ? "Verifying…" : "Verify & continue"}
        </button>
      </div>
    </main>
  );
}

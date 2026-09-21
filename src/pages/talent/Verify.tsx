import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNoIndex } from "../../lib/useNoIndex";
import "./verify.css";
import QRCode from "qrcode";

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

type Load =
  | { state: "loading" }
  | { state: "notfound" }
  | { state: "error" }
  | { state: "ok"; cred: PublicCredential };

const COURSE_LABEL: Record<string, string> = {
  valorant: "Valorant Season",
  bgmi: "BGMI Season",
  "bgmi-squad": "BGMI Squad",
};

export default function Verify() {
  useNoIndex();
  const { id } = useParams();
  const [load, setLoad] = useState<Load>({ state: "loading" });
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`/api/verify/${id}`)
      .then(async (r) => {
        if (r.status === 404) return { state: "notfound" as const };
        if (!r.ok) return { state: "error" as const };
        const cred = (await r.json()) as PublicCredential;
        return { state: "ok" as const, cred };
      })
      .then((next) => alive && setLoad(next))
      .catch(() => alive && setLoad({ state: "error" }));
    return () => {
      alive = false;
    };
  }, [id]);

  useEffect(() => {
    if (load.state !== "ok") return;
    let alive = true;
    const url = `${window.location.origin}/verify/${id}`;
    QRCode.toDataURL(url, { margin: 1, width: 180 })
      .then((dataUrl) => {
        if (alive) setQr(dataUrl);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [load.state, id]);

  if (load.state === "loading") {
    return (
      <main className="vf">
        <p className="vf__state">Verifying…</p>
      </main>
    );
  }
  if (load.state === "notfound") {
    return (
      <main className="vf">
        <div className="vf__card">
          <span className="vf__badge vf__badge--revoked">Not found</span>
          <h1 className="vf__name">No such credential</h1>
          <p className="vf__muted">
            This verification link does not match any credential issued by Gosu Academy.
          </p>
        </div>
      </main>
    );
  }
  if (load.state === "error") {
    return (
      <main className="vf">
        <p className="vf__state">Could not verify right now. Try again.</p>
      </main>
    );
  }

  const c = load.cred;
  const valid = c.status === "valid";
  return (
    <main className="vf">
      <div className="vf__card">
        <span className={`vf__badge vf__badge--${valid ? "valid" : "revoked"}`}>
          {valid ? "Verified credential" : "Revoked credential"}
        </span>
        <h1 className="vf__name">{c.holderName}</h1>
        <p className="vf__course">{COURSE_LABEL[c.course] ?? c.course}</p>
        <div className="vf__row"><span>Cohort</span><span>{c.cohort}</span></div>
        <div className="vf__row"><span>Issued</span><span>{c.issuedDate}</span></div>
        <div className="vf__row"><span>Issuer</span><span>{c.issuer}</span></div>
        {!valid && c.revokeReason && <p className="vf__note">Revoked: {c.revokeReason}</p>}
        <p className="vf__muted">Verified on gosuacademy.in — the official record for this credential.</p>
        {qr && (
          <div className="vf__qrwrap">
            <img className="vf__qr" src={qr} alt="Verification QR code" />
            <span className="vf__qrcap">Scan to verify</span>
          </div>
        )}
      </div>
    </main>
  );
}

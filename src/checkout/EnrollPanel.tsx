import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATALOG, formatInr, type Plan, type Sku } from "../lib/catalog";
import { checkoutRequestSchema } from "../lib/checkoutSchema";
import { createCheckout } from "./api";
import { clearPaddleListeners, openPaddleCheckout } from "./paddleClient";
import { useT } from "../i18n";
import "./checkout.css";

type Phase = "form" | "creating" | "paying";

export function EnrollPanel({ sku, onClose }: { sku: Sku; onClose: () => void }) {
  const offering = CATALOG[sku];
  const hasMonthly = Boolean(offering.plans.monthly);
  const navigate = useNavigate();
  const t = useT();
  const [plan, setPlan] = useState<Plan>("full");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [phase, setPhase] = useState<Phase>("form");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => clearPaddleListeners();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (phase !== "form") return;
    setError(null);
    const parsed = checkoutRequestSchema.safeParse({
      sku, plan, name, email, phone, whatsappOptIn, termsAccepted,
    });
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      if (first?.path.includes("termsAccepted")) {
        setError(t("Please accept the terms and refund policy to continue."));
      } else {
        setError(first?.message ?? t("Check the form and try again."));
      }
      return;
    }
    setPhase("creating");
    try {
      const session = await createCheckout(parsed.data);
      setPhase("paying");
      await openPaddleCheckout({
        transactionId: session.transactionId,
        email: parsed.data.email,
        onCompleted: () => {
          onClose();
          navigate(`/thanks?order=${session.orderId}`);
        },
        onClosed: () => setPhase("form"),
      });
    } catch {
      setError(t("Couldn't start the payment. Please try again in a moment."));
      setPhase("form");
    }
  }

  const amount = plan === "monthly" && offering.plans.monthly
    ? `${formatInr(offering.plans.monthly.amountPaise)}/${t("month")} × ${offering.plans.monthly.cycles}`
    : formatInr(offering.plans.full.amountPaise);

  return (
    <div className="ck-overlay" role="dialog" aria-modal="true" aria-label={`${t("Enroll in")} ${offering.label}`}>
      <button className="ck-scrim" aria-label={t("Close")} onClick={onClose} disabled={phase !== "form"} />
      <div className="ck-panel">
        <header className="ck-head">
          <p className="ck-kicker">{t("Enrollment")}</p>
          <h3 className="ck-title">{offering.label}</h3>
          <button className="ck-x" onClick={onClose} aria-label={t("Close")} disabled={phase === "creating"}>×</button>
        </header>

        {hasMonthly && (
          <div className="ck-plans" role="radiogroup" aria-label={t("Payment plan")}>
            <button
              type="button" role="radio" aria-checked={plan === "full"}
              className={`ck-plan ${plan === "full" ? "is-active" : ""}`}
              onClick={() => setPlan("full")}
            >
              <strong>{formatInr(offering.plans.full.amountPaise)}</strong>
              <span>{t("one payment")}</span>
            </button>
            <button
              type="button" role="radio" aria-checked={plan === "monthly"}
              className={`ck-plan ${plan === "monthly" ? "is-active" : ""}`}
              onClick={() => setPlan("monthly")}
            >
              <strong>{formatInr(offering.plans.monthly!.amountPaise)}/mo</strong>
              <span>{offering.plans.monthly!.cycles} {t("monthly payments")}</span>
            </button>
          </div>
        )}

        <form className="ck-form" onSubmit={submit}>
          <label>
            {t("Full name")}
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
          </label>
          <label>
            {t("Email")}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          </label>
          <label>
            {t("Mobile (WhatsApp)")}
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="98765 43210" required />
          </label>
          <label className="ck-check">
            <input type="checkbox" checked={whatsappOptIn} onChange={(e) => setWhatsappOptIn(e.target.checked)} />
            <span>{t("Send my onboarding and batch updates on WhatsApp")}</span>
          </label>
          <label className="ck-check">
            <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
            <span>
              {t("I agree to the")} <a href="/terms" target="_blank" rel="noreferrer">{t("terms")}</a> {t("and")}{" "}
              <a href="/refunds" target="_blank" rel="noreferrer">{t("refund policy")}</a>
            </span>
          </label>

          {error && <p className="ck-error" role="alert">{error}</p>}

          <button className="ck-pay" type="submit" disabled={phase !== "form"}>
            {phase === "form" ? `${t("Pay")} ${amount}` : t("Opening secure checkout…")}
          </button>
          <p className="ck-fine">{t("Payments processed by Paddle. UPI, cards, and netbanking supported.")}</p>
        </form>
      </div>
    </div>
  );
}

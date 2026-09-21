import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getOffering } from "../../lib/catalog";
import { fetchOrderStatus } from "../../checkout/api";
import { useT, LangToggle } from "../../i18n";
import "./thanks.css";

const DISCORD = import.meta.env.VITE_DISCORD_INVITE_URL as string;
const WHATSAPP = import.meta.env.VITE_WHATSAPP_GROUP_URL as string;
const POLL_MS = 3000;
const MAX_POLLS = 60; // ~3 minutes

type State =
  | { kind: "checking" }
  | { kind: "paid"; sku: string }
  | { kind: "failed" }
  | { kind: "unknown" };

export default function Thanks() {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  const [state, setState] = useState<State>({ kind: "checking" });
  const t = useT();

  useEffect(() => {
    if (!orderId) return setState({ kind: "unknown" });
    let polls = 0;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    let sawFailed = false;

    async function poll() {
      polls += 1;
      try {
        const order = await fetchOrderStatus(orderId!);
        if (cancelled) return;
        if (!order) return setState({ kind: "unknown" });
        if (order.status === "paid" || order.status === "refunded")
          return setState({ kind: "paid", sku: order.sku });
        if (order.status === "failed") {
          sawFailed = true;
          setState({ kind: "failed" });
        }
      } catch {
        /* transient — keep polling */
      }
      if (!cancelled && polls < MAX_POLLS) timer = setTimeout(poll, POLL_MS);
      else if (!cancelled && !sawFailed) setState({ kind: "unknown" });
    }
    poll();
    return () => { cancelled = true; clearTimeout(timer); };
  }, [orderId]);

  return (
    <main className="tk">
      <LangToggle floating />
      {state.kind === "checking" && (
        <section className="tk-card">
          <p className="tk-kicker">{t("One moment")}</p>
          <h1>{t("Confirming your payment…")}</h1>
          <p className="tk-body">{t("This usually takes a few seconds. Keep this tab open.")}</p>
        </section>
      )}
      {state.kind === "paid" && (
        <section className="tk-card">
          <p className="tk-kicker">{t("Enrollment confirmed")}</p>
          <h1>{t("Welcome to")} {getOffering(state.sku)?.label ?? "Gosu Academy"}.</h1>
          <p className="tk-body">
            {t("A receipt is on its way to your email. Two things to do right now:")}
          </p>
          <div className="tk-actions">
            <a className="tk-btn tk-btn--gold" href={DISCORD} target="_blank" rel="noreferrer">
              {t("Join the Academy Discord")}
            </a>
            <a className="tk-btn tk-btn--ghost" href={WHATSAPP} target="_blank" rel="noreferrer">
              {t("Join the WhatsApp group")}
            </a>
          </div>
          <p className="tk-fine">
            {t("A coach will welcome you and confirm your batch within 24 hours.")}
          </p>
        </section>
      )}
      {state.kind === "failed" && (
        <section className="tk-card">
          <p className="tk-kicker">{t("Payment didn't go through")}</p>
          <h1>{t("No money left your account for this order.")}</h1>
          <p className="tk-body">
            {t("Head back and try again — UPI, cards, and netbanking are all supported.")}
          </p>
          <div className="tk-actions">
            <Link className="tk-btn tk-btn--gold" to="/valorant">{t("Valorant course")}</Link>
            <Link className="tk-btn tk-btn--ghost" to="/bgmi">{t("BGMI course")}</Link>
          </div>
        </section>
      )}
      {state.kind === "unknown" && (
        <section className="tk-card">
          <p className="tk-kicker">{t("Still processing")}</p>
          <h1>{t("We couldn't confirm this order yet.")}</h1>
          <p className="tk-body">
            {t("If you completed payment, your confirmation email will arrive shortly — check your inbox. Otherwise")}{" "}
            <Link to="/contact">{t("contact us")}</Link> {t("with your payment reference.")}
          </p>
        </section>
      )}
    </main>
  );
}

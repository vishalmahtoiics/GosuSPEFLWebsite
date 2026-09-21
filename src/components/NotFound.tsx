import { Link } from "react-router-dom";
import { useT, LangToggle } from "../i18n";

export default function NotFound() {
  const t = useT();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0a0a0b",
        color: "#f5f5f5",
        fontFamily: "Chakra Petch, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <LangToggle floating />
      <div>
        <p
          style={{
            color: "#d9ab4d",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontSize: 13,
            margin: 0,
          }}
        >
          404
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", margin: "0.5rem 0 1rem" }}>
          {t("This page isn't on the roster.")}
        </h1>
        <p style={{ color: "#9a9a9f", maxWidth: "42ch", margin: "0 auto 2rem" }}>
          {t("The page you're after moved or never existed. Head back to the academy.")}
        </p>
        <Link
          to="/"
          style={{
            display: "inline-block",
            background: "#d9ab4d",
            color: "#0a0a0b",
            padding: "0.75rem 1.5rem",
            borderRadius: 8,
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}
        >
          {t("Back to Gosu Academy")}
        </Link>
      </div>
    </div>
  );
}

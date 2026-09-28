import { Link } from "react-router-dom";

interface GosuSpeflLockupProps {
  /** Height in px of the Gosu logo (defaults to 26) */
  size?: number;
  /**
   * "pill" (default): Premium dark pill container that works on ANY page background
   * "light": Direct rendering for pure light backgrounds (dark wordmarks)
   * "dark": Direct rendering for pure dark backgrounds (white wordmarks)
   */
  theme?: "pill" | "light" | "dark";
  className?: string;
  showLink?: boolean;
}

export default function GosuSpeflLockup({
  size = 28,
  theme = "pill",
  className = "",
  showLink = true,
}: GosuSpeflLockupProps) {
  const speflHeight = Math.round(size * 1.1);

  const speflSrc =
    theme === "light"
      ? "/logos/SPEFL_Black.png"
      : "/logos/SPEFL_White.png";

  const gosuSrc =
    theme === "light"
      ? "/logos/Gosu_Logo_512.png"
      : "/logos/GOSU_Wordmark_White.png";

  const gosuFilter =
    theme === "light"
      ? "brightness(0)"
      : "brightness(1.35) contrast(1.15) drop-shadow(0 0 1px rgba(255, 255, 255, 0.75))";

  const content = (
    <div
      className={`gosu-spefl-lockup ${theme === "pill" ? "gosu-spefl-lockup--pill" : ""} ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: Math.max(10, Math.round(size * 0.45)),
        textDecoration: "none",
      }}
      aria-label="Gosu x SPEFL"
    >
      {/* Gosu Logo */}
      <img
        src={gosuSrc}
        alt="Gosu Academy"
        height={size}
        style={{
          display: "block",
          height: size,
          width: "auto",
          objectFit: "contain",
          filter: gosuFilter,
        }}
      />

      {/* × Cross Separator */}
      <span
        style={{
          fontFamily: "var(--font-display, sans-serif)",
          fontWeight: 700,
          fontSize: Math.round(size * 0.65),
          lineHeight: 1,
          color: theme === "light" ? "#94a3b8" : "rgba(255, 255, 255, 0.45)",
          userSelect: "none",
        }}
        aria-hidden="true"
      >
        ×
      </span>

      {/* SPEFL Logo */}
      <img
        src={speflSrc}
        alt="SPEFL-SC"
        height={speflHeight}
        style={{
          display: "block",
          height: speflHeight,
          width: "auto",
          objectFit: "contain",
        }}
      />
    </div>
  );

  if (showLink) {
    return (
      <Link to="/" style={{ textDecoration: "none", display: "inline-block" }}>
        {content}
      </Link>
    );
  }

  return content;
}

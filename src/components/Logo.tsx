interface LogoProps {
  /** height of the full lockup, or side length of the emblem-only mark */
  size?: number;
  /** false → render the emblem mark only (no wordmark) */
  showWord?: boolean;
  /** render a solid dark version for use on light backgrounds */
  mono?: boolean;
  className?: string;
}

// gosu.png is 247 × 59 (emblem + wordmark). Kept here so callers can size by height.
const LOCKUP_RATIO = 247 / 59;

/**
 * Gosu Academy brand logo. Renders the real brand asset:
 *  - full horizontal lockup (public/logos/gosu.png) by default
 *  - emblem mark only (public/logos/gosu-mark.png) when showWord={false}
 * The art is light/gold on transparent, made for dark backgrounds; pass
 * `mono` to render a solid dark version on light backgrounds.
 */
export default function Logo({
  size = 34,
  showWord = true,
  mono = false,
  className,
}: LogoProps) {
  const filter = mono ? "brightness(0)" : undefined;

  if (!showWord) {
    return (
      <img
        src="/logos/gosu-mark.png"
        alt="Gosu Academy"
        className={className}
        width={size}
        height={size}
        style={{
          display: "block",
          width: size,
          height: size,
          objectFit: "contain",
          flexShrink: 0,
          filter,
        }}
      />
    );
  }

  return (
    <img
      src="/logos/gosu.png"
      alt="Gosu Academy"
      className={className}
      height={size}
      width={Math.round(size * LOCKUP_RATIO)}
      style={{
        display: "block",
        height: size,
        width: "auto",
        flexShrink: 0,
        filter,
      }}
    />
  );
}

import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "instant" });
        return;
      }
    }

    // Immediately reset scroll to the very top on route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search, hash]);

  useEffect(() => {
    // Secondary check to catch lazy-loaded / Suspense component mounts
    if (!hash) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const raf = requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });

      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 50);

      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    } else {
      const timer = setTimeout(() => {
        const id = hash.replace("#", "");
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [pathname, search, hash]);

  return null;
}

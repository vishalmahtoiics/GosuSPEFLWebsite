import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { Sku } from "../lib/catalog";
import RegisterModal, { type CourseTrack } from "../components/RegisterModal";

const Ctx = createContext<{ open: (sku: Sku | string) => void }>({ open: () => {} });

export function useCheckoutPanel() {
  return useContext(Ctx);
}

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState<CourseTrack | null>(null);

  const open = useCallback((s: Sku | string) => {
    const str = String(s).toLowerCase();
    const t: CourseTrack = str.includes("bgmi")
      ? "bgmi"
      : str.includes("coach")
      ? "coaching"
      : str.includes("tourn") || str.includes("ops")
      ? "tournament-ops"
      : "valorant";
    setTrack(t);
  }, []);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {track && (
        <RegisterModal
          isOpen={true}
          initialTrack={track}
          onClose={() => setTrack(null)}
        />
      )}
    </Ctx.Provider>
  );
}

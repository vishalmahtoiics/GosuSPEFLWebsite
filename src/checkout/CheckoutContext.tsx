import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { Sku } from "../lib/catalog";
import { EnrollPanel } from "./EnrollPanel";

const Ctx = createContext<{ open: (sku: Sku) => void }>({ open: () => {} });

export function useCheckoutPanel() {
  return useContext(Ctx);
}

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [sku, setSku] = useState<Sku | null>(null);
  const open = useCallback((s: Sku) => setSku(s), []);
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {sku && <EnrollPanel sku={sku} onClose={() => setSku(null)} />}
    </Ctx.Provider>
  );
}

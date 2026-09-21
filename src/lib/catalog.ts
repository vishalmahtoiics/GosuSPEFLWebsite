export type Sku = "valorant" | "bgmi" | "bgmi-squad";
export type Plan = "full" | "monthly";

export interface Offering {
  sku: Sku;
  label: string;
  plans: {
    full: { amountPaise: number };
    monthly?: { amountPaise: number; cycles: number };
  };
}

export const CATALOG: Record<Sku, Offering> = {
  valorant: {
    sku: "valorant",
    label: "Valorant Season",
    plans: { full: { amountPaise: 1500000 }, monthly: { amountPaise: 250000, cycles: 6 } },
  },
  bgmi: {
    sku: "bgmi",
    label: "BGMI Season",
    plans: { full: { amountPaise: 1200000 }, monthly: { amountPaise: 200000, cycles: 6 } },
  },
  "bgmi-squad": {
    sku: "bgmi-squad",
    label: "BGMI Squad (4 players)",
    plans: { full: { amountPaise: 4000000 } },
  },
};

export function getOffering(sku: string): Offering | null {
  return Object.prototype.hasOwnProperty.call(CATALOG, sku) ? CATALOG[sku as Sku] : null;
}

export function planAmountPaise(sku: Sku, plan: Plan): number | null {
  const p = CATALOG[sku].plans[plan];
  return p ? p.amountPaise : null;
}

export function formatInr(amountPaise: number): string {
  return "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(amountPaise / 100);
}

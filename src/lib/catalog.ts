export type Sku = "valorant" | "valorant-squad" | "bgmi" | "bgmi-squad" | "coaching" | "tournament-ops";
export type Plan = "full" | "monthly";

export interface Offering {
  sku: Sku;
  label: string;
  mrpPaise: number;
  plans: {
    full: { amountPaise: number };
    monthly?: { amountPaise: number; cycles: number };
  };
}

export const CATALOG: Record<Sku, Offering> = {
  valorant: {
    sku: "valorant",
    label: "Valorant Season",
    mrpPaise: 1500000,
    plans: { full: { amountPaise: 1000000 }, monthly: { amountPaise: 170000, cycles: 6 } },
  },
  "valorant-squad": {
    sku: "valorant-squad",
    label: "Valorant Squad (5 players)",
    mrpPaise: 7500000,
    plans: { full: { amountPaise: 4500000 } },
  },
  bgmi: {
    sku: "bgmi",
    label: "BGMI Season",
    mrpPaise: 1500000,
    plans: { full: { amountPaise: 1000000 }, monthly: { amountPaise: 170000, cycles: 6 } },
  },
  "bgmi-squad": {
    sku: "bgmi-squad",
    label: "BGMI Squad (4 players)",
    mrpPaise: 6000000,
    plans: { full: { amountPaise: 3600000 } },
  },
  coaching: {
    sku: "coaching",
    label: "Esports Coach (Foundation)",
    mrpPaise: 1500000,
    plans: { full: { amountPaise: 1000000 }, monthly: { amountPaise: 170000, cycles: 6 } },
  },
  "tournament-ops": {
    sku: "tournament-ops",
    label: "Tournament Operations (Foundation)",
    mrpPaise: 1500000,
    plans: { full: { amountPaise: 1000000 }, monthly: { amountPaise: 170000, cycles: 6 } },
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

import { z } from "zod";
import { planAmountPaise, type Plan, type Sku } from "./catalog.js";

export function normalizeIndianPhone(raw: string): string | null {
  const digits = raw.replace(/[\s()-]/g, "");
  const m = /^(?:\+?91|0)?([6-9]\d{9})$/.exec(digits);
  return m ? `+91${m[1]}` : null;
}

export const checkoutRequestSchema = z
  .object({
    sku: z.enum(["valorant", "valorant-squad", "bgmi", "bgmi-squad", "coaching", "tournament-ops"]),
    plan: z.enum(["full", "monthly"]),
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(254),
    phone: z
      .string()
      .transform((v, ctx) => {
        const normalized = normalizeIndianPhone(v);
        if (!normalized) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Enter a valid Indian mobile number" });
          return z.NEVER;
        }
        return normalized;
      }),
    whatsappOptIn: z.boolean(),
    termsAccepted: z.literal(true),
  })
  .refine((v) => planAmountPaise(v.sku as Sku, v.plan as Plan) !== null, {
    message: "Plan not offered for this course",
    path: ["plan"],
  });

export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;

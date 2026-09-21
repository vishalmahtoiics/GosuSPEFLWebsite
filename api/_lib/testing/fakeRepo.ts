import { randomUUID } from "node:crypto";
import type { NewOrder, OrderRecord, OrdersRepo } from "../db.js";

export function fakeOrdersRepo(): OrdersRepo & { rows: Map<string, OrderRecord> } {
  const rows = new Map<string, OrderRecord>();
  const processedTxnIds = new Map<string, Set<string>>();
  return {
    rows,
    async create(input: NewOrder) {
      const order: OrderRecord = {
        ...input,
        id: randomUUID(),
        providerTransactionId: null,
        providerSubscriptionId: null,
        status: "pending",
        paymentsMade: 0,
        cancelScheduled: false,
        welcomeEmailSent: false,
        createdAt: new Date().toISOString(),
      };
      rows.set(order.id, order);
      processedTxnIds.set(order.id, new Set());
      return { ...order };
    },
    async get(id: string) {
      const r = rows.get(id);
      return r ? { ...r } : null;
    },
    async setProviderTransaction(id: string, txnId: string) {
      const r = rows.get(id);
      if (r) r.providerTransactionId = txnId;
    },
    async setProviderSubscription(id: string, subId: string) {
      const r = rows.get(id);
      if (r) r.providerSubscriptionId = subId;
    },
    async markPaid(id: string) {
      const r = rows.get(id);
      if (!r || (r.status !== "pending" && r.status !== "failed")) return false;
      r.status = "paid";
      return true;
    },
    async markFailed(id: string) {
      const r = rows.get(id);
      if (!r || r.status !== "pending") return false;
      r.status = "failed";
      return true;
    },
    async recordInstalmentPayment(id: string, txnId: string) {
      const r = rows.get(id);
      if (!r) return 0;
      const seen = processedTxnIds.get(id) ?? new Set<string>();
      if (!seen.has(txnId)) {
        seen.add(txnId);
        processedTxnIds.set(id, seen);
        r.paymentsMade += 1;
      }
      return r.paymentsMade;
    },
    async markCancelScheduled(id: string) {
      const r = rows.get(id);
      if (!r || r.cancelScheduled) return false;
      r.cancelScheduled = true;
      return true;
    },
    async markWelcomeEmailSent(id: string) {
      const r = rows.get(id);
      if (!r || r.welcomeEmailSent) return false;
      r.welcomeEmailSent = true;
      return true;
    },
  };
}

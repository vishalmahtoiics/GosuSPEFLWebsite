import { neon } from "@neondatabase/serverless";

export interface OrderRecord {
  id: string; sku: string; plan: string; amountPaise: number; currency: string;
  name: string; email: string; phone: string; whatsappOptIn: boolean;
  provider: string; providerTransactionId: string | null; providerSubscriptionId: string | null;
  status: "pending" | "paid" | "failed" | "refunded";
  paymentsMade: number; cancelScheduled: boolean; welcomeEmailSent: boolean; createdAt: string;
}

export type NewOrder = Omit<
  OrderRecord,
  | "id"
  | "providerTransactionId"
  | "providerSubscriptionId"
  | "status"
  | "paymentsMade"
  | "cancelScheduled"
  | "welcomeEmailSent"
  | "createdAt"
>;

export interface OrdersRepo {
  create(input: NewOrder): Promise<OrderRecord>;
  get(id: string): Promise<OrderRecord | null>;
  setProviderTransaction(id: string, txnId: string): Promise<void>;
  setProviderSubscription(id: string, subId: string): Promise<void>;
  markPaid(id: string): Promise<boolean>;
  markFailed(id: string): Promise<boolean>;
  recordInstalmentPayment(id: string, txnId: string): Promise<number>;
  markCancelScheduled(id: string): Promise<boolean>;
  markWelcomeEmailSent(id: string): Promise<boolean>;
}

type Row = Record<string, unknown>;

function toRecord(r: Row): OrderRecord {
  return {
    id: r.id as string,
    sku: r.sku as string,
    plan: r.plan as string,
    amountPaise: r.amount_paise as number,
    currency: r.currency as string,
    name: r.name as string,
    email: r.email as string,
    phone: r.phone as string,
    whatsappOptIn: r.whatsapp_optin as boolean,
    provider: r.provider as string,
    providerTransactionId: (r.provider_transaction_id as string | null) ?? null,
    providerSubscriptionId: (r.provider_subscription_id as string | null) ?? null,
    status: r.status as OrderRecord["status"],
    paymentsMade: r.payments_made as number,
    cancelScheduled: r.cancel_scheduled as boolean,
    welcomeEmailSent: r.welcome_email_sent as boolean,
    createdAt: new Date(r.created_at as string).toISOString(),
  };
}

export function neonOrdersRepo(databaseUrl: string): OrdersRepo {
  const sql = neon(databaseUrl);
  return {
    async create(o) {
      const rows = await sql`
        insert into orders (sku, plan, amount_paise, currency, name, email, phone, whatsapp_optin, provider)
        values (${o.sku}, ${o.plan}, ${o.amountPaise}, ${o.currency}, ${o.name}, ${o.email}, ${o.phone}, ${o.whatsappOptIn}, ${o.provider})
        returning *`;
      return toRecord(rows[0] as Row);
    },
    async get(id) {
      const rows = await sql`select * from orders where id = ${id}`;
      return rows.length ? toRecord(rows[0] as Row) : null;
    },
    async setProviderTransaction(id, txnId) {
      await sql`update orders set provider_transaction_id = ${txnId}, updated_at = now() where id = ${id}`;
    },
    async setProviderSubscription(id, subId) {
      await sql`update orders set provider_subscription_id = ${subId}, updated_at = now() where id = ${id}`;
    },
    async markPaid(id) {
      const rows = await sql`
        update orders set status = 'paid', updated_at = now()
        where id = ${id} and (status = 'pending' or status = 'failed') returning id`;
      return rows.length > 0;
    },
    async markFailed(id) {
      const rows = await sql`
        update orders set status = 'failed', updated_at = now()
        where id = ${id} and status = 'pending' returning id`;
      return rows.length > 0;
    },
    async recordInstalmentPayment(id, txnId) {
      const rows = await sql`
        update orders set
          payments_made = payments_made + (case when ${txnId} = any(processed_txn_ids) then 0 else 1 end),
          processed_txn_ids = (case when ${txnId} = any(processed_txn_ids) then processed_txn_ids else array_append(processed_txn_ids, ${txnId}) end),
          updated_at = now()
        where id = ${id} returning payments_made`;
      return rows.length ? (rows[0] as Row).payments_made as number : 0;
    },
    async markCancelScheduled(id) {
      const rows = await sql`
        update orders set cancel_scheduled = true, updated_at = now()
        where id = ${id} and cancel_scheduled = false returning id`;
      return rows.length > 0;
    },
    async markWelcomeEmailSent(id) {
      const rows = await sql`
        update orders set welcome_email_sent = true, updated_at = now()
        where id = ${id} and welcome_email_sent = false returning id`;
      return rows.length > 0;
    },
  };
}

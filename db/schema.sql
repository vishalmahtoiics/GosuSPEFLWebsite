create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  sku text not null,
  plan text not null,
  amount_paise integer not null,
  currency text not null default 'INR',
  name text not null,
  email text not null,
  phone text not null,
  whatsapp_optin boolean not null default false,
  provider text not null,
  provider_transaction_id text,
  provider_subscription_id text,
  status text not null default 'pending'
    check (status in ('pending','paid','failed','refunded')),
  payments_made integer not null default 0,
  processed_txn_ids text[] not null default '{}',
  cancel_scheduled boolean not null default false,
  welcome_email_sent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists orders_provider_txn on orders (provider_transaction_id);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS profiles (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handle         text UNIQUE NOT NULL,
  type           text NOT NULL CHECK (type IN ('player','coach')),
  display_name   text NOT NULL,
  certified_name text NOT NULL,
  photo_url      text,
  headline       text,
  bio            text,
  region         text,
  languages      jsonb NOT NULL DEFAULT '[]',
  games          jsonb NOT NULL DEFAULT '[]',
  primary_game   text,
  roles          jsonb NOT NULL DEFAULT '[]',
  ranks          jsonb NOT NULL DEFAULT '{}',
  achievements   jsonb NOT NULL DEFAULT '[]',
  socials        jsonb NOT NULL DEFAULT '{}',
  vod_embeds     jsonb NOT NULL DEFAULT '[]',
  available      boolean NOT NULL DEFAULT false,
  coach_details  jsonb,
  status         text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','hidden')),
  is_demo        boolean NOT NULL DEFAULT false,
  owner_email    text,
  claimed_at     timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS profiles_status_idx ON profiles(status);
CREATE INDEX IF NOT EXISTS profiles_type_idx ON profiles(type);

CREATE TABLE IF NOT EXISTS credentials (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id    uuid REFERENCES profiles(id) ON DELETE SET NULL,
  holder_name   text NOT NULL,
  course        text NOT NULL,
  cohort        text NOT NULL,
  issued_date   date NOT NULL,
  issuer        text NOT NULL DEFAULT 'Gosu Academy',
  status        text NOT NULL DEFAULT 'valid' CHECK (status IN ('valid','revoked')),
  revoke_reason text,
  is_demo       boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS credentials_profile_idx ON credentials(profile_id);

CREATE TABLE IF NOT EXISTS contact_messages (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id   uuid REFERENCES profiles(id) ON DELETE CASCADE,
  sender_name  text NOT NULL,
  sender_email text NOT NULL,
  sender_org   text,
  intent       text NOT NULL,
  message      text NOT NULL,
  status       text NOT NULL DEFAULT 'new' CHECK (status IN ('new','read','routed')),
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS auth_tokens (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text NOT NULL,
  profile_id  uuid REFERENCES profiles(id) ON DELETE CASCADE,
  token_hash  text NOT NULL UNIQUE,
  purpose     text NOT NULL CHECK (purpose IN ('claim','login','staff')),
  expires_at  timestamptz NOT NULL,
  used_at     timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS auth_tokens_email_idx ON auth_tokens(email);

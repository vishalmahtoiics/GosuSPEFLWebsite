-- Adds a hashed-IP column to contact_messages for per-IP rate limiting.
-- Stores only an HMAC hash of the client IP, never the raw address. Apply after 0001_talent.sql.
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS ip_hash text;
CREATE INDEX IF NOT EXISTS contact_messages_ip_created_idx ON contact_messages(ip_hash, created_at);

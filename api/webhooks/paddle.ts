import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neonOrdersRepo } from "../_lib/db.js";
import { resendSender } from "../_lib/email.js";
import { handlePaddleEvent } from "../_lib/handlePaddleWebhook.js";
import { paddleProvider } from "../_lib/providers/paddle.js";

// Raw-body reading works even though this project has no Next.js bodyParser config:
// @vercel/node buffers the request body and replays the exact raw bytes on req's
// data/end stream events, so req.on("data"/"end") below reconstructs the byte-identical
// payload the signature was computed over. Signature verification depends on that
// byte-identical replay — verified against the @vercel/node runtime helpers.
function readRawBody(req: VercelRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  const provider = paddleProvider();
  const rawBody = await readRawBody(req);
  const signature = (req.headers["paddle-signature"] as string) ?? "";

  let event;
  try {
    event = await provider.verifyWebhook(rawBody, signature);
  } catch {
    return res.status(401).json({ error: "invalid_signature" });
  }

  try {
    await handlePaddleEvent(event, {
      repo: neonOrdersRepo(process.env.DATABASE_URL!),
      email: resendSender(),
      provider,
    });
  } catch (err) {
    console.error("webhook processing error", err);
    return res.status(500).json({ error: "processing_error" }); // non-2xx → Paddle redelivers
  }
  return res.status(200).json({ ok: true });
}

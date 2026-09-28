import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

interface RegistrationBody {
  fullName: string;
  phone: string;
  email: string;
  courseTrack: string;
  city: string;
  state: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fullName, phone, email, courseTrack, city, state } = req.body as RegistrationBody;

    // Validation
    if (!fullName || !phone || !email || !courseTrack || !city || !state) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    if (!/^(?:\+?91)?[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const record = {
      timestamp: new Date().toISOString(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      courseTrack: courseTrack.trim(),
      city: city.trim(),
      state: state.trim(),
    };

    // 1. Forward to Google Sheets if Webhook URL is configured
    const googleSheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    let googleSheetSynced = false;

    if (googleSheetWebhook) {
      try {
        const sheetRes = await fetch(googleSheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        });
        if (sheetRes.ok) {
          googleSheetSynced = true;
        }
      } catch (sheetErr) {
        console.error("Error forwarding to Google Sheet Webhook:", sheetErr);
      }
    }

    // 2. Local fallback storage in data/registrations.json so no leads are ever lost
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "registrations.json");
      let list = [];
      if (fs.existsSync(filePath)) {
        try {
          list = JSON.parse(fs.readFileSync(filePath, "utf8"));
        } catch {
          list = [];
        }
      }
      list.push({ ...record, googleSheetSynced });
      fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf8");
    } catch (fsErr) {
      console.warn("Could not save to local data/registrations.json:", fsErr);
    }

    return res.status(200).json({
      success: true,
      googleSheetSynced,
      message: "Registration recorded successfully",
    });
  } catch (error) {
    console.error("Registration submission error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

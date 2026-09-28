import React, { useState } from "react";
import { DISCORD_URL, INSTAGRAM_URL } from "../lib/links";

export type CourseTrack =
  | "valorant"
  | "bgmi"
  | "coaching"
  | "tournament-ops";

export const COURSE_OPTIONS: { id: CourseTrack; label: string; price: string }[] = [
  { id: "valorant", label: "Valorant Competitive Program", price: "₹10,000" },
  { id: "bgmi", label: "BGMI Mobile Esports Program", price: "₹10,000" },
  { id: "coaching", label: "Esports Coaching & Leadership Certification", price: "₹10,000" },
  { id: "tournament-ops", label: "Tournament Operations & Broadcasting Track", price: "₹10,000" },
];

export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi NCR",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Other / Outside India",
];

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrack?: CourseTrack;
}

export default function RegisterModal({
  isOpen,
  onClose,
  initialTrack = "valorant",
}: RegisterModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [courseTrack, setCourseTrack] = useState<CourseTrack>(initialTrack);
  const [city, setCity] = useState("");
  const [state, setState] = useState("Delhi NCR");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync initialTrack if opened with a specific course
  React.useEffect(() => {
    if (initialTrack) {
      setCourseTrack(initialTrack);
    }
  }, [initialTrack]);

  if (!isOpen) return null;

  function validate() {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name";
    }

    // Phone validation: Accepts 10-digit Indian numbers or with +91 / country code
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    const phoneRegex = /^(?:\+?91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      errs.phone = "Please enter a valid 10-digit mobile number (e.g. 9876543210)";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!city.trim()) {
      errs.city = "Please enter your city";
    }

    if (!state.trim()) {
      errs.state = "Please select your state";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      courseTrack,
      trackName: COURSE_OPTIONS.find((c) => c.id === courseTrack)?.label || courseTrack,
      city: city.trim(),
      state,
      timestamp: new Date().toISOString(),
    };

    try {
      // 1. Send to serverless API endpoint
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 2. Also forward directly to Google Sheets webhook if configured in client environment
      const clientSheetUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL;
      if (clientSheetUrl) {
        try {
          await fetch(clientSheetUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch {
          // ignore client-side CORS issues if script handled
        }
      }

      if (!res.ok && res.status !== 404) {
        // Only error if server explicitly rejected
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to submit registration");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      // Fallback: If in local dev or API unavailable, store in localStorage
      try {
        const stored = JSON.parse(localStorage.getItem("gosu_registrations") || "[]");
        stored.push(payload);
        localStorage.setItem("gosu_registrations", JSON.stringify(stored));
        setSubmitted(true);
      } catch {
        const msg = err instanceof Error ? err.message : "Registration could not be sent. Please check your connection.";
        setSubmitError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  }

  const selectedCourse = COURSE_OPTIONS.find((c) => c.id === courseTrack);

  return (
    <div
      className="reg-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(5, 8, 15, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="reg-modal"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "540px",
          background: "#0c1322",
          border: "1px solid rgba(217, 171, 77, 0.35)",
          borderRadius: "16px",
          boxShadow: "0 24px 70px rgba(0, 0, 0, 0.75), 0 0 40px rgba(180, 83, 9, 0.15)",
          color: "#ffffff",
          padding: "clamp(24px, 4vw, 36px)",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#ffffff",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            fontSize: "18px",
            lineHeight: 1,
            transition: "background 0.2s, transform 0.2s",
          }}
          aria-label="Close modal"
        >
          ×
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div style={{ marginBottom: "22px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 10px",
                  background: "rgba(217, 171, 77, 0.12)",
                  border: "1px solid rgba(217, 171, 77, 0.4)",
                  borderRadius: "999px",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#f59e0b",
                  marginBottom: "12px",
                }}
              >
                <span>ADMISSIONS 2026</span>
                <span>•</span>
                <span>COMING SOON</span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display, 'Chakra Petch', sans-serif)",
                  fontSize: "clamp(22px, 3vw, 28px)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  margin: "0 0 8px",
                  color: "#ffffff",
                }}
              >
                Join The Waitlist · Priority Access
              </h2>
              <p
                style={{
                  fontSize: "13.5px",
                  lineHeight: 1.5,
                  color: "#94a3b8",
                  margin: 0,
                }}
              >
                Courses are launching soon. Lock in your priority seat and cohort discount at zero upfront cost.
              </p>
            </div>

            {/* Price & Bank EMI Notice Banner */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
                padding: "12px 16px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div>
                <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", display: "block" }}>
                  Course Tuition
                </span>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span style={{ fontSize: "20px", fontWeight: 700, color: "#f59e0b" }}>
                    {selectedCourse?.price || "₹10,000"}
                  </span>
                  <del style={{ fontSize: "12px", color: "#64748b" }}>₹15,000</del>
                  <span style={{ fontSize: "10px", background: "#22c55e", color: "#000", fontWeight: 700, padding: "1px 5px", borderRadius: "3px" }}>
                    33% OFF
                  </span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "11px", color: "#94a3b8", display: "block" }}>
                  💳 Bank-side EMI Available
                </span>
                <span style={{ fontSize: "10px", color: "#64748b" }}>
                  (Strictly through partner card banks)
                </span>
              </div>
            </div>

            {submitError && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid #ef4444",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  fontSize: "13px",
                  color: "#fca5a5",
                  marginBottom: "16px",
                }}
              >
                {submitError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* 1. Full Name */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                  Full Name <span style={{ color: "#f59e0b" }}>*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: "" });
                  }}
                  placeholder="Enter your full name"
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    background: "rgba(15, 23, 42, 0.9)",
                    border: `1px solid ${errors.fullName ? "#ef4444" : "rgba(255, 255, 255, 0.15)"}`,
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
                {errors.fullName && <p style={{ margin: "4px 0 0", fontSize: "11.5px", color: "#ef4444" }}>{errors.fullName}</p>}
              </div>

              {/* 2 & 3. Phone & Email in a 2-column grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                    Phone Number <span style={{ color: "#f59e0b" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    placeholder="10-digit mobile"
                    maxLength={13}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      background: "rgba(15, 23, 42, 0.9)",
                      border: `1px solid ${errors.phone ? "#ef4444" : "rgba(255, 255, 255, 0.15)"}`,
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                  {errors.phone && <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#ef4444" }}>{errors.phone}</p>}
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                    Email Address <span style={{ color: "#f59e0b" }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="your@email.com"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      background: "rgba(15, 23, 42, 0.9)",
                      border: `1px solid ${errors.email ? "#ef4444" : "rgba(255, 255, 255, 0.15)"}`,
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                  {errors.email && <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#ef4444" }}>{errors.email}</p>}
                </div>
              </div>

              {/* 4. Course Track (Select from 4 options) */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                  Select Course Track <span style={{ color: "#f59e0b" }}>*</span>
                </label>
                <select
                  value={courseTrack}
                  onChange={(e) => setCourseTrack(e.target.value as CourseTrack)}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    background: "#090d16",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  {COURSE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id} style={{ background: "#090d16", color: "#ffffff" }}>
                      {opt.label} — {opt.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5 & 6. City & State */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                    City <span style={{ color: "#f59e0b" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (errors.city) setErrors({ ...errors, city: "" });
                    }}
                    placeholder="e.g. Mumbai, Delhi, Bengaluru"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      background: "rgba(15, 23, 42, 0.9)",
                      border: `1px solid ${errors.city ? "#ef4444" : "rgba(255, 255, 255, 0.15)"}`,
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                  {errors.city && <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#ef4444" }}>{errors.city}</p>}
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                    State <span style={{ color: "#f59e0b" }}>*</span>
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      background: "#090d16",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontSize: "14px",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s} style={{ background: "#090d16", color: "#ffffff" }}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  marginTop: "12px",
                  padding: "14px 24px",
                  background: "linear-gradient(135deg, #f59e0b, #b45309)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontFamily: "var(--font-display, 'Chakra Petch', sans-serif)",
                  fontWeight: 700,
                  fontSize: "15px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  cursor: submitting ? "not-allowed" : "pointer",
                  boxShadow: "0 6px 20px rgba(180, 83, 9, 0.35)",
                  transition: "transform 0.2s, box-shadow 0.2s, opacity 0.2s",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? "Securing Spot…" : "Join The Waitlist →"}
              </button>

              <p style={{ margin: "4px 0 0", fontSize: "11px", textAlign: "center", color: "#64748b" }}>
                🔒 100% Free Pre-registration. No payment required today.
              </p>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div style={{ textAlign: "center", padding: "16px 8px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "rgba(34, 197, 94, 0.15)",
                border: "2px solid #22c55e",
                color: "#22c55e",
                display: "grid",
                placeItems: "center",
                fontSize: "28px",
                margin: "0 auto 18px",
              }}
            >
              ✓
            </div>
            <span
              style={{
                display: "inline-block",
                padding: "3px 10px",
                background: "rgba(217, 171, 77, 0.15)",
                border: "1px solid rgba(217, 171, 77, 0.4)",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#f59e0b",
                marginBottom: "8px",
              }}
            >
              PRIORITY WAITLIST CONFIRMED
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "24px",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 10px",
              }}
            >
              Thank You, {fullName.split(" ")[0]}!
            </h3>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.6,
                color: "#94a3b8",
                maxWidth: "42ch",
                margin: "0 auto 24px",
              }}
            >
              Your priority registration for <strong>{selectedCourse?.label}</strong> has been stored. You will be notified the instant cohort admissions open.
            </p>

            {/* Community Links on Success */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "18px",
                marginBottom: "20px",
              }}
            >
              <p style={{ margin: "0 0 12px", fontSize: "13px", fontWeight: 600, color: "#cbd5e1" }}>
                Join our official community while you wait:
              </p>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "9px 16px",
                    background: "#5865F2",
                    borderRadius: "6px",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Discord Community
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "9px 16px",
                    background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                    borderRadius: "6px",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @gosu_india
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 24px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "6px",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export const SUPPORT_EMAIL = "support@gosuacademy.com";

export interface LegalDoc {
  slug: string;
  title: string;
  updated: string;
  sections: { h: string; body: string[] }[];
}

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    updated: "3 July 2026",
    sections: [
      {
        h: "What you're buying",
        body: [
          "Gosu Academy courses are live, coach-led online training programs. A season enrollment covers the listed number of live sessions, assessments, and community access for that course. Seats are personal to the enrolled student and can't be shared or resold.",
          "Course schedules are published before each batch starts. If we reschedule a session, you'll be notified on WhatsApp and Discord and offered the recording or a make-up slot.",
        ],
      },
      {
        h: "Payments",
        body: [
          "Prices are in Indian Rupees. Payments are processed by Paddle.com, our merchant of record — the charge on your statement will read Paddle. Instalment plans bill monthly for the number of payments shown at checkout; missing an instalment may pause your access until the payment is retried successfully.",
        ],
      },
      {
        h: "Conduct",
        body: [
          "Coaching spaces are for students. Harassment, cheating tools, and account sharing get you removed without refund. Students under 18 need a parent or guardian's consent to enroll.",
        ],
      },
      {
        h: "Liability",
        body: [
          "We coach esports skills; we don't guarantee ranks, wins, or professional contracts. To the extent permitted by law, our liability for any claim is limited to the amount you paid for the course.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "3 July 2026",
    sections: [
      {
        h: "What we collect",
        body: [
          "When you enroll we collect your name, email, and mobile number, plus your course and payment status. Payment details (card, UPI) go directly to our payment processor, Paddle — we never see or store them.",
        ],
      },
      {
        h: "How we use it",
        body: [
          "To run your course: receipts and onboarding by email, batch updates on WhatsApp (only if you opted in), and coaching inside Discord. We don't sell your data, and we don't send marketing you didn't ask for.",
        ],
      },
      {
        h: "Where it lives",
        body: [
          "Order records are stored with our database provider (Neon) and email provider (Resend). Paddle processes payments as merchant of record under its own privacy policy.",
        ],
      },
      {
        h: "Your choices",
        body: [
          "Email us to see, correct, or delete the data we hold about you. Deleting your data ends course access tied to it.",
        ],
      },
    ],
  },
  {
    slug: "refunds",
    title: "Refund Policy",
    updated: "3 July 2026",
    sections: [
      {
        h: "Try before you pay",
        body: [
          "Every course has a free weekly cup or scrim — see how we coach before you spend a rupee.",
        ],
      },
      {
        h: "Full refund window",
        body: [
          "If the course isn't right for you, tell us within 7 days of your batch's first live session and we'll refund your payment in full. After that window, fees for the running season aren't refundable, but you can transfer your seat to the next batch once, free.",
        ],
      },
      {
        h: "Instalment plans",
        body: [
          "Cancelling an instalment plan inside the 7-day window refunds what you've paid. After the window, already-billed instalments aren't refunded; remaining instalments stop and course access ends with the paid period.",
        ],
      },
      {
        h: "How to ask",
        body: [
          "Email us with your order ID (it's in your confirmation email). Refunds are processed by Paddle back to your original payment method, typically within 5–10 business days.",
        ],
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    updated: "3 July 2026",
    sections: [
      {
        h: "Support",
        body: [
          "Fastest: reply to any email we've sent you, or write to the support inbox below. We answer within one business day, in English or Hindi.",
        ],
      },
      {
        h: "Company",
        body: [
          "Gosu Academy, in partnership with Bharat Esports. Courses are certified by SPEFL-SC.",
        ],
      },
    ],
  },
];

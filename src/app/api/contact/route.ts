import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Payload;
  const to = process.env.CONTACT_TO_EMAIL || "atelier@nethuliattanayake.com";
  const subject = body.subject || "Portfolio";
  const text = `${body.name || ""}\n${body.email || ""}\n\n${body.message || ""}`;
  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

  const key = process.env.RESEND_API_KEY;
  if (key) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nethuli Portfolio <onboarding@resend.dev>",
        to,
        subject: `Portfolio — ${subject}`,
        text,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, mailto }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true, mailto });
}

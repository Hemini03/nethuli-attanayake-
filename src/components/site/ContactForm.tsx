"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { SiteContent } from "@/lib/content/types";

type Props = {
  content: SiteContent;
};

export function ContactForm({ content }: Props) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { ok?: boolean; mailto?: string };
      if (data.mailto) {
        window.location.href = data.mailto;
      }
      setStatus(response.ok ? "success" : "error");
    } catch {
      const mailto = `mailto:${content.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(`${payload.name}\n${payload.email}\n\n${payload.message}`)}`;
      window.location.href = mailto;
      setStatus("success");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-12 max-w-xl space-y-8">
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.24em]">{t("name")}</span>
        <input
          required
          name="name"
          className="mt-2 w-full border-b border-ink bg-transparent py-3 outline-none"
        />
      </label>
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.24em]">{t("email")}</span>
        <input
          required
          type="email"
          name="email"
          className="mt-2 w-full border-b border-ink bg-transparent py-3 outline-none"
        />
      </label>
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.24em]">{t("subject")}</span>
        <select
          name="subject"
          className="mt-2 w-full border-b border-ink bg-transparent py-3 outline-none"
          defaultValue={t("subjects.maison")}
        >
          <option>{t("subjects.maison")}</option>
          <option>{t("subjects.collaboration")}</option>
          <option>{t("subjects.press")}</option>
          <option>{t("subjects.other")}</option>
        </select>
      </label>
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.24em]">{t("message")}</span>
        <textarea
          required
          name="message"
          rows={6}
          className="mt-2 w-full border-b border-ink bg-transparent py-3 outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="text-[11px] uppercase tracking-[0.32em] underline-offset-8 hover:underline disabled:opacity-50"
      >
        {status === "sending" ? t("sending") : t("send")}
      </button>
      {status === "success" ? (
        <p className="text-sm text-ink-soft">{t("success")}</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-oxblood">{t("error")}</p>
      ) : null}
    </form>
  );
}

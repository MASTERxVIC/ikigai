"use client";

import { useState } from "react";
import { IconWhatsApp } from "./icons";
import { SERVICES, WHATSAPP_NUMBER } from "../lib/content";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", service: SERVICES[0].title, message: "" });
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const text = `Hi ikigaicoding!%0A%0AName: ${encodeURIComponent(form.name)}%0AEmail: ${encodeURIComponent(form.email)}%0AService: ${encodeURIComponent(form.service)}%0A%0A${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="center" style={{ padding: "40px 0" }}>
        <h2 className="h2">Opening WhatsApp…</h2>
        <p className="lead">Your enquiry is ready to send — just hit send in WhatsApp. We&apos;ll take it from there.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} aria-label="Project enquiry form">
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" required value={form.name} onChange={update("name")} placeholder="e.g. Priya Sharma" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" required value={form.email} onChange={update("email")} placeholder="you@company.com" />
      </div>
      <div className="field">
        <label htmlFor="service">Service needed</label>
        <select id="service" value={form.service} onChange={update("service")}>
          {SERVICES.map((s) => <option key={s.slug}>{s.title}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">About your project</label>
        <textarea id="message" rows="5" required value={form.message} onChange={update("message")} placeholder="What do you want to build? What does success look like?" />
      </div>
      <button type="submit" className="btn btn-dark" style={{ width: "100%", justifyContent: "center" }}>
        <IconWhatsApp /> Send via WhatsApp
      </button>
      <p style={{ fontSize: 12.5, color: "#8fa79a", marginTop: 12 }}>No spam, no cold calls — just a reply about your project.</p>
    </form>
  );
}

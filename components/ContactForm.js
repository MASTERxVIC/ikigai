"use client";

import { useState } from "react";
import { IconMail } from "./icons";
import { SERVICES, EMAIL } from "../lib/content";

const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Something else"];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", service: SERVICE_OPTIONS[0], message: "" });
  const [ready, setReady] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setReady(true);
  };

  const mailto = () => {
    const subject = encodeURIComponent(`New enquiry — ${form.service}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.message}`
    );
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  if (ready) {
    return (
      <div className="ready-panel" role="status">
        <h2 className="h3" style={{ color: "var(--emerald-800)", fontSize: 22 }}>Your enquiry is ready.</h2>
        <p style={{ color: "var(--muted)", fontSize: 15 }}>
          Nothing has been sent yet — this page never sends anything on its own. One more tap opens
          your email app with the enquiry fully written out, addressed to us. Check it, hit send, done.
        </p>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginTop: 6 }}>
          <a href={mailto()} className="btn btn-gold">
            <IconMail /> Send it by email →
          </a>
          <button type="button" className="edit-link" onClick={() => setReady(false)}>
            Edit the enquiry instead
          </button>
        </div>
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
        <label htmlFor="email">Email address</label>
        <input id="email" type="email" required value={form.email} onChange={update("email")} placeholder="you@company.com" />
      </div>
      <div className="field">
        <label htmlFor="service">What do you need?</label>
        <select id="service" value={form.service} onChange={update("service")}>
          {SERVICE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Tell us about the goal</label>
        <textarea
          id="message"
          rows="5"
          required
          value={form.message}
          onChange={update("message")}
          placeholder="What are you building, who is it for, and what does success look like?"
        />
      </div>
      <button type="submit" className="btn btn-dark" style={{ width: "100%", justifyContent: "center" }}>
        Prepare my enquiry
      </button>
      <p style={{ fontSize: 12.5, color: "#8fa79a", marginTop: 12 }}>
        No spam, no cold calls — just a reply about your project.
      </p>
    </form>
  );
}

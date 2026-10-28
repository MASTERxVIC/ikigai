"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SERVICES, PROJECTS, FAQS, EMAIL } from "../lib/content";

// Daruma — the studio's own assistant. Rule-based brain: every answer comes
// from the site's real content (services, work, FAQs, process, Daruma story).
// No API key, no backend, nothing stored. When a visitor shows interest,
// Daruma asks for their details in the chat and hands them a ready-to-send
// email to the studio (mailto — the same pattern as the contact page).

const GREETING = "Hi! I'm <b>Daruma</b> — the studio's own Daruma. Ask me about services, our work, or how we work — I'll guide you to the right next step. Fall seven times, get up eight!";

const SERVICE_KEYS = [
  { keys: ["geo", "generative", "ai search", "chatgpt", "ai answer"], slug: "geo" },
  { keys: ["aeo", "answer engine"], slug: "aeo" },
  { keys: ["seo", "google rank", "ranking"], slug: "seo" },
  { keys: ["ecommerce", "e-commerce", "online store", "shop", "store"], slug: "ecommerce-website" },
  { keys: ["landing"], slug: "landing-page" },
  { keys: ["maintenance", "speed", "slow website", "fix my"], slug: "website-maintenance-speed-fix" },
  { keys: ["software", "custom", "crm", "dashboard", "automation", "tool", "app"], slug: "custom-software" },
  { keys: ["website", "web design", "web development", "site"], slug: "website-design-development" },
];

const INTEREST_RE = /want|need|looking for|interested|hire|quote|price|cost|start|build|project|contact|call|help (me|us)/;

function serviceAnswer(slug) {
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return null;
  return "<b>" + s.title + "</b> — " + s.short + "<br>" + s.points.slice(0, 3).join(" · ") + ".<br><a class=\"daruma-guide\" href=\"/services#" + s.slug + "\">See it on the Services page →</a>";
}

function brain(text) {
  const t = text.toLowerCase();
  if (/^(hi|hello|hey|namaste|hii+)\b/.test(t.trim())) {
    return "Hello! Great to see you here. " + GREETING;
  }
  if (t.includes("daruma") || t.includes("doll") || t.includes("ikigai") || t.includes("perseverance") || t.includes("fall seven")) {
    return "The Daruma is a Japanese doll of <b>perseverance — fall seven times, get up eight</b>. Its eyes are <b>{}</b> — code brackets — and it wears a hachimaki headband for hard work and focus. That is the studio's operating system: we keep rising until the second eye can be painted in.";
  }
  for (const m of SERVICE_KEYS) {
    if (m.keys.some((k) => t.includes(k))) return serviceAnswer(m.slug);
  }
  if (t.includes("service")) {
    return "We have <b>eight crafts</b>: " + SERVICES.map((s) => s.title).join(", ") + ". Pick one, or let the studio carry the whole wall — full details are on the Services page.<br><a class=\"daruma-guide\" href=\"/services\">Explore all 8 services →</a>";
  }
  if (t.includes("process") || t.includes("how do you work") || t.includes("steps")) {
    return "Three steps: <b>1)</b> You send the enquiry — two minutes, in your own words. <b>2)</b> We reply within 24 hours with questions or a quote. <b>3)</b> We agree scope, timeline and price in writing — then we build until the second eye can be painted in.";
  }
  if (t.includes("work") || t.includes("project") || t.includes("portfolio") || t.includes("built") || t.includes("example")) {
    return "Four builds so far: " + PROJECTS.map((p) => "<b>" + p.title + "</b> (" + p.subtitle + ")").join(", ") + ".<br><a class=\"daruma-guide\" href=\"/work\">See the work →</a>";
  }
  if (t.includes("how long") || t.includes("timeline") || t.includes("take")) {
    const f = FAQS.find((x) => x.q.toLowerCase().includes("how long"));
    return f ? f.a : "A typical business website takes 2–4 weeks from kickoff to launch; e-commerce and custom software take longer depending on scope.";
  }
  if (t.includes("price") || t.includes("cost") || t.includes("how much") || t.includes("charge") || t.includes("quote")) {
    const f = FAQS.find((x) => x.q.toLowerCase().includes("cost"));
    return (f ? f.a : "It depends on scope — tell us what you need and you will get an honest, itemized quote. No hidden charges, ever.") + " Want a quote for your project? I can pass your details to the studio.";
  }
  if (t.includes("contact") || t.includes("call") || t.includes("start") || t.includes("hire") || t.includes("enquiry")) {
    return "Easiest start: tell us your goal on the Contact page — two minutes, your own words — and you will have clear next steps within 24 hours. No spam, no sales script.";
  }
  return "I can help with <b>services</b>, our <b>work</b>, the <b>process</b>, the <b>Daruma story</b>, or <b>getting started</b> — try one of the suggestions below.";
}

export default function DarumaAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ from: "daruma", html: GREETING }]);
  const [input, setInput] = useState("");
  const [expr, setExpr] = useState("idle");
  const [lead, setLead] = useState(null); // { step, name, email, project }
  const [leadOffered, setLeadOffered] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, open]);

  const push = (m) => setMsgs((prev) => [...prev, m]);

  const happyThenIdle = () => {
    setExpr("happy");
    setTimeout(() => setExpr("idle"), 1300);
  };

  const offerLead = () => {
    if (leadOffered || lead) return;
    setLeadOffered(true);
    push({
      from: "daruma",
      html: "Want me to pass your details to the studio? They reply within 24 hours.",
      buttons: [
        { label: "Yes, share details", action: "lead-yes" },
        { label: "No, just browsing", action: "lead-no" },
      ],
    });
  };

  const answer = (text) => {
    setExpr("thinking");
    const typing = { from: "daruma", html: "…", typing: true };
    setMsgs((prev) => [...prev, typing]);
    setTimeout(() => {
      setMsgs((prev) => prev.filter((m) => !m.typing));
      push({ from: "daruma", html: brain(text) });
      happyThenIdle();
      if (INTEREST_RE.test(text.toLowerCase())) setTimeout(offerLead, 600);
    }, 750);
  };

  const handleLeadStep = (text) => {
    const step = lead.step;
    if (step === "name") {
      const name = text.trim();
      if (!name) return;
      setLead({ ...lead, step: "email", name });
      push({ from: "daruma", html: "Thanks " + name + "! And your email, so the studio can reply?" });
      return;
    }
    if (step === "email") {
      const email = text.trim();
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        push({ from: "daruma", html: "That email doesn't look right — could you type it again?" });
        return;
      }
      setLead({ ...lead, step: "project", email });
      push({ from: "daruma", html: "Last one — what do you want to build, in a line or two?" });
      return;
    }
    if (step === "project") {
      const project = text.trim();
      if (!project) return;
      setLead({ ...lead, step: "confirm", project });
      push({
        from: "daruma",
        html: "Here's what I'll send to the studio:<br><b>Name:</b> " + lead.name + "<br><b>Email:</b> " + lead.email + "<br><b>Project:</b> " + project,
        buttons: [
          { label: "Send message →", action: "lead-send" },
          { label: "Start over", action: "lead-restart" },
        ],
      });
    }
  };

  const mailtoFor = (l) =>
    "mailto:" + EMAIL +
    "?subject=" + encodeURIComponent("Website enquiry via Daruma — " + l.name) +
    "&body=" + encodeURIComponent("Name: " + l.name + "\nEmail: " + l.email + "\nInterested in: " + l.project + "\n\nSent via the Daruma assistant on ikigaicoding.com");

  const handleAction = (action) => {
    if (action === "lead-yes") {
      setLead({ step: "name", name: "", email: "", project: "" });
      push({ from: "daruma", html: "Great! What's your name?" });
    } else if (action === "lead-no") {
      push({ from: "daruma", html: "No problem — browse around, or open the Contact page whenever you're ready.<br><a class=\"daruma-guide\" href=\"/contact\">Go to Contact →</a>" });
    } else if (action === "lead-restart") {
      setLead({ step: "name", name: "", email: "", project: "" });
      push({ from: "daruma", html: "Let's start fresh — what's your name?" });
    } else if (action === "lead-send") {
      setLead({ ...lead, step: "sent" });
      push({ from: "daruma", html: "Your email app should have opened with the message ready — just hit send! Your details aren't stored anywhere; they only go in that email. The studio replies within 24 hours.<br><a class=\"daruma-guide\" href=\"/contact\">Or use the Contact page instead →</a>" });
    }
  };

  const send = (raw) => {
    const text = (raw !== undefined ? raw : input).trim();
    if (!text) return;
    setInput("");
    push({ from: "user", html: text });
    if (lead && lead.step !== "confirm" && lead.step !== "sent") {
      if (/^(cancel|stop|never mind)$/i.test(text)) {
        setLead(null);
        push({ from: "daruma", html: "No worries — stopped. Ask me anything else, or open the Contact page whenever you're ready." });
        return;
      }
      setExpr("thinking");
      setTimeout(() => {
        handleLeadStep(text);
        setExpr("idle");
      }, 500);
      return;
    }
    answer(text);
  };

  const chip = (label) => {
    push({ from: "user", html: label });
    if (label === "How do I start?") {
      setExpr("thinking");
      setTimeout(() => {
        setMsgs((prev) => prev.filter((m) => !m.typing));
        push({ from: "daruma", html: brain("start") });
        happyThenIdle();
        setTimeout(offerLead, 600);
      }, 750);
      return;
    }
    answer(label);
  };

  return (
    <>
      {open && (
        <div className="daruma-panel" role="dialog" aria-label="Chat with Daruma">
          <div className="daruma-head">
            <div className="daruma-ava">
              <div className={`daruma-expr-${expr}`}>
                <img src="/assets/icon.svg" alt="Daruma" />
              </div>
            </div>
            <div>
              <b>Daruma</b>
              <span>Your studio guide · replies instantly</span>
            </div>
            <button className="daruma-close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>
          <div className="daruma-msgs" ref={scrollRef}>
            {msgs.map((m, i) => (
              <div key={i}>
                {m.from === "daruma" ? (
                  <div className={`daruma-msg daruma-bubble${m.typing ? " typing" : ""}`} dangerouslySetInnerHTML={{ __html: m.html }} />
                ) : (
                  <div className="daruma-msg user-bubble">{m.html}</div>
                )}
                {m.buttons && (
                  <div className="daruma-actions">
                    {m.buttons.map((b) => (
                      b.action === "lead-send" ? (
                        <a key={b.label} className="daruma-action primary" href={mailtoFor(lead)} onClick={() => handleAction("lead-send")}>{b.label}</a>
                      ) : (
                        <button key={b.label} className="daruma-action" onClick={() => handleAction(b.action)}>{b.label}</button>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="daruma-chips">
            <button onClick={() => chip("What services do you offer?")}>What services do you offer?</button>
            <button onClick={() => chip("How does the process work?")}>How does the process work?</button>
            <button onClick={() => chip("Show me your work")}>Show me your work</button>
            <button onClick={() => chip("How do I start?")}>How do I start?</button>
          </div>
          <div className="daruma-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              placeholder={lead && lead.step === "name" ? "Your name…" : lead && lead.step === "email" ? "Your email…" : lead && lead.step === "project" ? "What do you want to build?…" : "Ask Daruma anything…"}
              aria-label="Message Daruma"
            />
            <button onClick={() => send()}>Send</button>
          </div>
        </div>
      )}
      <button className="daruma-btn" onClick={() => setOpen(!open)} aria-label={open ? "Close Daruma assistant" : "Chat with Daruma"}>
        <img src="/assets/icon.svg" alt="Daruma assistant" />
        <span className="daruma-dot" />
      </button>
    </>
  );
}

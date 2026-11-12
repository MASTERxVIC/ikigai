"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import LoginForm from "./LoginForm";

const MAX_PINS = 4;
// Exact server message (app/api/admin/projects/route.js PIN_LIMIT_ERROR).
const PIN_FULL_MSG = "Only 4 projects can be pinned on Home. Unpin one first.";

const ICON_OPTIONS = [
  { value: "software", label: "software" },
  { value: "web", label: "web" },
  { value: "cart", label: "cart" },
  { value: "seo", label: "seo" },
  { value: "geo", label: "geo" },
  { value: "aeo", label: "aeo" },
  { value: "landing", label: "landing" },
  { value: "wrench", label: "wrench" },
];
const SHOW_ON_OPTIONS = [
  { value: "home+services", label: "Home + Services page (auto)" },
  { value: "services", label: "Services page only" },
];
const VISIBLE_OPTIONS = [
  { value: true, label: "Yes — visible to the public" },
  { value: false, label: "No — hidden draft" },
];
const CATEGORY_OPTIONS = [
  { value: "Full-Stack Platform", label: "Full-Stack Platform" },
  { value: "Web App", label: "Web App" },
  { value: "Motion Website", label: "Motion Website" },
  { value: "Client System · MERN", label: "Client System · MERN" },
  { value: "Website", label: "Website" },
];
const PIN_OPTIONS = [
  { value: true, label: "Yes — pin to Home" },
  { value: false, label: "No — Work page only" },
];

/** Pushpin icon (Lucide "pin") — professional SVG, no emoji. */
function PinIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 17v5" />
      <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1z" />
    </svg>
  );
}

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";
}

function asList(data, key) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data[key])) return data[key];
  if (data && Array.isArray(data.items)) return data.items;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

/** fetch with the admin session cookie; throws an Error carrying the server message. */
async function api(path, opts = {}) {
  const res = await fetch(path, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || data.message || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

/* ---------------------------------- forms ---------------------------------- */

function ServiceForm({ initial, index, total, onSaved, onCancel, onError }) {
  const editing = Boolean(initial);
  const [title, setTitle] = useState(initial?.title || "");
  const [short, setShort] = useState(initial?.short || "");
  const [desc, setDesc] = useState(initial?.desc || "");
  const [points, setPoints] = useState((initial?.points || []).join("\n"));
  const [icon, setIcon] = useState(initial?.icon || "software");
  const [showOn, setShowOn] = useState(initial?.showOn || "home+services");
  const [visible, setVisible] = useState(initial?.visible !== false);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!title.trim() || !short.trim()) {
      onError("Title and Short are both required.");
      return;
    }
    setBusy(true);
    try {
      const payload = {
        title: title.trim(),
        short: short.trim(),
        desc: desc.trim(),
        points: points.split("\n").map((p) => p.trim()).filter(Boolean),
        icon,
        showOn,
        visible,
      };
      if (editing) {
        await api(`/api/admin/services/${initial.slug}`, { method: "PUT", body: JSON.stringify(payload) });
      } else {
        payload.slug = slugify(title);
        await api("/api/admin/services", { method: "POST", body: JSON.stringify(payload) });
      }
      onSaved(editing ? "Service updated." : "Service saved — card created automatically.");
    } catch (err) {
      onError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const ghostNo = editing ? index + 1 : total + 1;

  return (
    <form className="adm-form" onSubmit={submit}>
      <div className="adm-field">
        <label>Title *</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. WhatsApp Automation" required />
      </div>
      <Dropdown label="Icon" options={ICON_OPTIONS} value={icon} onChange={setIcon} />
      <div className="adm-field full">
        <label>Short — shown on the card *</label>
        <input value={short} onChange={(e) => setShort(e.target.value)} placeholder="One line, shown on the card" required />
      </div>
      <div className="adm-field full">
        <label>Description — service detail page</label>
        <textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What this service includes, in 2–3 lines" />
      </div>
      <div className="adm-field full">
        <label>Points — one point per line</label>
        <textarea rows={3} value={points} onChange={(e) => setPoints(e.target.value)} placeholder={"Point 1\nPoint 2\nPoint 3"} />
      </div>
      <Dropdown label="Show on" options={SHOW_ON_OPTIONS} value={showOn} onChange={setShowOn} />
      <Dropdown label="Visible?" options={VISIBLE_OPTIONS} value={visible} onChange={setVisible} />
      <div className="adm-field full" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button type="submit" className="adm-btn adm-btn-gold" disabled={busy} style={{ padding: 13 }}>
          {busy ? "Saving…" : editing ? "Update service →" : "Save service →"}
        </button>
        {editing ? (
          <button type="button" className="adm-btn adm-btn-ghost" onClick={onCancel}>Cancel edit</button>
        ) : null}
      </div>
      {title.trim() || short.trim() ? (
        <div className="adm-preview" style={{ gridColumn: "1 / -1" }}>
          <h4>Live preview</h4>
          <div className="adm-svc-preview">
            <span className="adm-ghost">{ghostNo}</span>
            <h3>{title.trim() || "Service title"}</h3>
            <p>{short.trim() || "Short line appears here."}</p>
            <p style={{ marginTop: 14, fontWeight: 700, color: "var(--emerald-700)" }}>✓ Points appear as written above</p>
          </div>
        </div>
      ) : null}
    </form>
  );
}

function ProjectForm({ initial, onSaved, onCancel, onError, pinnedCount }) {
  const editing = Boolean(initial);
  const [title, setTitle] = useState(initial?.title || "");
  const [subtitle, setSubtitle] = useState(initial?.subtitle || "");
  const [category, setCategory] = useState(initial?.category || "Web App");
  const [desc, setDesc] = useState(initial?.desc || "");
  const [built, setBuilt] = useState(initial?.built || "");
  const [chips, setChips] = useState((initial?.chips || []).join(", "));
  const [live, setLive] = useState(initial?.live || "");
  const [pinned, setPinned] = useState(initial?.pinned === true);
  const [visible, setVisible] = useState(initial?.visible !== false);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!title.trim() || !subtitle.trim() || !desc.trim()) {
      onError("Title, Subtitle and Short description are required.");
      return;
    }
    // Client-side pin guard: the server also enforces max 4 (400 on the 5th).
    if (pinned && !initial?.pinned && pinnedCount >= MAX_PINS) {
      onError(PIN_FULL_MSG + " This project will be saved without a pin — unpin one first.");
      return;
    }
    setBusy(true);
    try {
      const payload = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        category,
        desc: desc.trim(),
        built: built.trim(),
        chips: chips.split(",").map((c) => c.trim()).filter(Boolean),
        live: live.trim(),
        pinned,
        visible,
      };
      if (editing) {
        await api(`/api/admin/projects/${initial.slug}`, { method: "PUT", body: JSON.stringify(payload) });
      } else {
        payload.slug = slugify(title);
        await api("/api/admin/projects", { method: "POST", body: JSON.stringify(payload) });
      }
      onSaved(editing ? "Project updated." : "Project saved — it will appear on the Work page.");
    } catch (err) {
      onError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="adm-form" onSubmit={submit}>
      <div className="adm-field">
        <label>Title *</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. DukaanDost" required />
      </div>
      <div className="adm-field">
        <label>Monogram — auto</label>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="adm-mono">{(title || "?").charAt(0).toUpperCase()}</span>
          <span className="adm-sub">Generated from the first letter of the title</span>
        </div>
      </div>
      <div className="adm-field">
        <label>Subtitle *</label>
        <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="e.g. WhatsApp CRM for Shops" required />
      </div>
      <Dropdown label="Category" options={CATEGORY_OPTIONS} value={category} onChange={setCategory} />
      <div className="adm-field full">
        <label>Short description — shown on the card *</label>
        <textarea rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What was built, in one or two lines" required />
      </div>
      <div className="adm-field full">
        <label>Built / Case study — Work page</label>
        <textarea rows={3} value={built} onChange={(e) => setBuilt(e.target.value)} placeholder="How it was built and what it includes" />
      </div>
      <div className="adm-field">
        <label>Tech chips — separated by commas</label>
        <input value={chips} onChange={(e) => setChips(e.target.value)} placeholder="React, Node.js, MongoDB" />
      </div>
      <div className="adm-field">
        <label>Live link <span>(optional)</span></label>
        <input value={live} onChange={(e) => setLive(e.target.value)} placeholder="https://…" />
      </div>
      <Dropdown label="Pin to Home Top 4?" options={PIN_OPTIONS} value={pinned} onChange={setPinned} />
      <Dropdown label="Visible?" options={VISIBLE_OPTIONS} value={visible} onChange={setVisible} />
      <div className="adm-field full" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button type="submit" className="adm-btn adm-btn-gold" disabled={busy} style={{ padding: 13 }}>
          {busy ? "Saving…" : editing ? "Update project →" : "Save project →"}
        </button>
        {editing ? (
          <button type="button" className="adm-btn adm-btn-ghost" onClick={onCancel}>Cancel edit</button>
        ) : null}
      </div>
    </form>
  );
}

function TestimonialForm({ initial, onSaved, onCancel, onError, minOrder, maxOrder }) {
  const editing = Boolean(initial);
  const [quote, setQuote] = useState(initial?.quote || "");
  const [name, setName] = useState(initial?.name || "");
  const [role, setRole] = useState(initial?.role || "");
  const [visible, setVisible] = useState(initial?.visible !== false);
  const [position, setPosition] = useState("end");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!quote.trim() || !name.trim() || !role.trim()) {
      onError("Quote, Name and Role are required.");
      return;
    }
    setBusy(true);
    try {
      const payload = {
        quote: quote.trim(),
        name: name.trim(),
        role: role.trim(),
        visible,
      };
      if (editing) {
        payload.order = initial.order ?? 0;
        const id = initial.id || initial._id;
        await api(`/api/admin/testimonials/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      } else {
        // Order is numeric: "top" goes before the current first, "end" after the last.
        payload.order = position === "top" ? (minOrder ?? 0) - 1 : (maxOrder ?? -1) + 1;
        await api("/api/admin/testimonials", { method: "POST", body: JSON.stringify(payload) });
      }
      onSaved(editing ? "Testimonial updated." : "Testimonial saved — it will appear in the Home carousel.");
    } catch (err) {
      onError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="adm-form" onSubmit={submit}>
      <div className="adm-field full">
        <label>Quote *</label>
        <textarea rows={3} value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="What the client said — exact words" required />
      </div>
      <div className="adm-field">
        <label>Name *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahul Sharma" required />
      </div>
      <div className="adm-field">
        <label>Role / Company *</label>
        <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Founder, Sharma Store" required />
      </div>
      <Dropdown label="Visible?" options={VISIBLE_OPTIONS} value={visible} onChange={setVisible} />
      {!editing ? (
        <Dropdown
          label="Order"
          options={[
            { value: "end", label: "Add at the end" },
            { value: "top", label: "Add at the top — show first" },
          ]}
          value={position}
          onChange={setPosition}
        />
      ) : null}
      <div className="adm-field full" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button type="submit" className="adm-btn adm-btn-gold" disabled={busy} style={{ padding: 13 }}>
          {busy ? "Saving…" : editing ? "Update testimonial →" : "Save testimonial →"}
        </button>
        {editing ? (
          <button type="button" className="adm-btn adm-btn-ghost" onClick={onCancel}>Cancel edit</button>
        ) : null}
      </div>
    </form>
  );
}

/* --------------------------------- main app --------------------------------- */

export default function AdminApp() {
  const [tab, setTab] = useState("dash");
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [loggedOut, setLoggedOut] = useState(false);
  const [notice, setNotice] = useState(null); // { type: "ok" | "err", text }
  const [editingService, setEditingService] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [editingTesti, setEditingTesti] = useState(null);

  // Edit scrolls the form into view on all three tabs, so clicking Edit
  // always shows the form instead of leaving the user at the list.
  const formRef = useRef(null);
  useEffect(() => {
    if ((editingService || editingProject || editingTesti) && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editingService, editingProject, editingTesti]);

  // Work-style accordion state (mirrors /work: first row open, several can open).
  const [openSvc, setOpenSvc] = useState([0]);
  const [openProj, setOpenProj] = useState([0]);

  // Title swoosh on row click — same classes as components/WorkAccordion.js.
  function swooshRowEl(acc) {
    if (!acc) return;
    const title = acc.querySelector(".wk-title");
    if (title) {
      title.classList.remove("swoosh");
      void title.getBoundingClientRect();
      title.classList.add("swoosh");
      title.addEventListener("animationend", () => title.classList.remove("swoosh"), { once: true });
    }
    const clones = acc.querySelectorAll(".wk-clone");
    if (clones.length) {
      acc.classList.remove("swooshing");
      void acc.getBoundingClientRect();
      acc.classList.add("swooshing");
      const last = clones[clones.length - 1];
      last.addEventListener("animationend", () => acc.classList.remove("swooshing"), { once: true });
    }
  }
  function toggleAcc(setOpen, i, e) {
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
    swooshRowEl(e.currentTarget.closest(".wk-acc"));
  }

  const pinnedCount = useMemo(() => projects.filter((p) => p.pinned).length, [projects]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const [svc, proj, testi] = await Promise.all([
        api("/api/admin/services"),
        api("/api/admin/projects"),
        api("/api/admin/testimonials"),
      ]);
      setServices(asList(svc, "services"));
      setProjects(asList(proj, "projects"));
      setTestimonials(asList(testi, "testimonials"));
    } catch (err) {
      if (err.status === 401) {
        setLoggedOut(true);
      } else {
        setLoadError(err.message || "Could not load admin data.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  // showNotice(null) clears the notice. (Previously it set notice to
  // { type: null, text: undefined } — a truthy object that rendered an
  // empty pink bar with only a Dismiss button.)
  function showNotice(type, text) {
    if (type == null) {
      setNotice(null);
      return;
    }
    setNotice({ type, text });
  }

  // Toast auto-dismisses after 5 seconds — no Dismiss button needed.
  useEffect(() => {
    if (!notice && !loadError) return;
    const t = setTimeout(() => {
      setNotice(null);
      setLoadError("");
    }, 5000);
    return () => clearTimeout(t);
  }, [notice, loadError]);

  function handleSaved(text) {
    showNotice("ok", text);
    setEditingService(null);
    setEditingProject(null);
    setEditingTesti(null);
    loadAll();
  }

  async function toggleVisible(kind, item) {
    const next = item.visible === false ? true : false;
    const base = kind === "services" ? "/api/admin/services" : kind === "projects" ? "/api/admin/projects" : "/api/admin/testimonials";
    const key = kind === "testimonials" ? (item.id || item._id) : item.slug;
    try {
      const saved = await api(`${base}/${key}`, { method: "PUT", body: JSON.stringify({ visible: next }) });
      // Worker A gap (verified in app/api/admin/projects/[slug]/route.js):
      // projects have NO `visible` field server-side — the PUT silently
      // drops it. Say so instead of pretending the toggle worked.
      if (kind === "projects" && saved.visible !== next) {
        showNotice("err", "Projects have no visible flag yet — this toggle had no effect. To remove a project from Home, unpin it; it stays on the Work page.");
      }
      loadAll();
    } catch (err) {
      showNotice("err", err.message);
    }
  }

  async function togglePin(item) {
    if (!item.pinned && pinnedCount >= MAX_PINS) {
      showNotice("err", PIN_FULL_MSG);
      return;
    }
    try {
      await api(`/api/admin/projects/${item.slug}`, {
        method: "PUT",
        body: JSON.stringify({ pinned: !item.pinned }),
      });
      loadAll();
    } catch (err) {
      // Server enforces max 4 too — its 400 message is shown verbatim.
      showNotice("err", err.message);
    }
  }

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    } catch {
      /* cookie may already be gone — reload anyway */
    }
    window.location.reload();
  }

  if (loggedOut) {
    return (
      <div className="adm-wrap">
        <p className="adm-sub" style={{ textAlign: "center" }}>Your session expired. Sign in again.</p>
        <LoginForm />
      </div>
    );
  }

  const testiOrders = testimonials.map((t) => (typeof t.order === "number" ? t.order : 0));
  const minOrder = testiOrders.length ? Math.min(...testiOrders) : 0;
  const maxOrder = testiOrders.length ? Math.max(...testiOrders) : -1;

  return (
    <div className="adm-wrap">
      <header className="adm-hero">
        <div className="adm-eyebrow">ikigaicoding • Admin only</div>
        <h1>Admin Panel</h1>
        <p className="adm-hero-sub">manage content</p>
      </header>

      <div className="adm-topbar">
        <button type="button" className="adm-btn adm-btn-ghost" onClick={() => { setNotice(null); loadAll(); }}>↻ Refresh</button>
        <button type="button" className="adm-btn adm-btn-dark" onClick={logout}>Log out</button>
      </div>

      <div className="adm-tabs" role="tablist">
        <button type="button" className={`adm-tab${tab === "dash" ? " on" : ""}`} onClick={() => setTab("dash")}>Dashboard</button>
        <button type="button" className={`adm-tab${tab === "svc" ? " on" : ""}`} onClick={() => setTab("svc")}>Services <small>• {services.length}</small></button>
        <button type="button" className={`adm-tab${tab === "proj" ? " on" : ""}`} onClick={() => setTab("proj")}>Projects <small>• {projects.length}</small></button>
        <button type="button" className={`adm-tab${tab === "testi" ? " on" : ""}`} onClick={() => setTab("testi")}>Testimonials <small>• {testimonials.length}</small></button>
      </div>

      {(notice || loadError) ? (
        <div className="adm-toasts" aria-live="polite">
          {notice ? (
            <div className={`adm-msg ${notice.type === "ok" ? "ok" : "err"}`} role={notice.type === "ok" ? "status" : "alert"}>
              {notice.text}
            </div>
          ) : null}
          {loadError ? <div className="adm-msg err" role="alert">{loadError}</div> : null}
        </div>
      ) : null}
      {loading ? <p className="adm-sub">Loading…</p> : null}

      {tab === "dash" ? (
        <div className="adm-panel" key="dash">
          <div className="adm-stats">
            <div className="adm-stat"><b>{services.length}</b><span>Services live</span><i>Locked order • 1–{services.length || "–"}</i></div>
            <div className="adm-stat"><b>{projects.length}</b><span>Projects</span><i>{pinnedCount} pinned on Home</i></div>
            <div className="adm-stat"><b>{testimonials.length}</b><span>Testimonials</span><i>Client's feedback</i></div>
            <div className="adm-stat"><b>/admin</b><span>Hidden route</span><i>Not visible to the public</i></div>
          </div>
        </div>
      ) : null}

      {tab === "svc" ? (
        <div className="adm-panel" key="svc">
          <div className="adm-wk-list">
            {services.length === 0 && !loading ? <p className="adm-sub">No services yet — add one below.</p> : null}
            {services.map((s, i) => {
              const isOpen = openSvc.includes(i);
              const num = String(i + 1).padStart(2, "0");
              return (
                <div className={"wk-acc" + (isOpen ? " open" : "") + ((i + 1) % 2 === 0 ? " wk-even" : "")} key={s.slug || i}>
                  <div className="wk-sum">
                    <span className="wk-wm" aria-hidden="true">{num}</span>
                    <button className="wk-sum-main" type="button" aria-expanded={isOpen} onClick={(e) => toggleAcc(setOpenSvc, i, e)}>
                      <span className="wk-title">{s.title}</span>
                      <span className="wk-clone c1" aria-hidden="true">{s.title}</span>
                      <span className="wk-clone c2" aria-hidden="true">{s.title}</span>
                      <span className="wk-clone c3" aria-hidden="true">{s.title}</span>
                      <span className="wk-cat">icon: {s.icon || "—"}</span>
                      <span className="wk-chev" aria-hidden="true">▾</span>
                    </button>
                    <span className="wk-row-actions">
                      <button type="button" className="adm-btn adm-btn-gold" onClick={() => { setEditingService(s); showNotice(null); }}>Edit</button>
                      <button
                        type="button"
                        className={`adm-toggle${s.visible !== false ? " on" : ""}`}
                        aria-label={`${s.visible !== false ? "Hide" : "Show"} ${s.title}`}
                        title="Show / hide"
                        onClick={() => toggleVisible("services", s)}
                      />
                    </span>
                  </div>
                  <div className="wk-body">
                    <div className="wk-body-inner">
                      <p className="wk-sub">{s.short}</p>
                      {s.desc ? <p className="wk-desc">{s.desc}</p> : null}
                      {(s.points || []).length ? (
                        <div className="wk-chips">{s.points.map((pt) => <span key={pt} className="wk-chip">{pt}</span>)}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="adm-card" ref={formRef}>
            <h2>{editingService ? "Edit service" : "+ Add a service"}</h2>
            <p className="adm-sub">These fields appear on the public card. <b>Short</b> appears on the card; <b>Description + Points</b> on the service detail.</p>
            <ServiceForm
              key={editingService ? `edit-${editingService.slug}` : "add"}
              initial={editingService}
              index={editingService ? services.findIndex((s) => s.slug === editingService.slug) : 0}
              total={services.length}
              onSaved={handleSaved}
              onCancel={() => setEditingService(null)}
              onError={(m) => showNotice("err", m)}
            />
          </div>
        </div>
      ) : null}

      {tab === "proj" ? (
        <div className="adm-panel" key="proj">
          <div className="adm-wk-list">
            {projects.length === 0 && !loading ? <p className="adm-sub">No projects yet — add one below.</p> : null}
            {projects.map((p, i) => {
              const isOpen = openProj.includes(i);
              const num = String(i + 1).padStart(2, "0");
              return (
                <div className={"wk-acc" + (isOpen ? " open" : "") + ((i + 1) % 2 === 0 ? " wk-even" : "")} key={p.slug}>
                  <div className="wk-sum">
                    <span className="wk-wm" aria-hidden="true">{num}</span>
                    <button className="wk-sum-main" type="button" aria-expanded={isOpen} onClick={(e) => toggleAcc(setOpenProj, i, e)}>
                      <span className="wk-title">{p.title}</span>
                      <span className="wk-clone c1" aria-hidden="true">{p.title}</span>
                      <span className="wk-clone c2" aria-hidden="true">{p.title}</span>
                      <span className="wk-clone c3" aria-hidden="true">{p.title}</span>
                      <span className="wk-cat">{p.category || "—"}</span>
                      <span className="wk-chev" aria-hidden="true">▾</span>
                    </button>
                    <span className="wk-row-actions">
                      <button
                        type="button"
                        className={`adm-pin${p.pinned ? " on" : ""}`}
                        onClick={() => togglePin(p)}
                        title={p.pinned ? "Pinned on Home — click to unpin" : "Pin to Home"}
                        aria-label={p.pinned ? `Unpin ${p.title} from Home` : `Pin ${p.title} to Home`}
                      >
                        <PinIcon filled={p.pinned} />
                      </button>
                      <button type="button" className="adm-btn adm-btn-gold" onClick={() => { setEditingProject(p); showNotice(null); }}>Edit</button>
                      <button
                        type="button"
                        className={`adm-toggle${p.visible !== false ? " on" : ""}`}
                        aria-label={`${p.visible !== false ? "Hide" : "Show"} ${p.title}`}
                        title="Show / hide"
                        onClick={() => toggleVisible("projects", p)}
                      />
                    </span>
                  </div>
                  <div className="wk-body">
                    <div className="wk-body-inner">
                      <p className="wk-sub">{p.subtitle}</p>
                      <p className="wk-desc">{p.desc}</p>
                      {p.built ? (
                        <>
                          <h3 className="wk-built-h">What was built</h3>
                          <p className="wk-built">{p.built}</p>
                        </>
                      ) : null}
                      {(p.chips || []).length ? (
                        <div className="wk-chips">{p.chips.map((c) => <span key={c} className="wk-chip">{c}</span>)}</div>
                      ) : null}
                      {p.live ? (
                        <a className="wk-live" href={p.live} target="_blank" rel="noopener noreferrer">Visit live site →</a>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="adm-card" ref={formRef}>
            <h2>{editingProject ? "Edit project" : "+ Add a project"}</h2>
            <ProjectForm
              key={editingProject ? `edit-${editingProject.slug}` : "add"}
              initial={editingProject}
              pinnedCount={pinnedCount}
              onSaved={handleSaved}
              onCancel={() => setEditingProject(null)}
              onError={(m) => showNotice("err", m)}
            />
          </div>
        </div>
      ) : null}

      {tab === "testi" ? (
        <div className="adm-panel" key="testi">
          <div className="adm-card">
            <h2>Testimonials</h2>
            <div style={{ marginTop: 8 }}>
              {testimonials.length === 0 && !loading ? <p className="adm-sub">No testimonials yet — add one below.</p> : null}
              {testimonials.map((t, i) => (
                <div className="adm-row" key={t.id || t._id || i}>
                  <div className="adm-info">
                    <b>“{t.quote}”</b>
                    <p>{t.name} — {t.role}</p>
                  </div>
                  <button
                    type="button"
                    className={`adm-toggle${t.visible !== false ? " on" : ""}`}
                    aria-label={`${t.visible !== false ? "Hide" : "Show"} testimonial by ${t.name}`}
                    title="Show / hide"
                    onClick={() => toggleVisible("testimonials", t)}
                  />
                  <button type="button" className="adm-btn adm-btn-ghost" onClick={() => { setEditingTesti(t); showNotice(null); }}>Edit</button>
                </div>
              ))}
            </div>
          </div>
          <div className="adm-card" ref={formRef}>
            <h2>{editingTesti ? "Edit testimonial" : "+ Add a testimonial"}</h2>
            <TestimonialForm
              key={editingTesti ? `edit-${editingTesti.id || editingTesti._id}` : "add"}
              initial={editingTesti}
              minOrder={minOrder}
              maxOrder={maxOrder}
              onSaved={handleSaved}
              onCancel={() => setEditingTesti(null)}
              onError={(m) => showNotice("err", m)}
            />
          </div>
        </div>
      ) : null}

    </div>
  );
}

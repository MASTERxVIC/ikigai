"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
  { value: true, label: "Yes — public ko dikhe" },
  { value: false, label: "No — sirf draft, chhupa rahe" },
];
const CATEGORY_OPTIONS = [
  { value: "Full-Stack Platform", label: "Full-Stack Platform" },
  { value: "Web App", label: "Web App" },
  { value: "Motion Website", label: "Motion Website" },
  { value: "Client System · MERN", label: "Client System · MERN" },
  { value: "Website", label: "Website" },
];
const PIN_OPTIONS = [
  { value: true, label: "Yes — pin karo" },
  { value: false, label: "No — sirf Work page pe" },
];

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

function monogramOf(item) {
  if (item.monogram) return item.monogram;
  return (item.title || "?").charAt(0).toUpperCase();
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
      onError("Title aur Short dono zaroori hain.");
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
      onSaved(editing ? "Service updated." : "Service saved — card apne aap ban gaya.");
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
        <label>Short — card pe dikhega *</label>
        <input value={short} onChange={(e) => setShort(e.target.value)} placeholder="One line, card pe dikhega" required />
      </div>
      <div className="adm-field full">
        <label>Description — detail page pe</label>
        <textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="2–3 lines me kya milega" />
      </div>
      <div className="adm-field full">
        <label>Points — ek line me ek point</label>
        <textarea rows={3} value={points} onChange={(e) => setPoints(e.target.value)} placeholder={"Point 1\nPoint 2\nPoint 3"} />
      </div>
      <Dropdown label="Show on" options={SHOW_ON_OPTIONS} value={showOn} onChange={setShowOn} />
      <Dropdown label="Visible?" options={VISIBLE_OPTIONS} value={visible} onChange={setVisible} />
      <div className="adm-field full" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button type="submit" className="adm-btn adm-btn-gold" disabled={busy} style={{ padding: 13 }}>
          {busy ? "Saving…" : editing ? "Update service →" : "Save service → card apne aap ban jayega"}
        </button>
        {editing ? (
          <button type="button" className="adm-btn adm-btn-ghost" onClick={onCancel}>Cancel edit</button>
        ) : null}
      </div>
      {title.trim() || short.trim() ? (
        <div className="adm-preview" style={{ gridColumn: "1 / -1" }}>
          <h4>Live preview — aisa card banega</h4>
          <div className="adm-svc-preview">
            <span className="adm-ghost">{ghostNo}</span>
            <h3>{title.trim() || "Service title"}</h3>
            <p>{short.trim() || "Short line yahan dikhegi."}</p>
            <p style={{ marginTop: 14, fontWeight: 700, color: "var(--emerald-700)" }}>✓ Points wahi dikhenge jo upar likhe</p>
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
      onError("Title, Subtitle aur Short desc zaroori hain.");
      return;
    }
    // Client-side pin guard: the server also enforces max 4 (400 on the 5th).
    if (pinned && !initial?.pinned && pinnedCount >= MAX_PINS) {
      onError(PIN_FULL_MSG + " Ye project pin ke bina save hoga — pehle kisi ka pin hatao.");
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
      onSaved(editing ? "Project updated." : "Project saved — Work page pe aa jayega.");
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
          <span className="adm-sub">Title ke pehle letter se banega</span>
        </div>
      </div>
      <div className="adm-field">
        <label>Subtitle *</label>
        <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="e.g. WhatsApp CRM for Shops" required />
      </div>
      <Dropdown label="Category" options={CATEGORY_OPTIONS} value={category} onChange={setCategory} />
      <div className="adm-field full">
        <label>Short desc — card pe *</label>
        <textarea rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Ek-do line me kya banaya" required />
      </div>
      <div className="adm-field full">
        <label>Built / Case study — Work page pe</label>
        <textarea rows={3} value={built} onChange={(e) => setBuilt(e.target.value)} placeholder="Kaise banaya, kya-kya andar hai" />
      </div>
      <div className="adm-field">
        <label>Tech chips — comma se alag</label>
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
          {busy ? "Saving…" : editing ? "Update project →" : "Save project → Work page pe aa jayega"}
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
      onError("Quote, Name aur Role zaroori hain.");
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
      onSaved(editing ? "Testimonial updated." : "Testimonial saved — Home carousel me aa jayega.");
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
        <textarea rows={3} value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Client ne kya kaha — exact words" required />
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
            { value: "end", label: "End me add karo" },
            { value: "top", label: "Upar — pehle dikhao" },
          ]}
          value={position}
          onChange={setPosition}
        />
      ) : null}
      <div className="adm-field full" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button type="submit" className="adm-btn adm-btn-gold" disabled={busy} style={{ padding: 13 }}>
          {busy ? "Saving…" : editing ? "Update testimonial →" : "Save testimonial → Home carousel me aa jayega"}
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

  const pinnedCount = useMemo(() => projects.filter((p) => p.pinned).length, [projects]);
  const pinnedProjects = useMemo(() => projects.filter((p) => p.pinned), [projects]);

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

  function showNotice(type, text) {
    setNotice({ type, text });
  }
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
        showNotice("err", "Projects have no visible flag on the server yet — this toggle had no effect. Hide a project by unpinning it (it stays on the Work page) or ask Worker A to add a visible field.");
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
        <div className="adm-eyebrow">ikigaicoding • Daruma Hall • Staff only</div>
        <h1>Admin Panel <em>— manage content</em></h1>
        <p>Services, Projects aur Testimonials — bina code chhede, bina responsiveness bigaade. Naya item add karo, card apne aap banega aur jahan zaroorat hai wahan dikhega.</p>
        <div className="adm-pills">
          <span className="adm-pill dark">/admin — direct URL only</span>
          <span className="adm-pill">No navbar link</span>
          <span className="adm-pill">noindex • nofollow</span>
          <span className="adm-pill">Owner only</span>
          <span className="adm-pill">No project image — monogram only</span>
        </div>
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

      {notice ? (
        <div className={`adm-msg ${notice.type === "ok" ? "ok" : "err"}`} role={notice.type === "ok" ? "status" : "alert"}>
          {notice.text}
          <button type="button" className="adm-linklike" style={{ float: "right" }} onClick={() => setNotice(null)}>Dismiss</button>
        </div>
      ) : null}
      {loadError ? <div className="adm-msg err" role="alert">{loadError}</div> : null}
      {loading ? <p className="adm-sub">Loading…</p> : null}

      {tab === "dash" ? (
        <div className="adm-panel" key="dash">
          <div className="adm-stats">
            <div className="adm-stat"><b>{services.length}</b><span>Services live</span><i>Locked order • 1–{services.length || "–"}</i></div>
            <div className="adm-stat"><b>{projects.length}</b><span>Projects</span><i>{pinnedCount} pinned on Home</i></div>
            <div className="adm-stat"><b>{testimonials.length}</b><span>Testimonials</span><i>Placeholder — real wale aane hain</i></div>
            <div className="adm-stat"><b>/admin</b><span>Hidden route</span><i>Public ko nahi dikhta</i></div>
          </div>
          <div className="adm-card">
            <h2>Home pe kya dikhega — Top 4 pinned projects</h2>
            <p className="adm-sub">Admin jis project ko pin karega, wahi Home ke “Selected work” me aayega. Baaki sab Work page pe latest order me.</p>
            <div style={{ marginTop: 12 }}>
              {pinnedProjects.length
                ? pinnedProjects.map((p) => <span key={p.slug} className="adm-chip pin">📌 {p.title}</span>)
                : <p className="adm-sub">Koi pin nahi — Home pe Selected work khaali dikhega.</p>}
            </div>
            <div className="adm-note"><b>Rule:</b> Zyada se zyada <b>4 pin</b> ho sakte hain. 5th ko pin karoge to error milega — pehle kisi ek ka pin hatao.</div>
          </div>
          <div className="adm-card">
            <h2>Kaise kaam karega?</h2>
            <p className="adm-sub" style={{ marginTop: 8 }}>
              1 &nbsp; <b>Service add karo</b> → card apne aap banega, Home + Services page pe dikhega.<br />
              2 &nbsp; <b>Project add karo</b> → Work page pe aa jayega. Pin karo to Home Top 4 me aa jayega.<br />
              3 &nbsp; <b>Testimonial add karo</b> → Home carousel me aa jayega.<br />
              4 &nbsp; <b>Hide karo</b> → delete nahi, sirf public se chhup jayega. Wapas show kar sakte ho.
            </p>
            <div className="adm-note">Design, font, colour, spacing — kuch nahi badlega. Sirf content DB se aayega, isiliye responsiveness nahi bigdegi.</div>
          </div>
        </div>
      ) : null}

      {tab === "svc" ? (
        <div className="adm-panel" key="svc">
          <div className="adm-card">
            <h2>Services — {services.length}, locked order</h2>
            <p className="adm-sub">Order upar-neeche karke badal sakte ho. Nayi service add karoge to woh list ke end me aayegi, phir order set kar dena. Card ka design wahi rahega — ghost number, gold border on hover.</p>
            <div style={{ marginTop: 8 }}>
              {services.length === 0 && !loading ? <p className="adm-sub">No services yet — add one below.</p> : null}
              {services.map((s, i) => (
                <div className="adm-row" key={s.slug || i}>
                  <span className="adm-num">{i + 1}</span>
                  <div className="adm-info">
                    <b>{s.title}</b>
                    <p>{s.short} • icon: {s.icon || "—"}{s.showOn === "services" ? " • Services page only" : ""}</p>
                  </div>
                  <button
                    type="button"
                    className={`adm-toggle${s.visible !== false ? " on" : ""}`}
                    aria-label={`${s.visible !== false ? "Hide" : "Show"} ${s.title}`}
                    title="Show / hide"
                    onClick={() => toggleVisible("services", s)}
                  />
                  <button type="button" className="adm-btn adm-btn-ghost" onClick={() => { setEditingService(s); showNotice(null); }}>Edit</button>
                </div>
              ))}
            </div>
          </div>
          <div className="adm-card">
            <h2>{editingService ? "Edit service" : "+ Add a service"}</h2>
            <p className="adm-sub">Yehi fields public card pe dikhenge. <b>Short</b> card pe, <b>Description + Points</b> Services detail pe.</p>
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
          <div className="adm-card">
            <h2>Projects — pin Top 4 for Home</h2>
            <p className="adm-sub">Home pe sirf pinned 4 dikhte hain. Baaki Work page pe latest order me. Pin dabao — count upar Dashboard pe bhi badlega.</p>
            <div className="adm-note" style={{ marginTop: 10 }}>
              <b>No image field — jaan-bujh ke nahi hai.</b> Site me project ki photo hoti hi nahi; card pe monogram letter (W / C / S / E) dikhta hai. Naye project ka monogram title ke pehle letter se apne aap banega.
            </div>
            <div style={{ marginTop: 8 }}>
              {projects.length === 0 && !loading ? <p className="adm-sub">No projects yet — add one below.</p> : null}
              {projects.map((p) => (
                <div className="adm-row" key={p.slug}>
                  <span className="adm-mono">{monogramOf(p)}</span>
                  <div className="adm-info">
                    <b>{p.title}</b>
                    <p>{p.subtitle} • {p.category || "—"}</p>
                    {(p.chips || []).length ? (
                      <div className="adm-chips">{p.chips.map((c) => <span key={c} className="adm-chip">{c}</span>)}</div>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    className={`adm-pin${p.pinned ? " on" : ""}`}
                    onClick={() => togglePin(p)}
                  >
                    {p.pinned ? "📌 Pinned — Home Top 4" : "Pin to Home"}
                  </button>
                  <button
                    type="button"
                    className={`adm-toggle${p.visible !== false ? " on" : ""}`}
                    aria-label={`${p.visible !== false ? "Hide" : "Show"} ${p.title}`}
                    title="Show / hide"
                    onClick={() => toggleVisible("projects", p)}
                  />
                  <button type="button" className="adm-btn adm-btn-ghost" onClick={() => { setEditingProject(p); showNotice(null); }}>Edit</button>
                </div>
              ))}
            </div>
          </div>
          <div className="adm-card">
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
            <p className="adm-sub">Abhi 3 placeholder hain. Real client words aate hi inhe replace kar dena — add karo, purane ko hide karo.</p>
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
          <div className="adm-card">
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

      <p className="adm-foot">Daruma Hall theme (emerald #0b2e21 • gold #c9a86a • cream #f7f2e5) • Mobile pe sab stack ho jayega, koi fixed width nahi.</p>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom dropdown — replaces the native <select> everywhere in admin.
 * 12px radius, 180ms ease open/close (opacity + transform), chevron
 * rotates 180deg when open, closes on outside click / Escape, check mark
 * on the selected item. No native <select> is rendered.
 *
 * Props: options [{ value, label }], value, onChange(value), label (optional
 * field label rendered above the button), placeholder.
 */
export default function Dropdown({ options = [], value, onChange, label, placeholder = "Select…" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((o) => String(o.value) === String(value));

  useEffect(() => {
    if (!open) return;
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  return (
    <div className="adm-field">
      {label ? <label>{label}</label> : null}
      <div className={`adm-dd${open ? " open" : ""}`} ref={ref}>
        <button
          type="button"
          className="adm-dd-btn"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
        >
          <span>{selected ? selected.label : placeholder}</span>
          <span className="adm-dd-chev" aria-hidden="true">▾</span>
        </button>
        <div className="adm-dd-list" role="listbox">
          {options.map((opt) => (
            <div
              key={String(opt.value)}
              role="option"
              aria-selected={String(opt.value) === String(value)}
              className={`adm-dd-item${String(opt.value) === String(value) ? " sel" : ""}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

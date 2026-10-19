// Original stroke icons — 24x24, stroke-based, no emoji.
function base(props) {
  return {
    width: 24, height: 24, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round",
    ...props,
  };
}
export const IconSoftware = (p) => (<svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M7 9.5l2.8 2.8L7 15.1M12.2 15.3H17" /><path d="M3 7.5h18" opacity="0.45" /></svg>);
export const IconWeb = (p) => (<svg {...base(p)}><rect x="3" y="4.5" width="18" height="15" rx="2.5" /><path d="M3 9h18" /><path d="M6.2 6.7h.01M9 6.7h.01" strokeWidth="2.6" /><path d="M10.2 12.2l-1.7 1.7 1.7 1.7M13.8 12.2l1.7 1.7-1.7 1.7M12.8 11.5l-1.6 4.8" /></svg>);
export const IconCart = (p) => (<svg {...base(p)}><path d="M3.5 5h2.2l2.1 10.4a1.2 1.2 0 0 0 1.2 1h7.9a1.2 1.2 0 0 0 1.2-1L19.5 8.5H6.2" /><path d="M9.5 11.5h7" opacity="0.5" /><circle cx="10" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" /></svg>);
export const IconSeo = (p) => (<svg {...base(p)}><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.3 15.3L20.5 20.5" /><path d="M7.5 12.5l2-3.2 2 2 3-4.2" /><path d="M12.8 7.3h2.4v2.4" opacity="0.7" /></svg>);
export const IconGeo = (p) => (<svg {...base(p)}><circle cx="11" cy="13" r="7.5" /><path d="M3.5 13h15M11 5.5c2.8 2.6 2.8 12.4 0 15-2.8-2.6-2.8-12.4 0-15z" /><path d="M18.5 3.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" /></svg>);
export const IconAeo = (p) => (<svg {...base(p)}><path d="M20.5 11.5a7.5 7.5 0 0 1-7.5 7.5H4.5l1.8-2.8a7.5 7.5 0 1 1 14.2-4.7z" /><path d="M9 11.5l2.2 2.2 4-4.2" /></svg>);
export const IconLanding = (p) => (<svg {...base(p)}><path d="M5.5 3.5l13 8.5-7.2 1.2-2.8 6.8z" /><path d="M13 12.5l4.5 4.5" /><path d="M19 3.5v3M20.5 5h-3M4.5 19.5v.01" strokeWidth="2.4" /></svg>);
export const IconWrench = (p) => (<svg {...base(p)}><path d="M14.5 6.5a4.2 4.2 0 0 0-5.6 5.6L4 17l3 3 4.9-4.9a4.2 4.2 0 0 0 5.6-5.6l-2.8 2.8-2.4-2.4z" /><path d="M4 21l1.5-1.5" opacity="0.5" /></svg>);
export const IconArrow = (p) => (<svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const IconCheck = (p) => (<svg {...base(p)}><path d="M4 12.5l5 5L20 6.5" /></svg>);
export const IconWhatsApp = (p) => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.6.8-.4 1.1.7 1.2 1.6 2 2.8 2.6.3.2.5.1.7-.1l.8-.9c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.4 0 .1 0 .4-.4 1.4z" /></svg>);
export const IconMail = (p) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>);
export const IconPin = (p) => (<svg {...base(p)}><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>);

export const SERVICE_ICONS = {
  software: IconSoftware, web: IconWeb, cart: IconCart, seo: IconSeo,
  geo: IconGeo, aeo: IconAeo, landing: IconLanding, wrench: IconWrench,
};

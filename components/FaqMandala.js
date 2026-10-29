"use client";
import { useEffect, useRef } from "react";
// B1 Lotus mandala (same design as the What we do section art) — used as a
// half-visible spinning decoration on the FAQ section edges. It starts its
// own section spinning when scrolled into view, so it works on any page
// (Home FAQ, Services FAQ, Contact form section) without extra wiring.
export default function FaqMandala() {
  const ref = useRef(null);
  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          section.classList.add("spinning");
          io.disconnect();
        }
      });
    }, { threshold: 0.25 });
    io.observe(section);
    return () => io.disconnect();
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 420 420" aria-hidden="true">
      <g fill="none" stroke="#a8824a">
      <circle cx="410.0" cy="210.0" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="408.3" cy="236.1" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="403.2" cy="261.8" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="394.8" cy="286.5" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="383.2" cy="310.0" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="368.7" cy="331.8" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="351.4" cy="351.4" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="331.8" cy="368.7" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="310.0" cy="383.2" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="286.5" cy="394.8" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="261.8" cy="403.2" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="236.1" cy="408.3" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="210.0" cy="410.0" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="183.9" cy="408.3" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="158.2" cy="403.2" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="133.5" cy="394.8" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="110.0" cy="383.2" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="88.2" cy="368.7" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="68.6" cy="351.4" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="51.3" cy="331.8" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="36.8" cy="310.0" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="25.2" cy="286.5" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="16.8" cy="261.8" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="11.7" cy="236.1" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="10.0" cy="210.0" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="11.7" cy="183.9" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="16.8" cy="158.2" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="25.2" cy="133.5" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="36.8" cy="110.0" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="51.3" cy="88.2" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="68.6" cy="68.6" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="88.2" cy="51.3" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="110.0" cy="36.8" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="133.5" cy="25.2" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="158.2" cy="16.8" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="183.9" cy="11.7" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="210.0" cy="10.0" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="236.1" cy="11.7" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="261.8" cy="16.8" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="286.5" cy="25.2" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="310.0" cy="36.8" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="331.8" cy="51.3" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="351.4" cy="68.6" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="368.7" cy="88.2" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="383.2" cy="110.0" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="394.8" cy="133.5" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="403.2" cy="158.2" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="408.3" cy="183.9" r="2.4" fill="#a8824a" stroke="none" />
      <circle cx="210" cy="210" r="192" strokeWidth="1.3" />
      <circle cx="210" cy="210" r="184" strokeWidth="0.7" />
      <circle cx="382.0" cy="210.0" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="379.4" cy="239.9" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="371.6" cy="268.8" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="359.0" cy="296.0" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="341.8" cy="320.6" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="320.6" cy="341.8" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="296.0" cy="359.0" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="268.8" cy="371.6" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="239.9" cy="379.4" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="210.0" cy="382.0" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="180.1" cy="379.4" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="151.2" cy="371.6" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="124.0" cy="359.0" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="99.4" cy="341.8" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="78.2" cy="320.6" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="61.0" cy="296.0" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="48.4" cy="268.8" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="40.6" cy="239.9" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="38.0" cy="210.0" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="40.6" cy="180.1" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="48.4" cy="151.2" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="61.0" cy="124.0" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="78.2" cy="99.4" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="99.4" cy="78.2" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="124.0" cy="61.0" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="151.2" cy="48.4" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="180.1" cy="40.6" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="210.0" cy="38.0" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="239.9" cy="40.6" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="268.8" cy="48.4" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="296.0" cy="61.0" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="320.6" cy="78.2" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="341.8" cy="99.4" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="359.0" cy="124.0" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="371.6" cy="151.2" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <circle cx="379.4" cy="180.1" r="8.5" fill="none" stroke="#a8824a" strokeWidth="0.9" />
      <g transform="rotate(0 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(15 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(30 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(45 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(60 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(75 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(90 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(105 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(120 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(135 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(150 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(165 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(180 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(195 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(210 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(225 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(240 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(255 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(270 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(285 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(300 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(315 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(330 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <g transform="rotate(345 210 210)">
        <path d="M 210 48 Q 225 82 210 104 Q 195 82 210 48 Z" strokeWidth="1.05" />
        <line x1="210" y1="54" x2="210" y2="98" strokeWidth="0.6" />
      </g>
      <circle cx="308.0" cy="210.0" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="306.8" cy="225.3" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="303.2" cy="240.3" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="297.3" cy="254.5" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="289.3" cy="267.6" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="279.3" cy="279.3" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="267.6" cy="289.3" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="254.5" cy="297.3" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="240.3" cy="303.2" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="225.3" cy="306.8" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="210.0" cy="308.0" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="194.7" cy="306.8" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="179.7" cy="303.2" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="165.5" cy="297.3" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="152.4" cy="289.3" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="140.7" cy="279.3" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="130.7" cy="267.6" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="122.7" cy="254.5" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="116.8" cy="240.3" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="113.2" cy="225.3" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="112.0" cy="210.0" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="113.2" cy="194.7" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="116.8" cy="179.7" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="122.7" cy="165.5" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="130.7" cy="152.4" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="140.7" cy="140.7" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="152.4" cy="130.7" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="165.5" cy="122.7" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="179.7" cy="116.8" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="194.7" cy="113.2" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="210.0" cy="112.0" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="225.3" cy="113.2" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="240.3" cy="116.8" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="254.5" cy="122.7" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="267.6" cy="130.7" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="279.3" cy="140.7" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="289.3" cy="152.4" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="297.3" cy="165.5" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="303.2" cy="179.7" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="306.8" cy="194.7" r="1.7" fill="#a8824a" stroke="none" />
      <circle cx="210" cy="210" r="90" strokeWidth="1.1" />
      <path d="M 210 124 C 236 152 230 176 210 182 C 190 176 184 152 210 124 Z" strokeWidth="1.15" transform="rotate(0 210 210)" />
      <path d="M 210 124 C 236 152 230 176 210 182 C 190 176 184 152 210 124 Z" strokeWidth="1.15" transform="rotate(45 210 210)" />
      <path d="M 210 124 C 236 152 230 176 210 182 C 190 176 184 152 210 124 Z" strokeWidth="1.15" transform="rotate(90 210 210)" />
      <path d="M 210 124 C 236 152 230 176 210 182 C 190 176 184 152 210 124 Z" strokeWidth="1.15" transform="rotate(135 210 210)" />
      <path d="M 210 124 C 236 152 230 176 210 182 C 190 176 184 152 210 124 Z" strokeWidth="1.15" transform="rotate(180 210 210)" />
      <path d="M 210 124 C 236 152 230 176 210 182 C 190 176 184 152 210 124 Z" strokeWidth="1.15" transform="rotate(225 210 210)" />
      <path d="M 210 124 C 236 152 230 176 210 182 C 190 176 184 152 210 124 Z" strokeWidth="1.15" transform="rotate(270 210 210)" />
      <path d="M 210 124 C 236 152 230 176 210 182 C 190 176 184 152 210 124 Z" strokeWidth="1.15" transform="rotate(315 210 210)" />
      <circle cx="210" cy="210" r="24" strokeWidth="1.1" />
      <circle cx="210" cy="210" r="13" strokeWidth="0.8" />
      <circle cx="210" cy="210" r="5.5" fill="#a8824a" stroke="none" />
      </g>
    </svg>
  );
}

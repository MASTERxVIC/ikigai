// Original Daruma line-art — rounded body, flat bottom, hachimaki, {} eyes, smile, stripes.
export default function Daruma({ size = 120, body = "#f7f2e5", line = "#0b2e21", band = "#c9a86a", className = "" }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 200 220" fill="none" className={className} role="img" aria-label="ikigaicoding Daruma mascot">
      {/* body */}
      <path d="M42 204 L42 112 Q42 42 100 42 Q158 42 158 112 L158 204 Z" fill={body} stroke={line} strokeWidth="7" />
      {/* stripes */}
      <path d="M72 120 L72 196 M100 118 L100 198 M128 120 L128 196" stroke={line} strokeWidth="4" opacity="0.35" strokeLinecap="round" />
      {/* flat bottom shadow */}
      <path d="M42 204 L158 204" stroke={line} strokeWidth="9" strokeLinecap="round" />
      {/* hachimaki band */}
      <path d="M38 66 Q100 52 162 66 L162 88 Q100 74 38 88 Z" fill={band} stroke={line} strokeWidth="5" />
      {/* knot + tails */}
      <circle cx="164" cy="76" r="9" fill={band} stroke={line} strokeWidth="5" />
      <path d="M170 82 Q186 96 182 116 M172 84 Q192 92 196 110" stroke={line} strokeWidth="5" strokeLinecap="round" />
      {/* {} eyes */}
      <text x="100" y="138" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="44" fill={line}>&#123;&#125;</text>
      {/* smile */}
      <path d="M78 162 Q100 178 122 162" stroke={line} strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* blush */}
      <circle cx="66" cy="152" r="7" fill="#c9a86a" opacity="0.7" />
      <circle cx="134" cy="152" r="7" fill="#c9a86a" opacity="0.7" />
    </svg>
  );
}

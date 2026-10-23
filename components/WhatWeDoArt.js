// Background art for the Home "What we do" section — Concept B (India × Japan fusion):
// golden Lotus mandala behind the heading, seigaiha wave band along the bottom,
// paisley motifs at the sides. Kept faint so the service cards stay readable.
const GOLD = "#a8824a";
const EMERALD = "#155a3e";
const CX = 210;
const CY = 210;

function dotRing(n, r, rad, color) {
  return Array.from({ length: n }, (_, i) => {
    const a = ((i * 360) / n) * (Math.PI / 180);
    return (
      <circle
        key={i}
        cx={(CX + r * Math.cos(a)).toFixed(1)}
        cy={(CY + r * Math.sin(a)).toFixed(1)}
        r={rad}
        fill={color}
        stroke="none"
      />
    );
  });
}

function beadRing(n, r, rad, color) {
  return Array.from({ length: n }, (_, i) => {
    const a = ((i * 360) / n) * (Math.PI / 180);
    return (
      <circle
        key={i}
        cx={(CX + r * Math.cos(a)).toFixed(1)}
        cy={(CY + r * Math.sin(a)).toFixed(1)}
        r={rad}
        fill="none"
        stroke={color}
        strokeWidth={0.9}
      />
    );
  });
}

function LotusMandala({ id, color = GOLD }) {
  const petals = Array.from({ length: 24 }, (_, i) => (
    <g key={i} transform={`rotate(${i * 15} ${CX} ${CY})`}>
      <path
        d={`M ${CX} ${CY - 162} Q ${CX + 15} ${CY - 128} ${CX} ${CY - 106} Q ${CX - 15} ${CY - 128} ${CX} ${CY - 162} Z`}
        strokeWidth={1.05}
      />
      <line x1={CX} y1={CY - 156} x2={CX} y2={CY - 112} strokeWidth={0.6} />
    </g>
  ));
  const lotus = Array.from({ length: 8 }, (_, i) => (
    <path
      key={i}
      d={`M ${CX} ${CY - 86} C ${CX + 26} ${CY - 58} ${CX + 20} ${CY - 34} ${CX} ${CY - 28} C ${CX - 20} ${CY - 34} ${CX - 26} ${CY - 58} ${CX} ${CY - 86} Z`}
      strokeWidth={1.15}
      transform={`rotate(${i * 45} ${CX} ${CY})`}
    />
  ));
  return (
    <g id={id} fill="none" stroke={color}>
      {dotRing(48, 200, 2.4, color)}
      <circle cx={CX} cy={CY} r={192} strokeWidth={1.3} />
      <circle cx={CX} cy={CY} r={184} strokeWidth={0.7} />
      {beadRing(36, 172, 8.5, color)}
      {petals}
      {dotRing(40, 98, 1.7, color)}
      <circle cx={CX} cy={CY} r={90} strokeWidth={1.1} />
      {lotus}
      <circle cx={CX} cy={CY} r={24} strokeWidth={1.1} />
      <circle cx={CX} cy={CY} r={13} strokeWidth={0.8} />
      <circle cx={CX} cy={CY} r={5.5} fill={color} stroke="none" />
    </g>
  );
}

function Paisley({ id, color = EMERALD }) {
  return (
    <g id={id} fill="none" stroke={color} strokeWidth={1.6}>
      <path d="M0 -34 C 20 -18 26 6 14 22 C 4 35 -16 34 -22 20 C -27 8 -18 -2 -10 0 C -3 2 -2 10 -7 13" />
      <circle cx={-4} cy={4} r={3.4} fill={color} stroke="none" />
      <circle cx={0} cy={-16} r={1.8} fill={color} stroke="none" />
    </g>
  );
}

function Seigaiha({ y0 = -28, h = 240, color = GOLD, r = 56 }) {
  const arcs = [];
  let row = 0;
  for (let cy = y0 + r; cy < y0 + h + r; cy += r / 2, row++) {
    const off = row % 2 ? r / 2 : 0;
    for (let cx = -r + off; cx < 1180 + r; cx += r) {
      for (const [rr, sw] of [[r, 1.7], [Math.round(r * 0.66), 1.3], [Math.round(r * 0.33), 1.0]]) {
        arcs.push(
          <path
            key={`${cx}-${cy}-${rr}`}
            d={`M ${cx - rr} ${cy} A ${rr} ${rr} 0 0 1 ${cx + rr} ${cy}`}
            fill="none"
            stroke={color}
            strokeWidth={sw}
          />
        );
      }
    }
  }
  return <g opacity={0.1}>{arcs}</g>;
}

export default function WhatWeDoArt() {
  return (
    <>
      <svg
        className="bg-art bg-art-top"
        viewBox="0 0 1180 520"
        preserveAspectRatio="xMidYMin slice"
        aria-hidden="true"
      >
        <defs>
          <LotusMandala id="wwd-lotus" />
          <Paisley id="wwd-paisley" />
        </defs>
        <use href="#wwd-lotus" transform="translate(380,-200)" opacity={0.16} />
        <use href="#wwd-paisley" transform="translate(70,300) rotate(-18) scale(1.15)" opacity={0.14} />
        <use href="#wwd-paisley" transform="translate(1115,190) rotate(24) scale(0.9)" opacity={0.12} />
      </svg>
      <svg
        className="bg-art bg-art-bottom"
        viewBox="0 0 1180 190"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <Seigaiha />
        <use href="#wwd-lotus" transform="translate(1000,40) scale(0.55)" opacity={0.09} />
        <use href="#wwd-paisley" transform="translate(90,120) rotate(12) scale(0.8)" opacity={0.1} />
      </svg>
    </>
  );
}

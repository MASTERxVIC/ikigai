// Pine + crane line-art motifs from the reference design, used as decoration
// inside the Selected work card header bands. Stroke follows currentColor,
// so the wrapping <g> sets the colour via its `color` attribute.
export function Pine() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M129 95 C 98 89, 68 75, 46 51 C 34 38, 26 25, 22 9" />
      <path d="M102 85 L86 77 M102 85 L90 71 M102 85 L102 69 M102 85 L114 73 M102 85 L118 83" />
      <path d="M76 67 L60 61 M76 67 L64 51 M76 67 L76 49 M76 67 L88 55" />
      <path d="M52 47 L38 39 M52 47 L42 31 M52 47 L54 29 M52 47 L64 37" />
      <path d="M30 21 L18 13 M30 21 L22 5 M30 21 L34 5 M30 21 L42 13" />
    </g>
  );
}

export function Crane() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round">
      <path d="M42.4 7.1L46.4 6.1" />
      <circle cx="41.9" cy="6.7" r="1.15" fill="currentColor" stroke="none" />
      <path d="M41.6 7.4C37.8 9 33.8 10.2 29.6 11.2" />
      <path d="M29.6 11.2C23.3 9.7 15.6 10.1 9.6 12.4" />
      <path d="M9.6 12.4C15.6 15.4 23.2 16.2 29 13.2" />
      <path d="M23.6 10.4C22 5.4 18.4 2.5 12.8 1.3" />
      <path d="M10 13.4L2.6 16.6" />
      <path d="M11.2 14.8L4.4 18.6" />
    </g>
  );
}

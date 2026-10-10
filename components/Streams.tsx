// Decorative light ribbons that sweep in from the right and bend around a bright tip,
// like the glowing streams behind a product dashboard. Deterministic (no randomness) so SSR matches.

const N = 38;

function lines() {
  const out: { d: string; w: number; o: number; delay: number; len: number }[] = [];
  for (let i = 0; i < N; i++) {
    const t = (i - (N - 1) / 2) / ((N - 1) / 2); // -1..1
    const a = Math.abs(t);
    const tipX = 470 - (1 - a) * 70;
    const tipY = 430 + t * 26;
    const d =
      `M1560,${-90 + t * 190} ` +
      `C1060,${40 + t * 150} 640,${236 + t * 54} ${tipX},${tipY} ` +
      `C640,${626 - t * 54} 1060,${820 - t * 150} 1560,${950 - t * 190}`;
    const pseudo = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    out.push({
      d,
      w: 0.55 + (1 - a) * 1.25,
      o: 0.22 + (1 - a) * 0.6,
      delay: Math.abs(pseudo) * -9,
      len: 160 + Math.abs(pseudo) * 220,
    });
  }
  return out;
}

export function Streams() {
  const ls = lines();
  return (
    <div className="streams" aria-hidden="true">
      <svg viewBox="0 0 1400 860" preserveAspectRatio="xMaxYMid slice">
        <defs>
          <linearGradient id="sg" gradientUnits="userSpaceOnUse" x1="1500" y1="0" x2="440" y2="0">
            <stop offset="0" stopColor="#ff7a1a" stopOpacity="0" />
            <stop offset="0.55" stopColor="#ff8a2b" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffe0b8" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="tip" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fff1dc" stopOpacity="0.95" />
            <stop offset="0.25" stopColor="#ff9a3c" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ff6a00" stopOpacity="0" />
          </radialGradient>
          <filter id="soft"><feGaussianBlur stdDeviation="2.2" /></filter>
        </defs>

        <circle cx="470" cy="430" r="190" fill="url(#tip)" />

        <g filter="url(#soft)" opacity="0.55">
          {ls.map((l, i) => (
            <path key={`g${i}`} d={l.d} fill="none" stroke="url(#sg)" strokeWidth={l.w * 2.4} strokeOpacity={l.o * 0.5} />
          ))}
        </g>
        <g>
          {ls.map((l, i) => (
            <path key={`b${i}`} d={l.d} fill="none" stroke="url(#sg)" strokeWidth={l.w} strokeOpacity={l.o * 0.55} />
          ))}
          {ls.map((l, i) => (
            <path
              key={`h${i}`}
              d={l.d}
              fill="none"
              stroke="#fff0d9"
              strokeWidth={l.w * 0.9}
              strokeLinecap="round"
              strokeOpacity={Math.min(1, l.o + 0.2)}
              pathLength={1000}
              className="stream-hi"
              style={{ strokeDasharray: `${l.len} ${2400}`, animationDelay: `${l.delay}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

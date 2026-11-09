import { forwardRef } from "react";

export const HERO_NODE_POSITIONS = [
  { x: 14, y: 22 },
  { x: 78, y: 12 },
  { x: 92, y: 54 },
  { x: 76, y: 88 },
  { x: 18, y: 80 },
] as const;

export const HERO_CORE_POSITION = { x: 50, y: 50 } as const;

/**
 * Pure presentational layer — the hardware core, the five data-trace edges
 * running out to each service-category node, and a pulse dot per edge for
 * the MotionPath travel animation. Deliberately has no animation logic of
 * its own: Hero.tsx forwards refs into this markup and drives every part
 * of it from one coordinated master timeline. Coordinates are plain 0–100
 * units so they line up exactly with the percentage-positioned icon
 * overlays Hero.tsx renders on top.
 */
const HeroScene = forwardRef<SVGSVGElement>(function HeroScene(_props, ref) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-edge-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f63e0" />
          <stop offset="100%" stopColor="#37e6c4" />
        </linearGradient>
        <radialGradient id="hero-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2f63e0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2f63e0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle
        data-core-glow
        cx={HERO_CORE_POSITION.x}
        cy={HERO_CORE_POSITION.y}
        r="18"
        fill="url(#hero-core-glow)"
      />

      {HERO_NODE_POSITIONS.map((node, index) => (
        <path
          key={`edge-${index}`}
          data-edge
          d={`M ${HERO_CORE_POSITION.x} ${HERO_CORE_POSITION.y} Q ${
            (HERO_CORE_POSITION.x + node.x) / 2 + (index % 2 === 0 ? 6 : -6)
          } ${(HERO_CORE_POSITION.y + node.y) / 2}, ${node.x} ${node.y}`}
          fill="none"
          stroke="url(#hero-edge-gradient)"
          strokeWidth="0.35"
          strokeLinecap="round"
          opacity="0.75"
        />
      ))}

      {/* Hardware core — three stacked blade units reading as a compact server stack. */}
      <g data-blade="2" opacity="0.6">
        <rect x="35" y="38" width="26" height="6.5" rx="1.2" fill="#111a2e" stroke="#1f2a44" strokeWidth="0.3" />
        <rect x="36.5" y="40" width="3" height="2.5" rx="0.4" fill="#2f63e0" />
      </g>
      <g data-blade="1" opacity="0.8">
        <rect x="37" y="46" width="24" height="6.5" rx="1.2" fill="#131c33" stroke="#263253" strokeWidth="0.3" />
        <rect x="38.5" y="48" width="3" height="2.5" rx="0.4" fill="#37e6c4" />
      </g>
      <g data-blade="0">
        <rect
          x="39"
          y="54"
          width="22"
          height="7"
          rx="1.3"
          fill="#16213a"
          stroke="url(#hero-edge-gradient)"
          strokeWidth="0.35"
        />
        <rect x="40.5" y="56.3" width="3.2" height="2.6" rx="0.4" fill="#37e6c4" />
        <line x1="46" y1="57.5" x2="58" y2="57.5" stroke="#2f3a5c" strokeWidth="0.3" />
      </g>

      {HERO_NODE_POSITIONS.map((node, index) => (
        <circle key={`node-dot-${index}`} data-node-dot cx={node.x} cy={node.y} r="1.1" fill="#f5f7fb" />
      ))}

      {HERO_NODE_POSITIONS.map((_, index) => (
        <circle key={`pulse-${index}`} data-pulse r="0.9" fill="#37e6c4" opacity="0" />
      ))}
    </svg>
  );
});

export default HeroScene;

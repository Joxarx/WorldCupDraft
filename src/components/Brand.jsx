import { useState } from 'react';
import { flagUrl } from '../data/groups';

/**
 * Shared FIFA World Cup 26 branding.
 *
 * Identity: near-black canvas, SOLID concentric rainbow arcs (hard color stops
 * → no banding/moiré, no blur), a round heavy display face (Baloo 2) and the
 * "WE ARE 26" lockup. Flat colours — no glows.
 */

const ARC_STOPS = [
  '#E4002B', '#FF6B00', '#FFC400', '#A3E635', '#22C55E', '#14B8A6',
  '#06B6D4', '#3B82F6', '#6366F1', '#A855F7', '#D6409F', '#EC4899',
];

export const RAINBOW = ARC_STOPS;

/* hex → rgba string with alpha (local helper, used by ArcsBackdrop). */
function hexA(hex, a) {
  const h = hex.replace('#', '');
  return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`;
}

/* Solid concentric arcs anchored to a point. Hard stops = crisp bands. */
function buildArcGradient(at) {
  const n = ARC_STOPS.length;
  const inner = 6;
  const span = 100 - inner;
  const parts = ARC_STOPS.map((c, i) => {
    const a = (inner + (span * i) / n).toFixed(2);
    const b = (inner + (span * (i + 1)) / n).toFixed(2);
    return `${c} ${a}% ${b}%`;
  });
  return `radial-gradient(circle at ${at}, ${parts.join(', ')}, transparent 100%)`;
}

/**
 * Decorative rainbow arcs + center-darkening vignette. Position: absolute.
 * The content column stays crisp; the bands breathe at the edges.
 * `intensity` 0..1 controls how bright the arcs are.
 */
export function ArcsBackdrop({ intensity = 0.7, anchor = 'left', bg = '#0A0A0B' }) {
  const at =
    anchor === 'corner' ? '6% -8%' :
    anchor === 'center' ? '50% 42%' :
    '-6% 50%';
  const focus = anchor === 'center' ? '50% 42%' : anchor === 'corner' ? '60% 32%' : '52% 40%';
  const scrim =
    `radial-gradient(125% 100% at ${focus}, ${hexA(bg, 0.97)} 0%, ${hexA(bg, 0.92)} 38%, ` +
    `${hexA(bg, 0.72)} 60%, ${hexA(bg, 0.3)} 82%, ${hexA(bg, 0)} 100%)`;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-0" style={{ background: bg }}>
      <div className="absolute" style={{ inset: '-10%', backgroundImage: buildArcGradient(at), opacity: intensity }} />
      <div className="absolute inset-0" style={{ background: scrim }} />
    </div>
  );
}

/**
 * Real flag (flagcdn SVG). Falls back to a solid team-color tile with the
 * 3-letter code if the image fails — reliable on every machine.
 */
export function Flag({ team, w = 30 }) {
  const [err, setErr] = useState(false);
  const h = Math.round(w * 0.68);
  const url = flagUrl(team.code);
  if (err || !url) {
    return (
      <span className="flag-img flag-fallback" style={{ width: w, height: h, background: team.color, fontSize: w * 0.3 }}>
        {team.code}
      </span>
    );
  }
  return (
    <img className="flag-img" src={url} alt={team.name} title={team.name}
      style={{ width: w, height: h }} loading="lazy" onError={() => setErr(true)} />
  );
}

/* Broadcast chip: real flag + 3-letter code on a subtle tile. */
export function FlagChip({ team, w = 26 }) {
  return (
    <span className="flag-chip" title={team.name}>
      <Flag team={team} w={w} />
      <span className="font-extrabold text-xs tracking-wide text-white/90">{team.code}</span>
    </span>
  );
}

/* Flag + full country name (used in the draw + results). */
export function TeamRow({ team, size = 26 }) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <Flag team={team} w={size} />
      <span className="flex-1 min-w-0 truncate text-sm font-semibold text-white/90">{team.name}</span>
    </div>
  );
}

/* Pill badge. */
export function BrandBadge({ children, accent = '#EC4899' }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-white/90 whitespace-nowrap">
      <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
      {children}
    </span>
  );
}

/* "WE ARE 26" lockup. */
export function Slogan({ className = '' }) {
  return (
    <div className={`font-display leading-none tracking-tight ${className}`}>
      <span className="text-white">WE ARE </span>
      <span className="rainbow-text">26</span>
    </div>
  );
}

/* "EN VIVO" indicator. */
export function LiveTag() {
  return (
    <span className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-wider text-white whitespace-nowrap">
      <span className="h-2.5 w-2.5 rounded-full bg-wc-red animate-pulse" />
      EN VIVO
    </span>
  );
}

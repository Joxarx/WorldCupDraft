/**
 * Shared FIFA World Cup 26 branding elements.
 *
 * The official identity is built on near-black canvases, concentric rainbow
 * arcs, an ultra-bold display face and the "WE ARE 26" slogan. The real
 * "FWC2026" typeface is proprietary; we approximate its weight with Archivo
 * Black and lean on the rainbow arcs to carry the look.
 */

/**
 * Decorative rainbow arcs + legibility vignette. Position: absolute.
 *
 * The arc circles are pushed mostly off-screen so only clean sweeping bands
 * show (no visible center point, no moire). A radial vignette keeps the middle
 * of the screen readable. The arcs are radially symmetric, so they are not
 * animated - spinning a symmetric gradient is a no-op that only wastes paint.
 */
export function ArcsBackdrop({ vignette = 'strong' }) {
  const arcOpacity = vignette === 'strong' ? 0.22 : 0.34;
  const center = vignette === 'strong' ? 'rgba(10,10,11,0.45)' : 'rgba(10,10,11,0.30)';
  const edge = vignette === 'strong' ? 'rgba(10,10,11,0.92)' : 'rgba(10,10,11,0.82)';
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-[60%] -left-[40%] h-[130vmax] w-[130vmax] wc26-arcs blur-[2px]"
        style={{ opacity: arcOpacity }}
      />
      <div
        className="absolute -bottom-[60%] -right-[40%] h-[110vmax] w-[110vmax] wc26-arcs blur-[2px]"
        style={{ opacity: arcOpacity * 0.8 }}
      />
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at center, ${center} 0%, ${edge} 75%)` }}
      />
    </div>
  );
}

/** Small pill badge: "FIFA WORLD CUP 26". */
export function BrandBadge({ label = 'FIFA World Cup 26' }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-white/90">
      <span className="h-2 w-2 rounded-full bg-wc-pink shadow-[0_0_10px_#EC4899]" />
      {label}
    </div>
  );
}

/** The "WE ARE 26" slogan lockup, rainbow-filled. */
export function Slogan({ className = '' }) {
  return (
    <div className={`font-display leading-none tracking-tight ${className}`}>
      <span className="text-white">WE ARE </span>
      <span className="shimmer-rainbow">26</span>
    </div>
  );
}

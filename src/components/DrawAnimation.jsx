import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, ChevronRight, Pause, Play, FastForward, Sparkles } from 'lucide-react';
import { GROUPS, getGroupTeams } from '../data/groups';
import { ArcsBackdrop } from './Brand';

/**
 * DrawAnimation
 *
 * Iterates through each of the 12 groups. For each group:
 *   1) intro:  big group letter slides in
 *   2) slot:   4 team reels spin (slot-machine)
 *   3) lock:   teams settle, crest reveal + confetti
 *   4) reveal: participant spotlight + fun fact
 *   5) rest:   brief pause before next group
 *
 * Auto-advances; user can pause / skip. ~7.6s per group → ~91s full draw.
 */

const PHASE_DURATIONS = {
  intro: 1400,
  slot: 2000,
  lock: 1600,
  reveal: 2400,
  rest: 700,
};
const PHASES = ['intro', 'slot', 'lock', 'reveal', 'rest'];

const CONFETTI_COLORS = ['#E4002B', '#FF6B00', '#FFC400', '#22C55E', '#06B6D4', '#A855F7', '#EC4899', '#FFFFFF'];

export default function DrawAnimation({ participants, onComplete }) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [phase, setPhase] = useState('intro');
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const group = GROUPS[groupIndex];
  const teams = group ? getGroupTeams(group) : [];
  const participant = group ? participants[group.id] : '';

  const fireConfetti = useCallback((accent) => {
    const end = Date.now() + 1200;
    const colors = [accent, ...CONFETTI_COLORS];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0, y: 0.55 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1, y: 0.55 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  const advance = useCallback(() => {
    setPhase((prev) => {
      const idx = PHASES.indexOf(prev);
      if (idx < PHASES.length - 1) return PHASES[idx + 1];
      setGroupIndex((g) => {
        if (g + 1 >= GROUPS.length) {
          onComplete?.();
          return g;
        }
        return g + 1;
      });
      return PHASES[0];
    });
  }, [onComplete]);

  useEffect(() => {
    if (paused) return;
    if (groupIndex >= GROUPS.length) return;
    if (phase === 'lock') fireConfetti(group?.accent || '#EC4899');
    const duration = PHASE_DURATIONS[phase];
    timerRef.current = setTimeout(advance, duration);
    return () => clearTimeout(timerRef.current);
  }, [phase, groupIndex, paused, advance, fireConfetti, group]);

  const skipGroup = () => {
    clearTimeout(timerRef.current);
    if (groupIndex + 1 >= GROUPS.length) {
      onComplete?.();
      return;
    }
    setGroupIndex((g) => g + 1);
    setPhase('intro');
  };

  if (!group) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-wc26">
      <ArcsBackdrop vignette="strong" />

      {/* Group-colored spotlights on top of the arcs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full opacity-30 blur-3xl"
          style={{ background: group.accent }}
        />
        <div
          className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: group.accent }}
        />
      </div>

      {/* Progress + controls */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12 border-b border-white/10 backdrop-blur-sm bg-wc-black/40">
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-wc-pink animate-pulse shadow-[0_0_12px_#EC4899]" />
          <span className="font-display text-lg tracking-wide text-white">SORTEO EN VIVO</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5">
          {GROUPS.map((g, i) => (
            <div
              key={g.id}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === groupIndex ? '2.5rem' : '1rem',
                background:
                  i < groupIndex ? 'rgba(255,255,255,0.85)' : i === groupIndex ? group.accent : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaused((p) => !p)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/10"
          >
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {paused ? 'Reanudar' : 'Pausar'}
          </button>
          <button
            onClick={skipGroup}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/10"
          >
            <FastForward className="h-3.5 w-3.5" />
            Saltar
          </button>
        </div>
      </div>

      {/* Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-10 md:py-16 min-h-[80vh]">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key={`intro-${group.id}`}
              initial={{ opacity: 0, scale: 0.6, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="uppercase tracking-[0.4em] text-white/70 font-bold text-sm md:text-base">
                A continuacion
              </p>
              <div className="relative mt-6 mb-4">
                <h1
                  className="font-display text-[10rem] md:text-[16rem] leading-none"
                  style={{ color: group.accent, textShadow: `0 0 70px ${group.accent}` }}
                >
                  {group.id}
                </h1>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div
                    className="h-72 w-72 md:h-[28rem] md:w-[28rem] rounded-full border-4 opacity-30"
                    style={{ borderColor: group.accent }}
                  />
                </motion.div>
              </div>
              <h2 className="font-display text-4xl md:text-6xl text-white">{group.name}</h2>
            </motion.div>
          )}

          {(phase === 'slot' || phase === 'lock') && (
            <motion.div
              key={`slot-${group.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center w-full max-w-4xl"
            >
              <h2 className="font-display text-5xl md:text-7xl mb-2" style={{ color: group.accent }}>
                {group.name}
              </h2>
              <p className="uppercase tracking-[0.3em] text-white/60 font-bold mb-8 text-sm">
                Revelando los 4 equipos
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                {teams.map((team, i) => (
                  <SlotReel key={team.code} team={team} accent={group.accent} locked={phase === 'lock'} delay={i * 0.15} />
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'reveal' && (
            <motion.div
              key={`reveal-${group.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="text-center w-full max-w-3xl"
            >
              <p className="uppercase tracking-[0.4em] font-bold text-sm md:text-base" style={{ color: group.accent }}>
                Participante del {group.name}
              </p>
              <motion.div
                initial={{ scale: 0.6, rotateY: -90 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.2 }}
                className="relative mt-6"
              >
                <div className="absolute -inset-8 rounded-full opacity-40 blur-3xl" style={{ background: group.accent }} />
                <div
                  className="relative mx-auto inline-flex flex-col items-center gap-4 rounded-3xl border-2 px-10 py-10 md:px-16 md:py-12 backdrop-blur-sm"
                  style={{
                    borderColor: group.accent,
                    background: 'rgba(10, 10, 11, 0.85)',
                    boxShadow: `0 0 60px ${group.accent}, inset 0 0 30px ${group.accent}40`,
                  }}
                >
                  <Star className="h-10 w-10 animate-pulse" style={{ color: group.accent }} />
                  <h1 className="font-display text-5xl md:text-8xl leading-tight text-white text-shadow-pop">
                    {participant}
                  </h1>
                  <div className="flex items-center gap-3 text-white/80 text-base md:text-lg">
                    <span>defendera al</span>
                    <span className="rounded-full px-3 py-1 font-display text-wc-black" style={{ background: group.accent }}>
                      {group.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-1">
                    {teams.map((team) => (
                      <span key={team.code} className="text-3xl md:text-4xl" aria-hidden>
                        {team.flag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Fun fact to hype the participant */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mx-auto mt-6 flex max-w-xl items-center gap-3 rounded-2xl border border-white/15 bg-wc-black-soft/70 px-5 py-3 text-left backdrop-blur"
              >
                <Sparkles className="h-5 w-5 shrink-0" style={{ color: group.accent }} />
                <p className="text-sm text-white/85">
                  <span className="font-bold text-white">{teams[0].name}: </span>
                  {teams[0].funFact} <span className="text-white/60">— {teams[0].strength}.</span>
                </p>
              </motion.div>
            </motion.div>
          )}

          {phase === 'rest' && (
            <motion.div
              key={`rest-${group.id}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 text-white uppercase tracking-[0.3em] font-bold">
                Siguiente grupo <ChevronRight className="h-5 w-5 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** SlotReel - spins emoji while unlocked, then snaps to the real team. */
function SlotReel({ team, accent, locked, delay = 0 }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border-2 bg-wc-black-soft/80 backdrop-blur"
      style={{
        borderColor: locked ? accent : 'rgba(255,255,255,0.15)',
        boxShadow: locked ? `0 0 30px ${accent}80` : 'none',
        height: '180px',
      }}
    >
      {!locked && (
        <div className="absolute inset-0 flex flex-col animate-slot">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col items-center justify-center h-[180px] shrink-0">
              <span className="text-6xl" aria-hidden>
                {['⚽', '🏆', '🥅', '🎯', '🔥', '⭐'][i % 6]}
              </span>
              <span className="mt-2 text-xs uppercase text-white/40 tracking-widest">Sorteando</span>
            </div>
          ))}
        </div>
      )}
      {locked && (
        <motion.div
          initial={{ y: -40, opacity: 0, scale: 0.7 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: delay * 0.6, type: 'spring', stiffness: 200, damping: 14 }}
          className="flex h-full flex-col items-center justify-center px-3 text-center"
        >
          <span className="text-6xl md:text-7xl drop-shadow-lg" aria-hidden>{team.flag}</span>
          <span className="mt-2 font-display text-base md:text-lg text-white leading-tight">{team.name}</span>
          <span className="mt-1 text-[10px] uppercase tracking-widest" style={{ color: accent }}>
            {team.strength}
          </span>
        </motion.div>
      )}

      <style>{`
        @keyframes slotScroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-1800px); }
        }
        .animate-slot { animation: slotScroll 0.6s linear infinite; }
      `}</style>
    </motion.div>
  );
}

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, FastForward } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GROUPS, getGroupTeams } from '../data/groups';
import { ArcsBackdrop, LiveTag, TeamRow } from './Brand';

/**
 * DrawAnimation — broadcast-style draw, group by group (A→L).
 *
 * CORE MODEL: the reel spins PARTICIPANT NAMES (the random variable). The
 * group and its 4 teams are the FIXED destination ("el premio"); we reveal
 * WHICH PERSON gets it. Flat colours, no glow.
 *
 * Per group:  intro (¿quién dirige?) → spin (names flicker) → reveal (person
 * locked + confetti) → rest. Auto-advances; user can pause / skip.
 */

const PHASES = ['intro', 'spin', 'reveal', 'rest'];
const DUR = { intro: 1300, spin: 1900, reveal: 2600, rest: 650 };
const CONFETTI = ['#E4002B', '#FF6B00', '#FFC400', '#22C55E', '#06B6D4', '#A855F7', '#EC4899', '#FFFFFF'];

export default function DrawAnimation({ participants, onComplete }) {
  const names = useMemo(() => Object.values(participants), [participants]);
  const [gi, setGi] = useState(0);
  const [phase, setPhase] = useState('intro');
  const [paused, setPaused] = useState(false);
  const [flash, setFlash] = useState(names[0] || '');
  const timer = useRef(null);
  const flashTimer = useRef(null);

  const group = GROUPS[gi];
  const teams = group ? getGroupTeams(group) : [];
  const person = group ? participants[group.id] : '';
  const ac = group?.accent || '#EC4899';

  const fireConfetti = useCallback((accent) => {
    const end = Date.now() + 1100;
    const colors = [accent, ...CONFETTI];
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 75, origin: { x: 0, y: 0.6 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 75, origin: { x: 1, y: 0.6 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  const advance = useCallback(() => {
    setPhase((prev) => {
      const idx = PHASES.indexOf(prev);
      if (idx < PHASES.length - 1) return PHASES[idx + 1];
      setGi((g) => {
        if (g + 1 >= GROUPS.length) { onComplete?.(); return g; }
        return g + 1;
      });
      return PHASES[0];
    });
  }, [onComplete]);

  // phase clock
  useEffect(() => {
    if (paused || gi >= GROUPS.length) return;
    if (phase === 'reveal') fireConfetti(ac);
    timer.current = setTimeout(advance, DUR[phase]);
    return () => clearTimeout(timer.current);
  }, [phase, gi, paused]); // eslint-disable-line react-hooks/exhaustive-deps

  // name flicker during spin
  useEffect(() => {
    if (phase === 'spin' && !paused) {
      flashTimer.current = setInterval(() => {
        setFlash(names[Math.floor(Math.random() * names.length)]);
      }, 75);
    } else {
      clearInterval(flashTimer.current);
    }
    return () => clearInterval(flashTimer.current);
  }, [phase, paused, names]);

  const skip = () => {
    clearTimeout(timer.current);
    if (gi + 1 >= GROUPS.length) { onComplete?.(); return; }
    setGi((g) => g + 1);
    setPhase('intro');
  };

  if (!group) return null;

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-wc26">
      <ArcsBackdrop intensity={0.42} anchor="center" />

      {/* Broadcast top bar */}
      <div className="relative z-10 flex items-center justify-between gap-5 border-b border-white/10 bg-wc-black/50 px-5 py-4 backdrop-blur-sm md:px-12">
        <div className="flex items-center gap-4">
          <LiveTag />
          <span className="font-display text-base text-white/90">Sorteo · Copa del Mundo 2026</span>
        </div>
        <div className="hidden flex-1 items-center justify-center gap-1.5 md:flex">
          {GROUPS.map((g, i) => (
            <span key={g.id} className="h-[7px] rounded-full transition-all" style={{
              width: i === gi ? 30 : 12,
              background: i < gi ? 'rgba(255,255,255,.85)' : i === gi ? ac : 'rgba(255,255,255,.2)',
            }} />
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <button onClick={() => setPaused((p) => !p)} className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-bold text-white hover:bg-white/10">
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {paused ? 'Reanudar' : 'Pausar'}
          </button>
          <button onClick={skip} className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-bold text-white hover:bg-white/10">
            Saltar <FastForward className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Stage */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-10 px-6">
        {/* Destination: group + its fixed teams */}
        <div className="flex w-[min(700px,92vw)] items-center gap-6 rounded-3xl border border-white/10 bg-wc-black/55 px-8 py-5 backdrop-blur-sm md:gap-10">
          <span className="font-display leading-[0.8]" style={{ color: ac, fontSize: 'clamp(64px,9vw,120px)' }}>{group.id}</span>
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-white/40">Grupo</span>
            <span className="mb-2 font-display text-2xl text-white">{group.name}</span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {teams.map((t) => <TeamRow key={t.code} team={t} size={26} />)}
            </div>
          </div>
        </div>

        {/* The draw chamber */}
        <div className="flex min-h-[clamp(180px,30vh,280px)] w-full items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {phase === 'intro' && (
              <motion.div key={`i-${group.id}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="flex flex-col gap-1.5">
                <span className="font-display text-white/85" style={{ fontSize: 'clamp(28px,4vw,46px)' }}>¿Quién dirige el</span>
                <span className="font-display leading-[0.85]" style={{ color: ac, fontSize: 'clamp(56px,11vw,150px)' }}>GRUPO {group.id}?</span>
              </motion.div>
            )}

            {phase === 'spin' && (
              <motion.div key={`s-${group.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3.5">
                <span className="text-sm font-extrabold uppercase tracking-[0.3em] text-white/40">Sorteando participante…</span>
                <span className="reel-flick font-display text-white" style={{ fontSize: 'clamp(48px,9vw,130px)', lineHeight: 1 }}>{flash}</span>
              </motion.div>
            )}

            {(phase === 'reveal' || phase === 'rest') && (
              <motion.div key={`r-${group.id}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ type: 'spring', stiffness: 90, damping: 13 }} className="flex flex-col items-center gap-3.5">
                <span className="text-sm font-extrabold uppercase tracking-[0.3em]" style={{ color: ac }}>Participante</span>
                <div className="flex flex-col items-center gap-3 rounded-3xl border-[3px] bg-wc-black/85 px-[clamp(34px,6vw,90px)] py-[clamp(22px,4vh,44px)]" style={{ borderColor: ac }}>
                  <span className="font-display text-white" style={{ fontSize: 'clamp(48px,9vw,128px)', lineHeight: 0.92 }}>{person}</span>
                  <span className="inline-flex items-center gap-3 whitespace-nowrap text-white/85" style={{ fontSize: 'clamp(15px,1.6vw,20px)' }}>
                    se lleva el
                    <span className="rounded-full px-4 py-1 font-display text-wc-black" style={{ background: ac, fontSize: 'clamp(15px,1.6vw,20px)' }}>GRUPO {group.id}</span>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

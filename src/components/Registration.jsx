import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowRight, Sparkles, RotateCcw, Video, Shuffle } from 'lucide-react';
import { GROUPS, getGroupTeams } from '../data/groups';
import { ArcsBackdrop, BrandBadge, Slogan } from './Brand';

const SAMPLE_NAMES = [
  'Ana', 'Luis', 'Sofia', 'Diego', 'Maria', 'Carlos',
  'Lupita', 'Jorge', 'Renata', 'Pablo', 'Camila', 'Andres',
];

const SLOTS = Array.from({ length: GROUPS.length }, (_, i) => i);

/**
 * Registration screen
 *
 * Collects a flat list of 12 participants - deliberately decoupled from the
 * groups. The draw is random (App shuffles these names onto groups A-L), so
 * the person entering names never picks their own group here. A read-only
 * strip shows which groups are in play, assigned at random.
 */
export default function Registration({ initialNames = [], onStart }) {
  const [names, setNames] = useState(() =>
    SLOTS.map((i) => initialNames[i] ?? '')
  );

  const filledCount = useMemo(
    () => names.filter((n) => n.trim().length > 0).length,
    [names]
  );
  const allFilled = filledCount === SLOTS.length;

  const updateName = (index, value) => {
    setNames((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const submit = (record) => {
    if (!allFilled) return;
    onStart(names.map((n) => n.trim()), record);
  };

  const fillSample = () => setNames([...SAMPLE_NAMES]);
  const clearAll = () => setNames(SLOTS.map(() => ''));

  return (
    <div className="relative min-h-screen bg-wc26 px-4 py-10 md:px-10 md:py-14">
      <ArcsBackdrop vignette="soft" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <BrandBadge label="FIFA World Cup 26 · Sorteo" />
          <Slogan className="text-6xl md:text-8xl mt-5" />
          <p className="text-white/70 max-w-2xl mx-auto mt-5 text-base md:text-lg">
            Registra a los 12 participantes. Al iniciar, el sorteo asignara a cada
            uno un grupo de la Copa del Mundo 2026 de forma totalmente aleatoria.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={fillSample}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm font-bold text-white hover:bg-white/10 transition"
            >
              <Sparkles className="h-4 w-4 text-wc-yellow" />
              Cargar nombres de ejemplo
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white/70 hover:bg-white/10 transition"
            >
              <RotateCcw className="h-4 w-4" />
              Limpiar
            </button>
          </div>
        </motion.header>

        {/* Read-only reference: the 12 groups in play, assigned at random. */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 rounded-2xl border border-white/10 bg-wc-black-soft/60 backdrop-blur-sm p-5"
        >
          <div className="flex items-center justify-center gap-2 mb-4 text-[11px] uppercase tracking-[0.2em] font-bold text-white/60">
            <Shuffle className="h-3.5 w-3.5 text-wc-cyan" />
            Grupos en juego · se asignan al azar
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {GROUPS.map((group) => {
              const teams = getGroupTeams(group);
              return (
                <div
                  key={group.id}
                  className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2"
                >
                  <span
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-base text-wc-black"
                    style={{ background: group.accent }}
                  >
                    {group.id}
                  </span>
                  <span className="text-base leading-none tracking-wide" aria-hidden>
                    {teams.map((t) => t.flag).join(' ')}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.section>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SLOTS.map((i) => {
              const filled = names[i]?.trim().length > 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className={`relative flex items-center gap-3 rounded-2xl border bg-wc-black-soft/80 backdrop-blur-sm px-4 py-3 shadow-lg transition ${
                    filled ? 'border-white/40' : 'border-white/10'
                  }`}
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 font-display text-lg text-white/80">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-1">
                      <Users className="inline-block h-3 w-3 mr-1 -mt-0.5" />
                      Participante {i + 1}
                    </label>
                    <input
                      value={names[i]}
                      onChange={(e) => updateName(i, e.target.value)}
                      placeholder="Nombre completo"
                      aria-label={`Participante ${i + 1}`}
                      className="w-full rounded-lg border border-white/15 bg-wc-black/70 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-wc-cyan/70 focus:border-wc-cyan transition"
                      maxLength={40}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <p className="text-sm font-bold text-white/70">
              {filledCount} / {SLOTS.length} participantes
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => submit(true)}
                disabled={!allFilled}
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-lg font-display uppercase tracking-wide transition ${
                  allFilled
                    ? 'bg-white text-wc-black hover:scale-[1.03] shadow-2xl animate-pulse-glow'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                <Video className="h-5 w-5" />
                Grabar y sortear
                <ArrowRight className={`h-5 w-5 ${allFilled ? 'group-hover:translate-x-1 transition-transform' : ''}`} />
              </button>
              <button
                type="button"
                onClick={() => submit(false)}
                disabled={!allFilled}
                className={`inline-flex items-center gap-2 rounded-full border px-7 py-4 text-sm font-bold uppercase tracking-wide transition ${
                  allFilled
                    ? 'border-white/30 bg-white/5 text-white hover:bg-white/10'
                    : 'border-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                Sortear sin grabar
              </button>
            </div>
            {allFilled ? (
              <p className="text-xs text-white/50 max-w-md text-center">
                Al grabar, el navegador pedira elegir que pantalla compartir. Selecciona
                <span className="text-white/80 font-semibold"> esta pestana </span>
                para capturar el sorteo completo.
              </p>
            ) : (
              <p className="text-xs text-white/50">Completa los 12 nombres para habilitar el sorteo.</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

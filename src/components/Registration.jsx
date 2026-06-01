import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw, Video, Sparkles } from 'lucide-react';
import { GROUPS, getGroupTeams } from '../data/groups';
import { ArcsBackdrop, BrandBadge, Slogan, FlagChip } from './Brand';

const SAMPLE_NAMES = [
  'Ana', 'Luis', 'Sofía', 'Diego', 'María', 'Carlos',
  'Lupita', 'Jorge', 'Renata', 'Pablo', 'Camila', 'Andrés',
];

const SLOTS = Array.from({ length: GROUPS.length }, (_, i) => i);

/* A vistoso group "pot": solid letter block + accent tint + flag chips. */
function GroupPot({ group }) {
  const teams = getGroupTeams(group);
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 p-4 transition hover:-translate-y-0.5"
      style={{
        background: `linear-gradient(155deg, ${group.accent}24, transparent 60%), rgba(18,18,21,0.85)`,
      }}
    >
      <span className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: group.accent }} />
      <div className="mb-3.5 flex items-center gap-3">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl font-display text-2xl text-wc-black"
          style={{ background: group.accent }}
        >
          {group.id}
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.24em] text-white/40">Grupo</span>
          <span className="font-display text-lg text-white">Grupo {group.id}</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {teams.map((t) => <FlagChip key={t.code} team={t} w={26} />)}
      </div>
    </div>
  );
}

/**
 * Registration — capture 12 participants. Reinforces the mental model:
 * the 12 GROUPS (with their teams) are FIXED; the people are what gets drawn
 * at random into them.
 */
export default function Registration({ initialNames = [], onStart }) {
  const [names, setNames] = useState(() => SLOTS.map((i) => initialNames[i] ?? ''));

  const filled = useMemo(() => names.filter((n) => n.trim()).length, [names]);
  const allFilled = filled === SLOTS.length;

  const update = (i, v) => setNames((p) => { const n = [...p]; n[i] = v; return n; });
  const fillSample = () => setNames([...SAMPLE_NAMES]);
  const clearAll = () => setNames(SLOTS.map(() => ''));
  const submit = (record) => { if (allFilled) onStart(names.map((n) => n.trim()), record); };

  return (
    <div className="relative min-h-screen bg-wc26 px-4 py-10 md:px-10 md:py-14">
      <ArcsBackdrop intensity={0.7} anchor="left" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <BrandBadge accent="#EC4899">FIFA World Cup 26 · Sorteo</BrandBadge>
          <Slogan className="mt-5 text-6xl md:text-8xl" />
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/65 md:text-lg">
            Registra a los <b className="text-white">12 participantes</b>. Al iniciar, el sorteo asigna a
            cada persona un grupo de la Copa del Mundo 2026 — <b className="text-white">los equipos de cada
            grupo ya están fijos</b>; lo que se sortea es <b className="text-white">quién dirige cada uno</b>.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button onClick={fillSample} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10">
              <Sparkles className="h-4 w-4 text-wc-yellow" /> Cargar ejemplo
            </button>
            <button onClick={clearAll} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white/60 transition hover:bg-white/10">
              <RotateCcw className="h-4 w-4" /> Limpiar
            </button>
          </div>
        </motion.header>

        {/* The 12 groups — fixed teams */}
        <section className="mb-10">
          <Divider>Los 12 grupos · equipos fijos</Divider>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {GROUPS.map((g) => <GroupPot key={g.id} group={g} />)}
          </div>
        </section>

        {/* Participants */}
        <section>
          <Divider>Participantes</Divider>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {names.map((val, i) => {
              const has = val.trim().length > 0;
              return (
                <label key={i} className={`flex items-center gap-3 rounded-2xl border bg-white/[0.04] px-3.5 py-3 transition ${has ? 'border-white/40 bg-white/[0.06]' : 'border-white/10'}`}>
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/10 font-display text-lg text-white/70">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="mb-0.5 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/40">Participante {i + 1}</span>
                    <input
                      value={val}
                      onChange={(e) => update(i, e.target.value)}
                      placeholder="Nombre"
                      maxLength={40}
                      className="w-full bg-transparent text-base font-semibold text-white outline-none placeholder:text-white/30"
                    />
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        <footer className="mt-12 flex flex-col items-center gap-4">
          <div className="flex w-full max-w-md items-center gap-3.5">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full rounded-full transition-all" style={{ width: `${(filled / SLOTS.length) * 100}%`, background: 'linear-gradient(90deg,#E4002B,#FFC400,#22C55E,#06B6D4,#A855F7,#EC4899)' }} />
            </div>
            <span className="font-display text-sm text-white/60">{filled}/{SLOTS.length}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => submit(true)}
              disabled={!allFilled}
              className={`inline-flex items-center gap-3 rounded-full px-9 py-4 font-display text-lg uppercase transition ${allFilled ? 'bg-white text-wc-black hover:-translate-y-0.5' : 'cursor-not-allowed bg-white/10 text-white/40'}`}
            >
              <Video className="h-5 w-5" /> Grabar y sortear <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => submit(false)}
              disabled={!allFilled}
              className={`inline-flex items-center gap-2 rounded-full border px-7 py-4 text-sm font-bold uppercase transition ${allFilled ? 'border-white/25 bg-white/5 text-white hover:bg-white/10' : 'cursor-not-allowed border-white/10 text-white/30'}`}
            >
              Sortear sin grabar
            </button>
          </div>
          <p className="max-w-md text-center text-xs text-white/40">
            {allFilled
              ? 'Listo. El sorteo se reproduce a pantalla completa, ideal para proyectar.'
              : 'Completa los 12 nombres para habilitar el sorteo.'}
          </p>
        </footer>
      </div>
    </div>
  );
}

function Divider({ children }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-4 text-xs font-extrabold uppercase tracking-[0.24em] text-white/40">
      <span className="h-px max-w-[200px] flex-1 bg-gradient-to-r from-transparent to-white/15" />
      <span className="whitespace-nowrap">{children}</span>
      <span className="h-px max-w-[200px] flex-1 bg-gradient-to-l from-transparent to-white/15" />
    </div>
  );
}

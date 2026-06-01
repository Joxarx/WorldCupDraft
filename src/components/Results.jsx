import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, RotateCcw, AlertCircle } from 'lucide-react';
import { GROUPS, getGroupTeams } from '../data/groups';
import { ArcsBackdrop, BrandBadge, TeamRow, RAINBOW } from './Brand';
import confetti from 'canvas-confetti';

/**
 * Results — 12 cards, one per group. Each shows the GROUP + its fixed teams
 * and, prominently, the PARTICIPANT drawn into it. Flat colours, no glow.
 */
export default function Results({
  participants,
  lastVideoUrl,
  recorderError,
  onDownloadVideo,
  onShare,
  onRestart,
}) {
  useEffect(() => {
    const burst = (x) => confetti({ particleCount: 70, spread: 80, origin: { x, y: 0 }, colors: RAINBOW });
    burst(0.2);
    const t = setTimeout(() => burst(0.8), 180);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-wc26 px-4 py-10 md:px-10 md:py-14">
      <ArcsBackdrop intensity={0.7} anchor="corner" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.header initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-9 text-center">
          <BrandBadge accent="#06B6D4">Sorteo completado</BrandBadge>
          <h1 className="mt-4 font-display text-5xl leading-[0.9] md:text-7xl"><span className="rainbow-text">RESULTADOS</span></h1>
          <p className="mx-auto mt-3.5 max-w-xl text-base text-white/65">Cada participante quedó asignado a un grupo de la Copa del Mundo 2026.</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {lastVideoUrl && (
              <>
                <button onClick={onDownloadVideo} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display text-sm uppercase text-wc-black transition hover:-translate-y-0.5">
                  <Download className="h-4 w-4" /> Descargar video
                </button>
                <button onClick={onShare} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-white/10">
                  <Share2 className="h-4 w-4" /> Compartir
                </button>
              </>
            )}
            <button onClick={onRestart} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold uppercase text-white/80 transition hover:bg-white/10">
              <RotateCcw className="h-4 w-4" /> Nuevo sorteo
            </button>
          </div>
        </motion.header>

        {recorderError && (
          <div className="mx-auto mb-6 flex max-w-2xl items-start gap-3 rounded-xl border border-wc-red/40 bg-wc-red/10 p-4 text-sm text-red-100">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>{recorderError}</p>
          </div>
        )}

        {!lastVideoUrl && !recorderError && (
          <p className="mx-auto mb-8 max-w-xl text-center text-sm text-white/40">
            Este sorteo se ejecutó sin grabación. Inicia uno nuevo y elige “Grabar y sortear” para guardarlo como video.
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {GROUPS.map((group, index) => {
            const teams = getGroupTeams(group);
            const person = participants[group.id];
            return (
              <motion.article
                key={group.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.045 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 p-[18px]"
                style={{ background: `linear-gradient(155deg, ${group.accent}1F, transparent 58%), rgba(18,18,21,0.85)` }}
              >
                <span className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: group.accent }} />
                <div className="mb-3.5 flex items-center gap-3">
                  <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl font-display text-3xl text-wc-black" style={{ background: group.accent }}>{group.id}</span>
                  <div>
                    <span className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/40">Grupo</span>
                    <span className="font-display text-xl text-white">{group.name}</span>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-x-3 gap-y-2">
                  {teams.map((t) => <TeamRow key={t.code} team={t} size={24} />)}
                </div>

                <div className="rounded-xl border-2 p-3 text-center" style={{ borderColor: group.accent, background: `linear-gradient(135deg, ${group.accent}33, transparent)` }}>
                  <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.18em]" style={{ color: group.accent }}>Participante asignado</p>
                  <p className="font-display text-2xl leading-tight text-white">{person}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {lastVideoUrl && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-12">
            <h2 className="mb-4 text-center font-display text-3xl"><span className="rainbow-text">TU VIDEO</span></h2>
            <video src={lastVideoUrl} controls className="mx-auto w-full max-w-3xl rounded-xl border border-white/20" />
          </motion.div>
        )}

        <footer className="mt-12 text-center text-xs uppercase tracking-[0.2em] text-white/40">
          WE ARE 26 · Sorteo Copa del Mundo 2026
        </footer>
      </div>
    </div>
  );
}

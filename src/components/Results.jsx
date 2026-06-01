import { motion } from 'framer-motion';
import { Download, RotateCcw, Share2, AlertCircle, Trophy } from 'lucide-react';
import { GROUPS, getGroupTeams } from '../data/groups';
import { ArcsBackdrop, BrandBadge } from './Brand';

/**
 * Results screen
 *
 * Grid of 12 cards (one per group) highlighting the GROUP and its ASSIGNED
 * PARTICIPANT. Recording already happened during the draw, so the action bar
 * only offers download / share once a video exists.
 */
export default function Results({
  participants,
  lastVideoUrl,
  recorderError,
  onDownloadVideo,
  onShare,
  onRestart,
}) {
  return (
    <div className="relative min-h-screen bg-wc26 px-4 py-10 md:px-10 md:py-14">
      <ArcsBackdrop vignette="soft" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <BrandBadge label="Sorteo completado" />
          <h1 className="font-display text-5xl md:text-7xl mt-5">
            <span className="shimmer-rainbow">RESULTADOS</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            Estos son los participantes asignados a cada grupo de la Copa del Mundo 2026.
          </p>
        </motion.header>

        {/* Action bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
        >
          {lastVideoUrl && (
            <>
              <button
                onClick={onDownloadVideo}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-display uppercase tracking-wide text-wc-black hover:scale-[1.03] transition shadow-lg"
              >
                <Download className="h-4 w-4" />
                Descargar video
              </button>
              <button
                onClick={onShare}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10 transition"
              >
                <Share2 className="h-4 w-4" />
                Compartir
              </button>
            </>
          )}

          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white/80 hover:bg-white/10 transition"
          >
            <RotateCcw className="h-4 w-4" />
            Nuevo sorteo
          </button>
        </motion.div>

        {recorderError && (
          <div className="mx-auto mb-6 flex max-w-2xl items-start gap-3 rounded-xl border border-wc-red/40 bg-wc-red/10 p-4 text-sm text-red-100">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <p>{recorderError}</p>
          </div>
        )}

        {!lastVideoUrl && !recorderError && (
          <p className="mx-auto mb-8 max-w-xl text-center text-sm text-white/50">
            Este sorteo se ejecuto sin grabacion. Inicia un nuevo sorteo y elige
            "Grabar y sortear" para guardarlo como video.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {GROUPS.map((group, index) => {
            const teams = getGroupTeams(group);
            const participant = participants[group.id];
            return (
              <motion.article
                key={group.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-wc-black-soft/80 backdrop-blur p-5 shadow-2xl"
                style={{ boxShadow: `0 10px 40px ${group.accent}30` }}
              >
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 h-44 w-44 rounded-full opacity-40 blur-3xl"
                  style={{ background: group.accent }}
                />
                {/* GROUP - highlighted */}
                <div className="relative flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-14 w-14 items-center justify-center rounded-2xl font-display text-3xl text-wc-black"
                      style={{ background: group.accent }}
                    >
                      {group.id}
                    </span>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                        Grupo
                      </span>
                      <span className="font-display text-xl text-white">{group.name}</span>
                    </div>
                  </div>
                  <Trophy className="h-6 w-6" style={{ color: group.accent }} />
                </div>

                <div className="relative grid grid-cols-2 gap-2 mb-5">
                  {teams.map((team) => (
                    <div
                      key={team.code}
                      className="flex items-center gap-2 rounded-lg bg-white/5 px-2.5 py-2"
                    >
                      <span className="text-xl leading-none" aria-hidden>{team.flag}</span>
                      <span className="text-xs font-semibold text-white/90 truncate">{team.name}</span>
                    </div>
                  ))}
                </div>

                {/* PARTICIPANT - highlighted */}
                <div
                  className="relative rounded-xl border-2 px-3 py-4 text-center"
                  style={{
                    borderColor: group.accent,
                    background: `linear-gradient(135deg, ${group.accent}26, transparent)`,
                  }}
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1" style={{ color: group.accent }}>
                    Participante asignado
                  </p>
                  <p className="font-display text-2xl text-white text-shadow-pop leading-tight">
                    {participant}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {lastVideoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <h2 className="font-display text-3xl text-center mb-4">
              <span className="shimmer-rainbow">TU VIDEO</span>
            </h2>
            <video
              src={lastVideoUrl}
              controls
              className="mx-auto max-w-3xl w-full rounded-xl border border-white/20 shadow-2xl"
            />
          </motion.div>
        )}

        <footer className="mt-14 text-center text-xs text-white/40">
          Sorteo Copa del Mundo 2026 · Hecho con React + Framer Motion
        </footer>
      </div>
    </div>
  );
}

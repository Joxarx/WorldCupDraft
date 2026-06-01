import { useCallback, useState } from 'react';
import Registration from './components/Registration';
import DrawAnimation from './components/DrawAnimation';
import Results from './components/Results';
import { GROUPS } from './data/groups';
import { useScreenRecord } from './hooks/useScreenRecord';

/** Fisher-Yates: returns a new shuffled copy, leaving the input untouched. */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * App - top-level state machine.
 *
 * Screens:
 *   'register' → user enters 12 participant names (a flat list, not tied to a group)
 *   'draw'     → big animation per group, revealing the random assignment
 *   'results'  → grid summary + video download
 *
 * The draw is random: at start we shuffle the names and map them onto groups
 * A-L, so nobody picks their own group. Recording starts up front (on the
 * user's "start draw" click, which is the gesture getDisplayMedia requires)
 * and auto-stops when the draw finishes, so the whole animation is captured.
 */
export default function App() {
  const [screen, setScreen] = useState('register');
  const [names, setNames] = useState([]);
  const [participants, setParticipants] = useState({});
  const recorder = useScreenRecord();

  const handleStartDraw = useCallback(
    async (nameList, record) => {
      setNames(nameList);
      const shuffled = shuffle(nameList);
      const assignment = {};
      GROUPS.forEach((g, i) => {
        assignment[g.id] = shuffled[i];
      });
      setParticipants(assignment);
      if (record) {
        const ok = await recorder.start();
        if (!ok) {
          const proceed = window.confirm(
            'No se pudo iniciar la grabacion (permiso cancelado). Quieres continuar el sorteo sin grabar?'
          );
          if (!proceed) return;
        }
      }
      setScreen('draw');
      window.scrollTo({ top: 0 });
    },
    [recorder]
  );

  const handleDrawComplete = useCallback(() => {
    // Small pause to let the last reveal breathe, then stop recording so the
    // video ends on the final reveal before showing results.
    setTimeout(() => {
      recorder.stop();
      setScreen('results');
      window.scrollTo({ top: 0 });
    }, 1200);
  }, [recorder]);

  const handleRestart = useCallback(() => {
    if (recorder.isRecording) recorder.stop();
    setScreen('register');
    window.scrollTo({ top: 0 });
  }, [recorder]);

  const handleShare = useCallback(async () => {
    if (!recorder.lastVideoUrl) return;
    try {
      const response = await fetch(recorder.lastVideoUrl);
      const blob = await response.blob();
      const file = new File([blob], 'sorteo-copa-mundo-2026.webm', { type: blob.type });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: 'Sorteo Copa del Mundo 2026',
          text: 'Mira como quedo el sorteo!',
          files: [file],
        });
        return;
      }
    } catch {
      // Fall through to clipboard
    }
    try {
      await navigator.clipboard.writeText(recorder.lastVideoUrl);
      alert('Link del video copiado al portapapeles.');
    } catch {
      recorder.download();
    }
  }, [recorder]);

  return (
    <>
      {screen === 'register' && (
        <Registration
          initialNames={names}
          onStart={handleStartDraw}
        />
      )}
      {screen === 'draw' && (
        <DrawAnimation
          participants={participants}
          onComplete={handleDrawComplete}
        />
      )}
      {screen === 'results' && (
        <Results
          participants={participants}
          lastVideoUrl={recorder.lastVideoUrl}
          recorderError={recorder.error}
          onDownloadVideo={() => recorder.download()}
          onShare={handleShare}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useScreenRecord
 *
 * Wraps the native MediaRecorder API to capture the current tab/window/screen
 * (via getDisplayMedia) and download the result as a webm video.
 *
 * Why getDisplayMedia + MediaRecorder?
 *  - No external deps, works in all evergreen browsers.
 *  - True .mp4 from the browser is fragile; .webm is universally supported
 *    by MediaRecorder and plays in QuickTime/VLC/most platforms.
 */
export function useScreenRecord() {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [lastVideoUrl, setLastVideoUrl] = useState(null);
  const [error, setError] = useState(null);

  const stop = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    }
    const stream = streamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    streamRef.current = null;
    mediaRecorderRef.current = null;
    setIsRecording(false);
  }, []);

  const start = useCallback(async () => {
    setError(null);
    if (!navigator.mediaDevices?.getDisplayMedia) {
      setError('Tu navegador no soporta grabacion de pantalla.');
      return false;
    }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30 },
        audio: false,
      });
      streamRef.current = stream;
      chunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';

      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 5_000_000 });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setLastVideoUrl(url);
      };

      // If the user clicks the browser's "Stop sharing" pill, end the recording.
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        stop();
      });

      recorder.start(250);
      setIsRecording(true);
      return true;
    } catch (err) {
      setError(err?.message || 'Error iniciando la grabacion.');
      return false;
    }
  }, [stop]);

  const download = useCallback(
    (filename = `sorteo-copa-mundo-2026-${Date.now()}.webm`) => {
      if (!lastVideoUrl) return;
      const link = document.createElement('a');
      link.href = lastVideoUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [lastVideoUrl]
  );

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      stop();
      if (lastVideoUrl) URL.revokeObjectURL(lastVideoUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isRecording, lastVideoUrl, error, start, stop, download };
}

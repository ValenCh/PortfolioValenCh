import { createContext, useContext, useCallback, useEffect, useRef, useState } from 'react';

const SoundContext = createContext(null);
const STORAGE_KEY = 'vch-portfolio-muted';

function getInitialMuted() {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function SoundProvider({ children }) {
  const audioCtxRef = useRef(null);
  const [muted, setMuted] = useState(getInitialMuted);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, muted ? '1' : '0');
    } catch {
      /* noop */
    }
  }, [muted]);

  const ensureContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  /* Micro-tono cálido tipo "click táctil de madera/pop":
     onda senoidal decreciente 300Hz → 80Hz en 0.025s, ganancia exponencial. */
  const playClick = useCallback(() => {
    if (muted) return;
    const ctx = ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.025;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.01);
  }, [ensureContext, muted]);

  const toggleMuted = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  return (
    <SoundContext.Provider value={{ playClick, muted, toggleMuted }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundEffects() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error('useSoundEffects debe usarse dentro de un <SoundProvider>');
  }
  return ctx;
}
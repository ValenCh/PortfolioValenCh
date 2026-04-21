import { useInView } from 'react-intersection-observer';

/**
 * Hook wrapper para animaciones de entrada consistentes en toda la app.
 * Respeta prefers-reduced-motion: si el usuario tiene activada esa preferencia
 * del sistema, las animaciones no se ejecutan (threshold = 0, triggerOnce inmediato).
 */
export function useReveal(options = {}) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const { ref, inView } = useInView({
    threshold: prefersReduced ? 0 : 0.12,
    triggerOnce: true,
    ...options,
  });

  // Si prefiere menos movimiento, siempre está "en vista" para no animar
  return { ref, inView: prefersReduced ? true : inView };
}
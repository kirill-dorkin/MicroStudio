import { useEffect, useState } from 'react';

/**
 * Detects when the user requests reduced motion or when the connection
 * indicates data saving / low quality. Falls back to reduced motion when the
 * browser signals either condition so animations can be skipped on low-end
 * devices or slow networks.
 */
export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as any)?.connection;

    const update = () => {
      const saveData = connection?.saveData;
      const slowConnection = connection?.effectiveType?.includes('2g');
      setReduce(mediaQuery.matches || saveData || slowConnection);
    };

    update();
    mediaQuery.addEventListener('change', update);
    connection?.addEventListener?.('change', update);

    return () => {
      mediaQuery.removeEventListener('change', update);
      connection?.removeEventListener?.('change', update);
    };
  }, []);

  return reduce;
}

export default useReducedMotion;

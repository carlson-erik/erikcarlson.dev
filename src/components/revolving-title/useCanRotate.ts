import { useEffect, useState } from "react";

/*
 * Whether the phrases may rotate right now: not while the visitor prefers reduced
 * motion, and not while the tab is hidden. Starts false on both server and client so
 * hydration matches; the effect below fills in the real value right after mount.
 */
export const useCanRotate = (): boolean => {
  const [canRotate, setCanRotate] = useState<boolean>(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => {
      setCanRotate(!reducedMotion.matches && !document.hidden);
    };

    reducedMotion.addEventListener("change", handleChange);
    document.addEventListener("visibilitychange", handleChange);
    handleChange();

    return () => {
      reducedMotion.removeEventListener("change", handleChange);
      document.removeEventListener("visibilitychange", handleChange);
    };
  }, []);

  return canRotate;
};

import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export const useWindowResize = (): WindowSize => {
  // Starts at 0 on both server and client so hydration matches; the effect below
  // fills in the real size right after mount.
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};


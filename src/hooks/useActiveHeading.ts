import { useState, useEffect } from "react";

/**
 * The id of the heading being read: the last one whose top is above 30% of the
 * window height, or the first heading if none is. At the bottom of the page it's
 * the last heading, so a short last section can still be the current one.
 *
 * Undefined on the server and until mount, so the prerendered HTML has no highlight.
 */
export const useActiveHeading = (ids: string[]): string | undefined => {
  const [activeId, setActiveId] = useState<string>();

  // Joined so a new array with the same ids doesn't re-add the listeners.
  const idsKey = ids.join();

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const headings = ids
        .map((id) => document.getElementById(id))
        .filter((heading): heading is HTMLElement => heading !== null);
      if (headings.length === 0) {
        setActiveId(undefined);
        return;
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;
      let current = headings[0];
      if (atBottom) {
        current = headings[headings.length - 1];
      } else {
        headings.forEach((heading) => {
          if (heading.getBoundingClientRect().top < window.innerHeight * 0.3) {
            current = heading;
          }
        });
      }
      setActiveId(current.id);
    };

    // At most one update per frame
    const scheduleUpdate = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    // Right away, so a page opened at #<id> highlights the right item
    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    // The 30% line moves with the window height
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return activeId;
};

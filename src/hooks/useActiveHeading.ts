import { useState, useEffect } from "react";

// Input that starts a scroll of the visitor's own. A click on a link also starts
// with pointerdown or keydown, so those fire before the click selects its heading.
const USER_SCROLL_EVENTS = ["wheel", "touchstart", "pointerdown", "keydown"];

/**
 * The id of the heading being read.
 *
 * Following a link to a heading (a click, the back button, or opening the page at
 * #<id>) makes that heading current, even when it can't scroll to the top of the
 * window. It stays current until the visitor scrolls on their own.
 *
 * Otherwise it's the topmost heading in the window. With none in the window, it's
 * the section being read: the last heading above the window, or the first heading
 * if the window is above them all.
 *
 * Undefined on the server and until mount, so the prerendered HTML has no highlight.
 */
export const useActiveHeading = (ids: string[]): string | undefined => {
  const [activeId, setActiveId] = useState<string>();

  // Joined so a new array with the same ids doesn't re-add the listeners.
  const idsKey = ids.join();

  useEffect(() => {
    let frame = 0;
    // The heading a link went to, until the visitor scrolls on their own
    let selectedId: string | undefined;

    const select = (id: string) => {
      if (ids.includes(id)) {
        selectedId = id;
        setActiveId(id);
      }
    };

    const selectFromHash = () =>
      select(decodeURIComponent(window.location.hash.slice(1)));

    const update = () => {
      frame = 0;
      if (selectedId) {
        return;
      }
      const headings = ids
        .map((id) => document.getElementById(id))
        .filter((heading): heading is HTMLElement => heading !== null);
      if (headings.length === 0) {
        setActiveId(undefined);
        return;
      }

      let current = headings[0];
      for (const heading of headings) {
        const { top, bottom } = heading.getBoundingClientRect();
        if (top >= window.innerHeight) {
          break;
        }
        current = heading;
        // Headings are in page order, so the first one not above the window is the topmost in it
        if (bottom > 0) {
          break;
        }
      }
      setActiveId(current.id);
    };

    // At most one update per frame
    const scheduleUpdate = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    // Clicking a link to the current hash doesn't fire hashchange, so clicks are handled too
    const handleClick = (event: MouseEvent) => {
      const modified =
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      if (event.defaultPrevented || event.button !== 0 || modified) {
        return;
      }
      const link = (event.target as Element).closest?.('a[href^="#"]');
      const href = link?.getAttribute("href");
      if (href) {
        select(decodeURIComponent(href.slice(1)));
      }
    };

    const releaseSelection = () => {
      selectedId = undefined;
    };

    // Right away, so a page opened at #<id> highlights the right item
    selectFromHash();
    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    // Resizing changes which headings are in the window
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", selectFromHash);
    document.addEventListener("click", handleClick);
    USER_SCROLL_EVENTS.forEach((type) =>
      window.addEventListener(type, releaseSelection, { passive: true })
    );

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", selectFromHash);
      document.removeEventListener("click", handleClick);
      USER_SCROLL_EVENTS.forEach((type) =>
        window.removeEventListener(type, releaseSelection)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return activeId;
};

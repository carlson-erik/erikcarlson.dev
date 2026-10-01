import { useEffect, type RefObject } from "react";

/**
 * Lets keyboard users reach the code blocks and tables inside `ref` that scroll
 * sideways, and only those, so boxes that fit aren't extra Tab stops. A scrolling
 * table's box is also a region named "Table N", so screen readers say what it is.
 *
 * Finds the boxes once, on mount, so the component must remount for new content
 * (the post page keys it by slug).
 */
export const useFocusableOverflow = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const root = ref.current;
    if (!root) {
      return;
    }
    const tables = Array.from(
      root.querySelectorAll<HTMLElement>(".table-scroll"),
    );
    const boxes = [...Array.from(root.querySelectorAll<HTMLElement>("pre")), ...tables];

    const update = () => {
      boxes.forEach((box) => {
        if (box.scrollWidth > box.clientWidth) {
          box.setAttribute("tabindex", "0");
        } else {
          box.removeAttribute("tabindex");
        }
      });
      // N counts every table, not only the scrolling ones, so a table keeps its
      // name at every width and no two regions share one
      tables.forEach((table, index) => {
        if (table.hasAttribute("tabindex")) {
          table.setAttribute("role", "region");
          table.setAttribute("aria-label", `Table ${index + 1}`);
        } else {
          table.removeAttribute("role");
          table.removeAttribute("aria-label");
        }
      });
    };

    // The box resizes with the window. Its content resizes when the code font loads.
    // The observer also calls update once for each element when it starts watching.
    const observer = new ResizeObserver(update);
    boxes.forEach((box) => {
      observer.observe(box);
      if (box.firstElementChild) {
        observer.observe(box.firstElementChild);
      }
    });
    return () => observer.disconnect();
  }, [ref]);
};

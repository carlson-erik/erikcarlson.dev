import { ReactNode, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";

const OverlayContainer = styled.div``;

interface OverlayProps {
  referenceElement: HTMLElement;
  children: ReactNode;
  outsideClick: (event: MouseEvent) => void;
  className?: string;
}

const Overlay = (props: OverlayProps) => {
  const { referenceElement, children, className, outsideClick } = props;
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [8, 0],
        },
      },
    ],
  });

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;
      if (
        referenceElement &&
        !referenceElement.contains(target) &&
        popperElement &&
        !popperElement.contains(target)
      ) {
        outsideClick?.(event);
      }
    }

    // listen for clicks and close dropdown on body
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [referenceElement, popperElement, outsideClick]);

  return (
    <OverlayContainer
      className={className}
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
    >
      {children}
    </OverlayContainer>
  );
};

export default Overlay;

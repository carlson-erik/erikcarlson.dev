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
    // remove existing
    document.removeEventListener("mousedown", handleOutsideClick);

    // listen for clicks and close dropdown on body
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [referenceElement, popperElement, handleOutsideClick]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleOutsideClick(event: any) {
    if (
      referenceElement &&
      !referenceElement.contains(event.target) &&
      popperElement &&
      !popperElement.contains(event.target)
    ) {
      outsideClick?.(event);
    }
  }

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

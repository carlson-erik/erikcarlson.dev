import styled, { css, keyframes } from "styled-components";
import { Heading } from "../styled";

/*
 * current:  the first phrase on load. It's already in place, so it doesn't animate in.
 * entering: the current phrase after a change. It slides in from below the window.
 * leaving:  the phrase that was just replaced. It slides out above the window.
 * hidden:   every other phrase.
 */
type PhraseState = "current" | "entering" | "leaving" | "hidden";

const Title = styled(Heading)`
  font-size: clamp(2rem, 1.1rem + 3vw, 3.25rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.015em;
`;

// Read by screen readers, but takes no space on screen
const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

/* Every phrase shares one grid cell, so the window is always sized for the longest
   one and nothing below the headline moves when the phrase changes. */
const PhraseWindow = styled.span`
  display: inline-grid;
  vertical-align: top;
  overflow: hidden;
  /* Room for descenders (g, p, y) inside the clipped area */
  padding-bottom: 0.12em;
  margin-bottom: -0.12em;
`;

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: none;
  }
`;

const slideOut = keyframes`
  from {
    transform: none;
  }
  to {
    transform: translateY(-100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// The fade is shorter than the slide, so a leaving phrase is gone before it reaches the top
const slideTiming = "450ms cubic-bezier(0.2, 0.8, 0.2, 1)";
const fadeTiming = "300ms ease";

/*
 * Keyframe animations always start from their own first frame, so a phrase that
 * comes back around enters from below, no matter where it was when it last left.
 */
const Phrase = styled.span<{ $state: PhraseState }>`
  grid-area: 1 / 1;
  text-wrap: balance;
  opacity: ${(props) =>
    props.$state === "current" || props.$state === "entering" ? 1 : 0};

  ${(props) =>
    props.$state === "entering"
      ? css`
          animation: ${slideIn} ${slideTiming}, ${fadeIn} ${fadeTiming};
        `
      : ""}

  ${(props) =>
    props.$state === "leaving"
      ? css`
          animation: ${slideOut} ${slideTiming}, ${fadeOut} ${fadeTiming};
        `
      : ""}
`;

export { Phrase, PhraseWindow, Title, VisuallyHidden };
export type { PhraseState };

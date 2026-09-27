import React, { useEffect, useState } from "react";
/* ------------------ Hooks ------------------ */
import { useCanRotate } from "./useCanRotate";
/* ------------------ Styled Components ------------------ */
import {
  Phrase,
  PhraseWindow,
  Title,
  VisuallyHidden,
  type PhraseState,
} from "./styled";

// A fixed locale, so the prerendered sentence matches the one rendered in the browser
const listFormat = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

// ("I build", ["software.", "things people use."]) -> "I build software and things people use."
const toSentence = (prefix: string, phrases: string[]) =>
  `${prefix} ${listFormat.format(
    phrases.map((phrase) => phrase.replace(/\.$/, ""))
  )}.`;

interface RevolvingTitleProps {
  /** The text that stays put, e.g. "I build" */
  prefix: string;
  /** The endings to cycle through, in order. After the last one, it goes back to the first. */
  phrases: string[];
  /** How long each phrase stays up, in milliseconds */
  interval?: number;
  /** How many times to go through the list before stopping on the first phrase. Infinity loops forever. */
  cycles?: number;
}

const RevolvingTitle = (props: RevolvingTitleProps) => {
  const { prefix, phrases, interval = 2600, cycles = 2 } = props;
  const canRotate = useCanRotate();
  // How many times the phrase has changed. The current and leaving phrases follow from it.
  const [changes, setChanges] = useState<number>(0);
  const phraseCount = phrases.length;
  // One cycle is one change per phrase, the last one being the wrap back to the first
  const totalChanges = phraseCount > 1 ? cycles * phraseCount : 0;

  useEffect(() => {
    if (!canRotate || changes >= totalChanges) {
      return;
    }

    // Restarts whenever rotation resumes, so the current phrase always gets a full interval
    const timeout = setTimeout(() => setChanges((count) => count + 1), interval);
    return () => clearTimeout(timeout);
  }, [canRotate, changes, totalChanges, interval]);

  if (phraseCount <= 1) {
    return <Title>{[prefix, ...phrases].join(" ")}</Title>;
  }

  const current = changes % phraseCount;
  const getPhraseState = (index: number): PhraseState => {
    if (index === current) {
      return changes === 0 ? "current" : "entering";
    }
    return changes > 0 && index === (changes - 1) % phraseCount
      ? "leaving"
      : "hidden";
  };

  return (
    <Title>
      <VisuallyHidden>{toSentence(prefix, phrases)}</VisuallyHidden>
      {/* Screen readers get the sentence above once, instead of every phrase and every change */}
      <span aria-hidden="true">
        {prefix}{" "}
        <PhraseWindow>
          {phrases.map((phrase, index) => (
            <Phrase key={index} $state={getPhraseState(index)}>
              {phrase}
            </Phrase>
          ))}
        </PhraseWindow>
      </span>
    </Title>
  );
};

export default RevolvingTitle;

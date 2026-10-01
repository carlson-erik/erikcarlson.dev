import React, { useRef } from "react";
import styled from "styled-components";
/* ------------------ Theme ------------------ */
import { themeVars } from "@/theme/css-vars";
import { codeFont, headingFont } from "@/theme/fonts";
import { PAGE_GUTTER } from "@/components/layout/styles";
/* ------------------ Hooks ------------------ */
import { useFocusableOverflow } from "@/hooks/useFocusableOverflow";

const { colors } = themeVars;
const { article } = colors;

// A check mark, used as a mask so it takes the text color in either theme
const checkMark = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M2 8.5l4 4 8-9' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / 100% no-repeat`;

/* ------------------ Styled Components ------------------ */
// Styles every element a post renders, from Markdown or from the post's own HTML.
// Nested selectors reach both, where a component map would only reach Markdown.
const Body = styled.div`
  font-size: 1.1875rem;
  line-height: 1.7;
  /* Raleway's default old-style figures read poorly in technical text */
  font-variant-numeric: lining-nums;
  font-kerning: normal;
  overflow-wrap: break-word; /* Long words break rather than widen the page */

  /* Contents jumps stop a little below the top of the window */
  & [id] {
    scroll-margin-top: 1.5rem;
  }

  & p {
    text-wrap: pretty;
  }

  /* Prose keeps about 70 characters per line. Code and tables may use the whole column. */
  & > * {
    max-width: min(100%, 40rem);
  }
  & > :is(pre, .table-scroll) {
    max-width: none;
  }

  & ::selection {
    background: ${article.selection};
  }

  /*
   * Vertical rhythm. Each top-level block sets the space above itself. The :where()s
   * give every rule the same specificity, so the later rule wins. A heading sits
   * closer to what it introduces, and a code block, table, figure, image, or quote
   * sits closer to its lead-in line than to what comes after it.
   */
  & > * + * {
    margin-top: var(--space-above, 1.25rem);
  }
  & > :where(pre, .table-scroll, figure, details, img, a:has(> img), blockquote) {
    --space-above: 1rem;
  }
  & > :where(pre, .table-scroll, figure, details, img, a:has(> img), blockquote) + * {
    --space-above: 2rem;
  }
  & > :where(hr) + * {
    --space-above: 2.5rem;
  }
  & > :where(hr) {
    --space-above: 2.5rem;
  }
  & > :where(h2) {
    --space-above: 3.25rem;
  }
  & > :where(h3) {
    --space-above: 2.5rem;
  }
  & > :where(h4) {
    --space-above: 2rem;
  }
  & > :where(h5, h6) {
    --space-above: 1.75rem;
  }
  /* Last, so it wins */
  & > :where(h2, h3, h4, h5, h6) + * {
    --space-above: 0.75rem;
  }
  & > .footnotes {
    --space-above: 3.5rem;
  }

  /* ------------------ Headings ------------------ */
  /* Every level uses the heading font, so h5 and h6 don't read as bold text */
  & :is(h2, h3, h4, h5, h6) {
    font-family: ${headingFont};
    line-height: 1.3;
    text-wrap: balance;
  }
  & h2 {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.01em;
  }
  & h3 {
    font-size: 1.3125rem;
    font-weight: 700;
  }
  & h4 {
    font-size: 1.125rem;
    font-weight: 700;
  }
  & h5 {
    font-size: 1rem;
    font-weight: 600;
  }
  & h6 {
    font-size: 0.9375rem;
    font-weight: 600;
    color: ${colors.mutedText};
  }

  /* ------------------ Inline text ------------------ */
  & strong {
    font-weight: 700;
  }

  /* The color comes from Layout */
  & a {
    text-decoration-line: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.22em;
  }
  & a:hover {
    text-decoration-thickness: 2px;
  }
  & a:focus-visible {
    outline: 2px solid ${colors.link.text};
    outline-offset: 2px;
    border-radius: 2px;
  }
  /* The link color is too light on a tint. More specific than Layout's "a:visited" and "a:hover". */
  & :is(mark, details) a:any-link,
  & .footnotes li:target a:any-link,
  & sup > a:target {
    color: ${article.linkOnTint};
  }

  & :not(pre) > code {
    font-family: ${codeFont};
    font-size: 0.875em;
    line-height: 1; /* So it doesn't make its line taller */
    padding: 0.12em 0.32em;
    background: ${article.surface};
    border-radius: 3px;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    overflow-wrap: anywhere;
  }
  /* After the rule above, which has the same specificity */
  & :is(h2, h3, h4, h5, h6) code {
    font-size: 0.85em;
  }

  & kbd {
    font-family: ${codeFont};
    font-size: 0.8em;
    line-height: 1;
    display: inline-block;
    padding: 0.15em 0.4em;
    border: 1px solid ${article.strongLine};
    border-bottom-width: 2px;
    border-radius: 4px;
    white-space: nowrap;
  }

  & mark {
    background: ${article.highlight};
    color: ${colors.text};
    padding: 0.05em 0.15em;
    border-radius: 2px;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }

  & abbr[title] {
    text-decoration: underline dotted ${colors.mutedText};
    text-underline-offset: 0.22em;
    cursor: help;
  }

  & del {
    color: ${colors.mutedText};
    text-decoration-thickness: 0.08em;
  }

  /* Neither makes its line taller */
  & :is(sub, sup) {
    font-size: 0.72em;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  & sup {
    top: -0.55em;
  }
  & sub {
    bottom: -0.25em;
  }

  /* ------------------ Lists ------------------ */
  & :is(ul, ol) {
    padding-left: 1.5rem;
  }
  & li::marker {
    color: ${colors.mutedText};
  }
  & ol > li::marker {
    font-family: ${headingFont};
    font-weight: 600;
    font-size: 0.9em;
  }
  & li + li,
  & li > :is(ul, ol) {
    margin-top: 0.5rem;
  }
  /* Loose items hold <p>s */
  & li > * + :is(p, pre) {
    margin-top: 0.75rem;
  }
  & li > pre {
    margin-bottom: 0.25rem;
  }

  /*
   * Checklists. In a tight list the checkbox is the item's first child, and in a
   * loose one it's inside the item's first <p>, so each rule matches both. It's
   * drawn by CSS, where the bullet would be.
   */
  & .contains-task-list {
    list-style: none;
  }
  & .task-list-item {
    position: relative;
  }
  & .task-list-item > input,
  & .task-list-item > p:first-child > input {
    appearance: none;
    -webkit-appearance: none;
    position: absolute;
    left: -1.5rem;
    top: 0.42em;
    width: 0.95rem;
    height: 0.95rem;
    margin: 0;
    border: 1.5px solid ${colors.mutedText};
    border-radius: 3px;
    opacity: 1;
  }
  /* Checked: the input itself is masked to a check mark, filled with the text color */
  & .task-list-item > input:checked,
  & .task-list-item > p:first-child > input:checked {
    border: 0;
    background: ${colors.text};
    -webkit-mask: ${checkMark};
    mask: ${checkMark};
  }
  & .task-list-item:has(> input:checked, > p:first-child > input:checked) {
    color: ${colors.mutedText};
  }
  /* So nested open items don't inherit muted */
  & .task-list-item:not(:has(> input:checked, > p:first-child > input:checked)) {
    color: ${colors.text};
  }

  /* ------------------ Quotes and rules ------------------ */
  /* Upright and in the text color, so emphasis inside still shows. The rule marks it. */
  & blockquote {
    padding-left: 1.25rem;
    border-left: 2px solid ${article.quoteRule};
  }
  & blockquote > * + * {
    margin-top: 1rem;
  }
  & blockquote > :is(h2, h3, h4, h5, h6) + * {
    margin-top: 0.625rem;
  }

  /* A short pause inside a section, centered on the text column */
  & hr {
    width: 4rem;
    height: 2px;
    border: 0;
    background: ${article.strongLine};
    margin-left: calc((min(100%, 40rem) - 4rem) / 2);
  }

  /* ------------------ Code blocks ------------------ */
  & pre {
    padding: 1rem 1.25rem;
    background: ${article.surface};
    border-radius: 4px;
    overflow-x: auto;
    font-family: ${codeFont};
    font-size: 0.9375rem;
    line-height: 1.6;
    tab-size: 2;
    scrollbar-width: thin;
    /* Easy to see on systems that always show scrollbars */
    scrollbar-color: ${colors.mutedText} transparent;
  }
  /* Wide enough for the longest line, so diff tints run the full width when scrolled */
  & pre > code {
    display: block;
    width: max-content;
    min-width: 100%;
    font-size: inherit;
    line-height: inherit;
  }
  & :is(pre, .table-scroll):focus-visible {
    outline: 2px solid ${colors.link.text};
    outline-offset: 2px;
  }

  /* Four roles. Everything else, keywords included, stays in the text color. */
  & :is(.hljs-comment, .hljs-quote, .hljs-meta) {
    color: ${article.code.comment};
  }
  & :is(.hljs-string, .hljs-regexp, .hljs-link) {
    color: ${article.code.string};
  }
  & :is(.hljs-number, .hljs-literal, .hljs-symbol, .hljs-bullet) {
    color: ${article.code.constant};
  }
  & :is(.hljs-title.function_, .hljs-title.class_, .hljs-section) {
    font-weight: 600;
  }
  & .hljs-emphasis {
    font-style: italic;
  }
  & .hljs-strong {
    font-weight: 700;
  }

  /* Each diff line is one span, stretched to the block's full width, padding included */
  & :is(.hljs-addition, .hljs-deletion) {
    display: inline-block;
    width: calc(100% + 2.5rem);
    margin-inline: -1.25rem;
    padding-inline: 1.25rem;
  }
  & .hljs-addition {
    background: ${article.code.addedLine};
  }
  & .hljs-deletion {
    background: ${article.code.removedLine};
    color: ${article.code.comment};
  }

  /* ------------------ Tables ------------------ */
  & .table-scroll {
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: ${colors.mutedText} transparent;
  }
  /* A small table stays only as wide as it needs to be */
  & table {
    border-collapse: collapse;
    font-size: 1rem;
    line-height: 1.5;
    width: auto;
  }
  & th {
    font-family: ${headingFont};
    font-weight: 600;
    font-size: 0.9375rem;
    white-space: nowrap;
    border-bottom: 2px solid ${article.strongLine};
  }
  /* GFM writes the column's alignment as align attributes, which the browser applies */
  & th:not([align]) {
    text-align: left;
  }
  /* No right padding on the last cell, so the table lines up with the text edges */
  & :is(th, td) {
    padding: 0.625rem 1.25rem 0.625rem 0;
    vertical-align: top;
  }
  & :is(th, td):last-child {
    padding-right: 0;
  }
  & td {
    border-bottom: 1px solid ${colors.borderLine};
  }
  & td code {
    white-space: nowrap;
  }
  /* Raleway has no tabular figures, so numbers use Montserrat's to line up */
  & td[align="right"] {
    font-family: ${headingFont};
    font-size: 0.9375rem;
    font-variant-numeric: tabular-nums lining-nums;
  }

  /* ------------------ Images and figures ------------------ */
  /*
   * height: auto keeps an <img> with width and height attributes in proportion.
   * In the dark theme the drop shadow is a hairline that follows the image's shape.
   */
  & img {
    height: auto;
    border-radius: 4px;
    filter: drop-shadow(0 0 1px ${article.imageEdge});
  }
  /* The link hugs its image, so its focus ring goes around the image */
  & a:has(> img) {
    display: block;
    width: fit-content;
    text-decoration: none;
  }
  & figcaption {
    margin-top: 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: ${colors.mutedText};
  }
  /* Lines up with the quote's text */
  & figure.quote figcaption {
    padding-left: calc(1.25rem + 2px);
  }

  /* ------------------ Details ------------------ */
  & details {
    padding: 0.875rem 1.125rem;
    background: ${article.surface};
    border-radius: 4px;
  }
  & summary {
    font-family: ${headingFont};
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
  }
  & summary::marker {
    color: ${colors.mutedText};
  }
  & details > * + * {
    margin-top: 1rem;
  }
  & details[open] > summary + * {
    margin-top: 0.875rem;
  }
  /* On the page background, or it would vanish into the box */
  & details :is(pre, :not(pre) > code) {
    background: ${colors.backgroundColor};
  }

  /* ------------------ Footnotes ------------------ */
  & > .footnotes {
    padding-top: 1.5rem;
    border-top: 1px solid ${colors.borderLine};
    font-size: 1rem;
    line-height: 1.6;
  }
  & .footnotes ol {
    padding-left: 1.5rem;
  }
  & .footnotes li + li {
    margin-top: 0.625rem;
  }
  & .footnotes li::marker {
    font-family: ${headingFont};
    font-weight: 600;
  }
  /* Bracketed numbers are easier to see and tap than a bare superscript */
  & sup > a[data-footnote-ref] {
    text-decoration: none;
    font-family: ${headingFont};
    font-weight: 600;
    padding-inline: 0.12em;
  }
  /* Empty alt text, so screen readers skip the brackets. Older browsers use the first. */
  & sup > a[data-footnote-ref]::before {
    content: "[";
    content: "[" / "";
  }
  & sup > a[data-footnote-ref]::after {
    content: "]";
    content: "]" / "";
  }
  & a.data-footnote-backref {
    text-decoration: none;
    font-family: ${headingFont};
    margin-left: 0.2em;
  }
  /* The note you jumped to, and the reference you jumped back to */
  & .footnotes li:target {
    background: ${article.selection};
    box-shadow: 0 0 0 0.35rem ${article.selection};
    border-radius: 2px;
  }
  & sup:has(> a:target) {
    background: ${article.selection};
    border-radius: 2px;
  }

  & .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* ------------------ Phones ------------------ */
  @media only screen and (max-width: 650px) {
    font-size: 1.125rem;
    line-height: 1.65;
    /* Needs <html lang>. Only here, where lines are short. */
    hyphens: auto;
    -webkit-hyphens: auto;
    /* These break with overflow-wrap instead, so they never gain a hyphen that isn't theirs */
    & :is(code, kbd, pre, a) {
      hyphens: manual;
      -webkit-hyphens: manual;
    }

    & h2 {
      font-size: 1.4375rem;
    }
    & h3 {
      font-size: 1.1875rem;
    }
    & > :where(h2) {
      --space-above: 2.75rem;
    }

    /* Top-level code and tables run edge to edge and scroll on their own */
    & > pre,
    & > .table-scroll {
      margin-inline: calc(-1 * ${PAGE_GUTTER});
      padding-inline: ${PAGE_GUTTER};
      max-width: none;
    }
    & > pre {
      border-radius: 0;
    }
    /* At the screen's edges, a ring outside the box would be cut off */
    & > :is(pre, .table-scroll):focus-visible {
      outline-offset: -2px;
    }
    & pre {
      font-size: 0.875rem;
    }
    & > pre :is(.hljs-addition, .hljs-deletion) {
      width: calc(100% + 2 * ${PAGE_GUTTER});
      margin-inline: calc(-1 * ${PAGE_GUTTER});
      padding-inline: ${PAGE_GUTTER};
    }

    /* Columns keep their natural width and the table scrolls, rather than squeezing every cell to one word */
    & table {
      width: max-content;
      min-width: 100%;
    }
  }
`;

export interface ArticleBodyProps {
  /** The post's rendered content, <ArticleContent>. */
  children: React.ReactNode;
}

/**
 * A post's body. Styles the rendered post, and makes its code blocks and tables
 * focusable while they scroll. Key it by the post's slug, so each post gets its own.
 */
const ArticleBody = ({ children }: ArticleBodyProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useFocusableOverflow(ref);
  return <Body ref={ref}>{children}</Body>;
};

export default ArticleBody;

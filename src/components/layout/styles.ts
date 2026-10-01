import { bodyFont } from "@/theme/fonts";

export const resetCSS = `
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Stop iOS Safari enlarging text when the phone rotates */
  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  figure,
  blockquote,
  pre,
  dl,
  ul,
  ol,
  dd {
    margin: 0;
  }

  /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
  ul[role='list'],
  ol[role='list'] {
    list-style: none;
  }

  /* Set core root defaults */
  html:focus-within {
    scroll-behavior: smooth;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    min-height: 100dvh;
    line-height: 1.5;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  img,
  picture {
    max-width: 100%;
    display: block;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
    scroll-behavior: auto;
    }
    
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

/** Side padding on every page. Full-width blocks in posts pull out by the same amount. */
export const PAGE_GUTTER = "1rem";

export const globalCSS = `
  body {
    margin: 0;
    font-size: 16px;
    font-family: ${bodyFont};
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0 ${PAGE_GUTTER};
  }

  /*
   * Next's root wrapper stretches to the body's height so the page can fill it, and
   * to its width so every page's column is equally wide, not shrunk to fit narrow
   * content. The column is centered inside it.
   */
  #__next {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  @media only screen and (max-width: 1000px) {
    body {
      padding-top: 1rem;
    }
  }

  @media only screen and (max-width: 400px) {
    body {
      padding-top: 0.5rem;
    }
  }
`;

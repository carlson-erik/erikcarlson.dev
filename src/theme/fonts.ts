// The names the @fontsource-variable packages register (imported in components/layout).
// They end in "Variable": "Raleway" or "Montserrat" alone won't match them.
export const headingFont = `"Montserrat Variable", sans-serif`;
export const bodyFont = `"Raleway Variable", sans-serif`;

// Box-drawing characters (├ ─ └) aren't in the fontsource files, so they come from the
// next font. Menlo and DejaVu Sans Mono are close to Source Code Pro's 0.6em width, so the
// characters line up. There's no ui-monospace: Safari would use SF Mono ahead of them.
export const codeFont = `"Source Code Pro Variable", Menlo, "DejaVu Sans Mono", Consolas, monospace`;

/* ------------------ Themes ------------------ */
import LightTheme from "./light-theme";
import DarkTheme from "./dark-theme";
/* ------------------ Types ------------------ */
import { Theme, ThemeNames } from "./types";

type ColorTree = { [key: string]: string | ColorTree };

/*
 * Theme colors are exposed as CSS variables so the prerendered HTML doesn't depend
 * on which theme is active. The <html data-theme> attribute (set before first paint,
 * see themeInitScript in ./context) decides which set of values applies.
 */
export const darkThemeSelector = `:root[data-theme="${ThemeNames.DARK}"]`;

const toVariableName = (prefix: string, key: string) =>
  `${prefix}-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;

// e.g. { link: { textHover: "#123" } } -> [["--color-link-text-hover", "#123"]]
const flattenColors = (colors: ColorTree, prefix = "--color"): [string, string][] =>
  Object.entries(colors).flatMap(([key, value]) => {
    const name = toVariableName(prefix, key);
    return typeof value === "string"
      ? [[name, value] as [string, string]]
      : flattenColors(value, name);
  });

// e.g. { link: { textHover: "#123" } } -> { link: { textHover: "var(--color-link-text-hover)" } }
const toVariableReferences = (colors: ColorTree, prefix = "--color"): ColorTree =>
  Object.fromEntries(
    Object.entries(colors).map(([key, value]) => {
      const name = toVariableName(prefix, key);
      return [
        key,
        typeof value === "string"
          ? `var(${name})`
          : toVariableReferences(value, name),
      ];
    })
  );

const toDeclarations = (theme: Theme) =>
  flattenColors(theme.colors)
    .map(([name, value]) => `${name}: ${value};`)
    .join("\n");

// Light is the default so the page is still themed without JavaScript.
export const themeCssVariables = `
  :root {
    ${toDeclarations(LightTheme)}
  }
  ${darkThemeSelector} {
    ${toDeclarations(DarkTheme)}
  }
`;

// Same shape as Theme["colors"], but every value is a var(--color-...) reference.
export const themeVars = {
  colors: toVariableReferences(LightTheme.colors) as Theme["colors"],
};

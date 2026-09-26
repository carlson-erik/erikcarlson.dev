import React, { createContext, useSyncExternalStore } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
/* ------------------ Themes ------------------ */
import LightTheme from "./light-theme";
import DarkTheme from "./dark-theme";
import { themeVars } from "./css-vars";
/* ------------------ Types ------------------ */
import { Theme, ThemeContextType, ThemeNames } from "./types";

const THEME_STORAGE_KEY = "erikcarlson.dev-theme-name";

/*
 * Inlined into <head> by pages/_document.tsx so it runs before the page paints.
 * Picks the stored theme (or the OS preference on a first visit) and sets it as
 * <html data-theme>, which switches the CSS variables defined in ./css-vars.
 */
const themeInitScript = `(function () {
  var name;
  try {
    name = window.sessionStorage.getItem("${THEME_STORAGE_KEY}");
  } catch (e) {}
  if (name !== "${ThemeNames.LIGHT}" && name !== "${ThemeNames.DARK}") {
    name = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "${ThemeNames.DARK}"
      : "${ThemeNames.LIGHT}";
    try {
      window.sessionStorage.setItem("${THEME_STORAGE_KEY}", name);
    } catch (e) {}
  }
  document.documentElement.dataset.theme = name;
})();`;

/* ------------------ Theme Store ------------------ */
// <html data-theme> is the source of truth; React subscribes to it through this store.
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getThemeName = () =>
  document.documentElement.dataset.theme === ThemeNames.DARK
    ? ThemeNames.DARK
    : ThemeNames.LIGHT;

// Pages are prerendered with the light theme. During hydration React uses this value,
// then immediately re-renders with getThemeName() if the visitor is in dark mode.
const getServerThemeName = () => ThemeNames.LIGHT;

const setTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme.name;
  window.sessionStorage.setItem(THEME_STORAGE_KEY, theme.name);
  listeners.forEach((listener) => listener());
};

const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  setTheme: () => {},
});

interface ThemeProviderProps {
  children?: React.ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;
  const themeName = useSyncExternalStore(
    subscribe,
    getThemeName,
    getServerThemeName
  );
  const theme = themeName === ThemeNames.DARK ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* Styled components get CSS variable references, so their CSS is the same for every theme */}
      <StyledThemeProvider theme={themeVars}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider, themeInitScript };

import React, { useCallback, useContext } from "react";
import styled from "styled-components";
/* -------- Components -------- */
import { IconButton } from "./styled";
/* -------- Icons -------- */
import Day from "@/images/icons/day";
import Night from "@/images/icons/night";
/* -------- Themes -------- */
import { ThemeContext } from "@/theme/context";
import { darkThemeSelector, themeVars } from "@/theme/css-vars";
import DarkTheme from "@/theme/dark-theme";
import LightTheme from "@/theme/light-theme";
/* -------- Types -------- */
import { ThemeNames } from "@/theme/types";

// Both icons are rendered and CSS shows the active theme's, so it's correct on first paint.
const DayIcon = styled.span`
  display: flex;

  ${darkThemeSelector} & {
    display: none;
  }
`;

const NightIcon = styled.span`
  display: none;

  ${darkThemeSelector} & {
    display: flex;
  }
`;

export default function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleThemeChange = useCallback(() => {
    setTheme(theme.name === ThemeNames.DARK ? LightTheme : DarkTheme);
  }, [theme, setTheme]);

  const label =
    theme.name === ThemeNames.DARK
      ? "Switch to light theme"
      : "Switch to dark theme";

  return (
    <IconButton
      type="button"
      onClick={handleThemeChange}
      aria-label={label}
      title={label}
    >
      <NightIcon aria-hidden="true">
        <Night color={themeVars.colors.text} />
      </NightIcon>
      <DayIcon aria-hidden="true">
        <Day color={themeVars.colors.text} />
      </DayIcon>
    </IconButton>
  );
}

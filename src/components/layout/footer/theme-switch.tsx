import React, { useCallback, useContext } from "react";
import styled from "styled-components";
/* -------- Icons -------- */
import Day from "@/images/icons/day";
import Night from "@/images/icons/night";
/* -------- Themes -------- */
import { ThemeContext } from "../../../theme/context";
import { darkThemeSelector, themeVars } from "../../../theme/css-vars";
import DarkTheme from "../../../theme/dark-theme";
import LightTheme from "../../../theme/light-theme";
/* -------- Types -------- */
import { ThemeNames } from "../../../theme/types";

const IconWrapper = styled.span`
  height: 40px;
  width: 40px;
  display: flex;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${(props) => props.theme.colors.link.iconHover};
  }
`;

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

  return (
    <IconWrapper onClick={handleThemeChange}>
      <NightIcon>
        <Night color={themeVars.colors.text} />
      </NightIcon>
      <DayIcon>
        <Day color={themeVars.colors.text} />
      </DayIcon>
    </IconWrapper>
  );
}

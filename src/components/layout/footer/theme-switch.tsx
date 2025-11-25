import React, { useCallback, useContext } from "react";
import styled from "styled-components";
/* -------- Icons -------- */
import Day from "@/images/icons/day";
import Night from "@/images/icons/night";
/* -------- Themes -------- */
import { ThemeContext } from "../../../theme/context";
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

export default function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleThemeChange = useCallback(() => {
    if (theme.name === ThemeNames.DARK) {
      setTheme(LightTheme);
      window.sessionStorage.setItem(
        "erikcarlson.dev-theme-name",
        LightTheme.name
      );
    } else {
      setTheme(DarkTheme);
      window.sessionStorage.setItem(
        "erikcarlson.dev-theme-name",
        DarkTheme.name
      );
    }
  }, [theme, setTheme]);

  return (
    <IconWrapper onClick={handleThemeChange}>
      {theme.name === ThemeNames.DARK ? (
        <Night color={theme.colors.text} />
      ) : (
        <Day color={theme.colors.text} />
      )}
    </IconWrapper>
  );
}

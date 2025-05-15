import React, { useCallback, useContext } from "react";
import styled from "styled-components";
/* -------- Themes -------- */
import { ThemeContext } from "../../theme/context";
import DarkTheme from "../../theme/dark-theme";
import LightTheme from "../../theme/light-theme";
/* -------- Types -------- */
import { ThemeNames } from "../../theme/types";

const IconWrapper = styled.span<{ $hoverColor: string }>`
  height: 40px;
  width: 40px;
  display: flex;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${(props) => props.$hoverColor};
  }
`;

const SolidIcon = styled.svg`
  height: 24px;
  width: 24px;
`;

interface IconProps {
  color: string;
}

function NightIcon(props: IconProps) {
  const { color } = props;
  return (
    <SolidIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={color}
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </SolidIcon>
  );
}

function DayIcon(props: IconProps) {
  const { color } = props;
  return (
    <SolidIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={color}
    >
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clipRule="evenodd"
      />
    </SolidIcon>
  );
}

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
    <IconWrapper
      onClick={handleThemeChange}
      $hoverColor={theme.colors.link.iconHover}
    >
      {theme.name === ThemeNames.DARK ? (
        <NightIcon color={theme.colors.text} />
      ) : (
        <DayIcon color={theme.colors.text} />
      )}
    </IconWrapper>
  );
}

import type { ThemeConfiguration as GneissThemeConfiguration } from "gneiss-editor";

export type Theme = {
  name: string;
  colors: {
    backgroundColor: string;
    borderLine: string;
    text: string;
    link: {
      text: string;
      textHover: string;
      iconHover: string;
    };
    projectList: {
      background: string;
      text: string;
      project: {
        iconColor: string;
        iconHover: string;
      };
    };
    menu: {
      background: string;
      backgroundHover: string;
    };
    scrollToTop: {
      iconBackground: string;
      iconBackgroundHover: string;
    };
    footer: {
      background: string;
      text: string;
      link: {
        text: string;
        textHover: string;
        iconHover: string;
      };
    };
    gneiss: {
      background: string;
      text: string;
      link: string;
      toolbar: GneissThemeConfiguration["toolbar"];
    };
  };
};

export enum ThemeNames {
  LIGHT = "Light",
  DARK = "Dark",
}

export type ThemeContextType = {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
};

// Styled-components module declaration
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

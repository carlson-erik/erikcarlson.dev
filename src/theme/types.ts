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
      };
    };
    menu: {
      background: string;
      backgroundHover: string;
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

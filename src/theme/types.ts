import type { ThemeConfiguration as GneissThemeConfiguration } from "gneiss-editor";

export type Theme = {
  name: string;
  colors: {
    backgroundColor: string;
    borderLine: string;
    text: string;
    mutedText: string;
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
    contents: {
      background: string;
    };
    /** Post bodies: code, quotes, highlights, and images */
    article: {
      surface: string;
      strongLine: string;
      quoteRule: string;
      selection: string;
      highlight: string;
      imageEdge: string;
      linkOnTint: string;
      code: {
        string: string;
        constant: string;
        comment: string;
        addedLine: string;
        removedLine: string;
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

// Styled-components module declaration.
// Styled components only see CSS variable references (see ./css-vars), not a concrete theme.
declare module "styled-components" {
  export interface DefaultTheme {
    colors: Theme["colors"];
  }
}

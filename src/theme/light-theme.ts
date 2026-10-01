import designSystem from "./design-system";
import { Theme, ThemeNames } from "./types";

const LightTheme: Theme = {
  name: ThemeNames.LIGHT,
  colors: {
    backgroundColor: "#FFFFFF",
    borderLine: designSystem.colors.grays.shade300,
    text: designSystem.colors.grays.shade900,
    mutedText: designSystem.colors.grays.shade700,
    link: {
      text: designSystem.colors.primary.shadeDefault,
      textHover: designSystem.colors.primary.shade700,
      iconHover: designSystem.colors.grays.shade200,
    },
    contents: {
      background: designSystem.colors.grays.shade200,
    },
    article: {
      surface: designSystem.colors.grays.shade200,
      strongLine: designSystem.colors.grays.shade500,
      quoteRule: designSystem.colors.grays.shade600,
      selection: designSystem.colors.primary.shade100,
      highlight: "#FFF0A6",
      imageEdge: "transparent",
      // Links on selection, highlight, and surface, which the link color is too light for
      linkOnTint: designSystem.colors.primary.shade600,
      code: {
        string: designSystem.colors.primary.shade600,
        constant: "#6E3AC9",
        comment: designSystem.colors.grays.shade700,
        addedLine: designSystem.colors.primary.shade100,
        removedLine: designSystem.colors.grays.shade300,
      },
    },
    menu: {
      background: designSystem.colors.grays.shade200,
      backgroundHover: designSystem.colors.grays.shade300,
    },
    projectList: {
      background: designSystem.colors.grays.shade200,
      text: designSystem.colors.grays.shade900,
      project: {
        iconColor: designSystem.colors.grays.shade700,
        iconHover: designSystem.colors.grays.shade300,
      },
    },
    scrollToTop: {
      iconBackground: designSystem.colors.grays.shade300,
      iconBackgroundHover: designSystem.colors.grays.shade400,
    },
    gneiss: {
      background: "#FFFFFF",
      text: designSystem.colors.grays.shade900,
      link: designSystem.colors.primary.shadeDefault,
      toolbar: {
        border: "#FFFFFF",
        background: {
          primary: "#FFFFFF",
          selected: designSystem.colors.grays.shade200,
          disabled: designSystem.colors.grays.shade300,
        },
        text: {
          primary: designSystem.colors.grays.shade900,
          selected: designSystem.colors.grays.shade900,
          disabled: designSystem.colors.grays.shade300,
        },
        button: {
          background: designSystem.colors.primary.shadeDefault,
          text: "#FFFFFF",
        },
      },
    },
    footer: {
      background: designSystem.colors.grays.shade200,
      text: designSystem.colors.grays.shade900,
      link: {
        text: designSystem.colors.grays.shade900,
        textHover: designSystem.colors.grays.shade900,
        iconHover: designSystem.colors.grays.shade200,
      },
    },
  },
};

export default LightTheme;

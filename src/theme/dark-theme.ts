import designSystem from "./design-system";
import { Theme, ThemeNames } from "./types";

const DarkTheme: Theme = {
  name: ThemeNames.DARK,
  colors: {
    backgroundColor: designSystem.colors.grays.shade900,
    borderLine: designSystem.colors.grays.shade700,
    text: designSystem.colors.grays.shade300,
    mutedText: designSystem.colors.grays.shade500,
    link: {
      text: designSystem.colors.primary.shade200,
      textHover: designSystem.colors.primary.shade400,
      iconHover: designSystem.colors.grays.shade700,
    },
    contents: {
      background: designSystem.colors.grays.shade800,
    },
    article: {
      surface: designSystem.colors.grays.shade800,
      strongLine: designSystem.colors.grays.shade600,
      quoteRule: designSystem.colors.grays.shade600,
      selection: designSystem.colors.primary.shade800,
      highlight: "#5A4B0C",
      imageEdge: designSystem.colors.grays.shade600,
      // Links on selection, highlight, and surface, which the link color is too light for
      linkOnTint: designSystem.colors.primary.shade200,
      code: {
        string: designSystem.colors.primary.shade200,
        constant: "#CDB6FF",
        comment: designSystem.colors.grays.shade500,
        addedLine: designSystem.colors.primary.shade800,
        removedLine: designSystem.colors.grays.shade900,
      },
    },
    menu: {
      background: designSystem.colors.grays.shade800,
      backgroundHover: designSystem.colors.grays.shade700,
    },
    projectList: {
      background: designSystem.colors.grays.shade800,
      text: designSystem.colors.grays.shade300,
      project: {
        iconColor: designSystem.colors.grays.shade300,
        iconHover: designSystem.colors.grays.shade700,
      },
    },
    scrollToTop: {
      iconBackground: designSystem.colors.grays.shade700,
      iconBackgroundHover: designSystem.colors.grays.shade600,
    },
    gneiss: {
      background: designSystem.colors.grays.shade900,
      text: designSystem.colors.grays.shade300,
      link: designSystem.colors.primary.shade200,
      toolbar: {
        border: designSystem.colors.grays.shade900,
        background: {
          primary: designSystem.colors.grays.shade900,
          selected: designSystem.colors.grays.shade700,
          disabled: designSystem.colors.grays.shade800,
        },
        text: {
          primary: designSystem.colors.grays.shade300,
          selected: designSystem.colors.grays.shade300,
          disabled: designSystem.colors.grays.shade300,
        },
        button: {
          background: designSystem.colors.primary.shadeDefault,
          text: "#FFFFFF",
        },
      },
    },
    footer: {
      background: designSystem.colors.grays.shade800,
      text: designSystem.colors.grays.shade300,
      link: {
        text: designSystem.colors.grays.shade300,
        textHover: designSystem.colors.grays.shade300,
        iconHover: designSystem.colors.grays.shade700,
      },
    },
  },
};

export default DarkTheme;

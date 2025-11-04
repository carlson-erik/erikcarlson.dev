import { Theme } from "@/theme/types";
import {
  EditorElement,
  Theme as EditorTheme,
  ThemeConfiguration,
} from "gneiss-editor";

export const getEditorTheme = (theme: Theme): EditorTheme => {
  const themeColors = theme.colors;
  const editorTheme: ThemeConfiguration = {
    editor: {
      background: themeColors.backgroundColor,
      text: {
        primary: themeColors.text,
        link: themeColors.link.text,
        headings: {
          one: themeColors.text,
          two: themeColors.text,
          three: themeColors.text,
          four: themeColors.text,
          five: themeColors.text,
          six: themeColors.text,
        },
      },
    },
    toolbar: {
      border: themeColors.borderLine,
      background: {
        primary: themeColors.backgroundColor,
        selected: themeColors.link.textHover,
        disabled: themeColors.borderLine,
      },
      text: {
        primary: themeColors.text,
        selected: themeColors.link.textHover,
        disabled: themeColors.borderLine,
      },
      button: {
        background: "blue",
        text: "white",
      },
    },
  };
  return {
    name: theme.name,
    light: editorTheme,
    dark: editorTheme,
  };
};

export const SHOWCASE_CONTENT: EditorElement[] = [
  {
    type: "header-one",
    align: "center",
    children: [{ text: "Formula 1 Knowledgebase", bold: true }],
  },
  {
    type: "header-two",
    align: "center",
    children: [{ text: "2025 Season Overview" }],
  },
  {
    type: "paragraph",
    align: "center",
    children: [
      {
        text: "Last updated: November 8, 2025 • Author: Erik Jensen",
        italics: true,
      },
    ],
  },
  {
    type: "paragraph",
    align: "left",
    children: [
      {
        text: "The 2025 FIA Formula One World Championship enters its hybrid era renaissance with tighter regulations, renewed manufacturer investment, and a calendar stretching across 24 races. This article highlights the key narratives, technical shifts, and competitive outlook shaping the season.",
      },
    ],
  },
  {
    type: "block-quote",
    children: [
      {
        text: "“Consistency is the new horsepower. Teams that master energy deployment, tire preservation, and adaptive aero will control the front of the grid in 2025.” — FIA Technical Briefing",
      },
    ],
  },
  {
    type: "header-three",
    align: "left",
    children: [{ text: "Headline Storylines" }],
  },
  {
    type: "bulleted-list",
    children: [
      {
        type: "list-item",
        children: [
          {
            text: "Mercedes-AMG’s redesigned W16 Hybrid focuses on aero efficiency after an aggressive floor and sidepod rethink.",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            text: "Red Bull Powertrains introduces a lighter MGU-H assembly to optimize energy delivery on high-speed circuits.",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            text: "McLaren and Ferrari continue their momentum from 2024, leveraging wind-tunnel parity and updated front suspension geometries.",
          },
        ],
      },
    ],
  },
  {
    type: "paragraph",
    align: "left",
    children: [
      { text: "For detailed regulation changes, consult the " },
      {
        type: "link",
        url: "https://www.fia.com/regulation/category/110",
        children: [{ text: "official FIA technical regulations" }],
      },
      {
        text: ". Highlights include a reduced minimum car weight and revised active aero testing protocols.",
      },
    ],
  },
  {
    type: "header-four",
    align: "left",
    children: [{ text: "Top Contenders & Constructors" }],
  },
  {
    type: "ordered-list",
    children: [
      {
        type: "list-item",
        children: [
          {
            text: "Mercedes-AMG Petronas F1 Team — Drivers: George Russell & Andrea Kimi Antonelli — Innovation Focus: Adaptive floor strakes tuned for variable ride heights.",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            text: "Oracle Red Bull Racing — Drivers: Max Verstappen & Yuki Tsunoda — Innovation Focus: Lightweight energy storage and aggressive DRS calibration.",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            text: "Scuderia Ferrari — Drivers: Charles Leclerc & Carlos Sainz — Innovation Focus: Front wing reprofiled for cleaner outwash and mid-corner balance.",
          },
        ],
      },
    ],
  },
  {
    type: "header-five",
    align: "left",
    children: [{ text: "Power Unit Snapshot" }],
  },
  {
    type: "paragraph",
    align: "justify",
    children: [
      {
        text: "All four manufacturers introduced revised turbo-compounders to meet 2025’s energy efficiency targets. Honda’s reintegration as a works supplier strengthens Aston Martin’s factory alignment, while Audi’s 2026 entry program continues to scout trackside telemetry for benchmarking.",
      },
    ],
  },
  {
    type: "header-six",
    align: "left",
    children: [{ text: "Emerging Midfield Stories" }],
  },
  {
    type: "paragraph",
    align: "left",
    children: [
      {
        text: "Stake Sauber F1 builds continuity ahead of its Audi transition, and Alpine’s ",
      },
      { text: "B-spec", bold: true },
      {
        text: " chassis promises improved cooling efficiency after a difficult 2024. Williams remains optimistic thanks to a revised rear suspension and increased capex on CFD capabilities.",
      },
    ],
  },
  {
    type: "paragraph",
    align: "right",
    children: [
      {
        text: "Key statistic: 34% of overtakes in 2025 pre-season testing occurred in high-deg zones, underscoring the importance of thermal management.",
        italics: true,
      },
    ],
  },
  {
    type: "paragraph",
    align: "left",
    children: [
      {
        text: "Note: Sprint race formats return at six venues. Previously cancelled events such as the Shanghai Sprint remain ",
        strikethrough: true,
      },
      { text: "tentative", strikethrough: true },
      {
        text: " confirmed for 2025 under revised logistics planning.",
        textcolor: "#388E3C",
      },
    ],
  },
  {
    type: "header-three",
    align: "left",
    children: [{ text: "Race Calendar Highlights" }],
  },
  {
    type: "ordered-list",
    children: [
      {
        type: "list-item",
        children: [
          { text: "Season Opener – Australian Grand Prix (Melbourne)" },
        ],
      },
      {
        type: "list-item",
        children: [
          { text: "European Triple-Header – Imola, Monaco, Barcelona" },
        ],
      },
      {
        type: "list-item",
        children: [
          { text: "Late-Season Closer – Abu Dhabi Grand Prix (Yas Marina)" },
        ],
      },
    ],
  },
  {
    type: "paragraph",
    align: "left",
    children: [
      { text: "Refer to the " },
      {
        type: "link",
        url: "https://www.formula1.com/en/latest.html",
        children: [{ text: "Formula1.com Latest News" }],
      },
      { text: " feed for real-time schedule adjustments." },
    ],
  },
  {
    type: "header-four",
    align: "left",
    children: [{ text: "Technical Knowledgebase References" }],
  },
  {
    type: "bulleted-list",
    children: [
      {
        type: "list-item",
        children: [
          {
            type: "link",
            url: "https://www.formula1.com/en/latest/article/tech-tuesday-2025-overview",
            children: [{ text: "Tech Tuesday: 2025 Aero Package Explainer" }],
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            type: "link",
            url: "https://www.pirelli.com/tyre/formula1",
            children: [{ text: "Pirelli Tire Compounds 2025" }],
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            type: "link",
            url: "https://www.mercedesamgf1.com/en/news/2025-season-preview",
            children: [{ text: "Mercedes-AMG 2025 Season Preview" }],
          },
        ],
      },
    ],
  },
  {
    type: "paragraph",
    align: "left",
    children: [
      {
        text: "When embedding this article in the knowledgebase, ensure that the GneissEditor toolbar is set to ",
        bold: true,
      },
      { text: '"hover"' },
      {
        text: " mode for cleaner presentation while preserving quick editing access.",
      },
    ],
  },
  {
    type: "paragraph",
    align: "center",
    children: [
      {
        text: "For editorial adjustments, contact the Knowledge Operations Team at ",
        textcolor: "#D81B60",
      },
      {
        type: "link",
        url: "mailto:kb-ops@formula1.example",
        children: [{ text: "kb-ops@formula1.example" }],
      },
      { text: "." },
    ],
  },
  {
    type: "paragraph",
    align: "left",
    children: [{ text: "" }],
  },
  {
    type: "header-two",
    align: "center",
    children: [{ text: "Appendix: Data Integrity Checks" }],
  },
  {
    type: "paragraph",
    align: "justify",
    children: [
      {
        text: "Telemetry dashboards sync nightly with the FIA official timing feed. Cross-reference delta calculations across practice sessions to maintain accuracy. Any discrepancies beyond 0.05s per lap should trigger a manual review.",
      },
    ],
  },
  {
    type: "paragraph",
    align: "left",
    children: [
      {
        text: "Revision history retained for 12 months. Submit merge requests via the internal docs repository for structural updates or binary asset changes.",
      },
    ],
  },
  {
    type: "paragraph",
    align: "left",
    children: [{ text: "End of Knowledgebase article." }],
  },
];

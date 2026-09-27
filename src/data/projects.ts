import type { Projects } from "./types";
/* ------------------ Screenshots ------------------ */
import gneissEditorLight from "@/images/projects/gneiss-editor-light.png";
import gneissEditorDark from "@/images/projects/gneiss-editor-dark.png";
import netgraphLight from "@/images/projects/netgraph-light.png";
import netgraphDark from "@/images/projects/netgraph-dark.png";

export const projects: Projects = {
  current: [
    {
      id: "netgraph",
      name: "Netgraph",
      description:
        "Netgraph enables React developers to create interactive network graph visualizations. This component provides customizable physics-based layouts, interactive controls, and intelligent highlighting. Whether visualizing complex networks, or any other data relationships, Netgraph abstracts away the complexity while you maintain full control over every aspect of the visualization.",
      skills: ["d3", "typescript", "react"],
      links: {
        showcase: "/projects/netgraph",
      },
      screenshot: {
        light: netgraphLight,
        dark: netgraphDark,
        alt: "A network graph drawn with Netgraph: circles of different sizes and colors, joined by lines",
      },
    },
    {
      id: "gneiss-editor",
      name: "GneissEditor",
      description:
        "GneissEditor enables developers to include modifiable Rich Text content in their React projects. At the core of GneissEditor is a customizable editor. It allows you to easily create, save, and export your content. This component library is built with React, TypeScript, and Slate.js.",
      skills: ["react", "typescript"],
      links: {
        github: "https://github.com/carlson-erik/gneiss-editor",
        showcase: "/projects/gneiss-editor",
      },
      screenshot: {
        light: gneissEditorLight,
        dark: gneissEditorDark,
        alt: "GneissEditor with its formatting toolbar, editing the story Hansel and Gretel",
      },
    },
  ],
  past: [
    {
      id: "coddit",
      name: "coddit",
      description:
        "Coddit is a web application that renders Reddit as if it were code. Coddit allows users to take advantage of features such as previewing posts, rendering in different programming languages (JavaScript, Python and C#), as well as theming in different color schemes. The user has the ability to browse Reddit in coddit as they would normally browse subreddits and posts.",
      skills: ["react", "javascript", "redux"],
      links: {
        demo: "https://coddit.dev",
        github: "https://github.com/carlson-erik/coddit",
      },
    },
    {
      id: "componentry",
      name: "Componentry",
      description:
        'Often I come across interesting React Component ideas on design websites. When I find something that challenges or inspires me, I instantly think "I need to build that!" When I actually build the component, I store it in this project.',
      skills: ["react", "javascript", "typescript"],
      links: {
        github: "https://github.com/carlson-erik/componentry",
      },
    },
    {
      id: "site-building",
      name: "Site Building",
      description:
        'Often I come across interesting Website ideas on design websites. When I find something that challenges or inspires me, I instantly think "I need to build that!" When I actually build the website, I store it in this project.',
      skills: ["react", "javascript", "typescript"],
      links: {
        github: "https://github.com/carlson-erik/site-building",
      },
    },
    {
      id: "portfolio",
      name: "This Site!",
      description:
        "Using Next.js and TypeScript, I built the very site you're using now. With this site, I want to show off the cool projects that I've built and (eventually) document my learning journey in a blog!",
      skills: ["nextjs", "react", "typescript"],
      links: {
        github: "https://github.com/carlson-erik/erikcarlson.dev",
      },
    },
  ],
};

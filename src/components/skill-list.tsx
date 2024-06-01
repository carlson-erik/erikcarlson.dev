import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "./styled";
import { ThemeContext } from "../theme/context";
import { Theme } from "../theme/types";
/* ------------------ Types ------------------ */
import { AltIconProps, IconProps } from "../images/types";
/* ------------------ Simple Icons ------------------ */
import D3 from "../images/icons/simple/d3";
import Dev from "../images/icons/simple/dev";
import Gmail from "../images/icons/simple/gmail";
import TypeScript from "../images/icons/simple/typescript";
import Redux from "../images/icons/simple/redux";
import JavaScript from "../images/icons/simple/javascript";
import Jest from "../images/icons/simple/jest";
import CSS from "../images/icons/simple/css";
import Gatsby from "../images/icons/simple/gatsby";
import Java from "../images/icons/simple/java";
/* ------------------ Alt Icons ------------------ */
import NodeJS from "../images/icons/alt/nodejs";
import ReactIcon from "../images/icons/alt/react";
import Github from "../images/icons/alt/github";
import Rollup from "../images/icons/simple/rollup";
import Webpack from "../images/icons/simple/webpack";
import NextJS from "@/images/icons/simple/nextjs";
import Icon, { IconType } from "./icon";

const Container = styled.div`
  width: 100%;
  display: flex;

  flex-wrap: wrap;
`;

const IconLink = styled(Link) <{ theme: Theme }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => props.theme.colors.link.iconHover};
  }
`;

type Skill = IconType;

export interface SkillListProps {
  skills: Skill[];
}

type SkillDetails = {
  component: (props: IconProps | AltIconProps) => JSX.Element;
  type: "simple" | "alt";
  title: string;
  url: string;
};

const ICON_MAP: Record<Skill, SkillDetails> = {
  css: {
    component: CSS,
    title: "CSS3",
    type: "simple",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  d3: {
    component: D3,
    title: "D3.js",
    type: "simple",
    url: "https://d3js.org/",
  },
  dev: {
    component: Dev,
    title: "dev.to",
    type: "simple",
    url: "https://dev.to/",
  },
  gatsby: {
    component: Gatsby,
    title: "Gatsby.js",
    type: "simple",
    url: "https://www.gatsbyjs.com/",
  },
  gmail: {
    component: Gmail,
    title: "Google's gmail",
    type: "simple",
    url: "https://www.google.com/gmail/about/",
  },
  java: {
    component: Java,
    title: "Oracle Java",
    type: "simple",
    url: "https://www.java.com/en/",
  },
  javascript: {
    component: JavaScript,
    title: "JavaScript",
    type: "simple",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  jest: {
    component: Jest,
    title: "Jest.js",
    type: "simple",
    url: "https://jestjs.io/",
  },
  nextjs: {
    component: NextJS,
    title: "Next.js",
    type: "simple",
    url: "https://nextjs.org/",
  },
  typescript: {
    component: TypeScript,
    title: "TypeScript",
    type: "simple",
    url: "https://www.typescriptlang.org/",
  },
  redux: {
    component: Redux,
    title: "Redux.js",
    type: "simple",
    url: "https://redux.js.org/",
  },
  rollup: {
    component: Rollup,
    title: "rollup.js",
    type: "simple",
    url: "https://rollupjs.org/",
  },
  webpack: {
    component: Webpack,
    title: "Webpack",
    type: "simple",
    url: "https://webpack.js.org/",
  },
  github: {
    component: Github,
    title: "Github",
    type: "alt",
    url: "https://github.com/",
  },
  nodejs: {
    component: NodeJS,
    title: "Node.js",
    type: "alt",
    url: "https://nodejs.org/en/",
  },
  react: {
    component: ReactIcon,
    title: "React.js",
    type: "alt",
    url: "https://reactjs.org/",
  },
};

const SkillList = (props: SkillListProps) => {
  const { skills } = props;
  const { theme } = useContext(ThemeContext);
  return (
    <Container>
      {skills.map((skill) => {
        const { url, title, component }: SkillDetails = ICON_MAP[skill];
        return (
          <IconLink
            key={skill}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
            theme={theme}
          >
            <Icon iconType={skill} Component={component} />
          </IconLink>
        );
      })}
    </Container>
  );
};

export default SkillList;

export { IconLink };

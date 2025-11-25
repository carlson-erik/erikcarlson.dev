import React, { useContext } from "react";
import styled from "styled-components";
import { IconLink, Link } from "./styled";
/* ------------------ Types ------------------ */
import { AltIconProps, IconProps } from "../images/types";
/* ------------------ Project Icons ------------------ */
import CSS from "../images/icons/project/css";
import D3 from "../images/icons/project/d3";
import Gatsby from "../images/icons/project/gatsby";
import Java from "../images/icons/project/java";
import JavaScript from "../images/icons/project/javascript";
import Jest from "../images/icons/project/jest";
import NextJS from "@/images/icons/project/nextjs";
import NodeJS from "../images/icons/project/nodejs";
import ReactIcon from "../images/icons/project/react";
import Redux from "../images/icons/project/redux";
import Rollup from "../images/icons/project/rollup";
import TypeScript from "../images/icons/project/typescript";
import Webpack from "../images/icons/project/webpack";

type Skill =
  | "css"
  | "d3"
  | "gatsby"
  | "java"
  | "javascript"
  | "jest"
  | "nextjs"
  | "typescript"
  | "redux"
  | "rollup"
  | "webpack"
  | "nodejs"
  | "react";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export interface SkillListProps {
  skills: Skill[];
}

type SkillDetails = {
  Component: (props: IconProps | AltIconProps) => JSX.Element;
  type: "simple" | "alt";
  title: string;
  url: string;
};

const ICON_MAP: Record<Skill, SkillDetails> = {
  css: {
    Component: CSS,
    title: "CSS3",
    type: "simple",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  d3: {
    Component: D3,
    title: "D3.js",
    type: "simple",
    url: "https://d3js.org/",
  },
  gatsby: {
    Component: Gatsby,
    title: "Gatsby.js",
    type: "simple",
    url: "https://www.gatsbyjs.com/",
  },
  java: {
    Component: Java,
    title: "Oracle Java",
    type: "simple",
    url: "https://www.java.com/en/",
  },
  javascript: {
    Component: JavaScript,
    title: "JavaScript",
    type: "simple",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  jest: {
    Component: Jest,
    title: "Jest.js",
    type: "simple",
    url: "https://jestjs.io/",
  },
  nextjs: {
    Component: NextJS,
    title: "Next.js",
    type: "simple",
    url: "https://nextjs.org/",
  },
  typescript: {
    Component: TypeScript,
    title: "TypeScript",
    type: "simple",
    url: "https://www.typescriptlang.org/",
  },
  redux: {
    Component: Redux,
    title: "Redux.js",
    type: "simple",
    url: "https://redux.js.org/",
  },
  rollup: {
    Component: Rollup,
    title: "rollup.js",
    type: "simple",
    url: "https://rollupjs.org/",
  },
  webpack: {
    Component: Webpack,
    title: "Webpack",
    type: "simple",
    url: "https://webpack.js.org/",
  },
  nodejs: {
    Component: NodeJS,
    title: "Node.js",
    type: "alt",
    url: "https://nodejs.org/en/",
  },
  react: {
    Component: ReactIcon,
    title: "React.js",
    type: "alt",
    url: "https://reactjs.org/",
  },
};

const StyledIconLink = styled(IconLink)`
  &:hover {
    background-color: ${(props) =>
      props.theme.colors.projectList.project.iconHover};
  }

  & > svg {
    height: 20px;
    width: 20px;
  }
`;

const SkillList = (props: SkillListProps) => {
  const { skills } = props;
  return (
    <Container>
      {skills.map((skill) => {
        const { url, title, Component }: SkillDetails = ICON_MAP[skill];
        return (
          <StyledIconLink
            key={skill}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
          >
            <Component key={skill} />
          </StyledIconLink>
        );
      })}
    </Container>
  );
};

export default SkillList;

export { IconLink };

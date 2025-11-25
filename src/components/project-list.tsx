import React, { useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
/* ------------------ Components ------------------ */
import {
  IconLinkText,
  Paragraph,
  Section,
  Subheading,
} from "../components/styled";
import SkillList, { IconLink } from "./skill-list";
import Github from "../images/icons/project/github";
import InternalLink from "../images/icons/internal-link";
/* ------------------ Theme ------------------ */
import { ThemeContext } from "../theme/context";
import { Theme } from "../theme/types";
/* ------------------ Images ------------------ */
import gneissEditorLight from "../images/projects/gneiss-editor-light.png";
import gneissEditorDark from "../images/projects/gneiss-editor-dark.png";
import netgraphLight from "../images/projects/netgraph-light.png";
import netgraphDark from "../images/projects/netgraph-dark.png";

const ProjectRow = styled.div<{ reversed?: boolean }>`
  width: 100%;
  display: flex;

  @media only screen and (max-width: 850px) {
    flex-direction: ${(props) =>
      props.reversed ? "column-reverse" : "column"};
    gap: 1rem;
  }
`;

const PictureContainer = styled.div<{ theme: Theme }>`
  flex-basis: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 1rem 1rem 1rem;

  & img {
    width: 85%;
    height: auto;
    box-shadow: 5px 3px 6px
      ${(props) => props.theme.colors?.borderLine || "#888888"};
    border: 1px solid ${(props) => props.theme.colors.borderLine || "#888888"};
    border-radius: 0.25rem;

    @media only screen and (max-width: 850px) {
      width: 60%;
    }

    @media only screen and (max-width: 500px) {
      width: 85%;
    }

    @media only screen and (max-width: 650px) {
      padding: 0;
    }
  }
`;

const ContentContainer = styled.div`
  flex-basis: 50%;
  padding: 0 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media only screen and (max-width: 500px) {
    gap: 0;
    padding: 0.5rem;
  }
`;

const Project = styled.div<{ theme: Theme }>`
  flex-basis: calc(50% - 1rem);
  height: fit-content;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${(props) => props.theme.colors.projectList.background};

  @media only screen and (max-width: 650px) {
    width: 100%;
    flex-basis: 100%;
  }
  @media only screen and (max-width: 500px) {
    gap: 0;
    padding: 0.5rem;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
`;

const ProjectLinks = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
`;

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SkillListContainer = styled.div`
  flex-grow: 1;
`;

const ProjectName = styled.h4`
  font-size: 1.25rem;
`;

const DetailLabel = styled.span`
  padding-right: 0.5rem;
  font-weight: bold;
`;

const ProjectContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ProjectSection = styled(Section)`
  gap: 1rem;
`;

const ProjectSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media only screen and (max-width: 500px) {
    gap: 1rem;
  }
`;

const ProjectList = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <ProjectSectionContainer>
      <ProjectSection>
        <Subheading>What I'm Working On</Subheading>
        <ProjectRow id="netgraph" reversed>
          <ContentContainer>
            <ProjectHeader>
              <ProjectName>Netgraph</ProjectName>
              <ProjectLinks>
                <IconLink
                  key="netgraph-project-showcase"
                  href="/projects/netgraph"
                  title="Netgraph project showcase"
                >
                  <InternalLink type="dev" color={theme.colors.link.text} />
                  <IconLinkText>Showcase</IconLinkText>
                </IconLink>
              </ProjectLinks>
            </ProjectHeader>
            <DetailContainer>
              <Paragraph>
                Netgraph enables React developers to create interactive network
                graph visualizations.This component provides customizable
                physics-based layouts, interactive controls, and intelligent
                highlighting. Whether visualizing complex networks, or any other
                data relationships, Netgraph abstracts away the complexity while
                you maintain full control over every aspect of the
                visualization.
              </Paragraph>
            </DetailContainer>
            <DetailContainer>
              <DetailLabel>Technologies:</DetailLabel>
              <SkillListContainer>
                <SkillList skills={["d3", "typescript", "react"]} />
              </SkillListContainer>
            </DetailContainer>
          </ContentContainer>
          <PictureContainer theme={theme}>
            {theme.name === "Light" ? (
              <Image src={netgraphLight} alt="Netgraph Light picture" />
            ) : (
              <Image src={netgraphDark} alt="Netgraph Dark picture" />
            )}
          </PictureContainer>
        </ProjectRow>
        <ProjectRow id="gneiss-editor" reversed>
          <ContentContainer>
            <ProjectHeader>
              <ProjectName>GneissEditor</ProjectName>
              <ProjectLinks>
                <IconLink
                  key="project-github"
                  href="https://github.com/carlson-erik/gneiss-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GneissEditor github repository"
                >
                  <Github
                    type="dev"
                    useAlt={false}
                    color={theme.colors.projectList.project.iconColor}
                  />
                </IconLink>
                <IconLink
                  key="gneisseditor-project-showcase"
                  href="/projects/gneiss-editor"
                  title="GneissEditor project showcase"
                >
                  <InternalLink type="dev" color={theme.colors.link.text} />
                  <IconLinkText>Showcase</IconLinkText>
                </IconLink>
              </ProjectLinks>
            </ProjectHeader>
            <DetailContainer>
              <Paragraph>
                GneissEditor enables developers to include modifiable Rich Text
                content in their React projects. At the core of GneissEditor is
                a customizable editor. It allows you to easily create, save, and
                export your content. This component library is built with React,
                TypeScript, and Slate.js.
              </Paragraph>
            </DetailContainer>
            <DetailContainer>
              <DetailLabel>Technologies:</DetailLabel>
              <SkillListContainer>
                <SkillList skills={["react", "typescript"]} />
              </SkillListContainer>
            </DetailContainer>
          </ContentContainer>
          <PictureContainer theme={theme}>
            {theme.name === "Light" ? (
              <Image src={gneissEditorLight} alt="GneissEditor picture" />
            ) : (
              <Image src={gneissEditorDark} alt="GneissEditor picture" />
            )}
          </PictureContainer>
        </ProjectRow>
      </ProjectSection>
      <ProjectSection>
        <Subheading>Past Projects</Subheading>
        <ProjectContainer>
          <Project id="coddit" theme={theme}>
            <ProjectHeader>
              <ProjectName>coddit</ProjectName>
              <ProjectLinks>
                <IconLink
                  key="project-github"
                  href="https://github.com/carlson-erik/coddit"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="coddit github repo"
                >
                  <Github
                    type="dev"
                    useAlt={false}
                    color={theme.colors.projectList.project.iconColor}
                  />
                </IconLink>
              </ProjectLinks>
            </ProjectHeader>
            <DetailContainer>
              <Paragraph>
                Coddit is a web application that renders Reddit as if it were
                code. Coddit allows users to take advantage features such as
                previewing posts, rendering in different programming languages
                (JavaScript, Python and C#), as well as theming in different
                color schemes. The user has the ability to browse reddit in
                coddit as they would normally browse subreddits and posts.
              </Paragraph>
            </DetailContainer>
            <DetailContainer>
              <DetailLabel>Technologies:</DetailLabel>
              <SkillListContainer>
                <SkillList skills={["react", "javascript", "redux"]} />
              </SkillListContainer>
            </DetailContainer>
          </Project>
          <Project id="componentry" theme={theme}>
            <ProjectHeader>
              <ProjectName>Componentry</ProjectName>
              <ProjectLinks>
                <IconLink
                  key="project-github"
                  href="https://github.com/carlson-erik/componentry"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="componentry github repo"
                >
                  <Github
                    type="dev"
                    useAlt={false}
                    color={theme.colors.projectList.project.iconColor}
                  />
                </IconLink>
              </ProjectLinks>
            </ProjectHeader>
            <DetailContainer>
              <Paragraph>
                Often I come across interesting React Component ideas on design
                websites. When I find something that challenges or inspires me,
                I instantly think "I need to build that!" When I actually build
                the component, I store it in this project.
              </Paragraph>
            </DetailContainer>
            <DetailContainer>
              <DetailLabel>Technologies:</DetailLabel>
              <SkillListContainer>
                <SkillList skills={["react", "javascript", "typescript"]} />
              </SkillListContainer>
            </DetailContainer>
          </Project>
          <Project id="site-building" theme={theme}>
            <ProjectHeader>
              <ProjectName>Site Building</ProjectName>
              <ProjectLinks>
                <IconLink
                  key="project-github"
                  href="https://github.com/carlson-erik/site-building"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="site-building github repo"
                >
                  <Github
                    type="dev"
                    useAlt={false}
                    color={theme.colors.projectList.project.iconColor}
                  />
                </IconLink>
              </ProjectLinks>
            </ProjectHeader>
            <DetailContainer>
              <Paragraph>
                Often I come across interesting Website ideas on design
                websites. When I find something that challenges or inspires me,
                I instantly think "I need to build that!" When I actually build
                the website, I store it in this project.
              </Paragraph>
            </DetailContainer>
            <DetailContainer>
              <DetailLabel>Technologies:</DetailLabel>
              <SkillListContainer>
                <SkillList skills={["react", "javascript", "typescript"]} />
              </SkillListContainer>
            </DetailContainer>
          </Project>
          <Project id="portfolio" theme={theme}>
            <ProjectHeader>
              <ProjectName>This Site!</ProjectName>
              <ProjectLinks>
                <IconLink
                  key="project-github"
                  href="https://github.com/carlson-erik/erikcarlson.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="componentry github repo"
                >
                  <Github
                    type="dev"
                    useAlt={false}
                    color={theme.colors.projectList.project.iconColor}
                  />
                </IconLink>
              </ProjectLinks>
            </ProjectHeader>
            <DetailContainer>
              <Paragraph>
                Using Nextjs and TypeScript, I built the very site you're using
                now. With this site, I want to show off the cool projects that
                I've built and (eventually) document my learning journey in a
                blog!
              </Paragraph>
            </DetailContainer>
            <DetailContainer>
              <DetailLabel>Technologies:</DetailLabel>
              <SkillListContainer>
                <SkillList skills={["nextjs", "react", "typescript"]} />
              </SkillListContainer>
            </DetailContainer>
          </Project>
        </ProjectContainer>
      </ProjectSection>
    </ProjectSectionContainer>
  );
};

export default ProjectList;

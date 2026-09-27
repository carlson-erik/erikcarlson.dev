import React from "react";
import styled from "styled-components";
import Image from "next/image";
/* ------------------ Components ------------------ */
import {
  IconLink,
  IconLinkText,
  Paragraph,
  Section,
  Subheading,
} from "../components/styled";
import SkillList from "./skill-list";
import Github from "../images/icons/project/github";
import ExternalLink from "@/images/icons/external-link";
/* ------------------ Theme ------------------ */
import { darkThemeSelector, themeVars } from "../theme/css-vars";
/* ------------------ Types ------------------ */
import type { CurrentProject, Project, Projects } from "@/data/types";
/* ------------------ Styled Components ------------------ */
const ProjectRow = styled.div<{ $reversed?: boolean }>`
  width: 100%;
  display: flex;

  @media only screen and (max-width: 850px) {
    flex-direction: ${(props) =>
      props.$reversed ? "column-reverse" : "column"};
    gap: 1rem;
  }
`;

const PictureContainer = styled.div`
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

  /* Both screenshots are rendered; CSS shows the active theme's so it's right on first paint */
  & .dark-screenshot {
    display: none;
  }

  ${darkThemeSelector} & {
    & .light-screenshot {
      display: none;
    }
    & .dark-screenshot {
      display: block;
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

const ProjectCard = styled.div`
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

const iconColor = themeVars.colors.projectList.project.iconColor;

/** Demo, GitHub and showcase links, in that order, for the ones the project has. */
function ProjectLinkList({ project }: { project: Project }) {
  const { name, links } = project;
  return (
    <ProjectLinks>
      {links.demo && (
        <IconLink
          href={links.demo}
          target="_blank"
          rel="noopener noreferrer"
          title={`${name} live demo`}
        >
          <ExternalLink color={iconColor} />
        </IconLink>
      )}
      {links.github && (
        <IconLink
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          title={`${name} GitHub repository`}
        >
          <Github color={iconColor} />
        </IconLink>
      )}
      {links.showcase && (
        <IconLink href={links.showcase} title={`${name} project showcase`}>
          <IconLinkText>Showcase</IconLinkText>
        </IconLink>
      )}
    </ProjectLinks>
  );
}

/** Name and links, description, and technologies. Used in both sections. */
function ProjectDetails({ project }: { project: Project }) {
  return (
    <>
      <ProjectHeader>
        <ProjectName>{project.name}</ProjectName>
        <ProjectLinkList project={project} />
      </ProjectHeader>
      <DetailContainer>
        <Paragraph>{project.description}</Paragraph>
      </DetailContainer>
      <DetailContainer>
        <DetailLabel>Technologies:</DetailLabel>
        <SkillListContainer>
          <SkillList skills={project.skills} />
        </SkillListContainer>
      </DetailContainer>
    </>
  );
}

function CurrentProjectRow({ project }: { project: CurrentProject }) {
  const { screenshot } = project;
  return (
    <ProjectRow id={project.id} $reversed>
      <ContentContainer>
        <ProjectDetails project={project} />
      </ContentContainer>
      <PictureContainer>
        <Image
          className="light-screenshot"
          src={screenshot.light}
          alt={screenshot.alt}
        />
        <Image
          className="dark-screenshot"
          src={screenshot.dark}
          alt={screenshot.alt}
        />
      </PictureContainer>
    </ProjectRow>
  );
}

const ProjectList = ({ projects }: { projects: Projects }) => {
  return (
    <ProjectSectionContainer>
      <ProjectSection>
        <Subheading>What I'm Working On</Subheading>
        {projects.current.map((project) => (
          <CurrentProjectRow key={project.id} project={project} />
        ))}
      </ProjectSection>
      <ProjectSection>
        <Subheading>Past Projects</Subheading>
        <ProjectContainer>
          {projects.past.map((project) => (
            <ProjectCard key={project.id} id={project.id}>
              <ProjectDetails project={project} />
            </ProjectCard>
          ))}
        </ProjectContainer>
      </ProjectSection>
    </ProjectSectionContainer>
  );
};

export default ProjectList;

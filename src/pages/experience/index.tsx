import Head from "next/head";
import styled from "styled-components";
/* ------------------ Components ------------------ */
import Layout from "@/components/layout";
import SkillList from "@/components/skill-list";
import { Heading, IconLink, IconLinkText } from "@/components/styled";
/* ------------------ Metadata ------------------ */
import { getPageMetadata } from "@/lib/metadata";
/* ------------------ Data ------------------ */
import { resume } from "@/data/resume";
import type { Education, Job, Resume, YearRange } from "@/data/types";

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailContainer = styled.div``;

const InformationContainer = styled.div<{
  $flipFlexDirection?: boolean;
  $noPadding?: boolean;
}>`
  padding-left: ${(props) => (props.$noPadding ? "" : "1.5rem")};
  display: flex;
  width: 100%;
  flex-direction: ${(props) => (props.$flipFlexDirection ? "column" : "row")};
  ${(props) => (!props.$flipFlexDirection ? "align-items: center;" : "")}
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  flex-basis: 70%;
`;

const Duration = styled.span`
  flex-grow: 1;
  display: flex;
  flex-direction: row-reverse;
  flex-basis: 30%;
`;

const Business = styled.span`
  font-style: italic;
`;

const Location = styled.span`
  margin-left: 0.25rem;
`;

const BulletList = styled.ul`
  margin: 0;
`;

const Label = styled.span`
  margin-right: 0.5rem;
  font-weight: 500;
`;

const SkillListContainer = styled.div`
  flex-grow: 1;
`;

const formatYears = ({ start, end }: YearRange) =>
  `${start} - ${end === "present" ? "Present" : end}`;

interface EntryHeaderProps {
  title: string;
  organization: string;
  location: string;
  years: YearRange;
}

/** Title and years, then organization and location. Used by jobs and degrees. */
function EntryHeader({
  title,
  organization,
  location,
  years,
}: EntryHeaderProps) {
  return (
    <>
      <InformationContainer $noPadding>
        <Title>{title}</Title>
        <Duration>{formatYears(years)}</Duration>
      </InformationContainer>
      <InformationContainer>
        <Business>{organization}</Business>
        <Location>({location})</Location>
      </InformationContainer>
    </>
  );
}

function JobEntry({ job }: { job: Job }) {
  const tense = job.years.end === "present" ? "includes" : "included";
  return (
    <DetailContainer>
      <EntryHeader
        title={job.title}
        organization={job.employer}
        location={job.location}
        years={job.years}
      />
      {job.highlights.length > 0 && (
        <InformationContainer $flipFlexDirection>
          <div>This role {tense} responsibilities such as the following:</div>
          <BulletList>
            {job.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </BulletList>
        </InformationContainer>
      )}
      {job.skills.length > 0 && (
        <InformationContainer>
          <Label>Tech stack:</Label>
          <SkillListContainer>
            <SkillList skills={job.skills} />
          </SkillListContainer>
        </InformationContainer>
      )}
    </DetailContainer>
  );
}

function EducationEntry({ education }: { education: Education }) {
  return (
    <DetailContainer>
      <EntryHeader
        title={education.degree}
        organization={education.school}
        location={education.location}
        years={education.years}
      />
    </DetailContainer>
  );
}

function Experience({ resume }: { resume: Resume }) {
  return (
    <>
      <Container>
        <ExperienceHeader>
          <Heading>Experience</Heading>
          <IconLink
            key="resume-download"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Download resume"
          >
            <IconLinkText>Download resume</IconLinkText>
          </IconLink>
        </ExperienceHeader>
        {resume.experience.map((job) => (
          <JobEntry key={`${job.title}-${job.years.start}`} job={job} />
        ))}
      </Container>
      <Container>
        <Heading>Education</Heading>
        {resume.education.map((education) => (
          <EducationEntry key={education.degree} education={education} />
        ))}
      </Container>
    </>
  );
}

export default function ExperiencePage() {
  return (
    <>
      <Head>{getPageMetadata("Experience")}</Head>
      <Layout>
        <Experience resume={resume} />
      </Layout>
    </>
  );
}

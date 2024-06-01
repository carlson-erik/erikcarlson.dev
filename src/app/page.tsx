"use client";
import styled from "styled-components";
/* ------------------ Components ------------------ */
import PageLayout from "@/components/page-layout";
import ProjectList from "../components/project-list";
import { Heading, Link } from "../components/styled";
/* ------------------ Theme ------------------ */
import { ThemeProvider } from "@/theme/context";
import { useEffect } from "react";

const Paragraph = styled.p`
  font-family: "Raleway", sans-serif;
  font-size: 1.25rem;
  line-height: 2rem;
  padding-bottom: 1rem;

  &:last-child {
    padding-bottom: 0;
  }
`;

const Introduction = styled.section`
  padding-bottom: 2rem;
`;

export default function HomePage() {
  useEffect(() => {
    document.title = 'Home | Erik Carlson'
  }, []);
  return (
    <ThemeProvider>
      <PageLayout>
        <Introduction>
          <Heading>Hi there!</Heading>
          <Paragraph>
            I'm a Full Stack Software Engineer based out of Maine, USA. I work
            at{" "}
            <Link href="https://pega.com/" target="_blank">
              Pegasystems
            </Link>{" "}
            as a Principal Software Engineer. At Pegasystems, I build{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Data_visualization"
              target="_blank"
            >
              Data Visualization
            </Link>{" "}
            and{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Data_reporting"
              target="_blank"
            >
              Data Reporting
            </Link>{" "}
            software.
          </Paragraph>
          <Paragraph>
            I specialize in designing and creating Frontend solutions with
            React.js, and TypeScript. I have expertise in building Backend
            technologies. I like to build cool things and learn from the
            experience.
          </Paragraph>
          <Paragraph>
            By now you're saying,{" "}
            <em>"Hey, can this guy actually do what he says?"</em> My projects
            and <Link href="/experience">past work experience</Link> speak for
            themselves!
          </Paragraph>
        </Introduction>
        <ProjectList />
      </PageLayout>
    </ThemeProvider>
  );
}

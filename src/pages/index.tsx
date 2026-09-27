import styled from "styled-components";
/* ------------------ Components ------------------ */
import Layout from "@/components/layout";
import ProjectList from "../components/project-list";
import RevolvingTitle from "@/components/revolving-title";
import { Paragraph } from "../components/styled";
/* ------------------ Metadata ------------------ */
import Head from "next/head";
import { getPageMetadata } from "@/lib/metadata";
/* ------------------ Data ------------------ */
import { projects } from "@/data/projects";

const INTRO_PHRASES = [
  "software.",
  "things people use.",
  "ideas into reality.",
  "charts that explain data.",
];

const Introduction = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1rem;
`;

const IntroBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function HomePage() {
  return (
    <>
      <Head>{getPageMetadata("Home")}</Head>
      <Layout>
        <Introduction>
          <RevolvingTitle prefix="I build" phrases={INTRO_PHRASES} />
          <IntroBody>
            <Paragraph>
              I'm Erik, a Full Stack Software Engineer based in Maine. I like
              building cool projects and learning new things along the way.
            </Paragraph>
            <Paragraph>
              I'm a Principal Software Engineer at Pegasystems, where I build
              data visualization and reporting software. I specialize in React
              and TypeScript, and my backend skills let me deliver features end
              to end.
            </Paragraph>
          </IntroBody>
        </Introduction>
        <ProjectList projects={projects} />
      </Layout>
    </>
  );
}

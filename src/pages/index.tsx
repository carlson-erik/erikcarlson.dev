import styled from "styled-components";
/* ------------------ Components ------------------ */
import Layout from "@/components/layout";
import ProjectList from "../components/project-list";
import { Heading, Link, Paragraph } from "../components/styled";
/* ------------------ Metadata ------------------ */
import Head from "next/head";
import { getPageMetadata } from "@/lib/metadata";

const Introduction = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default function HomePage() {
  return (
    <>
      <Head>{getPageMetadata("Home")}</Head>
      <Layout>
        <Introduction>
          <Heading>Hi there!</Heading>
          <Paragraph>
            I'm Erik, a Full Stack Software Engineer based in Maine. I love
            building software and turning ideas into reality. I'm always trying
            new things and learning along the way.
          </Paragraph>
          <Paragraph>
            Check out my projects to see what I've been working on!
          </Paragraph>
          <Paragraph>
            I work as a Principal Software Engineer for{" "}
            <Link href="https://pega.com/" target="_blank">
              Pegasystems
            </Link>{" "}
            . At Pegasystems, I build{" "}
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
            software. I specialize in crafting experiences with React.js and
            TypeScript, complemented by strong backend development skills.
          </Paragraph>
        </Introduction>
        <ProjectList />
      </Layout>
    </>
  );
}

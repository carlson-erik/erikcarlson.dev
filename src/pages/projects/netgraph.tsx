import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
/* ------------------ Theme ------------------ */
import { ThemeContext } from "@/theme/context";
/* ------------------ Components ------------------ */
import Layout from "@/components/layout";
import SkillList from "@/components/skill-list";
import { Heading, Paragraph, Subheading } from "@/components/styled";
/* ------------------ Metadata ------------------ */
import { getPageMetadata } from "@/lib/metadata";
/* ------------------ Netgraph ------------------ */
import Netgraph from "@carlsonerik/netgraph";
import { NETWORK_GRAPH_DATA, getNetworkGraphConfig } from "@/utils/netgraph";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DemoContainer = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid ${(props) => props.theme.colors.borderLine};
  border-radius: 0.25rem;

  @media only screen and (max-width: 500px) {
    height: 300px;
  }
`;

const getPadding = (windowWidth: number) => {
  const borderWidth = 2;
  let paddingWidth = 0; // mobile: 0.5rem * 2

  if (windowWidth < 400) {
    paddingWidth = 16;
  } else if (windowWidth < 1000) {
    paddingWidth = 64; // mobile: 0.5rem * 2
  }

  return borderWidth + paddingWidth;
};

function NetgraphPage() {
  const { theme } = useContext(ThemeContext);
  const [graphSectionRef, setGraphSectionRef] = useState<HTMLDivElement | null>(
    null
  );
  const [graphWidth, setGraphWidth] = useState(0);
  const [graphHeight, setGraphHeight] = useState(0);

  useEffect(() => {
    if (!graphSectionRef) {
      return;
    }

    const updateGraphDimensions = () => {
      const rect = graphSectionRef.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const adjustedWidth =
        (windowWidth < 1000 ? windowWidth : 1000) - getPadding(windowWidth);

      setGraphWidth(adjustedWidth);
      setGraphHeight(rect.height);
    };

    updateGraphDimensions();

    window.addEventListener("resize", updateGraphDimensions);

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length) {
        return;
      }
      updateGraphDimensions();
    });

    resizeObserver.observe(graphSectionRef);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateGraphDimensions);
    };
  }, [graphSectionRef]);

  return (
    <>
      <Section>
        <Heading>Netgraph</Heading>
        <Paragraph>
          Netgraph enables React developers to create interactive network graph
          visualizations.This component provides customizable physics-based
          layouts, interactive controls, and intelligent highlighting. Whether
          visualizing complex networks, or any other data relationships,
          Netgraph abstracts away the complexity while you maintain full control
          over every aspect of the visualization.
        </Paragraph>
      </Section>
      <Section>
        <Subheading>Showcase</Subheading>
        <DemoContainer ref={setGraphSectionRef}>
          {graphSectionRef ? (
            <Netgraph
              id="netgraph-showcase-demo"
              width={graphWidth}
              height={graphHeight}
              data={NETWORK_GRAPH_DATA}
              config={getNetworkGraphConfig(theme, graphWidth)}
            />
          ) : null}
        </DemoContainer>
      </Section>
      <Section>
        <Paragraph>Netgraph provides the following features:</Paragraph>
        <ul>
          <li>Two simulation modes</li>
          <ol>
            <li>
              <u>Dynamic</u> - The graph continuously renders and nodes are
              interactive. When the user drags a node, the simulation is updated
              and all forces are re-applied to the nodes.
            </li>
            <li>
              <u>Static</u> - The graph renders once and nodes are not
              interactive. However, the graph can still be zoomed and panned to
              see all aspects of the graph.
            </li>
          </ol>
          <li>
            Intuitive physics-based forces for graph layout behavior control.
          </li>
          <li>
            Customizable node and link styling with group-based color coding for
            intuitive visual distinction.
          </li>
          <li>
            Hover tooltips for node details, supporting custom content and
            adjustable positioning
          </li>
          <li>Zoom and pan controls to view the entirity of your graph.</li>
        </ul>
      </Section>
      <Section>
        <Subheading>Technologies Used</Subheading>
        <SkillList skills={["d3", "typescript", "react", "rollup"]} />
      </Section>
      <Section>
        <Subheading>Can I use it yet?</Subheading>
        <Paragraph>
          Unfortunately, I haven't released Netgraph yet. I'm working on it and
          will update this section when it's ready.
        </Paragraph>
      </Section>
    </>
  );
}

const NetgraphShowCasePage = () => {
  return (
    <>
      <Head>{getPageMetadata("Netgraph")}</Head>
      <Layout>
        <NetgraphPage />
      </Layout>
    </>
  );
};

export default NetgraphShowCasePage;

import Head from "next/head";
import styled from "styled-components";
/* ------------------ Components ------------------ */
import Layout from "@/components/layout";
import SkillList from "@/components/skill-list";
import { Heading } from "@/components/styled";
/* ------------------ Metadata ------------------ */
import { getPageMetadata } from "@/lib/metadata";

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
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

export default function ExperiencePage() {
  return (
    <>
      <Head>{getPageMetadata("Experience")}</Head>
      <Layout>
        <Container>
          <Heading>Job Experience</Heading>
          <DetailContainer>
            <InformationContainer $noPadding>
              <Title>Principal Software Engineer</Title>
              <Duration>2024 - Present</Duration>
            </InformationContainer>
            <InformationContainer>
              <Business>Pegasystems</Business>
              <Location>(Remote)</Location>
            </InformationContainer>
            <InformationContainer $flipFlexDirection>
              <div>
                This role includes responsbilities such as the following:
              </div>
              <BulletList>
                <li>
                  Architect and lead end-to-end delivery of core product
                  capabilities, guiding engineering teams toward scalable design
                  decisions.
                </li>
                <li>
                  Develop key components of a large-scale data visualization
                  platform, improving product reliability and accelerating
                  release confidence through comprehensive automation.
                </li>
                <li>
                  Mentor engineers in system design, software craftsmanship, and
                  delivery best practices, accelerating skill growth and
                  improving team effectiveness.
                </li>
                <li>
                  Lead technical design reviews, backlog refinement, and Agile
                  planning ceremonies to ensure alignment between engineering
                  execution and product goals.
                </li>
                <li>
                  Influence product strategy by providing technical insight that
                  shaped roadmap decisions and accelerated delivery of
                  high-value features.
                </li>
                <li>
                  Serve as Security Champion, promoting secure development
                  practices and driving continuous improvement of the team's
                  security posture.
                </li>
              </BulletList>
            </InformationContainer>
            <InformationContainer>
              <Label>Tech stack:</Label>
              <SkillListContainer>
                <SkillList
                  skills={[
                    "typescript",
                    "javascript",
                    "react",
                    "d3",
                    "jest",
                    "java",
                  ]}
                />
              </SkillListContainer>
            </InformationContainer>
          </DetailContainer>
          <DetailContainer>
            <InformationContainer $noPadding>
              <Title>Senior Software Engineer</Title>
              <Duration>2021 - 2024</Duration>
            </InformationContainer>
            <InformationContainer>
              <Business>Pegasystems</Business>
              <Location>(Remote)</Location>
            </InformationContainer>
            <InformationContainer $flipFlexDirection>
              <div>
                This role included responsbilities such as the following:
              </div>
              <BulletList>
                <li>
                  Developed components of a large-scale data visualization
                  platform and accelerated release confidence through
                  comprehensive automation.
                </li>
                <li>
                  Led team technical/design discussions, user story refinement,
                  and other re-occurring Agile planning meetings.
                </li>
                <li>
                  Collaborated directly with customers to diagnose and resolve
                  production issues, improving product reliability and user
                  satisfaction.
                </li>
                <li>
                  Serve as Security Champion, promoting secure development
                  practices and driving continuous improvement of the team's
                  security posture.
                </li>
              </BulletList>
            </InformationContainer>
            <InformationContainer>
              <Label>Tech stack:</Label>
              <SkillListContainer>
                <SkillList
                  skills={[
                    "typescript",
                    "javascript",
                    "react",
                    "d3",
                    "jest",
                    "java",
                  ]}
                />
              </SkillListContainer>
            </InformationContainer>
          </DetailContainer>
          <DetailContainer>
            <InformationContainer $noPadding>
              <Title>Software Engineer</Title>
              <Duration>2017 - 2020</Duration>
            </InformationContainer>
            <InformationContainer>
              <Business>Pegasystems</Business>
              <Location>(Bedford, NH)</Location>
            </InformationContainer>
            <InformationContainer $flipFlexDirection>
              <div>
                This role included responsbilities such as the following:
              </div>
              <BulletList>
                <li>
                  Developed new Customer Relationship Management (CRM) and
                  Business Process Management (BPM) product capabilities with
                  emphasis on maintainable design and robust automated test
                  coverage.
                </li>
                <li>
                  Collaborated directly with customers to diagnose and resolve
                  production issues, improving product reliability and user
                  satisfaction.
                </li>
              </BulletList>
            </InformationContainer>
            <InformationContainer>
              <Label>Tech stack:</Label>
              <SkillListContainer>
                <SkillList skills={["javascript", "react", "css", "java"]} />
              </SkillListContainer>
            </InformationContainer>
          </DetailContainer>
          <DetailContainer>
            <InformationContainer $noPadding>
              <Title>IPSec and IKEv2 Technician</Title>
              <Duration>2014 - 2016</Duration>
            </InformationContainer>
            <InformationContainer>
              <Business>UNH Interoperability Lab</Business>
              <Location>(Durham, NH)</Location>
            </InformationContainer>
            <InformationContainer $flipFlexDirection>
              <div>
                This role included responsbilities such as the following:
              </div>
              <BulletList>
                <li>
                  Designed and administered virtual network environments
                  integrating physical routers, switches, and endpoints to
                  support reliable system connectivity.
                </li>
                <li>
                  Executed interoperability and conformance testing for customer
                  IPSec and IKEv2 implementations to validate compliance with
                  IETF standards.
                </li>
              </BulletList>
            </InformationContainer>
          </DetailContainer>
        </Container>
        <Container>
          <Heading>Education</Heading>
          <DetailContainer>
            <InformationContainer>
              <Title>B.S. in Computer Science</Title>
              <Duration>2013 - 2017</Duration>
            </InformationContainer>
            <InformationContainer>
              <Business>University of New Hampshire</Business>
              <Location>(Durham, NH)</Location>
            </InformationContainer>
          </DetailContainer>
        </Container>
      </Layout>
    </>
  );
}

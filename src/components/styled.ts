import styled from "styled-components";
import Link from "next/link";

const Heading = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 2rem;
  margin-block: 0;
  padding: 0;
`;

const Subheading = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  margin-block: 0;
  padding: 0;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  text-underline-offset: 4px;
`;

const IconLink = styled(StyledLink)`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;
  border-radius: 4px;

  &:hover {
    color: ${(props) => props.theme.colors.link.textHover};
    background-color: ${(props) => props.theme.colors.link.iconHover};

    & > span {
      text-decoration: underline;
    }
  }
`;

const IconLinkText = styled.span`
  margin-left: 0.25rem;
  color: ${(props) => props.theme.colors.link.text};
  font-weight: bold;
`;

const Paragraph = styled.p`
  font-family: "Raleway", sans-serif;
  font-size: 1.25rem;
  line-height: 1.5;
`;

const CodeContainer = styled.pre`
  width: 100%;
  margin: 0;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.projectList.background};
  border: 1px solid ${(props) => props.theme.colors.borderLine};
  border-radius: 0.25rem;
  overflow-x: auto;
  font-family: "Courier New", Courier, monospace;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.text};

  @media only screen and (max-width: 500px) {
    font-size: 0.75rem;
    padding: 0.5rem;
  }
`;

const CodeBlock = styled.code`
  font-family: inherit;
`;

const OrderList = styled.ol``;
const BulletedList = styled.ul``;
const ListItem = styled.li`
  font-size: 1.25rem;
`;

export {
  CodeContainer,
  CodeBlock,
  Heading,
  Subheading,
  Section,
  IconLink,
  IconLinkText,
  StyledLink as Link,
  Paragraph,
  OrderList,
  BulletedList,
  ListItem,
};

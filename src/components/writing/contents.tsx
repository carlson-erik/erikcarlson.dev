import React from "react";
import styled from "styled-components";
/* ------------------ Theme ------------------ */
import { headingFont } from "@/theme/fonts";
/* ------------------ Hooks ------------------ */
import { useActiveHeading } from "@/hooks/useActiveHeading";
/* ------------------ Types ------------------ */
import type { ArticleHeading } from "@/data/types";

/* ------------------ Styled Components ------------------ */
const Sidebar = styled.nav`
  /* Sticks only because the page's grid uses align-items: start */
  position: sticky;
  top: 1.5rem;
  /* A list taller than the window scrolls on its own */
  max-height: calc(100vh - 3rem);
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.5rem;

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

const SidebarHeading = styled.h2`
  font-family: ${headingFont};
  font-size: 1rem;
  line-height: 1.25;
`;

const SidebarList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  border-left: 2px solid ${(props) => props.theme.colors.borderLine};
`;

// Doubled class so it beats Layout's "a, a:visited" link color. Contents links
// are visited once clicked, so the current-item rule needs it too.
const SidebarLink = styled.a`
  display: block;
  /* Over the list's rule, so the current item's border replaces it */
  margin-left: -2px;
  padding: 0.375rem 0 0.375rem 0.875rem;
  border-left: 2px solid transparent;
  font-size: 0.9375rem;
  line-height: 1.4;

  &&,
  &&:visited {
    color: ${(props) => props.theme.colors.mutedText};
    text-decoration: none;
  }
  &&:hover {
    color: ${(props) => props.theme.colors.link.text};
  }
  /* After :hover, so the current item keeps the text color on hover */
  &&[aria-current="true"] {
    border-left-color: ${(props) => props.theme.colors.link.text};
    color: ${(props) => props.theme.colors.text};
    font-weight: bold;
  }
`;

const Section = styled.details`
  display: none;
  margin-bottom: 2rem;
  padding: 0.75rem 1rem;
  background-color: ${(props) => props.theme.colors.contents.background};
  border-radius: 4px;

  @media only screen and (max-width: 900px) {
    display: block;
  }
`;

const SectionSummary = styled.summary`
  font-weight: bold;
  cursor: pointer;
`;

const SectionList = styled.ol`
  margin: 0.75rem 0 0.25rem;
  padding-left: 1.25rem;

  & li + li {
    margin-top: 0.375rem;
  }
`;

const SectionLink = styled.a`
  text-decoration: underline;
  text-underline-offset: 6px;
`;

export interface ContentsProps {
  /** The post's headings, in order. */
  headings: ArticleHeading[];
}

/** Desktop: a sticky list beside the post that highlights the section being read. */
export const ContentsSidebar = ({ headings }: ContentsProps) => {
  const activeId = useActiveHeading(headings.map((heading) => heading.id));
  return (
    <Sidebar aria-labelledby="contents-heading">
      <SidebarHeading id="contents-heading">Contents</SidebarHeading>
      <SidebarList>
        {headings.map((heading) => (
          <li key={heading.id}>
            <SidebarLink
              href={`#${heading.id}`}
              aria-current={heading.id === activeId ? "true" : undefined}
            >
              {heading.text}
            </SidebarLink>
          </li>
        ))}
      </SidebarList>
    </Sidebar>
  );
};

/** Phones and tablets: a collapsible, numbered list above the post. */
export const ContentsSection = ({ headings }: ContentsProps) => {
  return (
    <Section>
      <SectionSummary>Contents</SectionSummary>
      <SectionList>
        {headings.map((heading) => (
          <li key={heading.id}>
            <SectionLink href={`#${heading.id}`}>{heading.text}</SectionLink>
          </li>
        ))}
      </SectionList>
    </Section>
  );
};

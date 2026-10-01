import React from "react";
import styled from "styled-components";
/* ------------------ Components ------------------ */
import { Heading, Link } from "../styled";
import PostMeta from "./post-meta";

/* ------------------ Styled Components ------------------ */
const Container = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  font-weight: bold;
  font-size: 1rem;
`;

const ArticleTitle = styled(Heading)`
  font-size: clamp(1.875rem, 1.2rem + 2vw, 2.5rem);
  line-height: 1.2;
  max-width: 24ch;
  text-wrap: balance;
`;

export interface ArticleHeaderProps {
  title: string;
  /** Release date, "YYYY-MM-DD". */
  date: string;
  minutesToRead: number;
}

/** "All writing" link, the post's title, and its release date and read length. */
const ArticleHeader = ({ title, date, minutesToRead }: ArticleHeaderProps) => {
  return (
    <Container>
      <BackLink href="/writing">All writing</BackLink>
      <ArticleTitle as="h1">{title}</ArticleTitle>
      <PostMeta date={date} minutesToRead={minutesToRead} />
    </Container>
  );
};

export default ArticleHeader;
